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
                items: '<',
                onRemove: '&'
            },
            // controller: FoundItemsDirectiveController,
            // controllerAs: 'foundList',
            // bindToController: true
        };

        return ddo;
    }

    // function FoundItemsDirectiveController() {
    //     var list = this;
        
    // }

    NarrowItDownController.$inject ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;

        menu.searchTerm="";
        menu.found = [];

        menu.showFound = function() {
            console.log("hello");
            console.log(menu.found);
            for (item in menu.found) {
                console.log(item);
            }
        }

        menu.searchMenu = function(searchTerm) {
            // console.log(searchTerm);

            menu.found = MenuSearchService.getMatchedMenuItems(searchTerm);
        }

        menu.removeItem = function(itemIndex) {
            MenuSearchService.removeItem(itemIndex);
        }

        // MenuSearchService.getMatchedMenuItems();
    }

    MenuSearchService.$inject['$http'];
    function MenuSearchService($http) {
        var service = this;
        var menuList = [];
        var found = [];

        service.removeItem = function(itemIndex) {
            found.splice(itemIndex, 1);
        }

        service.getMatchedMenuItems = function (searchTerm) {
            
            // clear lists
            menuList = [];
            found = [];


            // retrieve menu
            var response = $http({
                method: "GET",
                url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
            });

            // construct menu list
            response.then(function(response) {
                var menu = response.data;
                // console.log(menu);
                // console.log(response.data);
                // console.log(response.data.B.menu_items);
                for(var cat in menu) {
                    for(var item in menu[cat].menu_items) {
                        // console.log(menu[cat].menu_items[item]);
                        menuList.push(menu[cat].menu_items[item]);
                    }
                }

                console.log(menuList.length + " total items in menu");
            })
            .then(function() {
                // console.log(searchTerm);
                for(var item in menuList) {
                    // console.log(menuList[item].description);
                    if (menuList[item].description.includes(searchTerm) 
                        || menuList[item].name.includes(searchTerm)) {
                        found.push(menuList[item]);
                        // console.log("match found! : " + menuList[item].name);
                    }
                }
                console.log(found.length + " filtered items");
                console.log(found);

                return found;
                
            });
        }
    }

})();