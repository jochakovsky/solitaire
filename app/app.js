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
        'Card',
        '$scope',
        function(Stock, Foundation, Waste, Pile, Card, $scope) {
        var vm = this;

        var numberOfFoundations = 4;
        var numberOfPiles = 7;

        var sampleCard = new Card();
        var cardId = 0;
        vm.cardLookup = [];
        for (var rank = sampleCard.minRank; rank <= sampleCard.maxRank; rank++) {
            sampleCard.suits.forEach(function(suit) {
                vm.cardLookup[cardId] = (new Card(rank, suit, cardId, undefined));
                cardId++;
            });
        }

        var cardsToDeal = _.shuffle(vm.cardLookup.slice());

        //for now, all 52 cards go to the stock
        vm.stock = new Stock(cardsToDeal.splice(0, 52));
        vm.waste = new Waste();

        vm.foundations = new Array(numberOfFoundations);
        for (var i = 0; i < numberOfFoundations; i++) {
            vm.foundations[i] = new Foundation(i);
        }

        vm.piles = new Array(numberOfPiles);
        for (i = 0; i < numberOfPiles; i++) {
            vm.piles[i] = new Pile(i);
        }

        $scope.$on('cardDrop', function(event, data, bin) {
            var parsed = data.split('-');
            var dropObject = parsed[0];
            var dropId = parseInt(parsed[1]);

            parsed = bin.split('-');
            var binObject = parsed[0];
            var binId = parseInt(parsed[1]);

            if (dropObject != 'card') {
                throw "Invalid drop";
            }

            var card = vm.cardLookup[dropId];

            switch (binObject) {
                case 'foundation':
                    vm.foundations[binId].maybeAddCards(card.location.maybeRemoveCards(card));
                    break;
                case 'pile':
                    vm.piles[binId].maybeAddCards(card.location.maybeRemoveCards(card));
                    break;
                default:
                    throw "Invalid drop";
            }

            $scope.$apply();
        });

        $scope.$on('cardDoubleClick', function(event, cardId) {
            var card = vm.cardLookup[cardId];
            for (var i = 0; i < vm.foundations.length; i++) {
                if (vm.foundations[i].maybeAddCards(card.location.maybeRemoveCards(card))) {
                    break;
                }
            }
            $scope.$apply();
        });

        $scope.$on('drawCard', function(event, cardId) {
            // draw a card if there are cards left
            if (cardId === 'EMPTY') {
                var move = vm.waste.maybeRemoveCards(vm.waste.cards[0]);
                vm.stock.maybeAddCards(move);
            }
            // otherwise, move all of waste cards back to stock
            else {
                var card = vm.cardLookup[cardId];
                vm.waste.maybeAddCards(card.location.maybeRemoveCards(card));
            }

            $scope.$apply();
        });
    }]);
})();
