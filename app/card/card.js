(function(){
    var app = angular.module('card', [ ]);

    app.directive('card', function() {

        var link = function(scope, element, attrs) {
            element.on('dblclick', function(event) {
                scope.$emit('cardDoubleClick', scope.card.id);
            });

            $(element).draggable({
                revert: true,
                zIndex: 10
            });

            scope.class = function() {
                return scope.card.faceUp
                    ? scope.card.shortName()
                    : 'pcard-back';
            }
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
            this.faceUp = true;
        };

        Card.prototype.isRed = function() {
            return this.suit == 'D' || this.suit == 'H';
        };

        Card.prototype.minRank = 1;
        Card.prototype.maxRank = 13;
        Card.prototype.suits = ['C', 'D', 'H', 'S'];

        Card.prototype.shortName = function() {
            var name = 'pcard-';
            switch (this.rank) {
                case 1:
                    name += 'A';
                    break;
                case 11:
                    name += 'J';
                    break;
                case 12:
                    name += 'Q';
                    break;
                case 13:
                    name += 'K';
                    break;
                default:
                    name += this.rank;
            }
            name += this.suit;
            return name.toLowerCase();
        }

        return Card;
    });
})();
