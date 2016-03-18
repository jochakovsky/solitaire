describe('waste', function() {
    beforeEach(function() {
        module('waste');
        module('card');
    });

    describe('Waste', function() {
        var Waste, Card, test, move;

        beforeEach(inject(function(_Waste_, _Card_) {
            Waste = _Waste_;
            Card = _Card_;
            test = new Waste();
            move = {
                cards: [],
                onMove: function() {},
                onReturn: function() {}
            }
            spyOn(move, 'onMove');
            spyOn(move, 'onReturn');
        }));

        it('should accept any card', function() {
            //test when empty
            var testCard1 = new Card(4, 'H');

            move.cards = [testCard1];
            expect(test.maybeAddCards(move)).toEqual(true);
            expect(move.onMove).toHaveBeenCalled();
            expect(move.onReturn).not.toHaveBeenCalled();
            expect(test.cards.length).toEqual(1);
            expect(test.cards[test.cards.length - 1]).toEqual(testCard1);

            //test when not empty
            move.onMove.calls.reset();
            move.onReturn.calls.reset();
            var testCard2 = new Card(2, 'C');
            move.cards = [testCard2];
            expect(test.maybeAddCards(move)).toEqual(true);
            expect(move.onMove).toHaveBeenCalled();
            expect(move.onReturn).not.toHaveBeenCalled();
            expect(test.cards.length).toEqual(2);
            expect(test.cards[test.cards.length - 1]).toEqual(testCard2);
        });

        it('should only allow the top card to be removed', function() {
            //set up waste with two cards
            var testCard1 = new Card(3, 'D'),
                testCard2 = new Card(9, 'C');
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
            //set up waste with two cards
            var testCard1 = new Card(3, 'D'),
                testCard2 = new Card(9, 'C');
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

            expect(nextRemoval).toThrow("Waste waiting for card removal to be completed.");

            moveReturn.onMove();
            expect(nextRemoval).not.toThrow();
        });
    });
});
