angular.module('bootstrap-modal',[]).service('bootstrapModal', function($compile,$timeout) {

	this.confirm = function(scope,title,content,onOk,onCancel) {
		
		var dialog = bootbox.confirm({
			title: title,
			message: content,
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-light move-right'
				},
				confirm: {
					label: 'Ok',
					className: 'btn-primary'
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
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: 'Save',
					className: 'btn-primary'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}else{
					location.reload();
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content, function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			// $timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});
	
	};
	
	this.box2 = function(scope,title,content,onOk) {

		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'hide btn-danger'
				},
				confirm: {
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
			// $('.modal-content').css({"width": "20%","left": "-65%"});			
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 1000);
		});

	};
	
	this.box3 = function(scope,title,content,onOk,w='230',h='950') {
	
		var dialog = bootbox.alert({
			title: title,
			message: 'Loading...',
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
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "height": h+"px", "left": "-"+lp+"%"});			
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 1000);
		});

	};
	
	this.box4 = function(scope,title,content,load,onOk,w='230') {
	
		var dialog = bootbox.alert({
			title: title,
			message: 'Loading...',
			buttons: {
				ok: {
					label: 'Close',
					className: 'btn-danger btn-sm'
				}				
			},			
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});

		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});

	};
	
	this.box5 = function(scope,title,content,load,onOk) {
	
		var dialog = bootbox.alert({
			title: title,
			message: 'Loading...',
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
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
				load();
			});
		});

	};

	this.box6 = function(scope,title,content,onOk,w='230') {
	
		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: 'Print Receipt',
					className: 'btn-success'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}else{
					
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});
	};
	
	this.box7 = function(scope,title,content,onOk,w='230') {
	
		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: 'Save',
					className: 'btn-success'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}else{
					
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});
	};

	this.box8 = function(scope,title,content,onOk,w='150') {
	
		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: '<i class="fa fa-check-circle"></i> Receive Document',
					className: 'btn-success'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}else{
					
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});
	};
	
	this.box9 = function(scope,title,content,load,onOk,w='190') {
	
		var dialog = bootbox.alert({
			title: title,
			message: 'Loading...',
			buttons: {
				ok: {
					label: 'Close',
					className: 'btn-danger btn-sm'
				}				
			},			
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});

		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-70;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});

	};

	this.box10 = function(scope,title,content,onOk,w='100') {
	
		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: '<i class="fa fa-check-circle"></i> Receive Document',
					className: 'btn-success'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}else{
					
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});
	};

	this.box11 = function(scope,title,content,onOk,w='100') {
	
		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: 'Release',
					className: 'btn-success'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}else{
					
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});
	};

	this.box12 = function(scope,title,content,onOk,w='150') {
	
		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: 'File document',
					className: 'btn-success'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}else{
					
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});
	};

	this.box13 = function(scope,title,content,onOk,w='230') {
	
		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: 'Ok',
					className: 'btn-success'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}else{
					
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});
	};

	this.box14 = function(scope,title,content,onOk,w='150') {
	
		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: 'Ok',
					className: 'btn-success'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}else{
					
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});
	};

	this.box15 = function(scope,title,content,onOk,w='150') {
	
		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: 'Release Document',
					className: 'btn-success'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}else{
					
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});
	};

	this.box16 = function(scope,title,content,onOk,w='150') {
	
		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: 'Save',
					className: 'btn-success'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}else{
					
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content,function() {
				$compile($('.bootbox-body')[0])(scope);
			});
			var lp = parseFloat(w)/2-50;
			$('.modal-content').css({"width": w+"%", "left": "-"+lp+"%"});
		});
	};
	
});