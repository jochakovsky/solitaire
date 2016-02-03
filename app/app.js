(function(){
    // var suits = ['C', 'D', 'H', 'S'];
    // var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    var app = angular.module('solitaire', [ ]);

    app.directive('card', function() {
        return {
            restrict: 'E',
            templateUrl: 'card.html',
            scope: {
                card: '='
            },
            controller: ['$scope', function($scope) {
                $scope.filename = $scope.card.rank + $scope.card.suit;
            }]
        };
    });

    app.controller('SolitaireGameController', function() {
        this.deck = {
            activeCard: {
                rank: '4',
                suit: 'H'
            }
        };

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

    });
})();
