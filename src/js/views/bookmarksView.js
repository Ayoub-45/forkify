import icons from '../../img/icons.svg';
import View from './view.js';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarked yet . Find a nice a recipe and bookmark it ;)`;
  _message = ``;
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');

  }
  addHandlerRender(handler){
    window.addEventListener('load',handler)
  }
  _generateMarkupPreview(result){
    return `
    <li class="preview">
            <a class="preview__link" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>
    `

  }
}
export default new BookmarksView();
