(function(){
    var app = angular.module('foundation', [ ]);

    app.factory('Foundation', function() {
        var Foundation = function(id) {
            this.cards = [];
            this.id = id;
        };

        Foundation.prototype.canAddCard = function(card) {
            if (this.cards.length == 0) {
                return card.rank == card.minRank;
            }
            else {
                return card.rank == this.topCard().rank + 1
                    && card.suit == this.topCard().suit;
            }
        };

        Foundation.prototype.addCard = function(card) {
            if (this.canAddCard(card)) {
                this.cards.push(card);
            }
        };

        Foundation.prototype.canRemoveCard = function(card) {
            return card == this.topCard();
        };

        Foundation.prototype.removeCard = function(card) {
            return this.cards.pop();
        };

        Foundation.prototype.topCard = function() {
            return this.cards[this.cards.length - 1];
        };

        return Foundation;
    });

    app.directive('foundation', function() {
        var link = function(scope, element, attrs) {
            element.on('dragover', function(event) {
                event.preventDefault();
            });

            element.on('drop', function(event) {
                event.preventDefault();
                scope.drop()(event.dataTransfer.getData("text"),
                    "foundation-" + scope.foundation.id);
            });
        };

        return {
            link: link,
            replace: true,
            restrict: 'E',
            scope: {
                foundation: '=',
                drop: '&'
            },
            templateUrl: 'app/foundation/foundation.html'
        };
    });
})();
