describe('foundation', function() {
    beforeEach(module('foundation'));

    describe('Foundation', function() {
        var Foundation, Card, test;

        beforeEach(inject(function(_Foundation_) {
            Foundation = _Foundation_;
        }));

        beforeEach(inject(function(_Card_) {
            Card = _Card_;
        }));

        beforeEach(function() {
            test = new Foundation();
        });

        it('should only accept an Ace as the first card', function() {
            expect(test.addCard(new Card(4, 'H'))).toEqual(false);
            expect(test.cards.length).toBe(0);

            expect(test.addCard(new Card(1, 'H'))).toEqual(true);
            expect(test.cards.length).toBe(1);
        });

        it('should only accept cards of the same suit as the next card', function() {
            expect(test.addCard(new Card(1, 'H'))).toEqual(true);
            expect(test.addCard(new Card(2, 'C'))).toEqual(false);
            expect(test.addCard(new Card(2, 'H'))).toEqual(true);
            expect(test.cards.length).toBe(2);
        });
    });
});
