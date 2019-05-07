// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;

    //this.to_Menu = this.to_Menu.bind(this);
    //this.show = this.show.bind(this);
    //this.hide = this.hide.bind(this);

    this.to_menu = containerElement.querySelector('.to-menu');
    this.to_menu.addEventListener('click',this.to_Menu);

    this.continue = containerElement.querySelector('.continue');
    this.continue.addEventListener('click',this._Continue);
    
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');
    console.log(numberCorrect + "fff" + numberWrong);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
  to_Menu(event)
  {
    document.dispatchEvent(new CustomEvent('menu_open'));
  }
  _Continue(event)
  {
    document.dispatchEvent(new CustomEvent('start_over'));
  }
}
