// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;

    this.right = this.right.bind(this);
    this.word = new Array();
    this.def = new Array();
    this.index = 0;
    this.flashcardContainer = document.querySelector('#flashcard-container');
    this.card = null;
    this.cardNum = 1;
    document.addEventListener('right', this.right)

  }


  show(deckName) {
    this.containerElement.classList.remove('inactive');


    for (let i = 0; i < FLASHCARD_DECKS.length; i++) {
      if (FLASHCARD_DECKS[i].title == deckName) {
        for (let x in FLASHCARD_DECKS[i].words) {
          console.log("front:" + x);
          console.log("bakc:" + FLASHCARD_DECKS[i].words[x]);
          this.word[this.index] = x;
          this.def[this.index++] = FLASHCARD_DECKS[i].words[x];
          //const card = new Flashcard(flashcardContainer,x,FLASHCARD_DECKS[i].words[x] );
        }
      }
    }
    this.card = new Flashcard(this.flashcardContainer, this.word[0], this.def[0]);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
  right() {
    console.log("RIGHT");
    let parent = document.querySelector('#flashcard-container');
    let child = document.querySelector('.flashcard-box');
    if (child != null)
      parent.removeChild(child);
    //  const flashcardContainer = document.querySelector('#flashcard-container');
    const card2 = new Flashcard(this.flashcardContainer, this.word[this.cardNum], this.def[this.cardNum]);
    this.cardNum++;
    if (this.cardNum == this.word.length+1) {
      if (child != null)
      child = document.querySelector('.flashcard-box');
      parent.removeChild(child);

      document.dispatchEvent(new CustomEvent('result_open'));
    }
    
  }
}
