(function() {
    var app = angular.module('stock', ['card']);

    app.factory('Stock', ['Card', function(Card) {
        var Stock = function(cards) {
            var stock = this;
            //end of array is top of stock
            stock.cards = cards.slice();
            stock.cards.forEach(function(card) {
                card.location = stock;
            });
            stock.lock = false;
        };

        Stock.prototype.maybeRemoveCards = function(card) {
            var stock = this;
            if (stock.lock) {
                throw "stock waiting for card removal to be completed.";
            }

            var move = {
                cards: [],
                onMove: function() {},
                onReturn: function() {}
            };

            if (card === this.cards[this.cards.length - 1]) {
                stock.lock = true;
                move.cards.push(stock.cards[stock.cards.length - 1]);
                move.onMove = function() {
                    stock.cards.pop();
                    stock.lock = false;
                };
                move.onReturn = function() {
                    stock.lock = false;
                }
            }

            return move;
        }

        Stock.prototype.maybeAddCards = function(move) {
            var stock = this;

            if (stock.cards.length === 0
                && move.cards.length > 0) {
                stock.cards = move.cards.slice().reverse();
                stock.cards.forEach(function(card) {
                    card.location = stock;
                })
                move.onMove();
                return true;
            }
            else {
                move.onReturn();
                return false;
            }
        }

        return Stock;
    }]);

    app.directive('stock', ['$document', function($document) {


        var link = function(scope, element, attrs) {
            function drawCard() {
                var cards = scope.stock.cards;
                scope.$emit('drawCard', cards.length > 0
                    ? cards[cards.length - 1].id
                    : 'EMPTY');
            }

            $document.bind('keydown', function($event) {
                if ($event.key === ' ') {
                    drawCard();
                    $event.preventDefault();
                }
            });
            element.on('click', drawCard);
        };

        return {
            link: link,
            replace: true,
            restrict: 'E',
            scope: {
                stock: '='
            },
            templateUrl: 'app/stock/stock.html'
        };
    }]);
})();
