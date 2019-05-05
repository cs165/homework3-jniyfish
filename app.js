// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {

    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);
    this._onPresentOpened = this._onPresentOpened.bind(this);
    document.addEventListener('present-opened', this._onPresentOpened);
    this.chosen = "";
    this.menu.show();


    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    this.result = this.result.bind(this);
    document.addEventListener('result_open', this.result);
    //this.menu.hide();
    //this.flashcards = new FlashcardScreen(mainElement,this.chosen);
    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    this.to_Menu = this.to_Menu.bind(this);
    document.addEventListener('menu_open', this.to_Menu);
    //    this.flashcards.show();
    // Uncomment this pair of lines to see the "results" screen:
    //this.menu.hide();
    // this.results.show();
  }
  _onPresentOpened(event) {
    console.log(event.detail);
    this.chosen = event.detail;
    this.flashcards.show(this.chosen);
    this.menu.hide();

  }
  result(event) {
    this.menu.hide();
    this.flashcards.hide();
    this.results.show();
  }
  to_Menu(event) {
    //   this.menu.show();
    //   this.flashcards.hide();
    //   this.results.hide();
    javascript: history.go(0)
  }


}
