class App {
  constructor() {

    this.correctRate = 0;
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

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    this.to_Menu = this.to_Menu.bind(this);
    document.addEventListener('menu_open', this.to_Menu);

    this.start_Over = this.start_Over.bind(this);
    document.addEventListener('start_over', this.start_Over);

  }
  _onPresentOpened(event) {
    console.log(event.detail);
    this.chosen = event.detail;
    this.flashcards.show(this.chosen);
    this.menu.hide();

  }
  result(event) {
    console.log(event.detail);
    this.correctRate = event.detail;
    this.menu.hide();
    this.flashcards.hide();
    this.results.show();
  }
  to_Menu(event) {
    this.menu.show();
    this.flashcards.hide();
    this.results.hide();
    //javascript: history.go(0)
  }
  start_Over(event) {
    console.log('hi');
    if (this.correctRate == 100)
    {
      this.menu.hide();
      this.flashcards.show(this.chosen);
      this.results.hide();
    }
      //javascript: history.go(0)
    else {
      this.flashcards.show("redo");
      this.results.hide();
    }

  }


}



    //    this.flashcards.show();
    // Uncomment this pair of lines to see the "results" screen:
    //this.menu.hide();
    // this.results.show();
        //this.menu.hide();
    //this.flashcards = new FlashcardScreen(mainElement,this.chosen);
