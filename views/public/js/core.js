// uncomment this line if the directive ends up working
// var app = angular.module('GXLeads', ['app.directives']);
var app = angular.module('GXLeads', ['textAngular', 'ui.router',
    'GXLeads.services',
    'GXLeads.filters',
    'btford.socket-io',
    'GXLeads.directives',
    'ngIntercom'
  ])
  .value('User', {
    email: 'kramer1346@gmail.com',
    name: 'Leesg Kay',
    created_at: 1234567890,
    user_id: '1'
  })// inject your app_id anyway you like
  .constant('INTERCOM_APPID', 'd0idn8ii')

  // Configure your $intercom module with appID
  .config(function($intercomProvider, INTERCOM_APPID) {
    // Either include your app_id here or later on boot
    $intercomProvider
      .appID(INTERCOM_APPID);

    // you can include the Intercom's script yourself or use the built in async loading feature
    $intercomProvider
      .asyncLoading(true)
  })
  .run(function($intercom, User) {
    // boot $intercom after you have user data usually after auth success
    $intercom.boot(fakeUser); // app_id not required if set in .config() block
  })
  //                                       Intercom // you may use Intercom rather than $intercom
  .controller('intercomController', function($scope, $intercom, User) {

    $scope.user = User;

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
      $intercom.update(user);
    };

  });


// Beginning of router

app.config(function($stateProvider, $urlRouterProvider) {


 
  $urlRouterProvider.otherwise('/home/chat');


  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'partial-home.html',
    controller: 'intercomController'
  })
  .state('home.chat', {
  	url: '/chat',
  	templateUrl: 'chat',
    controller: 'mainController'
  })
    .state('home.list2', {
    url: '/list2',
    templateUrl: 'home-list2.html',
    controller: 'mainController'

  })
    .state('home.community', {
    url: '/community',
    templateUrl: 'community',
    controller: 'mainController'

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
  })
  .state('home.contact', {
    url: '/contact',
    templateUrl: 'contact',
    controller: 'mainController'  
  })
  .state('home.blog', {
    url: '/blog',
    templateUrl: 'blog',
    controller: 'mainController'  
  });
});



// end of router
// Beginning of controller

function searchController($scope, $http){
	 
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


function mainController($scope, $http, socket, textAngularManager){
	 	  

		 var init = function (client_email) {
	 	  window.Intercom("boot", {
		  		app_id: "brgsi84c"
			});
		};

		init();
	  
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

	  var init = function (client_email) {};

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
        $scope.messageData = {};
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



    $scope.submitBlogPost = function(blogdata){
    	
    	  	
    	  $scope.version = textAngularManager.getVersion();
          $scope.versionNumber = $scope.version.substring(1);
          $scope.orightml = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><img class="ta-insert-video" ta-insert-video="http://www.youtube.com/embed/2maA1-mvicY" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/></p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE9+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p><h4>Supports non-latin Characters</h4><p>昮朐 魡 燚璒瘭 譾躒鑅, 皾籈譧 紵脭脧 逯郹酟 煃 瑐瑍, 踆跾踄 趡趛踠 顣飁 廞 熥獘 豥 蔰蝯蝺 廦廥彋 蕍蕧螛 溹溦 幨懅憴 妎岓岕 緁, 滍 蘹蠮 蟷蠉蟼 鱐鱍鱕, 阰刲 鞮鞢騉 烳牼翐 魡 骱 銇韎餀 媓幁惁 嵉愊惵 蛶觢, 犝獫 嶵嶯幯 縓罃蔾 魵 踄 罃蔾 獿譿躐 峷敊浭, 媓幁 黐曮禷 椵楘溍 輗 漀 摲摓 墐墆墏 捃挸栚 蛣袹跜, 岓岕 溿 斶檎檦 匢奾灱 逜郰傃</p>';
          $scope.htmlcontent = $scope.orightml;
          $scope.disabled = false;

        console.log('blogPost submitted');
        console.log('This is the blogdata object:',blogdata);
        var date = new Date();

        // var data = {message_sent_date: date, msg: $scope.messageData.message, user: $scope.client_email};
        // console.log('this is the submitmessage object',data);
         // socket.emit('send message', blogPostData);

         // Saving to DB via routes.js
         var blogdataobject = {html: blogdata}
         $http.post('/api/blogPostData', blogdataobject)
			.success(function(data) {
				delete $scope.htmlcontent.text;
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
	$scope.blogdata = {};

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
	

	// Populate client's LinkedIn users in the dropdown
	$http.get('/api/user')
		.success(function(data){
			$scope.client = data;
			
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

