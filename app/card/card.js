(function(){
    var app = angular.module('card', [ ]);

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

        var link = function(scope, element, attrs) {
            element.on('dblclick', function(event) {
                scope.$emit('cardDoubleClick', scope.card.id);
            });

            $(element).draggable({
                revert: true,
                zIndex: 10
            });
        };

        return {
            link: link,
            replace: true,
            restrict: 'E',
            scope: {
                card: '='
            },
            templateUrl: 'app/card/card.html'
        };
    });

    app.factory('Card', function() {
        var Card = function(rank, suit, id, location) {
            this.rank = rank;
            this.suit = suit;
            this.id = id;
            this.location = location;
        };

        Card.prototype.isRed = function() {
            return this.suit == 'D' || this.suit == 'H';
        };

        Card.prototype.minRank = 1;
        Card.prototype.maxRank = 13;
        Card.prototype.suits = ['C', 'D', 'H', 'S'];

        return Card;
    });
})();
