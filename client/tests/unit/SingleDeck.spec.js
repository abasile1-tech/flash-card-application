import { shallowMount } from '@vue/test-utils';
import SingleDeck from '../../src/views/SingleDeck.vue'

describe('Testing SingleDeck Component Methods', () => {
    const wrapper = shallowMount(SingleDeck, {
        propsData: {
            emittedObject: {
                _id: "10938497987519739874", //fake id
                cards: [{cardFront:"spam",cardBack:"hool"},{cardFront:"neo",cardBack:"goo"}],
                deckName: "Javi"
            }
        }
    });

    // cardsListIndex is 0 now
    it('correctly updates the index by 1 when updateCardIndex is called', () => {
        wrapper.vm.updateCardIndex(1);  
        expect(wrapper.vm.cardsListIndex).toBe(1); 
    })
    // cardsListIndex is 1 now
    it('correctly updates the index by -1 when updateCardIndex is called', () => {
        wrapper.vm.updateCardIndex(-1);  
        expect(wrapper.vm.cardsListIndex).toBe(0); 
    })

    // cardsListIndex is 0 now
    it('correctly updates the index by 100 when updateCardIndex is called', () => {
        wrapper.vm.updateCardIndex(1);
        wrapper.vm.updateCardIndex(1);  
        expect(wrapper.vm.cardsListIndex).toBe(0); 
    })

})