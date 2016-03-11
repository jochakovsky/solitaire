(function() {
    var app = angular.module('waste', []);

    app.factory('Waste', ['Card', function(Card) {
        var Waste = function() {
            //end of array is top of waste
            this.cards = [];
        };

        Waste.prototype.empty = function() {
            var returnCards = this.cards;
            this.cards = [];
            return returnCards;
        };

        Waste.prototype.canAddCard = function(card) {
            return true;
        };

        Waste.prototype.addCard = function(card) {
            this.cards.push(card);
        };

        Waste.prototype.canRemoveCard = function(card) {
            return card == this.cards[this.cards.length - 1];
        };

        Waste.prototype.removeCard = function(card) {
            return this.cards.pop();
        };

        Waste.prototype.topCard = function() {
            return this.cards[this.cards.length - 1];
        };

        return Waste;
    }]);

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
