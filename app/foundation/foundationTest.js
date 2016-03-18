describe('foundation', function() {
    beforeEach(function() {
        module('foundation');
        module('card');
    });

    describe('Foundation', function() {
        var Foundation, Card, test;

        beforeEach(inject(function(_Foundation_, _Card_) {
            Foundation = _Foundation_;
            Card = _Card_;
            test = new Foundation;
            move = {
                cards: [],
                onMove: function() {},
                onReturn: function() {}
            }
            spyOn(move, 'onMove');
            spyOn(move, 'onReturn');
        }));

        it('should only accept an ace when empty', function() {
            var testCard1 = new Card(4, 'H');

            move.cards = [testCard1];
            expect(test.maybeAddCards(move)).toEqual(false);
            expect(test.cards.length).toEqual(0);
            expect(move.onMove).not.toHaveBeenCalled();
            expect(move.onReturn).toHaveBeenCalled();

            move.onMove.calls.reset();
            move.onReturn.calls.reset();
            testCard1 = new Card(1, 'H');
            move.cards = [testCard1];
            expect(test.maybeAddCards(move)).toEqual(true);
            expect(test.cards.length).toEqual(1);
            expect(test.cards[test.cards.length - 1]).toEqual(testCard1);
            expect(move.onMove).toHaveBeenCalled();
            expect(move.onReturn).not.toHaveBeenCalled();

        });

        it('should only accept the next card of the suit', function() {
            var testCard1 = new Card(1, 'C');

            move.cards = [testCard1];
            expect(test.maybeAddCards(move)).toEqual(true);
            expect(test.cards.length).toEqual(1);
            expect(test.cards[test.cards.length - 1]).toEqual(testCard1);

            var testCard2 = new Card(2, 'H');
            move.cards = [testCard2];
            expect(test.maybeAddCards(move)).toEqual(false);
            expect(test.cards.length).toEqual(1);

            testCard2 = new Card(2, 'C');
            move.cards = [testCard2];
            expect(test.maybeAddCards(move)).toEqual(true);
            expect(test.cards.length).toEqual(2);
            expect(test.cards[test.cards.length - 1]).toEqual(testCard2);
        })

        it('should only allow the top card to be removed', function() {
            //set up foundation with two cards
            var testCard1 = new Card(1, 'D'),
                testCard2 = new Card(2, 'D');
            move.cards = [testCard1];
            expect(test.maybeAddCards(move)).toEqual(true);
            move.cards = [testCard2];
            expect(test.maybeAddCards(move)).toEqual(true);
            expect(test.cards.length).toEqual(2);

            var moveReturn = test.maybeRemoveCards(testCard1);
            expect(moveReturn.cards.length).toEqual(0);

            moveReturn = test.maybeRemoveCards(testCard2);
            expect(moveReturn.cards.length).toEqual(1);
            expect(moveReturn.cards[moveReturn.cards.length - 1]).toEqual(testCard2);
        });

        it('should throw if another removal is pending', function() {
            //set up foundation with two cards
            var testCard1 = new Card(1, 'D'),
                testCard2 = new Card(2, 'D');
            move.cards = [testCard1];
            expect(test.maybeAddCards(move)).toEqual(true);
            move.cards = [testCard2];
            expect(test.maybeAddCards(move)).toEqual(true);
            expect(test.cards.length).toEqual(2);

            var moveReturn = test.maybeRemoveCards(testCard2);
            expect(moveReturn.cards.length).toEqual(1);

            var nextRemoval = function() {
                test.maybeRemoveCards(testCard1);
            }

            expect(nextRemoval).toThrow("Foundation waiting for card removal to be completed.");

            moveReturn.onMove();
            expect(nextRemoval).not.toThrow();
        });
    });
});
