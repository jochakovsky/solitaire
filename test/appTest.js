describe('solitaire', function() {
    beforeEach(module('solitaire'));

    describe('Foundation', function() {
        var Foundation, Card;

        beforeEach(inject(function(_Foundation_) {
            Foundation = _Foundation_;
        }));

        beforeEach(inject(function(_Card_) {
            Card = _Card_;
        }));

        it('should only accept an Ace as the first card', function() {
            var test1, test2;
            test1 = new Foundation();
            expect(test1.addCard(new Card(4, 'H'))).toEqual(false);
            expect(test1.cards.length).toBe(0);
        });
    });
});
