(function(){
    var app = angular.module('solitaire', ['card', 'foundation', 'stock']);

    app.controller('SolitaireGameController', ['Stock', 'Foundation', function(Stock, Foundation) {
        var stock = new Stock();
        this.waste = [];

        this.showNextStockCard = function() {
            var card = stock.draw();
            if (card) {
                this.waste.push(card);
            }
            else {
                stock.return(this.waste);
                this.waste = [];
            }
        };

        var numberOfFoundations = 4;
        this.foundations = new Array(4);
        for (var i = 0; i < numberOfFoundations; i++) {
            this.foundations[i] = new Foundation(i);
        }

        this.piles = new Array(7);
    }]);
})();
