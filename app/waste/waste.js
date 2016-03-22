(function() {
    var app = angular.module('waste', []);

    app.factory('Waste', ['Card', function(Card) {
        var Waste = function() {
            //end of array is top of waste
            this.cards = [];
            this.lock = false;
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

            if (waste.cards.length === 0 || !card) {
                return move;
            }

            if (card === waste.cards[waste.cards.length - 1]) {
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
            else if (card === waste.cards[0]) {
                waste.lock = true;
                move.cards = waste.cards.slice();
                move.onMove = function() {
                    waste.cards = [];
                    waste.lock = false;
                }
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
