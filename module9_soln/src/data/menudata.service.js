(function () {
    'use strict';
    
    angular.module('data')
    .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$q', '$http']
    function MenuDataService($q, $http) {
        var service = this;

        service.getAllCategories = function() {
            console.log("fetching categories");

            var response = $http({
                method: "GET",
                url: "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json"
            });
            
            return response;
        }

        service.getItemsForCategory = function(categoryShortName) {
            console.log("fetching items for cat: "+ categoryShortName );
            var response = $http({
                method: "GET",
                url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/" + categoryShortName + ".json"
            });

            return response;
        }

    }
    })();
    