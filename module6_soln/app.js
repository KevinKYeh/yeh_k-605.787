(function () {
'use strict'

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];
function LunchCheckController($scope, $filter) {
    $scope.message = "";
    $scope.status = 0;
    $scope.lunchList = "";
    $scope.styleMod = "";
    $scope.borderStyleMod = ""

    $scope.checkList = function () {
        var lunchList = $scope.lunchList.split(',');
        console.log("before: " + lunchList);

        lunchList = $scope.cleanList(lunchList);
        console.log("after: " + lunchList);

        $scope.evalMessage(lunchList);
    }

    $scope.cleanList = function(list) {
        // console.log(list.length);

        // iterate through each list element
        for (var i = 0 ; i < list.length; i++) {
            // console.log("list element " + i + "-> before: " + list[i] + " / after: " + list[i].replace(new RegExp(' ', "g"), ''));
           
            // if empty after removing spaces, remove from list
            if (list[i].replace(new RegExp(' ', "g"), '') === "" ) {
                // console.log("splicing " + list[i]);
                list.splice(i,1);
                i--;
            }
        }
        return list;
    }

    // evaluate based off list length
    $scope.evalMessage = function(list) {
        if (list.length < 1) {
            $scope.message = "Please enter data first";
            $scope.setRed();
        } else if (list.length > 3) {
            $scope.message = "Too much!";
            $scope.setGreen();
        } else {
            $scope.message = "Enjoy!";
            $scope.setGreen();
        }
    }

    $scope.setRed = function() {
        $scope.styleMod = "color: red;";
        $scope.borderStyleMod = "border-color: red;";
    }

    $scope.setGreen = function() {
        $scope.styleMod = "color: green;";
        $scope.borderStyleMod = "border-color: green;";
    }
}

})(); 