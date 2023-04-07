(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);
    
    function FoundItemsDirective() {
        var ddo = {
            templateUrl:"foundItems.html",
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'foundList',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;
        
    }

    NarrowItDownController.$inject['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var foundList = this;

        foundList.searchTerm="";
        foundList.found = [];

        foundList.searchMenu = function(searchTerm) {
            // console.log(searchTerm);

            var promise = MenuSearchService.getMenu();

            promise.then(function (response) {
                console.log(response.data);
                foundList.found = MenuSearchService.getMatchedItems(response.data, searchTerm);
            })
            .catch(function(error) {
                console.log("promise error");
            });
            // menu.found = 
        }

        foundList.removeItem = function(itemIndex) {
            foundList.found = MenuSearchService.removeItem(itemIndex, foundList.found);
        }
    }

    MenuSearchService.$inject['$http'];
    function MenuSearchService($http) {
        var service = this;
        var menuList = [];
        var found = [];

        service.removeItem = function(itemIndex, found) {
            console.log("splicing index " + itemIndex);
            found.splice(itemIndex, 1);
            return found;
        }

        service.getMenu = function () {
            
            // clear lists
            menuList = [];
            found = [];

            // retrieve menu
            var response = $http({
                method: "GET",
                url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
            });

            return response;
        }

        service.getMatchedItems = function (menu, searchTerm) {

            var found = [];

            // construct menu list
            for(var cat in menu) {
                for(var item in menu[cat].menu_items) {
                    // console.log(menu[cat].menu_items[item]);
                    menuList.push(menu[cat].menu_items[item]);
                }
            }

            console.log(menuList.length + " total items in menu");
        
            // pull matched items into found list
            // console.log(searchTerm);
            for(var item in menuList) {
                if (menuList[item].description.toLowerCase().includes(searchTerm) 
                    || menuList[item].name.toLowerCase().includes(searchTerm)) {
                    found.push(menuList[item]);
                    // console.log("match found! : " + menuList[item].name);
                }
            }
            console.log(found.length + " filtered items");

            return found;
                
        }
    }

})();