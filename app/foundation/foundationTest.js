describe('foundation', function() {
    beforeEach(function() {
        module('foundation');
        module('card');
    });

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
            expect(test.canAddCard(new Card(4, 'H'))).toEqual(false);
            expect(test.canAddCard(new Card(1, 'H'))).toEqual(true);
        });

        it('should only accept cards of the same suit as the next card', function() {
            expect(test.canAddCard(new Card(1, 'H'))).toEqual(true);
            test.addCard(new Card(1, 'H'));
            expect(test.canAddCard(new Card(2, 'C'))).toEqual(false);
            expect(test.canAddCard(new Card(2, 'H'))).toEqual(true);
        });
    });
});
