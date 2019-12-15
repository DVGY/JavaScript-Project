import Axios from "axios";
import { APIGetURL } from "../config";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await Axios(`${APIGetURL}?rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.publisher = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      alert("Wrong");
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServing() {
    this.serving = 4;
  }

  parseIngredients() {
    // Chnage to standard units
    const unitLong = [
      "tablespoons",
      "tablespoon",
      "teaspoons",
      "teaspoon",
      "ounces",
      "pounds",
      "cups"
    ];
    const unitShort = ["tbsp", "tbsp", "tsp", "tsp", "oz", "pound", "cup"];
    const units = [...unitShort, "kg", "g"];
    const newIngredients = this.ingredients.map(el => {
      let ingredient = el.toLowerCase();
      unitLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitShort[i]);
      });
      // Replace paranthese
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      //Parse Ingredients into count,unit and Ingredients

      let objIng;
      // Splitting the ingredients into array
      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

      if (unitIndex > -1) {
        //Unit is present
        let count;
        const arrCount = arrIng.slice(0, unitIndex);
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace("-", "+"));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join("+"));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(" ")
        };
      } else if (parseInt(arrIng[0], 10)) {
        //Number present at start

        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: "",
          ingredient: arrIng.slice(1).join(" ")
        };
      } else if (unitIndex === -1) {
        //No unit and No number present at start
        objIng = {
          count: 1,
          unit: "",
          ingredient
        };
      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }

  updateServing(type) {
    //Servings
    const newServings = type === "dec" ? this.serving - 1 : this.serving + 1;

    //Ingredients
    this.ingredients.forEach(ing => {
      ing.count *= newServings / this.serving;
    });

    this.serving = newServings;
  }
}
