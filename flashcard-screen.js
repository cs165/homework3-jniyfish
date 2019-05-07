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
    this.left = this.left.bind(this);

    this.deckName = '';

    this.correct = 0;
    this.wrong = 0;

    this.word = new Array();
    this.def = new Array();
    this.redo_word = new Array();
    this.redo_def = new Array();

    this.redo_index = 0;
    this.index = 0;
    this.flashcardContainer = document.querySelector('#flashcard-container');
    this.card = null;
    this.cardNum = 1;
    document.addEventListener('right', this.right);
    document.addEventListener('left', this.left);

  }


  show(deckName) {
    this.containerElement.classList.remove('inactive');
    this.deckName = deckName;
    if (deckName != 'redo') {         //first time
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
    else {    //correct rate != 100   
      this.redo_index = 0;
      this.word = new Array();     //reset wrong num and def and word
      this.def = new Array();
      this.wrong = 0;
      this.cardNum = 1;       
      let correctNum = document.querySelectorAll('.incorrect');
      correctNum[0].textContent = this.wrong;
      correctNum[1].textContent = this.wrong;
      for (let i = 0; i < this.redo_def.length; i++) {
        this.word[i] = this.redo_word[i];
        this.def[i] = this.redo_def[i];
      }
      this.card = new Flashcard(this.flashcardContainer, this.word[0], this.def[0]);
    }
    this.redo_word = new Array();
    this.redo_def = new Array();
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
  right() {
    console.log("RIGHT");

    let EndTimes = this.word.length + 1;
    
    this.correct++;
    let correctNum = document.querySelectorAll('.correct');
    correctNum[0].textContent = this.correct;
    correctNum[1].textContent = this.correct;
    let perNum = document.querySelector('.percent');
    let par = this.correct * (100) / ((this.correct + this.wrong))
    par = Math.round(par * 10) / 10;
    perNum.textContent = par;

    let parent = document.querySelector('#flashcard-container');
    let child = document.querySelector('.flashcard-box');
    if (child != null)
      parent.removeChild(child);

    this.card = new Flashcard(this.flashcardContainer, this.word[this.cardNum], this.def[this.cardNum]);
    this.cardNum++;
    if (this.cardNum == EndTimes) {
      if (child != null)
        child = document.querySelector('.flashcard-box');
      parent.removeChild(child);
      console.log(this.correct);

      let firstButton = document.querySelector('.continue');
      if (par < 100)
        firstButton.textContent = 'Continue';
      else
        firstButton.textContent = 'Start over?';

      document.dispatchEvent(new CustomEvent('result_open', { 'detail': par }));

    }

  }
  left() {
    console.log("LEFT");
    let EndTimes = this.word.length + 1;

    this.redo_def[this.redo_index] = this.def[this.cardNum - 1]
    this.redo_word[this.redo_index] = this.word[this.cardNum - 1];
    this.redo_index++;

    this.wrong++;
    let correctNum = document.querySelectorAll('.incorrect');
    correctNum[0].textContent = this.wrong;
    correctNum[1].textContent = this.wrong;
    let perNum = document.querySelector('.percent');
    let par = this.correct * (100) / ((this.correct + this.wrong))
    par = Math.round(par * 10) / 10;
    perNum.textContent = par;

    let parent = document.querySelector('#flashcard-container');
    let child = document.querySelector('.flashcard-box');
    if (child != null)
      parent.removeChild(child);

    this.card = new Flashcard(this.flashcardContainer, this.word[this.cardNum], this.def[this.cardNum]);
    this.cardNum++;
    if (this.cardNum == EndTimes) {
      if (child != null)
        child = document.querySelector('.flashcard-box');
      parent.removeChild(child);

      let firstButton = document.querySelector('.continue');
      if (par < 100)
        firstButton.textContent = 'Continue';

      document.dispatchEvent(new CustomEvent('result_open', { 'detail': par }));
    }

  }
}
