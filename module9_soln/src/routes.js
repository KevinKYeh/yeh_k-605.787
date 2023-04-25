(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider']
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // categories page
  .state('categories', {
    url: '/all-categories',
    templateUrl: 'src/templates/all-categories.template.html',
    controller: 'CategoriesController as categoryList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories().then(function (response) {
          return response.data;
        });
      }]
    }
  })


  // items page
  .state('items', {
    url: '/categories/{catShortName}/items',
    templateUrl: 'src/templates/category-items.template.html',
    controller: 'ItemsController as itemList',
    resolve: {
      items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
        console.log("getting items for: " + $stateParams.catShortName);
        return MenuDataService.getItemsForCategory($stateParams.catShortName).then(function (response) {
          return response.data;
        });
      }]
    }
  })

}

})();
