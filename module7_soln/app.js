(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('customCurrency', customCurrencyFilterFactory)

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var itemBuyer = this;

        itemBuyer.buyList = ShoppingListCheckOffService.getToBuyList();

        itemBuyer.markBought = function(itemIndex) {
            ShoppingListCheckOffService.moveItem(itemIndex);
        }      
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'customCurrencyFilter'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var purchased = this;

        purchased.boughtList = ShoppingListCheckOffService.getBoughtList();

    }

    function ShoppingListCheckOffService() {
        var service = this;
        
        // List of to-buy and bought items
        var toBuyList = [
            {name: "Cookies", quantity: 10, pricePerItem: 0.50},
            {name: "Watter bottles", quantity: 3, pricePerItem: 0.85},
            {name: "Donuts", quantity: 5, pricePerItem: 1.00},
            {name: "Hot dogs", quantity: 4, pricePerItem: 1.50},
            {name: "Pizza", quantity: 2, pricePerItem: 7.00}
        ];
        var boughtList = [];

        service.moveItem = function(index) {
            var item = toBuyList.splice(index, 1)[0];
            boughtList.push(item);
            console.log(item);
            console.log(boughtList);
        }

        service.getToBuyList = function() {
            return toBuyList;
        }

        service.getBoughtList = function() {
            return boughtList;
        }

    }

    function customCurrencyFilterFactory() {
        return function(input) {
            return "$$$" + input.toFixed(2);
        }
    }

})();