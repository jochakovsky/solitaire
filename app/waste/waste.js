(function() {
    var app = angular.module('waste', []);

    app.factory('Waste', function(Card) {
        var Waste = function() {
            //end of array is top of waste
            this.cards = [];
        };

        Waste.prototype.empty = function() {
            var returnCards = this.cards;
            this.cards = [];
            return returnCards;
        };

        Waste.prototype.addCard = function(card) {
            this.cards.push(card);
        };

        return Waste;
    });

    app.directive('waste', function() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                waste: '='
            },
            templateUrl: 'app/waste/waste.html'
        };
    });
})();
