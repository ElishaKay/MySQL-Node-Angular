var app = angular.module('blogapp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    // Either include your app_id here or later on boot

// BEGINNNING OF OLD COFIG

  $urlRouterProvider.otherwise('/koalablog/blog');

  $stateProvider.state('koalablog', {
    url: '/koalablog',
    templateUrl: 'blog/partial-home.html',
  })
  .state('koalablog.list', {
  	url: '/list',
  	templateUrl: 'blog/home-list.html',
  })
  .state('koalablog.blog', {
    url: '/blog',
    templateUrl: 'blog/blog-articles.ejs', 
  });

});

function mainController(){
	console.log("ran the main controller");
};