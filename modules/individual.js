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

			scope.user = {};
			scope.user.id = 0;
			
			scope.users = []; // list

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
		
		self.list = function(scope) {
			
			bui.show();
				
			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;
			
			if (scope.$id > 2) scope = scope.$parent;

			$http({
			  method: 'POST',
			  url: 'handlers/MgaIndividual/list.php',
			  data: scope.users
			}).then(function mySucces(response) {
				
				scope.users = angular.copy(response.data);
				
				bui.hide();
				
			}, function myError(response) {
				 
				bui.hide();
				
			});
			
			$('#content').load('lists/individual.html', function() {
				$timeout(function() { $compile($('#content')[0])(scope); },100);
			});	
			
		};
		
		// addEdit
		self.individual = function(scope,row) {
			
			// if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add)) return;
			
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
				  url: 'handlers/MgaUsers/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.individual);
					
					mode(scope,row);
					
				}, function myError(response) {
					
				  // error
				  
				});
				
			};
			
			groups(scope);
			offices(scope);
			
		};
		
		self.save = function(scope) {
			
			if (validate.form(scope,'user')){ 
				Swal.fire("Oops...", "Some fields are required", "error");
				return;
			}
			
			$http({
			  method: 'POST',
			  url: 'handlers/MgaUsers/save.php',
			  data: scope.user
			}).then(function mySuccess(response) {
				
				if(scope.user.id==0){
					scope.user.id = response.data;
					Swal.fire({ title: "Success!",
					 icon: 'success',
					 text: "User Info Successfully Added!",
					 type: "success"}).then(okay => {
					   if (okay) {
						self.list(scope);
					  }
					});
				} else{
					Swal.fire({ title: "Success!",
					 icon: 'success',
					 text: "User Info Successfully Updated!",
					 type: "success"}).then(okay => {
					   if (okay) {
						self.list(scope);
					  }
					});
				};
				
				mode(scope,scope.user);
				
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
				  url: 'handlers/MgaUsers/delete.php',
				  data: {id: [row.id]}
				}).then(function mySucces(response) {

					self.list(scope);
				
					Swal.fire("Deleted", "User Info Successfully Deleted", "success");
					
				}, function myError(response) {
					 
				  // error
					
				});

			};

		bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
		};
		
		function groups(scope){
			
			$http({
			  method: 'POST',
			  url: 'api/suggestions/groups.php'
			}).then(function mySucces(response) {
				
				scope.groups = response.data;
				
			}, function myError(response) {
				 
			});
			
		}
		
		function offices(scope){
			
			$http({
			  method: 'POST',
			  url: 'api/suggestions/offices.php'
			}).then(function mySucces(response) {
				
				scope.offices = response.data;
				
			}, function myError(response) {
				 
			});
			
		}
		
	};
	
	return new app();
	
});