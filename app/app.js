(function(){
    var app = angular.module('solitaire', [
        'card',
        'foundation',
        'stock',
        'templates',
        'waste',
        'pile'
    ]);

    app.controller('SolitaireGameController', [
        'Stock',
        'Foundation',
        'Waste',
        'Pile',
        '$scope',
        function(Stock, Foundation, Waste, Pile, $scope) {
        var solitaireGameController = this;
        var numberOfFoundations = 4;
        var numberOfPiles = 7;
        
        this.stock = new Stock();
        this.waste = new Waste();
        this.cardLookup = this.stock.cardLookup;

        
        this.foundations = new Array(numberOfFoundations);
        for (var i = 0; i < numberOfFoundations; i++) {
            this.foundations[i] = new Foundation(i);
        }

        this.piles = new Array(numberOfPiles);
        for (i = 0; i < numberOfPiles; i++) {
            this.piles[i] = new Pile(i);
        }

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
                    sgc.foundations[binId].maybeAddCards(card.location.maybeRemoveCards(card));
                    break;
                case 'pile':
                    sgc.piles[binId].maybeAddCards(card.location.maybeRemoveCards(card));
                    break;
                default:
                    throw "Invalid drop";
            }

            $scope.$apply();
        });

        $scope.$on('cardDoubleClick', function(event, cardId) {
            var sgc = solitaireGameController;
            var card = sgc.cardLookup[cardId];
            for (var i = 0; i < sgc.foundations.length; i++) {
                if (sgc.foundations[i].maybeAddCards(card.location.maybeRemoveCards(card))) {
                    break;
                }
            }
            $scope.$apply();
        });

        $scope.$on('drawCard', function(event, cardId) {
            var sgc = solitaireGameController;
            // draw a card if there are cards left
            if (cardId === 'EMPTY') {
                var move = sgc.waste.maybeRemoveCards(sgc.waste.cards[0]);
                sgc.stock.maybeAddCards(move);
            }
            // otherwise, move all of waste cards back to stock
            else {
                var card = sgc.cardLookup[cardId];
                sgc.waste.maybeAddCards(card.location.maybeRemoveCards(card));
            }

            $scope.$apply();
        });
    }]);
})();
