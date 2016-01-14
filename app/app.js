(function(){
    var app = angular.module('solitaire', [ ]);

    app.controller('SolitaireGameController', function(){
        this.deck = {
            active: "4h"
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
