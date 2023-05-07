(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MenuService'];
function MyInfoController(MenuService) {
  var myInfoCtrl = this;
  myInfoCtrl.user = MenuService.getUser();
  if (myInfoCtrl.user.firstname != null ) {
    myInfoCtrl.user.dishCat = MenuService.parseDish(myInfoCtrl.user.dish).shortName;
    MenuService.getDishInfo(myInfoCtrl.user.dish).then(function (response) {
      myInfoCtrl.user.dishInfo = response;
      console.log(myInfoCtrl.user.dishInfo);
    });
    
  } 
}

})();
