import { elements } from "./base";

export const getInput = () => elements.searchInput.value;
export const clearSearchField = () => {
  elements.searchInput.value = " ";
};
//***********************ERROR  */
export const resultHighlight = id => {
  console.log(`${id}`);
  document
    .querySelector(`[href*="${id}"]`)
    .classList.add("results__link--active");
};
export const clearResList = () => {
  elements.searchResList.innerHTML = "";
  elements.searchResPage.innerHTML = "";
};
const reduceRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= 17) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    return `${newTitle.join(" ")}`;
  }
  return title;
};
const renderRecipe = recipe => {
  const markup = `
  <li>
    <a class="results__link"  href="#${recipe.recipe_id}">
      <figure class="results__fig">
      <img src="${recipe.image_url}" alt="${recipe.title}">
      </figure>
        <div class="results__data">
         <h4 class="results__name">${reduceRecipeTitle(recipe.title)}</h4>
             <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
   </li>`;

  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

const createButton = (
  page,
  type
) => `<button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
                    <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${
                          type === "prev" ? "left" : "right"
                        }"></use>
                    </svg>
                </button>
`;

const renderButtons = (page, numRes, resPerPage) => {
  const pages = Math.ceil(numRes / resPerPage);
  let button;
  if (page === 1) {
    //Show next Button

    button = createButton(page, "next");
  } else if (page < pages) {
    //Show both button
    button = `${createButton(page, "prev")}${createButton(page, "next")}`;
  } else if (page === pages) {
    //Show prev Button
    button = createButton(page, "prev");
  }

  elements.searchResPage.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);
  renderButtons(page, recipes.length, resPerPage);
};
