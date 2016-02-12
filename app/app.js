(function(){
    var app = angular.module('solitaire', ['card', 'foundation', 'stock']);

    app.controller('SolitaireGameController', ['Stock', function(Stock) {
        var stock = new Stock();
        this.activeCard = false;

        this.showNextStockCard = function() {
            var tempCard = stock.draw();
            if (this.activeCard) {
                stock.addToBottom(this.activeCard);
            }
            this.activeCard = tempCard;
        };

        this.foundations = new Array(4);

        this.piles = new Array(7);
    }]);
})();
