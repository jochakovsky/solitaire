(function() {
    var app = angular.module('waste', []);

    app.factory('Waste', ['Card', function(Card) {
        var Waste = function() {
            //end of array is top of waste
            this.cards = [];
            this.lock = false;
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

        Waste.prototype.maybeRemoveCards = function(card) {
            var waste = this;
            if (waste.lock) {
                throw "Waste waiting for card removal to be completed.";
            }

            var move = {
                cards: [],
                onMove: function() {},
                onReturn: function() {}
            };

            if (card == this.cards[this.cards.length - 1]) {
                waste.lock = true;
                move.cards.push(waste.cards[waste.cards.length - 1]);
                move.onMove = function() {
                    waste.cards.pop();
                    waste.lock = false;
                };
                move.onReturn = function() {
                    waste.lock = false;
                }
            }

            return move;
        }

        Waste.prototype.maybeAddCards = function(move) {
            if (move.cards.length === 1) {
                this.cards.push(move.cards[0]);
                move.cards[0].location = this;
                move.onMove();
                return true;
            }
            else {
                move.onReturn();
                return false;
            }
        }

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
