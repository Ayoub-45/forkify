import icons from '../../img/icons.svg';
import View from './view.js';
class PreviewView extends View {
  _parentElement = '';
  _errorMessage = `No recipes found for your query! Please try again ;`;
  _message = ``;
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(result) {
    return `
    <li class="preview">
            <a class="preview__link" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated ${
                  this._data.key ? '' : 'hidden'
                }">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
                </div>
                </div>
            </a>
          </li>
    `;
  }
}
export default new PreviewView();
