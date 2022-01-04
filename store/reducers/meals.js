import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.filter(
            (meal) => meal.id !== action.mealId
          ),
        };
      } else {
        const mealToAdd = state.meals.find((meal) => meal.id === action.mealId);

        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(mealToAdd),
        };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        } else if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        } else if (appliedFilters.vegeterian && !meal.isVegeterian) {
          return false;
        } else if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        } else {
          return true;
        }
      });

      return {
        ...state,
        filteredMeals: updatedFilteredMeals
      }
    default:
      return state;
  }
};

export default mealsReducer;
