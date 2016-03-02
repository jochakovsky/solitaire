describe('card', function() {
    beforeEach(module('card'));
    beforeEach(module('card-templates'));

    describe('Card', function() {
        var Card;

        beforeEach(inject(function(_Card_) {
            Card = _Card_;
        }));

        it('accepts rank and suit in constructor', function() {
            var card = new Card(8, 'D');
            expect(card.rank).toEqual(8);
            expect(card.suit).toEqual('D');
        });

        it('has correct information on possible rank and suit values', function() {
            var card = new Card(2, 'C');

            //1 = ace
            expect(card.minRank).toEqual(1);

            //13 = king
            expect(card.maxRank).toEqual(13);

            expect(card.suits.length).toEqual(4);
            expect(card.suits).toContain('C');
            expect(card.suits).toContain('D');
            expect(card.suits).toContain('H');
            expect(card.suits).toContain('S');
        });
    });

    describe('cardFilename', function() {
        var Card, cardFilename;

        beforeEach(inject(function(_Card_) {
            Card = _Card_;
        }));

        beforeEach(inject(function(cardFilenameFilter) {
            cardFilename = cardFilenameFilter;
        }))

        it('should have the correct default filename', function() {
            expect(cardFilename(undefined)).toEqual('Joker1');
        });

        it('should treat aces correctly', function() {
            var card = new Card(1, 'H');
            expect(cardFilename(card)).toEqual('AH');
        });

        it('should treat face cards correctly', function() {
            var card = new Card(11, 'H');
            expect(cardFilename(card)).toEqual('JH');

            card = new Card(12, 'H');
            expect(cardFilename(card)).toEqual('QH');

            card = new Card(13, 'H');
            expect(cardFilename(card)).toEqual('KH');
        });

        it('should treat number cards correctly', function() {
            var card = new Card(8, 'C');
            expect(cardFilename(card)).toEqual('8C');
        });
    });

    describe('card element directive', function() {
        var $compile, $rootScope, scope;

        // Store references to $rootScope and $compile
        // so they are available to all tests in this describe block
        beforeEach(inject(function(_$compile_, _$rootScope_){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
        }));

        it('Replaces the element with the appropriate content', function() {
            // $rootScope.testCard = {rank: 4, suit: "H"};
            // Compile a piece of HTML containing the directive
            scope.testCard = {rank: 4, suit: "H"};
            var element = $compile("<card card=\"testCard\"></card>")(scope);
            
            // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
            scope.$digest();
            // Check that the compiled element contains the templated content
            expect(element.attr("class")).toContain("pcard-4h");
        });
    });
});
