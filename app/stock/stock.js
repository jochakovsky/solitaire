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
            this.cardLookup = this.cards;
            this.shuffle();
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

        Stock.prototype.shuffle = function() {
            this.cards = _.shuffle(this.cards);
        };

        return Stock;
    }]);
})();
