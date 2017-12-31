// uncomment this line if the directive ends up working
// var app = angular.module('GXLeads', ['app.directives']);
var app = angular.module('GXLeads', ['ui.router',
    'GXLeads.services',
    'GXLeads.filters',
    'btford.socket-io',
    'GXLeads.directives',
    
  ]);

// Beginning of router

app.config(function($stateProvider, $urlRouterProvider) {


 
  $urlRouterProvider.otherwise('/home/list');


  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'partial-home.html'
    // controller: 'MainCtrl'
  })
  .state('home.list', {
  	url: '/list',
  	templateUrl: 'home-list.html',
  })
    .state('home.list2', {
    url: '/list2',
    templateUrl: 'home-list2.html',
  })
    .state('home.community', {
    url: '/community',
    templateUrl: 'community',
  })
    .state('home.search', {
    url: '/search',
    templateUrl: 'search',
    controller: 'searchController'  
  })
  .state('profile', {
    url: '/profile/:id/:email',
    templateUrl: 'profile',
    controller: 'profilesController'  
  });
});



// end of router
// Beginning of controller

function searchController($scope, $http, socket){
	 
      // Populate client's campaigns in the dropdown
	  $http.get('/api/search')
		.success(function(data){
			$scope.allUsers = data;
			console.log('These are all of the apps users: ',data)
		})
		.error(function(data){
	  });

	  // Filter by column user chooses from dropdown
	  $scope.filterType	= 'client_id';

	  $scope.ourTeamCategories = [
        {"id":18,"title":'Management'},
        {"id":19,"title":'Administration'},
        {"id":21,"title":'Designers'},
        {"id":22,"title":'Accounts'},
      ];

	  $scope.sortType     = 'name'; // set the default sort type
	  $scope.sortReverse  = false;  // set the default sort order
	  $scope.searchFish   = '';     // set the default search/filter term
	  
	var client_email = '';

        
	var init = function (client_email) {
	   
			};

	init();

	$scope.reverse = true;
	
};


function profilesController($scope, $http, $stateParams, $window){
	   // Getting stuff from URL
	  // get the id

	  $window.scrollTo(0, 0);
	  
      $scope.id = $stateParams.id;

      // get the email
      $scope.email = $stateParams.email;   
	};


