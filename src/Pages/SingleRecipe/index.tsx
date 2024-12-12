import { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header";
import BASE_URL from "../../settings";
import UserContext from "../../Contexts/UserContext";
import { Link, useParams } from "react-router";
import Button from "../../Utilities/Button";

interface Recipe {
  name: string;
  instructions: string;
  prep_time: number;
  cook_time: number;
  ingredients: {
    id: number;
    name: string;
  }[];
}

function SingleRecipe() {
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    instructions: "",
    prep_time: 0,
    cook_time: 0,
    ingredients: [],
  });

  const { userId } = useContext(UserContext);
  const { recipeId } = useParams();
  const ingredients = recipe.ingredients;

  async function getSingleRecipe(
    stateSetter: React.Dispatch<React.SetStateAction<Recipe>>
  ) {
    const data = await fetch(`${BASE_URL}/users/${userId}/recipes/${recipeId}`);
    const recipe = await data.json();
    const name = recipe.data.name;
    const instructions = recipe.data.instructions;
    const prep = recipe.data.prep_time;
    const cook = recipe.data.cook_time;
    const ingredients = recipe.data.ingredients;
    stateSetter({
      name: name,
      instructions: instructions,
      prep_time: prep,
      cook_time: cook,
      ingredients: ingredients,
    });
  }

  useEffect(() => {
    getSingleRecipe(setRecipe);
  }, []);

  console.log(ingredients);

  return (
    <>
      <Header title="FoodHub" />
      <div className=" mt-4 px-4 ">
        <div className="max-w-6xl mx-auto text-center bg-amber-700 bg-opacity-15 rounded-md shadow-md p-8 mt-4">
          <div className="text-left mb-4">
            <Link to="/">
              <Button value={"Back"} width={"w-20"} height={"h-10"}></Button>
            </Link>
          </div>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl">{recipe.name} Recipe Title</h1>
            <div className="flex justify-center gap-8 mb-10 mt-4">
              <p>Prep Time: {recipe.prep_time} min(s)</p>
              <p>Cooking Time: {recipe.cook_time} min(s)</p>
            </div>
            <div className="mb-8">
              <strong>Ingredients</strong>
              {recipe.ingredients.map((ingredient) => {
                return <p>{ingredient.name}</p>;
              })}
            </div>
            <p className="text-left">{recipe.instructions}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleRecipe;
