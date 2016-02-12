(function(){
    var app = angular.module('foundation', [ ]);

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

        return Foundation;
    });
})();
