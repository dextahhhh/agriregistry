angular.module('app-module',['form-validator','ui.bootstrap','bootstrap-modal','bootstrap-growl','block-ui']).factory('app', function($compile,$timeout,$http,bootstrapModal,growl,bui,validate) {
	
	function app() {
		
		var self = this;
		
		self.data = function(scope) { // initialize data			
						
			scope.mode = null;

			scope.views = {};
			scope.views.currentPage = 1;
  
			scope.views.list = true;
			
			scope.controls = {
				ok: {
					btn: false,
					label: 'Save'
				},
				cancel: {
					btn: false,
					label: 'Cancel'
				},
			};
				
			scope.group = {};
			scope.group.id = 0;
			
			scope.icons = [];
			
			scope.groups = []; // list
			
		};
		
		self.list = function(scope) {
			
			bui.show();
			
			scope.currentPage = scope.views.currentPage;
			scope.pageSize = 10;
			scope.maxSize = 5;

			scope.group = {};
			scope.group.id = 0;
			
			$http({
			  method: 'POST',
			  url: 'handlers/MgaGroups/list.php',
			}).then(function mySucces(response) {
				
				scope.groups = response.data;
				
				bui.hide();
				
			}, function myError(response) {
				 
				bui.hide();
				
			});
			
			$('#content').load('lists/groups.html', function() {
				$timeout(function() { $compile($('#content')[0])(scope); },100);
			});		
			
		};
		
		function mode(scope,row) {
			
			if (row == null) {
				scope.controls.ok.label = 'Save';
				scope.controls.ok.btn = false;
				scope.controls.cancel.label = 'Cancel';
				scope.controls.cancel.btn = false;
			} else {
				scope.controls.ok.label = 'Update';
				scope.controls.ok.btn = true;
				scope.controls.cancel.label = 'Close';
				scope.controls.cancel.btn = false;				
			}
			
		};	
		
		self.group = function(scope,row) {
			
			// if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.add)) return;

			bui.show();
			
			scope.group = {};
			scope.group.id = 0;
			
			privileges(scope);
			
			mode(scope,row);
			
			$('#content').load('forms/group.html',function() {
				$timeout(function() { $compile($('#content')[0])(scope); },200);
			});
			
			if (row != null) {
				
				if (scope.$id > 2) scope = scope.$parent;				
				$http({
				  method: 'POST',
				  url: 'handlers/MgaGroups/view.php',
				  data: {id: row.id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.group);
					privileges(scope);
					
					bui.hide();
					
				}, function myError(response) {
					
					bui.hide();
				  
				});
					
			}; //row
			
			
			bui.hide();
			
		};
		
		self.edit = function(scope) {
			
			// if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.edit)) return;
			
			scope.controls.ok.btn = !scope.controls.ok.btn;
			
		};
		
		self.save = function(scope) {
			
			if (validate.form(scope,'group')){ 
				Swal.fire("Oops...", "Some fields are required", "error");
				return;
			}
		
			$http({
			  method: 'POST',
			  url: 'handlers/MgaGroups/save.php',
			  data: {group: scope.group, privileges: scope.privileges}
			}).then(function mySucces(response) {
				
				if (scope.group.id == 0) {
					scope.group.id = response.data;
					Swal.fire({ title: "Success!",
					 icon: 'success',
					 text: "Group Info Successfully Added!",
					 type: "success"}).then(okay => {
					   if (okay) {
						self.list(scope);
					  }
					});
				}	else	{
					Swal.fire({ title: "Success!",
					 icon: 'success',
					 text: "Group Info Successfully Updated!",
					 type: "success"}).then(okay => {
					   if (okay) {
						self.list(scope);
					  }
					});
				}
				mode(scope,scope.group);
				
			}, function myError(response) {
				 
			  // error
				
			});			
			
		};		
		
		self.delete = function(scope,row) {
			
		// if (!access.has(scope,scope.accountProfile.groups,scope.module.id,scope.module.privileges.delete)) return;	
			
		var onOk = function() {
			
			if (scope.$id > 2) scope = scope.$parent;			
			
			$http({
			  method: 'POST',
			  url: 'handlers/MgaGroups/delete.php',
			  data: {id: [row.id]}
			}).then(function mySucces(response) {

				self.list(scope);
				
				Swal.fire("Deleted", "Group Info Successfully Deleted", "success");
				
			}, function myError(response) {
				 
			  // error
				
			});

		};

		bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
		};
		
		// Api/Suggestions
		
		function privileges(scope) {
			
			$http({
			  method: 'POST',
			  url: 'handlers/privileges.php',
			  data: {id: scope.group.id}
			}).then(function mySuccess(response) {
				
				scope.privileges = angular.copy(response.data);
				
				console.log(scope);
				
			}, function myError(response) {
				
				//
				
			});				
			
		};		
		
	};
	
	return new app();
	
});