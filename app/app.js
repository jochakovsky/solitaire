(function(){
    var app = angular.module('solitaire', [ ]);

    app.filter('cardFilename', function() {
        return function(card) {
            var filename = '';
            if (card) {
                switch (card.rank) {
                    case 1:
                        filename += 'A';
                        break;
                    case 11:
                        filename += 'J';
                        break;
                    case 12:
                        filename += 'Q';
                        break;
                    case 13:
                        filename += 'K';
                        break;
                    default:
                        filename += card.rank;
                }
                filename += card.suit;
            }
            else {
                filename = "Joker1";
            }
            return filename;
        };
    });

    app.directive('card', function() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                card: '='
            },
            templateUrl: 'card.html'
        };
    });

    app.factory('Card', function() {
        var Card = function(rank, suit) {
            this.rank = rank;
            this.suit = suit;
        };

        Card.prototype.isRed = function() {
            return this.suit == 'D' || this.suit == 'H';
        };

        Card.prototype.minRank = 1;
        Card.prototype.maxRank = 13;
        Card.prototype.suits = ['C', 'D', 'H', 'S'];

        return Card;
    })

    app.factory('Stock', ['Card', function(Card) {
        var Stock = function() {
            var sampleCard = new Card();

            //end of array is top of stock
            this.cards = [];
            // for (var rank = Card.minRank; rank <= Card.maxRank; rank++) {
            for (var rank = sampleCard.minRank; rank <= 4; rank++) {
                sampleCard.suits.forEach(function(suit) {
                    this.cards.push(new Card(rank, suit));
                }, this);
            }
            this.shuffle();
        };

        Stock.prototype.draw = function() {
            return this.cards.pop();
        };

        Stock.prototype.addToBottom = function(card) {
            this.cards.unshift(card);
        };

        Stock.prototype.shuffle = function() {
            this.cards = _.shuffle(this.cards);
        };

        return Stock;
    }]);

    app.factory('Foundation', function() {
        var Foundation = function() {
            this.cards = [];
        };

        /**
         * Try to add a card to the top of the foundation. On success, return
         * true, else return false.
         * @param {[type]} card [description]
         */
        Foundation.prototype.addCard = function(card) {
            if (this.cards.length == 0) {
                if (card.rank == card.minRank) {
                    this.cards.push(card);
                }
                else {
                    return false;
                }
            }
            else {
                var lastCard = this.cards[this.cards.length - 1];
                if (card.rank == lastCard.rank + 1
                    && card.suit == lastCard.suit) {
                    this.cards.push(card);
                }
                else {
                    return false;
                }
            }
            return true;
        };


    });

    app.controller('SolitaireGameController', ['Stock', function(Stock) {
        var stock = new Stock();
        this.activeCard = false;

        this.showNextStockCard = function() {
            var tempCard = stock.draw();
            if (this.activeCard) {
                stock.addToBottom(this.activeCard);
            }
            this.activeCard = tempCard;
        };

        this.foundations = new Array(4);

        this.piles = new Array(7);
    }]);
})();
