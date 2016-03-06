(function(){
    var app = angular.module('solitaire', ['card', 'foundation', 'stock', 'waste']);

    app.controller('SolitaireGameController', ['Stock', 'Foundation', 'Waste', '$scope', function(Stock, Foundation, Waste, $scope) {
        var solitaireGameController = this;
        
        var stock = new Stock();
        this.waste = new Waste();

        this.stockHasCardsLeft = true;
        this.cardLookup = stock.cardLookup;

        this.showNextStockCard = function() {
            if (stock.topCard()) {
                stock.topCard().moveTo(this.waste);
            }
            else {
                while (this.waste.topCard()) {
                    this.waste.topCard().moveTo(stock);
                }
            }
            this.stockHasCardsLeft = stock.topCard() ? true : false;
        };

        var numberOfFoundations = 4;
        this.foundations = new Array(4);
        for (var i = 0; i < numberOfFoundations; i++) {
            this.foundations[i] = new Foundation(i);
        }

        this.piles = new Array(7);

        $scope.$on('cardDrop', function(event, data, bin) {
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
        });

        $scope.$on('cardDoubleClick', function(event, cardId) {
            var sgc = solitaireGameController;
            var card = sgc.cardLookup[cardId];
            for (var i = 0; i < sgc.foundations.length; i++) {
                if (card.moveTo(sgc.foundations[i])) {
                    break;
                }
            }
            $scope.$apply();
        });
    }]);
})();
