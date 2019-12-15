//Global app controller

import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import * as SearchView from "./views/searchView";
import * as RecipeView from "./views/recipeView";
import * as ListView from "./views/listView";

import { elements, renderLoader, clearLoader } from "./views/base";

//Global State of the app
/*
 *- Search state
 *- Current recipe object
 *- Shopping list object
 *- Liked Recipes
 */

const state = {};

window.state = state;

const controlSearch = async () => {
  // 1. Get query from view
  const query = SearchView.getInput();
  if (query) {
    //2. New search object and add to state
    state.search = new Search(query);
    //3. Prepare UI for result

    SearchView.clearSearchField();
    SearchView.clearResList();
    renderLoader(elements.searchRes);
    try {
      //4. Search for recipies
      await state.search.getResult();

      //5. Render result on UI
      clearLoader();
      SearchView.renderResults(state.search.result);
    } catch (err) {
      alert("Error getting Recipe...");
    }
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPage.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    console.log(goToPage);
    SearchView.clearResList();
    SearchView.renderResults(state.search.result, goToPage);
  }
});
/* Recipe Controller*/

const controlRecipe = async () => {
  const id = window.location.hash.replace("#", " ");

  if (id) {
    // Render UI

    RecipeView.clearRecipe();
    renderLoader(elements.recipe);

    //HighLight Slected
    //*************************ERROR*************************
    // if (state.search) {
    //   SearchView.resultHighlight(id);
    // }

    //State of the recipe object
    state.recipe = new Recipe(id);

    try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServing();

      clearLoader();
      RecipeView.renderRecipe(state.recipe);
    } catch (err) {
      console.log(err);
      alert("Error in getting Recipe");
    }
  }
};

["hashchange", "load"].forEach(event => addEventListener(event, controlRecipe));

/* ** LIST CONTROLLER*/

const controlList = () => {
  //create a new List if there is none yet
  if (!state.list) state.list = new List();

  // add each Ingredients to list and UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    ListView.renderItem(item);
  });
};

// Handle delete and change of count

elements.shopping.addEventListener("click", e => {
  const id = e.target.closest(".shopping__item").dataset.itemid;

  if (e.target.matches(".shopping__delete,.shopping__delete *")) {
    //Delete from state
    state.list.deleteItem(id);
    //Delete from UI
    ListView.deleteItem(id);
  } else if (e.target.matches(".shopping__count-value")) {
    //Update the value of count from UI to state
    const val = parseFloat(e.target.value, 10);

    state.list.updateCount(id, val);
  }
});

//Handling Recipe with button click

elements.recipe.addEventListener("click", e => {
  if (e.target.matches(".btn-decrease , .btn-decrease *")) {
    if (state.recipe.serving > 1) {
      state.recipe.updateServing("dec");
      RecipeView.updateServingIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase , .btn-increase *")) {
    state.recipe.updateServing("inc");
    RecipeView.updateServingIngredients(state.recipe);
  } else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
    controlList();
  }
});
window.l = new List();
