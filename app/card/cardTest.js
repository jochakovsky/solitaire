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
});
