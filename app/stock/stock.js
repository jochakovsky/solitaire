(function() {
    var app = angular.module('stock', ['card']);

    app.factory('Stock', ['Card', function(Card) {
        var Stock = function() {
            var sampleCard = new Card();

            //end of array is top of stock
            this.cards = [];

            var cardId = 0;
            // for (var rank = Card.minRank; rank <= Card.maxRank; rank++) {
            for (var rank = sampleCard.minRank; rank <= 4; rank++) {
                sampleCard.suits.forEach(function(suit) {
                    this.cards[cardId] = (new Card(rank, suit, cardId, this));
                    cardId++;
                }, this);
            }
            this.cardLookup = this.cards.slice();
            this.cards = _.shuffle(this.cards);

            this.lock = false;
        };

        Stock.prototype.canAddCard = function(card) {
            return true;
        };

        Stock.prototype.addCard = function(card) {
            this.cards.push(card);
        };

        Stock.prototype.canRemoveCard = function(card) {
            return this.cards.length > 0;
        };

        Stock.prototype.removeCard = function(card) {
            return this.cards.pop();
        };

        Stock.prototype.topCard = function() {
            return this.cards[this.cards.length - 1];
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

            if (card == this.cards[this.cards.length - 1]) {
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

    app.directive('stock', function() {

        var link = function(scope, element, attrs) {
            element.on('click', function(event) {
                var cards = scope.stock.cards;
                scope.$emit('drawCard', cards.length > 0
                    ? cards[cards.length - 1].id
                    : 'EMPTY');
            });
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
    });
})();
