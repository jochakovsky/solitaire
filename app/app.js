(function(){
    var app = angular.module('solitaire', ['card', 'foundation']);

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
