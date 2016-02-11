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
            restrict: 'E',
            templateUrl: 'card.html',
            scope: {
                card: '='
            }
        };
    });

    app.factory('Card', function() {
        var Card = function(rank, suit) {
            this.rank = rank;
            this.suit = suit;
        }

        Card.prototype.minRank = 1;
        Card.prototype.maxRank = 13;
        Card.prototype.suits = ['C', 'D', 'H', 'S'];

        return Card;
    })

    app.factory('Stock', ['Card', function(Card) {
        Card.minRank = 1;
        Card.maxRank = 13;
        Card.suits = ['C', 'D', 'H', 'S'];
        var Stock = function() {
            //end of array is top of stock
            this.cards = [];
            // for (var rank = Card.minRank; rank <= Card.maxRank; rank++) {
            for (var rank = Card.minRank; rank <= 4; rank++) {
                Card.suits.forEach(function(suit) {
                    this.cards.push(new Card(rank, suit));
                }, this);
            }
            this.shuffle();
        }

        Stock.prototype.draw = function() {
            return this.cards.pop();
        }

        Stock.prototype.addToBottom = function(card) {
            this.cards.unshift(card);
        }

        Stock.prototype.shuffle = function() {
            this.cards = _.shuffle(this.cards);
        }

        return Stock;
    }]);

    app.controller('SolitaireGameController', ['Stock', function(Stock) {
        var stock = new Stock();
        this.activeCard = false;

        this.showNextStockCard = function() {
            var tempCard = stock.draw();
            if (this.activeCard) {
                stock.addToBottom(this.activeCard);
            }
            this.activeCard = tempCard;
            console.log(this.activeCard);
        }

        this.foundations = [
            {
                id: 0
            },
            {
                id: 1
            },
            {
                id: 2
            },
            {
                id: 3
            }
        ];

        this.piles = [
            {
                id: 0
            },
            {
                id: 1
            },
            {
                id: 2
            },
            {
                id: 3
            },
            {
                id: 4
            },
            {
                id: 5
            },
            {
                id: 6
            }
        ];
    }]);
})();
