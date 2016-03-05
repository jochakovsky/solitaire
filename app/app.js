(function(){
    var app = angular.module('solitaire', ['card', 'foundation', 'stock', 'waste']);

    app.controller('SolitaireGameController', ['Stock', 'Foundation', 'Waste', function(Stock, Foundation, Waste) {
        var stock = new Stock();
        this.waste = new Waste();

        this.stockHasCardsLeft = true;
        this.cardLookup = stock.cardLookup;

        this.showNextStockCard = function() {
            var card = stock.draw();
            if (card) {
                this.waste.addCard(card);
            }
            else {
                stock.return(this.waste.empty());
            }
            this.stockHasCardsLeft = stock.cards.length > 0;
        };

        var numberOfFoundations = 4;
        this.foundations = new Array(4);
        for (var i = 0; i < numberOfFoundations; i++) {
            this.foundations[i] = new Foundation(i);
        }

        this.piles = new Array(7);

        var solitaireGameController = this;
        this.dropHandler = function(data, bin) {
            var sgc = solitaireGameController;

            var parsed = data.split('-');
            var dropObject = parsed[0];
            var dropId = parseInt(parsed[1]);

            parsed = bin.split('-');
            var binObject = parsed[0];
            var binId = parseInt(parsed[1]);

            if (dropObject != 'card') {
                throw "Invalid drop";
            }

            var card = sgc.cardLookup[dropId];

            switch (binObject) {
                case 'foundation':
                    card.moveTo(sgc.foundations[binId]);
                    break;
                default:
                    throw "Invalid drop";
            }
        };
    }]);
})();
