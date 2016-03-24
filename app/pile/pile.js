(function() {
    var app = angular.module('pile', ['card']);

    app.factory('Pile', ['Card', function(Card) {
        var sampleCard = new Card();

        var Pile = function(faceDownCards, id) {
            var pile = this;

            if (faceDownCards) {
                pile.faceDownCards = faceDownCards.slice();
                pile.faceDownCards.forEach(function(card) {
                    card.location = pile;
                    card.faceUp = false;
                });
            }
            else {
                pile.faceDownCards = [];
            }

            pile.cards = [];
            pile.id = id;
            pile.lock = false;

            pile.revealCard();
        };

        Pile.prototype.revealCard = function() {
            if (this.faceDownCards.length > 0 && this.cards.length === 0) {
                var card = this.faceDownCards.pop();
                card.faceUp = true;
                this.cards.push(card);
            }
        }

        Pile.prototype.maybeRemoveCards = function(card) {
            var pile = this;

            if (pile.lock) {
                throw "pile waiting for card removal to be completed.";
            }

            var move = {
                cards: [],
                onMove: function() {},
                onReturn: function() {}
            };

            var cardIndex = pile.cards.indexOf(card);

            if (cardIndex >= 0) {
                pile.lock = true;
                move.cards = pile.cards.slice(cardIndex, pile.cards.length);
                move.onMove = function() {
                    if (cardIndex === 0) {
                        pile.cards = [];
                    }
                    else {
                        pile.cards = pile.cards.slice(0, cardIndex);
                    }
                    pile.lock = false;
                };
                move.onReturn = function() {
                    pile.lock = false;
                }
            }

            return move;
        }

        var cardsMeetPileCriteria = function(cards) {
            if (cards.length <= 1) {
                return true;
            }
            else {
                for (var i = 1; i < cards.length; i++) {
                    if (
                        (cards[i].isRed()
                            ? !cards[i - 1].isRed()
                            : cards[i - 1].isRed())
                        && (cards[i].rank === (cards[i - 1].rank - 1))) {
                        continue;
                    }
                    else {
                        return false;
                    }
                }
                return true;
            } 
        }

        Pile.prototype.maybeAddCards = function(move) {
            var pile = this;

            // Allow if:
            // 1) 'move' contains cards
            // 2) The resulting pile satisifes the pile criteria
            // 3) If moving to a pile with no cards, must start with king
            if (move.cards.length > 0
                && cardsMeetPileCriteria(pile.cards.concat(move.cards))
                && (move.cards[0].rank === sampleCard.maxRank
                    || pile.cards.length > 0)) {
                move.cards.forEach(function(card) {
                    card.location = pile;
                })
                pile.cards = pile.cards.concat(move.cards);
                move.onMove();
                return true;
            }
            else {
                move.onReturn();
                return false;
            }
        }

        return Pile;
    }]);

    app.directive('pile', function() {
        var link = function(scope, element, attrs) {
            $(element).droppable({
                drop: function(event, ui) {
                    scope.$emit('cardDrop', ui.draggable.attr("id"),
                        "pile-" + scope.pile.id);
                }
            });
        };

        return {
            link: link,
            replace: true,
            restrict: 'E',
            scope: {
                pile: '='
            },
            templateUrl: 'app/pile/pile.html'
        };
    });
})();
