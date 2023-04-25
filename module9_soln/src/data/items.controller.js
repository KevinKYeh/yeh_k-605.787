(function () {
    'use strict';
    
    angular.module('data')
    .controller('ItemsController', ItemsController);
    
    ItemsController.$inject = ['MenuDataService', 'items']
    function ItemsController(MenuDataService, items) {
      var itemList = this;
      itemList.items = items.menu_items;
      itemList.category = items.category;
    }
    
    })();
    