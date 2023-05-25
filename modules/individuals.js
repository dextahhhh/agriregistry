angular.module('app-module',['form-validator','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui','module-access']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,bui,validate,access) {
	
	function app() {
		
		var self = this;
		
		self.data = function(scope) { // initialize data			
			
			scope.formHolder = {};

			scope.views = {};
			scope.views.currentPage = 1;
  
			scope.views.list = true;

			scope.controls = {
				ok: {btn: false, label: 'Save'},
				cancel: {btn: false, label: 'Cancel'},
				add: {btn: false, label: 'New'},
				edit: {btn: false, label: 'Edit'},
				icon: {label: 'fa-eye'}
			};

			scope.individual = {};
			scope.individual.id = 0;
			
			scope.individuals = []; // list
			
			// for CRUD
			scope.individual_training = {};
			scope.individual_training.id = 0;
			
			scope.individual_organization = {};
			scope.individual_organization.id = 0;

			// for List
			scope.individual_trainings = [];
			scope.individual_organizations = [];
		
		};
		
		function mode(scope,row) {
			
			if (row == null) {
				scope.controls.ok.label = 'Save';
				scope.controls.ok.btn = false;
				scope.controls.cancel.label = 'Cancel';
				scope.controls.cancel.btn = false;
				scope.controls.add.btn = true;
			} else {
				scope.controls.ok.label = 'Update';
				scope.controls.ok.btn = true;
				scope.controls.cancel.label = 'Close';
				scope.controls.cancel.btn = false;				
				scope.controls.add.label = 'Edit';				
			}
			
		};
		
		self.checkMunicipality = function (scope,item) {
          
		  console.log(item);
		  
          var prov_code = item.provCode;

          $http({
            method: "POST",
            url: "handlers/MgaIndividuals/check-municipality.php",
            data: { id: prov_code },
          }).then(
            function mySucces(response) {
              scope.municipalities = response.data;
            },
            function myError(response) {}
          );
		  
        };

        self.checkBarangays = function (scope, item) {
			
		  console.log(item);
			
          var mun_code = item.citymunCode;

          $http({
            method: "POST",
            url: "handlers/MgaIndividuals/check-barangays.php",
            data: { id: mun_code },
          }).then(
            function mySucces(response) {
              scope.barangays = response.data;
            },
            function myError(response) {}
          );
		  
        };
		
		self.checkBirthMunicipality = function (scope,item) {
          
		  console.log(item);
		  
          var prov_code = item.provCode;

          $http({
            method: "POST",
            url: "handlers/MgaIndividuals/check-birthmunicipality.php",
            data: { id: prov_code },
          }).then(
            function mySucces(response) {
              scope.birthmunicipalities = response.data;
            },
            function myError(response) {}
          );
		  
        };
		
		self.checkEmergencyMunicipality = function (scope,item) {
          
		  console.log(item);
		  
          var prov_code = item.provCode;

          $http({
            method: "POST",
            url: "handlers/MgaIndividuals/check-emergencymunicipality.php",
            data: { id: prov_code },
          }).then(
            function mySucces(response) {
              scope.emergencymunicipalities = response.data;
            },
            function myError(response) {}
          );
		  
        };

        self.checkEmergencyBarangays = function (scope, item) {
			
		  console.log(item);
			
          var mun_code = item.citymunCode;

          $http({
            method: "POST",
            url: "handlers/MgaIndividuals/check-emergencybarangays.php",
            data: { id: mun_code },
          }).then(
            function mySucces(response) {
              scope.emergencybarangays = response.data;
            },
            function myError(response) {}
          );
		  
        };
		
		self.list = function(scope) {
			
			bui.show();
				
			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;
			
			if (scope.$id > 2) scope = scope.$parent;

			$http({
			  method: 'POST',
			  url: 'handlers/MgaIndividuals/list.php',
			  data: scope.individuals
			}).then(function mySucces(response) {
				
				scope.individuals = angular.copy(response.data);
				
				bui.hide();
				
			}, function myError(response) {
				 
				bui.hide();
				
			});
			
			$('#content').load('lists/individuals.html', function() {
				$timeout(function() { $compile($('#content')[0])(scope); },100);
			});	
			
			provinces(scope);
			// municipalities(scope);
			
		};
		
		// addEdit
		self.individual = function(scope,row) {
			
			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add)) return;
			
			console.log(scope,row);
			
			scope.individual = {};
			scope.individual.id = 0;
			
			mode(scope,row);
			
			$('#content').load('forms/individual.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});
			
			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;				
				$http({
				  method: 'POST',
				  url: 'handlers/MgaIndividuals/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.individual);
					
					if (response.data.birth_date != null) {
					  scope.individual.birth_date = new Date(
						response.data.birth_date
					  );
					} else {
					};
					
					if (scope.individual.municipality != null) {
					  scope.municipalities =
						response.data.municipality.municipalities;
					};
					
					if (scope.individual.barangay != null) {
					  scope.barangays = response.data.barangay.barangays;
					};
					
					if (scope.individual.birth_municipality != null) {
					  scope.birthmunicipalities =
						response.data.birth_municipality.municipalities;
					};
					
					if (scope.individual.emergency_municipality != null) {
					  scope.emergencymunicipalities =
						response.data.emergency_municipality.municipalities;
					};
					
					if (scope.individual.emergency_barangay != null) {
					  scope.emergencybarangays = response.data.emergency_barangay.barangays;
					};
					
					$timeout(function () {
					  self.individual_trainings(scope);
					  self.individual_organizations(scope);
					}, 200);
					
					// mode(scope,row);
					
				}, function myError(response) {
					
				  // error
				  
				});
				
			};
			
			provinces(scope);
			
		};
		
		self.save = function(scope) {
			
			if (validate.form(scope,'individual')){ 
				Swal.fire("Oops...", "Some fields are required", "error");
				return;
			}
			
			$http({
			  method: 'POST',
			  url: 'handlers/MgaIndividuals/save.php',
			  data: scope.individual
			}).then(function mySuccess(response) {
				
				if(scope.individual.id==0){
					scope.individual.id = response.data;
					Swal.fire({ title: "Success!",
					 icon: 'success',
					 text: "Individual Info Successfully Added!",
					 type: "success"}).then(okay => {
					   if (okay) {
						self.list(scope);
					  }
					});
				} else{
					Swal.fire({ title: "Success!",
					 icon: 'success',
					 text: "Individual Info Successfully Updated!",
					 type: "success"}).then(okay => {
					   if (okay) {
						self.list(scope);
					  }
					});
				};
				
				mode(scope,scope.individual);
				
			}, function myError(response) {
				
				// error
				
			});	
			
		};
		
		self.edit = function(scope) {
			
			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.edit)) return;
	
			scope.controls.ok.btn = !scope.controls.ok.btn;
			
		};
		
		self.delete = function(scope,row) {
			
			if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.delete)) return;
			
			var onOk = function() {
				
				if (scope.$id > 2) scope = scope.$parent;			
				
				$http({
				  method: 'POST',
				  url: 'handlers/MgaIndividuals/delete.php',
				  data: {id: [row.id]}
				}).then(function mySucces(response) {

					self.list(scope);
				
					Swal.fire("Deleted", "Individual Info Successfully Deleted", "success");
					
				}, function myError(response) {
					 
				  // error
					
				});

			};

		bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
		};
		
		self.print_individuals = function ExportToExcel(type, fn, dl) {
		   var elt = document.getElementById('table_individuals');
		   var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
		   return dl ?
			 XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
			 XLSX.writeFile(wb, fn || ('individual.' + (type || 'xlsx')));
		};
		
		
		//Organization
		self.individual_organizations = function (scope) {
			
          bui.show();

          if (scope.$id > 2) scope = scope.$parent;
          $http({
            method: "POST",
            url: "handlers/MgaIndividualOrganizations/list.php",
            data: { id: scope.individual.id },
          }).then(
            function mySucces(response) {
              scope.individual_organizations = angular.copy(response.data);

              bui.hide();
            },
            function myError(response) {
              bui.hide();
            }
          );

          $("#content_individual_organizations").load("lists/individual_organizations.html", function () {
            $timeout(function () {
              $compile($("#content_individual_organizations")[0])(scope);
            }, 500);
          });
        };

        self.individual_organization = function (scope, row) {
          var title = "New Individual Organization";

          scope.individual_organization = {};
          scope.individual_organization.id = 0;

          mode(scope, row);

          if (row != null) {
            var title = "Edit";

            if (scope.$id > 2) scope = scope.$parent;

            $http({
              method: "POST",
              url: "handlers/MgaIndividualOrganizations/view.php",
              data: { id: row.id },
            }).then(
              function mySucces(response) {
                angular.copy(response.data, scope.individual_organization);
              },
              function myError(response) {
                // error
              }
            );
          }

          var onOk = function () {
            self.save_individual_organization(scope);
          };

          bootstrapModal.box(scope, title, "dialogs/individual_organization.html", onOk);
		  
        };

        self.save_individual_organization = function (scope) {
          $http({
            method: "POST",
            url: "handlers/MgaIndividualOrganizations/save.php",
            data: {
              individual_id: scope.individual.id,
              individual_organization: scope.individual_organization,
            },
          }).then(
            function mySuccess(response) {
              if (scope.individual_organization.id == 0) {
                scope.individual_organization.id = response.data;
                
                Swal.fire({
                  title: "Success!",
                  icon: "success",
                  text: "Individual organization successfully added!",
                  type: "success",
                }).then((okay) => {
                  if (okay) {
                    // Nothing to do
                  }
                });

                self.individual_organizations(scope);
              } else {
                Swal.fire({
                  title: "Success!",
                  icon: "success",
                  text: "Individual organization successfully updated!",
                  type: "success",
                }).then((okay) => {
                  if (okay) {
                    // Nothing to do
                  }
                });

                self.individual_organizations(scope);
              }
              scope.controls.ok.btn = true;
            },
            function myError(response) {
              // error
            }
          );
        };

        self.delete_individual_organization = function (scope, row) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              if (scope.$id > 2) scope = scope.$parent;

              $http({
                method: "POST",
                url: "handlers/MgaIndividualOrganizations/delete.php",
                data: { id: [row.id] },
              }).then(
                function mySucces(response) {
                  self.individual_organizations(scope);

                  Swal.fire(
                    "Deleted!",
                    "Individual organization record has been deleted.",
                    "success"
                  );
                },
                function myError(response) {
                  // error
                }
              );
            }
          });
        };
		
		
		//Trainings
		self.individual_trainings = function (scope) {
			
          bui.show();

          if (scope.$id > 2) scope = scope.$parent;
          $http({
            method: "POST",
            url: "handlers/MgaIndividualTrainings/list.php",
            data: { id: scope.individual.id },
          }).then(
            function mySucces(response) {
              scope.individual_trainings = angular.copy(response.data);

              bui.hide();
            },
            function myError(response) {
              bui.hide();
            }
          );

          $("#content_individual_trainings").load("lists/individual_trainings.html", function () {
            $timeout(function () {
              $compile($("#content_individual_trainings")[0])(scope);
            }, 500);
          });
        };

        self.individual_training = function (scope, row) {
          var title = "New Individual Training";

          scope.individual_training = {};
          scope.individual_training.id = 0;

          mode(scope, row);

          if (row != null) {
            var title = "Edit";

            if (scope.$id > 2) scope = scope.$parent;

            $http({
              method: "POST",
              url: "handlers/MgaIndividualTrainings/view.php",
              data: { id: row.id },
            }).then(
              function mySucces(response) {
                angular.copy(response.data, scope.individual_training);
              },
              function myError(response) {
                // error
              }
            );
          }

          var onOk = function () {
            self.save_individual_training(scope);
          };

          bootstrapModal.box(scope, title, "dialogs/individual_training.html", onOk);
		  
        };

        self.save_individual_training = function (scope) {
          $http({
            method: "POST",
            url: "handlers/MgaIndividualTrainings/save.php",
            data: {
              individual_id: scope.individual.id,
              individual_training: scope.individual_training,
            },
          }).then(
            function mySuccess(response) {
              if (scope.individual_training.id == 0) {
                scope.individual_training.id = response.data;
                
                Swal.fire({
                  title: "Success!",
                  icon: "success",
                  text: "Individual training successfully added!",
                  type: "success",
                }).then((okay) => {
                  if (okay) {
                    // Nothing to do
                  }
                });

                self.individual_trainings(scope);
              } else {
                Swal.fire({
                  title: "Success!",
                  icon: "success",
                  text: "Individual training successfully updated!",
                  type: "success",
                }).then((okay) => {
                  if (okay) {
                    // Nothing to do
                  }
                });

                self.individual_trainings(scope);
              }
              scope.controls.ok.btn = true;
            },
            function myError(response) {
              // error
            }
          );
        };

        self.delete_individual_training = function (scope, row) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              if (scope.$id > 2) scope = scope.$parent;

              $http({
                method: "POST",
                url: "handlers/MgaIndividualTrainings/delete.php",
                data: { id: [row.id] },
              }).then(
                function mySucces(response) {
                  self.individual_trainings(scope);

                  Swal.fire(
                    "Deleted!",
                    "Individual training record has been deleted.",
                    "success"
                  );
                },
                function myError(response) {
                  // error
                }
              );
            }
          });
        };
		
		function provinces(scope){
			
			$http({
			  method: 'POST',
			  url: 'api/suggestions/provinces.php'
			}).then(function mySucces(response) {
				
				scope.provinces = response.data;
				
			}, function myError(response) {
				 
			});
			
		};
		
		
	};
	
	return new app();
	
});