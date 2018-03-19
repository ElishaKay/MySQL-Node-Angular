// uncomment this line if the directive ends up working
// var app = angular.module('GXLeads', ['app.directives']);
var app = angular.module('KoalaCMS', ['ngAnimate','textAngular', 'ui.router',
    'KoalaCMS.services',
    'KoalaCMS.filters',
    'btford.socket-io',
    'ngIntercom' ])
 .value('fakeUser', {
    email: 'john.doe@example.com',
    name: 'JAKE sMIT',
    created_at: 45435430,
    user_id: '3248'
  })

  // inject your app_id anyway you like
  .constant('INTERCOM_APPID', 'brgsi84c')

  // Configure your $intercom module with appID
  .config(function($intercomProvider, INTERCOM_APPID, $stateProvider, $urlRouterProvider) {
    // Either include your app_id here or later on boot

// BEGINNNING OF OLD COFIG

  $urlRouterProvider.otherwise('/home/blog');

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'partial-home.html',
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
    .state('home.themes', {
    url: '/themes',
    templateUrl: 'themes',
    controller: 'themesController'  
  })
  .state('post', {
    url: '/post/:id',
    templateUrl: 'post',
    controller: 'postController'  
  })
  .state('home.contact', {
    url: '/contact',
    templateUrl: 'contact',  
  })
  .state('home.blog', {
    url: '/blog',
    templateUrl: 'blog', 
  })
  .state('blog', {
    url: '/blog-posts',
    templateUrl: 'blog/posts', 
  })
  // route to show our basic form (/form)
        .state('home.form', {
            url: '/form',
            templateUrl: 'form'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('home.form.profile', {
            url: '/profile',
            templateUrl: 'form-profile.html'
        })
        
        // url will be /form/interests
        .state('home.form.interests', {
            url: '/interests',
            templateUrl: 'form-interests.html'
        })
        
        // url will be /form/payment
        .state('home.form.payment', {
            url: '/payment',
            templateUrl: 'form-payment.html'
        });



// END OF OLD CONFIG

    $intercomProvider
      .appID(INTERCOM_APPID);

    // you can include the Intercom's script yourself or use the built in async loading feature
    $intercomProvider
      .asyncLoading(true)
  });

  app.run(function($intercom, fakeUser) {

  	var newUser = {
    email: 'kramer1346@gmail.com',
    name: 'Leeshy Kay Kapish',
    created_at: 45435430,
    user_id: '108',
    upgrade_request: true
  	};

    // boot $intercom after you have user data usually after auth success
    $intercom.boot(newUser); // app_id not required if set in .config() block

   	$intercom("boot", {
  			app_id: "brgsi84c"
		});
  });
  //          Intercom // you may use Intercom rather than $intercom


  app.factory('ClientService', function($rootScope, $http, socket){
    var Client = {};

   var clientPromise = $http.get('/api/user')
      .success(function(data){
        Client.data = data;
        if (Client.data[0].client_theme){
          $rootScope.myTheme = Client.data[0].client_theme;
        } else {
          $rootScope.myTheme = 'darkly';
        };
        var usersocket = {person: Client.data[0].client_email};
        console.log('this is the submit user data object', usersocket)
          socket.emit('new user', usersocket);  
      console.log("hey from users factory in core.js!");
      })
      .error(function(data){
    });

     return {Client: Client};

  });


  app.controller('mainController', function($rootScope, $scope, $http, socket, textAngularManager, $window, $intercom, fakeUser, ClientService) {

    $scope.formData = {};
    
    $scope.client = ClientService.Client;
    
    console.log('This is the $scope.client object',$scope.client);
    
    $scope.user = fakeUser;

    // Register listeners to $intercom using '.$on()' rather than '.on()' to trigger a safe $apply on $rootScope
    $intercom.$on('show', function() {
      $scope.showing = true; // currently Intercom onShow callback isn't working
    });
    $intercom.$on('hide', function() {
      $scope.showing = false;
    });

    $scope.show = function() {
      $intercom.show();
    };

    $scope.hide = function() {
      $intercom.hide();
    };

    $scope.update = function(user) {
        var newUser = {
    		email: 'wassupyoutubedevelopers@gmail.com',
   			name: 'YouTube Series',
    		created_at: 45435430,
    		user_id: '105'
  		};

      $intercom.update(newUser);
    };

	// Load exisiting messages
	$http.get('/api/messages')
		  .success(function(data){
			   $scope.messages = data;
			   console.log('these are all the messages',$scope.messages);
      })
		  .error(function(data){
			   console.log('couldn\'t load data');
	});


	$scope.messageData = {};


    $scope.submitMessage = function(messageData){
        
        console.log('message submitted');
        console.log('This is the messageData object:',messageData);
        var date = new Date();
        if ($scope.client.data[0].client_email){
          var poster = $scope.client.data[0].client_email;
        } else {  
          var poster = 'Visitor' 
        };
        var data = {message_sent_date: date, msg: $scope.messageData.message, user: poster};
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



    $scope.submitBlogPost = function(blogdata){
    	
    	  	
    	  $scope.version = textAngularManager.getVersion();
          $scope.versionNumber = $scope.version.substring(1);
          $scope.orightml = '';
          $scope.htmlcontent = $scope.orightml;
          $scope.disabled = false;

        console.log('blogPost submitted');
        console.log('This is the blogdata object:',blogdata);
        var date = new Date();
        var title = $scope.title;
        // socket.emit('send message', blogPostData);

         // Saving to DB via routes.js
        $http.post('/api/blogPostData', blogdata)
			       .success(function(data) {
				      delete $scope.htmlcontent.text;
              delete $scope.title;
		 // clear the form so our user is ready to enter another		
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
    };


       
        socket.on('new message', function(data){
            $scope.chatMessages = data;
            console.log("THis is a new chat-message", data);
            // chat.append($("<div class='well'><strong>hello</strong>" 
            //     + data.user +"</strong>: "
            //     + data.msg + "</div>"));
        });


        socket.on('get users', function(data){
        	$scope.onlineUsers = data;
        	console.log('these are the socket users',data);
        });
    
// Original controller below here:
	$scope.formData = {};
	$scope.blogdata = {};

});

function searchController($scope, $http){
	
    // Populate client's campaigns in the dropdown
    $http.get('/api/search')
        .success(function(data){
        $scope.blogposts = data;
        console.log('These are all of the blogposts ',data)
      })
      .error(function(data){
    });
	  
	  // Sort Columns
      $scope.sortType = 'title'; // set the default sorting type
      $scope.sortReverse = true;  // set the default sort order

      $scope.orderColumn = function (column){
          $scope.sortType = column;
          $scope.sortReverse = !$scope.sortReverse;
      };
};


function postController($scope, $http, $stateParams, $window){
	   // Getting stuff from URL
	  // get the id
	  $window.scrollTo(0,0);
    $scope.id = $stateParams.id;
    $scope.created_at = $stateParams.created_at; 

    $http.get('/api/blogpost/'+$scope.id)
      .success(function(data){
         $scope.blogpost = data[0];
         console.log('this the blogpost',$scope.blogpost);
      })
      .error(function(data){
         console.log('couldn\'t load data');
    });

};

function themesController($rootScope, $scope){
      // Set the user's bootswatch theme
    $scope.themes = ['cerulean',
                      'cosmo',
                      'cyborg',
                      'darkly',
                      'flatly',
                      'journal',
                      'lumen',
                      'paper',
                      'readable',
                      'sandstone',
                      'simplex',
                      'slate',
                      'spacelab',
                      'superhero',
                      'united',
                      'yeti'];

    $scope.chooseTheme = function(theme){
        $rootScope.myTheme = theme;
    };                

};

