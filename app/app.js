(function(){
    var app = angular.module('solitaire', ['card', 'foundation', 'stock']);

    app.controller('SolitaireGameController', ['Stock', 'Foundation', function(Stock, Foundation) {
        var stock = new Stock();
        this.activeCard = false;

        this.showNextStockCard = function() {
            stock.return(this.activeCard);
            this.activeCard = stock.draw();
        };

        var numberOfFoundations = 4;
        this.foundations = new Array(4);
        for (var i = 0; i < numberOfFoundations; i++) {
            this.foundations[i] = new Foundation(i);
        }

        this.piles = new Array(7);
    }]);
})();
