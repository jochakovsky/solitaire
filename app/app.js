(function(){
    var app = angular.module('solitaire', ['card', 'foundation', 'stock']);

    app.controller('SolitaireGameController', ['Stock', 'Foundation', function(Stock, Foundation) {
        var stock = new Stock();
        this.activeCard = false;

        this.showNextStockCard = function() {
            var tempCard = stock.draw();
            if (this.activeCard) {
                stock.addToBottom(this.activeCard);
            }
            this.activeCard = tempCard;
        };

        var numberOfFoundations = 4;
        this.foundations = new Array(4);
        for (var i = 0; i < numberOfFoundations; i++) {
            this.foundations[i] = new Foundation(i);
        }

        this.piles = new Array(7);
    }]);
})();
