describe('card', function() {
    beforeEach(module('card'));

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
});
