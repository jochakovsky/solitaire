(function(){
    var app = angular.module('foundation', [ ]);

    app.factory('Foundation', function() {
        var Foundation = function(id) {
            this.cards = [];
            this.id = id;
            this.lock = false;
        };

        Foundation.prototype.maybeRemoveCards = function(card) {
            var foundation = this;
            if (foundation.lock) {
                throw "Foundation waiting for card removal to be completed.";
            }

            if (card == foundation.cards[foundation.cards.length - 1]) {
                foundation.lock = true;
                return {
                    cards: [foundation.cards[foundation.cards.length - 1]],
                    onMove: function() {
                        foundation.cards.pop();
                        foundation.lock = false;
                    },
                    onReturn: function() {
                        foundation.lock = false;
                    }
                }
            }
            else {
                return {
                    cards: [],
                    onMove: function() {},
                    onReturn: function() {}
                }
            }
        }

        Foundation.prototype.maybeAddCards = function(move) {
            if (move.cards.length === 1
                && (
                    (this.cards.length === 0
                        && move.cards[0].rank === move.cards[0].minRank)
                    || (this.cards.length > 0
                        && move.cards[0].rank === this.cards[this.cards.length - 1].rank + 1
                        && move.cards[0].suit === this.cards[this.cards.length - 1].suit))) {
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

        return Foundation;
    });

    app.directive('foundation', function() {
        var link = function(scope, element, attrs) {
            $(element).droppable({
                drop: function(event, ui) {
                    scope.$emit('cardDrop', ui.draggable.attr("id"),
                        "foundation-" + scope.foundation.id);
                }
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
