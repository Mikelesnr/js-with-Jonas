import { async } from "regenerator-runtime";
import {SEARCH_URL, API_URL as url} from './config.js';
import { getJSON } from "./helpers.js";

 export const state = {
    recipe: {},
    search: {
      query: '',
      results: [],
    }
 };

 export const loadRecipe = async function (id) {
    try {
        
    const data = await getJSON(`${url}/${id}`);
    
    // console.log(res,data);
    const {recipe} = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    }
    //console.log(state.recipe);
    } catch (err){
        // Temp Error handling
        console.log(`${err} 💥💥💥💥`);
        throw err;
    };
 };
 export const loadSearchResults = async function(query){
   try {
      state.search.query = query;
      const data = await getJSON(`${SEARCH_URL}${query}`);
      // console.log(data);

      state.search.results = data.recipes.map(rec =>{
         return{
            id: rec.recipe_id,
            title: rec.title,
            publisher: rec.publisher,
            image: rec.image_url,
         };
      });
      // console.log(state.search.results);
   } catch (err) {
      console.log(`${err} 💥💥💥💥`);
      throw err;
   }
 };