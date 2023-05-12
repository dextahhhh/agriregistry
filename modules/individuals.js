angular.module('app-module',['form-validator','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,bui,validate) {
	
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
			
			// if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add)) return;
			
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
					}
					if (scope.individual.barangay != null) {
					  scope.barangays = response.data.barangay.barangays;
					}
					
					mode(scope,row);
					
					// scope.individual.birth_date = new Date();
					
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
			
			// if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.edit)) return;
	
			scope.controls.ok.btn = !scope.controls.ok.btn;
			
		};
		
		self.delete = function(scope,row) {
			
			// if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.delete)) return;
			
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