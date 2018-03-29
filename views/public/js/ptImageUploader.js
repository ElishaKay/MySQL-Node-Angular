(function() {

	'use strict';

	angular
	.module('KoalaCMS')
	.directive('ptImageUploader', function() {
		return {
			restrict: 'EA',
			replace: true,
			bindToController: true,
			templateUrl: 'pt-image-uploader.html',
			controller: 'ptImageUploaderController',
			controllerAs: 'vm'
		};
	});

})();

(function() {

	'use strict';

app.controller('ptImageUploaderController', function($http, $location, $anchorScroll) {
		var vm = this;
		vm.s3 = {};
		console.log('the s3 controller ran');

		$http.get('/s3creds')
		.success(function(data){
			vm.s3.accessKeyId = data.accessKeyId;
			vm.s3.secretAccessKey = data.secretAccessKey;
			vm.s3.bucket = data.bucket;
			vm.s3.region = data.region;
			console.log('Updated the AWS Access Codes: ',vm.s3)
		})
		.error(function(data){
		});
		
		vm.isSimulation = false;
		vm.addImage = addImage;
		vm.removeImage = removeImage;

		vm.images = [{}];

		function addImage() {
			var image = {};
			vm.images.push(image);

			var last = vm.images.length - 1;
			vm.images[last].tab = true;
			submitImageToLibrary(image);
			scroll();
		}

		
		function removeImage(image) {
			vm.images.splice(vm.images.indexOf(image), 1);

			scroll();
		}

		function scroll() {
			$location.hash('image');
			$anchorScroll();
		}
	});

})();
