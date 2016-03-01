(function() {
    var app = angular.module('stock', ['card']);

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
            // if (this.cards.length == 0) {
            //     this.cards = this.returnedCards.reverse();
            //     this.returnedCards = [];
            //     return null;
            // }
            // else {
            //     var drawnCards = [];
            //     while (num > 0 && this.cards.length > 0) {
            //         drawnCards.push(this.cards.pop());
            //     }
            //     return drawnCards;
            // }
            return this.cards.pop();
        };

        Stock.prototype.return = function(waste) {
            if (this.cards.length == 0) {
                this.cards = waste.reverse();
            }
        };

        Stock.prototype.shuffle = function() {
            this.cards = _.shuffle(this.cards);
        };

        return Stock;
    }]);
})();