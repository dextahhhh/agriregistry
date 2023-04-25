angular.module('bootstrap-modal',[]).service('bootstrapModal', function($compile,$timeout) {

	this.confirm = function(scope,title,content,onOk,onCancel) {
		
		var dialog = bootbox.confirm({
			title: title,
			message: content,
			buttons: {
				confirm: {
					label: 'Ok',
					className: 'btn btn-info move-kanan'
				},				
				cancel: {
					label: 'Close',
					className: 'btn btn-danger'
				}
			},
			callback: function (result) {
				if (result) {
					onOk(scope);
				} else {
					onCancel();
				}
			}
		});
		
		dialog.init(function() {
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});	
		
	};
	
	this.notify = function(scope,content,onOk) {

		var dialog = bootbox.alert({
			title: 'Notification',
			message: content,
			callback: function () {
				onOk();
			}
		});
		
		dialog.init(function() {
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});
	
	};
	
	this.box = function(scope,title,content,onOk) {

		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				confirm: {
					label: 'Ok',
					className: 'btn-success'
				},				
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				}
			},			
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});
		
		dialog.init(function() {
			$timeout(function() { dialog.find('.bootbox-body').load(content) }, 500);
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 600);
		});
	
	};
	
	this.box2 = function(scope,title,content,ok) {

		var dialog = bootbox.alert({
			title: title,
			message: 'Loading content...',
			buttons: {
				ok: {
					label: 'Close',
					className: 'btn-danger'
				}
			},			
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content);
			$('.modal-content').css({"width": "240%","left": "-75%"});			
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});
		
	};	
	
	this.boxx2 = function(scope,title,content,ok) {

		var dialog = bootbox.alert({
			title: title,
			message: 'Loading content...',
			buttons: {
				ok: {
					label: 'Close',
					className: 'btn-danger'
				}
			},			
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content);
			$('.modal-content').css({"width": "100%"});			
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});
		
	};	
	
	this.box3 = function(scope,title,content,init) {

		var dialog = bootbox.alert({
			title: title,
			message: 'Loading content...',
			buttons: {
				ok: {
					label: 'Close',
					className: 'btn-danger'
				}
			},			
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});
		
		dialog.init(function() {
			$timeout(function() { dialog.find('.bootbox-body').load(content) }, 500);
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 600);
		});
	
	};
	
	this.box4 = function(scope,title,content,onOk) {

		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				confirm: {
					label: 'Save',
					className: 'btn-success'
				},				
				cancel: {
					label: 'Cancel',
					className: 'btn-danger'
				}
			},			
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});
		
		dialog.init(function() {
			$timeout(function() { dialog.find('.bootbox-body').load(content) }, 500);
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 600);
		});
	
	};

});