function mainController($scope, $http, socket){
	 	  
      // Populate client's campaigns in the dropdown
	  $http.get('/api/search')
		.success(function(data){
			$scope.allUsers = data;
			console.log('These are all of the apps users: ',data)
		})
		.error(function(data){
	  });

	  // Filter by column user chooses from dropdown
	  $scope.filterType	= 'client_id';

	  $scope.ourTeamCategories = [
        {"id":18,"title":'Management'},
        {"id":19,"title":'Administration'},
        {"id":21,"title":'Designers'},
        {"id":22,"title":'Accounts'},
      ];

	  $scope.sortType     = 'name'; // set the default sort type
	  $scope.sortReverse  = false;  // set the default sort order
	  $scope.searchFish   = '';     // set the default search/filter term
	  
	  // create the list of sushi rolls 
	  $scope.sushi = [
	    { name: 'Cali Roll', fish: 'Crab', tastiness: 2 },
	    { name: 'Philly', fish: 'Tuna', tastiness: 4 },
	    { name: 'Tiger', fish: 'Eel', tastiness: 7 },
	    { name: 'Rainbow', fish: 'Variety', tastiness: 6 }
	  ];

	  $scope.messageData = {};

	  var client_email = '';

        
	var init = function (client_email) {
	   
			};

	init();

	$scope.reverse = true;
	
	// Load exisiting messages
	$http.get('/api/messages')
		.success(function(data){
			$scope.messages = data;
			console.log('these are all the messages',$scope.messages);
        	})
		.error(function(data){
			console.log('couldn\'t load data');
			});




    $scope.submitMessage = function(messageData){
        console.log('message submitted');
        console.log('This is the messageData object:',messageData);
        var date = new Date();

        var data = {message_sent_date: date, msg: $scope.messageData.message, user: $scope.client_email};
        console.log('this is the submitmessage object',data);
         socket.emit('send message', data);

         // Saving to DB via routes.js
         $http.post('/api/newmessage', $scope.messageData)
			.success(function(data) {
				 $scope.messageData = {};
		 // clear the form so our user is ready to enter another		
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
    };


       
        socket.on('new message', function(data){
            $scope.chatMessages = data;

            // chat.append($("<div class='well'><strong>hello</strong>" 
            //     + data.user +"</strong>: "
            //     + data.msg + "</div>"));
        });


        socket.on('get users', function(data){
        	$scope.onlineUsers = data;
        });
     



	          

// Original controller below here:
	$scope.formData = {};

	$(function(){
    var $select = $(".1-100");
    // $select.prepend("<option value='allTime'>Always</option>");
    for (i=1;i<=100;i++){
     	   $select.append($("<option value='i'></option>").val(i).html("Last "+i+" Days"))
   		 }
   		 
	});

	// Hiç bir şeye basılmadığında yani direk site açılğında router.js içerisine direk get methoduna gidiyor . 
	$http.get('/api/todos')
		.success(function(data) {
			$scope.gonderi = data;
			console.log($scope.gonderi.length,'veri geldi')
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});




	$scope.createTodo = function() { 
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.gonderi = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	

	// Creating the initial iframe on page load

	var baseurl = 'https://meta-g.herokuapp.com/public/dashboard/7431c8e3-542e-4d21-a664-1abeccbac880';
	// var baseurl = 'https://meta-g.herokuapp.com/public/question/b71f7fda-4dfd-419e-b4ff-1b3418d1c147'
	var selectedCampaign = '';
	var selectedUser = '';
	var newurl = '';
	var newesturl = '';
	$scope.url = '';
	

	// Reset any or all of the 3 variable
	$scope.resetCampaign = function(){
        delete $scope.selectedCampaign;
	};

	$scope.resetUser = function(){
        delete $scope.selectedUser;
	};	

	$scope.resetDay = function(){
        delete $scope.selectedDay;
	};

	// How to add option to beginning of dropdown menu
	 // var select = $document[0].getElementById('1-100');
 	//  var opt = new Option('All Time', 'my-option');
 	//  select.insertBefore(opt, select.firstChild);
 	//  select.prepend("<option value='' disabled selected>Choose Time</option>");


	$http.get('/api/user')
		.success(function(data){
			$scope.kullanici = data;
			$scope.access_code = data[0].client_analytics_code;
     		$scope.client_id = data[0].client_id;
     		$scope.client_email = data[0].client_email;
			console.log('username submitted');
    		var usersocket = {person: $scope.client_email};
		    console.log('tis is the submit user data object', usersocket)
		    socket.emit('new user', usersocket);

			var access_code = $scope.access_code;
			console.log("These are the user's details",data);
			
	        console.log('This is the analytics code:',access_code);
			
			var newurl = baseurl.concat('?access_code=',access_code);
			console.log(newurl);
			
        	$scope.url = $sce.trustAsResourceUrl(newurl);

        	
        			})
		.error(function(data){
			
			});


		// function for replacing all occurences of a specific substring
	String.prototype.replaceAll = function(target, replacement) {
		  return this.split(target).join(replacement);
	};


	$scope.updateIframe = function() {
		var currentUrl = $sce.valueOf($scope.url);
		console.log('This is the url before anything changes',currentUrl);
         var access_code = $scope.access_code;
		 var newurl = baseurl.concat('?access_code=',access_code);

// campaign is selected, but not user or day
          if ((typeof $scope.selectedCampaign !== 'undefined') && (typeof $scope.selectedUser === 'undefined')
          			&& (typeof $scope.selectedDay === 'undefined') ) {
          	console.log('campaign is selected, but not user or day');
          	var selectedCampaign = $scope.selectedCampaign;
          	console.log('currently a campaign is selected');
          	var selectedCampaign = selectedCampaign.replaceAll('+', '%2B');
			var selectedCampaign = selectedCampaign.replaceAll('#', '%23');
			var newesturl = newurl.concat('&campaign_name=',selectedCampaign);
			
          }
// user is selected, but not campaign or day
          else if ((typeof $scope.selectedCampaign === 'undefined') && (typeof $scope.selectedUser !== 'undefined')
          			&& (typeof $scope.selectedDay === 'undefined')	) {
          	console.log('user is selected, but not campaign or day');
          	var selectedUser = $scope.selectedUser;
          	console.log('currently, a user is selected');
          	var newesturl = newurl.concat('&user_name=',selectedUser);
          
          } 

// Day is selected, but not user or campaign
 	else if ((typeof $scope.selectedCampaign === 'undefined') && (typeof $scope.selectedUser === 'undefined')
          			&& (typeof $scope.selectedDay !== 'undefined')	) {
 			// if(typeof $scope.muchacho === 'undefined') {
 			// var select = $document[0].getElementById('1-100');
 			// var opt = new Option('All Time', 'my-option');
 			// select.insertBefore(opt, select.firstChild);
 			// $scope.muchacho = 'mister muchacho';
 			// 									}
          	console.log('Day is selected, but not user or campaign');
          	$scope.selectedDay = $(".1-100").find(":selected").val();// set this equal to scope.selected Day
          	var selectedDay = $scope.selectedDay;
          	console.log(selectedDay);
          	var newesturl = newurl.concat('&last_x_days=',selectedDay);
          	console.log(newesturl);
          } 


// User and campaign are selected, but not day
          else if ((typeof $scope.selectedCampaign !== 'undefined') && (typeof $scope.selectedUser !== 'undefined') 
          			&& (typeof $scope.selectedDay === 'undefined')	) {
          	console.log('User and campaign are selected, but not day');
          	var selectedCampaign = $scope.selectedCampaign;
          	console.log(selectedCampaign);
          	var selectedUser = $scope.selectedUser;
          	console.log(selectedUser);
          	var selectedCampaign = selectedCampaign.replaceAll('+', '%2B');
			var selectedCampaign = selectedCampaign.replaceAll('#', '%23');

			// var currentUrl = $sce.valueOf($scope.url);
			var newesturl = newurl.concat('&campaign_name=',selectedCampaign);
			var newesturl = newesturl.concat('&user_name=',selectedUser);
			$scope.url = $sce.trustAsResourceUrl(newesturl);
			// $scope.url = $sce.trustAsResourceUrl(newesturl);
			
          } 

// User and campaign are selected, but not day
          else if ((typeof $scope.selectedCampaign !== 'undefined') && (typeof $scope.selectedUser !== 'undefined') 
          			&& (typeof $scope.selectedDay === 'undefined')	) {
          	console.log('User and campaign are selected, but not day');
          	var selectedCampaign = $scope.selectedCampaign;
          	console.log(selectedCampaign);
          	var selectedUser = $scope.selectedUser;
          	console.log(selectedUser);
          	var selectedCampaign = selectedCampaign.replaceAll('+', '%2B');
			var selectedCampaign = selectedCampaign.replaceAll('#', '%23');

			// var currentUrl = $sce.valueOf($scope.url);
			var newesturl = newurl.concat('&campaign_name=',selectedCampaign);
			var newesturl = newesturl.concat('&user_name=',selectedUser);
			

		}

//Campaign and Day
		 else if ((typeof $scope.selectedCampaign !== 'undefined') && (typeof $scope.selectedUser === 'undefined') 
          			&& (typeof $scope.selectedDay !== 'undefined')	) {
		 	var selectedCampaign = $scope.selectedCampaign;
		 	$scope.selectedDay = $(".1-100").find(":selected").val();// set this equal to scope.selected Day
          	var selectedDay = $scope.selectedDay;
          	console.log(selectedDay);
          	var selectedCampaign = selectedCampaign.replaceAll('+', '%2B');
			var selectedCampaign = selectedCampaign.replaceAll('#', '%23');
          	var newurl = newurl.concat('&last_x_days=',selectedDay);
          	var newesturl = newurl.concat('&campaign_name=',selectedCampaign);
		 }

//User and Day
		 else if ((typeof $scope.selectedCampaign === 'undefined') && (typeof $scope.selectedUser !== 'undefined') 
          			&& (typeof $scope.selectedDay !== 'undefined')	) {
		 	var selectedUser = $scope.selectedUser;
		 	$scope.selectedDay = $(".1-100").find(":selected").val();// set this equal to scope.selected Day
          	var selectedDay = $scope.selectedDay;
          	var newesturl = newurl.concat('&last_x_days=',selectedDay);
		 	var newesturl = newesturl.concat('&user_name=',selectedUser);
		 }
// All 3
          else {
          	console.log('All 3 are selected');
          	var selectedUser = $scope.selectedUser;
		 	$scope.selectedDay = $(".1-100").find(":selected").val();// set this equal to scope.selected Day
          	var selectedDay = $scope.selectedDay;
          	var selectedCampaign = $scope.selectedCampaign;
          	var selectedCampaign = selectedCampaign.replaceAll('+', '%2B');
			var selectedCampaign = selectedCampaign.replaceAll('#', '%23');
          	var newesturl = newurl.concat('&last_x_days=',selectedDay);
		 	var newesturl = newesturl.concat('&user_name=',selectedUser);
		 	var newesturl = newesturl.concat('&campaign_name=',selectedCampaign);
          }

          $scope.url = $sce.trustAsResourceUrl(newesturl);

	};


	// Populate client's campaigns in the dropdown
	$http.get('/api/campaigns')
		.success(function(data){
			$scope.campaigns = data;
			console.log('These are the camapaigns: ',data)
			})
			.error(function(data){
			});

	// Change the iframe based on the user's selected 'Past X Days'

	$scope.daySelected = function() {
		// var selectedUser = $scope.selectedUser;
		console.log('you ran the daySelected function');
		updateIframe();
	};


	// Change the iframe based on the user's selected LinkedIn user

	$scope.userSelected = function() {
		// var selectedUser = $scope.selectedUser;
		console.log('you ran the userSelected function');
		updateIframe();
	};



	// Change the iframe based on the user's selected campaigns

	$scope.campaignSelected = function() {
		  // var selectedCampaign = $scope.selectedCampaign;
		  console.log('you ran the campaignSelected function');
		  updateIframe();	       		
	};

	

	// Populate client's LinkedIn users in the dropdown
	$http.get('/api/users')
		.success(function(data){
			$scope.users = data;

			console.log("hey from users function in core.js!")
			console.log('These are the users: ',data)
			})
			.error(function(data){
			});



	
	$scope.addcomment = function(id) { 
		console.log("id"+id);
		$http.post('/api/comments/' + id, $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.comment = data;
				
				console.log(data,'kadar');
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	

	
	$scope.viewcomment=function(id){
		console.log("id"+id);
		$http.get('/api/viewcomments/'+ id, $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.comments = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	$scope.viewlikes=function(id){
		console.log("id"+id);
		$http.get('/api/viewlikes/'+ id, $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.likes = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
		
	$scope.likepost=function(id){
		console.log("id"+id);
		$http.get('/api/like/'+ id, $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.likes = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	


};

