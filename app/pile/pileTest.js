describe('pile', function() {
    beforeEach(function() {
        module('pile');
        module('card');
    });

    describe('Pile', function() {
        var Pile, Card, testEmpty, testWithCards, testWithOneCard, move;

        beforeEach(inject(function(_Pile_, _Card_) {
            Pile = _Pile_;
            Card = _Card_;
            testEmpty = new Pile();
            move = {
                cards: [],
                onMove: function() {},
                onReturn: function() {}
            }
            spyOn(move, 'onMove');
            spyOn(move, 'onReturn');

            testWithCards = new Pile();
            testWithCards.cards = [
                new Card(13, 'D'),
                new Card(12, 'S')
            ];

            testWithOneCard = new Pile();
            testWithOneCard.cards = [
                new Card(13, 'H')
            ];
        }));

        it('should not accept zero cards if it has zero cards', function() {
            expect(testEmpty.maybeAddCards(move)).toEqual(false);
            expect(move.onMove).not.toHaveBeenCalled();
            expect(move.onReturn).toHaveBeenCalled();
            expect(testEmpty.cards.length).toEqual(0);
        });

        it('should not accept zero cards if it has cards', function() {
            expect(testWithCards.maybeAddCards(move)).toEqual(false);
            expect(move.onMove).not.toHaveBeenCalled();
            expect(move.onReturn).toHaveBeenCalled();
            expect(testWithCards.cards.length).toEqual(2);
        });

        it('should accept a king if it has zero cards', function() {
            var testCard1 = new Card(13, 'H');
            move.cards = [
                testCard1
            ];
            expect(testEmpty.maybeAddCards(move)).toEqual(true);
            expect(move.onMove).toHaveBeenCalled();
            expect(move.onReturn).not.toHaveBeenCalled();
            expect(testEmpty.cards).toEqual([testCard1]);
        });

        it('should accept a valid sequence starting with a king if it has zero cards', function() {
            var testCard1 = new Card(13, 'C'),
                testCard2 = new Card(12, 'D');
            move.cards = [
                testCard1,
                testCard2
            ];
            expect(testEmpty.maybeAddCards(move)).toEqual(true);
            expect(move.onMove).toHaveBeenCalled();
            expect(move.onReturn).not.toHaveBeenCalled();
            expect(testEmpty.cards).toEqual([testCard1, testCard2]);

            //should also change the location of the cards
            expect(testCard1.location).toBe(testEmpty);
            expect(testCard2.location).toBe(testEmpty);
        });

        it('if empty, should reject an vaid sequence that doesnt start with a king', function() {
            var testCard1 = new Card(9, 'C'),
                testCard2 = new Card(8, 'D');
            move.cards = [
                testCard1,
                testCard2
            ];
            expect(testEmpty.maybeAddCards(move)).toEqual(false);
            expect(move.onMove).not.toHaveBeenCalled();
            expect(move.onReturn).toHaveBeenCalled();
            expect(testEmpty.cards.length).toEqual(0);
        });

        it('if empty, should reject a single non-king', function() {
            var testCard1 = new Card(9, 'C');
            move.cards = [
                testCard1
            ];
            expect(testEmpty.maybeAddCards(move)).toEqual(false);
            expect(move.onMove).not.toHaveBeenCalled();
            expect(move.onReturn).toHaveBeenCalled();
            expect(testEmpty.cards.length).toEqual(0);
        });

        it('if it has cards, should accept the next single card', function() {
            var testCard1 = new Card(11, 'D');
            move.cards = [
                testCard1
            ];
            expect(testWithCards.maybeAddCards(move)).toEqual(true);
            expect(move.onMove).toHaveBeenCalled();
            expect(move.onReturn).not.toHaveBeenCalled();
            expect(testWithCards.cards.length).toEqual(3);
            expect(testWithCards.cards[2]).toBe(testCard1);
        });

        it('if it has cards, should accept a continuing valid sequence', function() {
            var testCard1 = new Card(11, 'D'),
                testCard2 = new Card(10, 'S');

            move.cards = [
                testCard1,
                testCard2
            ];
            expect(testWithCards.maybeAddCards(move)).toEqual(true);
            expect(move.onMove).toHaveBeenCalled();
            expect(move.onReturn).not.toHaveBeenCalled();
            expect(testWithCards.cards.length).toEqual(4);
            expect(testWithCards.cards.slice(2, 4)).toEqual([
                testCard1,
                testCard2
            ]);
        });

        it('if it has cards, should reject a continuing invalid sequence', function() {
            var testCard1 = new Card(11, 'D'),
                testCard2 = new Card(11, 'S');

            move.cards = [
                testCard1,
                testCard2
            ];
            expect(testWithCards.maybeAddCards(move)).toEqual(false);
            expect(move.onMove).not.toHaveBeenCalled();
            expect(move.onReturn).toHaveBeenCalled();
            expect(testWithCards.cards.length).toEqual(2);
        });

        it('if it has cards, should reject a continuing invalid sequence, take 2', function() {
            var testCard1 = new Card(11, 'D'),
                testCard2 = new Card(10, 'H');

            move.cards = [
                testCard1,
                testCard2
            ];
            expect(testWithCards.maybeAddCards(move)).toEqual(false);
            expect(move.onMove).not.toHaveBeenCalled();
            expect(move.onReturn).toHaveBeenCalled();
            expect(testWithCards.cards.length).toEqual(2);
        });

        it('should allow the last card to be removed', function() {
            var ret = testWithCards.maybeRemoveCards(testWithCards.cards[1]);
            expect(ret.cards).toEqual(testWithCards.cards.slice(1, 2));
            expect(ret.cards.length).toEqual(1);
        });

        it('should allow the last card to be moved', function() {
            var ret = testWithCards.maybeRemoveCards(testWithCards.cards[1]);
            expect(ret.cards).toEqual(testWithCards.cards.slice(1, 2));
            expect(ret.cards.length).toEqual(1);

            var card = ret.cards[0];
            expect(testWithOneCard.maybeAddCards(ret)).toEqual(true);
            expect(testWithOneCard.cards.length).toEqual(2);
            expect(card.location).toBe(testWithOneCard);
            expect(testWithCards.cards.length).toEqual(1);
        });

        it('should allow all of the cards to be moved', function() {
            var ret = testWithCards.maybeRemoveCards(testWithCards.cards[0]);
            expect(ret.cards).toEqual(testWithCards.cards);
            expect(ret.cards.length).toEqual(2);

            expect(testEmpty.maybeAddCards(ret)).toEqual(true);
            expect(testEmpty.cards.length).toEqual(2);
            expect(testWithCards.cards.length).toEqual(0);
        });
    });
});
