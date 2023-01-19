import icons from '../img/icons.svg';
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    //Rendering spinner
    recipeView.renderSpinner();
    //Loading recipe
    await model.loadRecipe(id);
    resultsView.render(model.getSearchResultPage());
    bookmarksView.render(model.state.bookmarks);
    // 2)Rendering recipe
    //Test
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1)Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search results
    await model.loadSearchResults(query);
    // 3) Render results
    resultsView.render(model.getSearchResultPage());
    //4) Render the initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));
  //4) Render the initial pagination
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
  // Update the recipe view
};
const controlAddBookmark = function () {
  // Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // render recipe view
  recipeView.render(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    //show Loading spinner
    addRecipeView.renderSpinner();
    //Uploading the recipe
    await model.upLoadRecipe(newRecipe);
    //Render recipe
    recipeView.render(model.state.recipe);
    //success message
    addRecipeView.renderMessage();
    bookmarksView.render(model.state.bookmarks);
    //Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    window.history.back();
    //close the form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
    console.log(model.state.recipe);
  } catch (err) {
    console.log('🎆', err);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerUpdateServings(controlServings);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('Welcome');
};
init();
