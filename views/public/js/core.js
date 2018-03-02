// uncomment this line if the directive ends up working
// var app = angular.module('GXLeads', ['app.directives']);
var app = angular.module('KoalaCMS', ['textAngular', 'ui.router',
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
  .state('post', {
    url: '/post/:id/:created_at',
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
  //                                       Intercom // you may use Intercom rather than $intercom


  app.controller('mainController', function($scope, $http, socket, textAngularManager, $window, $intercom, fakeUser, ClientService) {

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

        var data = {message_sent_date: date, msg: $scope.messageData.message, user: $scope.client.data[0].client_email};
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
          $scope.orightml = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><img class="ta-insert-video" ta-insert-video="http://www.youtube.com/embed/2maA1-mvicY" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/></p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE9+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p><h4>Supports non-latin Characters</h4><p>昮朐 魡 燚璒瘭 譾躒鑅, 皾籈譧 紵脭脧 逯郹酟 煃 瑐瑍, 踆跾踄 趡趛踠 顣飁 廞 熥獘 豥 蔰蝯蝺 廦廥彋 蕍蕧螛 溹溦 幨懅憴 妎岓岕 緁, 滍 蘹蠮 蟷蠉蟼 鱐鱍鱕, 阰刲 鞮鞢騉 烳牼翐 魡 骱 銇韎餀 媓幁惁 嵉愊惵 蛶觢, 犝獫 嶵嶯幯 縓罃蔾 魵 踄 罃蔾 獿譿躐 峷敊浭, 媓幁 黐曮禷 椵楘溍 輗 漀 摲摓 墐墆墏 捃挸栚 蛣袹跜, 岓岕 溿 斶檎檦 匢奾灱 逜郰傃</p>';
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



app.factory('ClientService', function($http, socket){
	var Client = {};

	$http.get('/api/user')
		.success(function(data){
			Client.data = data;
			var usersocket = {person: Client.data[0].client_email};
		    console.log('this is the submit user data object', usersocket)
		    socket.emit('new user', usersocket);	
		console.log("hey from users factory in core.js!");
		})
		.error(function(data){
	});

   return {Client: Client};

});

// end of router
// Beginning of controller

function searchController($scope, $http){
	
    // Populate client's campaigns in the dropdown
    $http.get('/api/search')
        .success(function(data){
        $scope.blogposts = data;
        console.log('These are all of the apps users: ',data)
      })
      .error(function(data){
    });
	  
    // Filter by column user chooses from dropdown
	  $scope.filterType	= 'client_id';

	  // Sort Columns
      $scope.sortType = ''; // set the default sorting type
      $scope.sortReverse = false;  // set the default sort order

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

