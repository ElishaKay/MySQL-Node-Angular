
	var app = angular.module('app.directives', []);
	
	//   app.directive('myDir', [function() {
 //        return {
 //            restrict: 'E',
 //            controller: ['$scope', '$sce', function($scope, $sce) {
               
 //            	alert('hello from directives.js');
 //            	// Inserted from core js

 //            	 $scope.html = '';
 //   	 var base_link = 'https://meta-g.herokuapp.com/public/question/aba8902f-9cc9-458a-8340-2ee02f6bf981';
 //   	 console.log("hey from core js init function!!!");

 //   	 var parameters = {
 //                            access_token: '7a99ff54-add5-4692-80ff-12202935a401',
 //                            days: 7,
 //                            campaign: 1485 //campaign id
 //                        };

	// var link = 'https://meta-g.herokuapp.com/public/question/c4f0951d-10df-4d3a-8a05-55228bec493a?access_code=7a99ff54-add5-4692-80ff-12202935a401';
	 
	//  $scope.link = link;
 // 	 var interval;
 //   	 $('#iframe-stats').contents().find("head")
 //         .append($("<style type='text/css'> .EmbedFrame-header, .EmbedFrame-footer a, .EmbedFrame-footer div{display:none}; </style>"));
                             
	
	// var hideHeader = function () {
 //                            var i = 0;
 //                            interval = setInterval(function () {
 //                                if ($('#iframe-stats').contents().find(".EmbedFrame").length > 0 || i > 50) {
 //                                    $('#iframe-stats').contents().find("head")
 //                                        .append($("<style type='text/css'> .EmbedFrame-header, .EmbedFrame-footer a, .EmbedFrame-footer div{display:none}; </style>"));
 //                                    clearInterval(interval);
 //                                }
 //                                else {
 //                                    i++;
 //                                }

 //                            }, 100);
 //                        };
 //                        var html = '<iframe id="iframe-stats" src="https://meta-g.herokuapp.com/public/question/c4f0951d-10df-4d3a-8a05-55228bec493a?access_code=7a99ff54-add5-4692-80ff-12202935a401" frameborder="0" width="680" height="400" allowtransparency onload="' + hideHeader() + '"></iframe>';
        
 //          $scope.html = $sce.trustAsHtml(html);

            	
 //            }]
	// 	}
	// }]);



app.directive('myDir', [function() {
      return {
        restrict: 'E',
        controller: ['$scope', '$sce', function($scope, $sce) {

        var iframeElement = $('#iframe-stats');
        console.log('iframeElement');
        
        }]}}]);
               