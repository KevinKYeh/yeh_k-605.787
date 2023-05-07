(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  service.currentUser = {};

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  service.registerUser = function (user) {
    console.log("registered " + user.firstname);
    service.currentUser = user;
  }
  
  service.getUser = function() {
    console.log("retrieving " + service.currentUser.firstname);
    return service.currentUser;
  }

  service.getDishInfo = function(dish) {
    console.log("checking validity of dish " + dish);
    var dishObj = service.parseDish(dish);
    console.log(ApiPath + '/menu_items/' + dishObj.shortName + '/menu_items/' + dishObj.number + '.json');
    return $http.get(ApiPath + '/menu_items/' + dishObj.shortName + '/menu_items/' + dishObj.number + '.json').then(function (response) {
      return response.data;
    });
  }

  service.parseDish = function(dish) {
    var shortNameReturn = "";
    var shortNameDone = false;
    var numberReturn = "";
    for(let i = 0; i < dish.length; i++) {
      if(dish[i].toUpperCase().match(/[A-Z]/) && !shortNameDone) {
        shortNameReturn += dish[i];
      } else if (shortNameReturn.length > 0 && !shortNameDone && dish[i].match(/[0-9]/)) {
        shortNameDone = true;
        numberReturn += dish[i];
      } else if (shortNameDone) {
        numberReturn += dish[i];
      }
    }

    if (!isNaN(numberReturn)) {
      numberReturn =Number(numberReturn) - 1;
    }
    return {
      shortName: shortNameReturn,
      number: numberReturn
    }
  }
}



})();
