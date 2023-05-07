(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService'];
function SignUpController(MenuService) {
  var signUpCtrl = this;
  signUpCtrl.user = {
    validDish: false
  };

  signUpCtrl.submit = function () {
    signUpCtrl.completed = true;
    MenuService.registerUser(signUpCtrl.user);
  };

  signUpCtrl.checkUserDish = function() {
    var dish = signUpCtrl.user.dish.toUpperCase();
    var retDish = MenuService.getDishInfo(dish)
    .then( function(dish) {
      if (dish != null && Object.keys(dish).length==4) {
        console.log("success!");
        signUpCtrl.user.validDish = true;
      } else {
        signUpCtrl.user.validDish = false;
      }
    });
    // console.log(retDish);
    // if (retDish.length == 1) {
    //   console.log("Success")
    // }
    
  }
}

})();
