import { shallowMount } from '@vue/test-utils';
import SingleDeck from '../../src/views/SingleDeck.vue'

describe('Testing SingleDeck Component Methods', () => {
    const wrapper = shallowMount(SingleDeck, {
        propsData: {
            emittedObject: {
                _id: "10938497987519739874", //fake id
                cards: [{cardFront:"spam",cardBack:"hool"},{cardFront:"neo",cardBack:"goo"},{cardFront:"foo",cardBack:"bar"}],
                deckName: "Javi"
            }
        }
    });

    it('correctly updates the index by 1 when updateCardIndex(1) is called', () => {
        wrapper.vm.updateCardIndex(1);  
        expect(wrapper.vm.cardsListIndex).toBe(1); 
    })

    it('correctly updates the index by -1 when updateCardIndex(-1) is called', () => {
        wrapper.vm.updateCardIndex(-1);  
        expect(wrapper.vm.cardsListIndex).toBe(0); 
    })

    it('correctly updates the index by -2 when updateCardIndex(-1) is called twice', () => {
        wrapper.vm.updateCardIndex(-1); 
        wrapper.vm.updateCardIndex(-1);
        expect(wrapper.vm.cardsListIndex).toBe(1); 
    })

    it('correctly updates the index by 2 when updateCardIndex(1) is called twice', () => {
        wrapper.vm.updateCardIndex(1); 
        wrapper.vm.updateCardIndex(1);
        expect(wrapper.vm.cardsListIndex).toBe(0); 
    })

    it('correctly flips the card from front to back', () => {
        wrapper.vm.flipCard();
        expect(wrapper.vm.cardSide).toBe("Back");
    })

    it('correctly flips the card from back to front', () => {
        wrapper.vm.flipCard();
        expect(wrapper.vm.cardSide).toBe("Front");
    })

})