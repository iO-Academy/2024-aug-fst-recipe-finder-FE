import { FormEvent, useContext, useState } from "react";
import NumberInput from "../../Utilities/NumberInput";
import TextInput from "../../Utilities/TextInput";
import SubmitInput from "../../Utilities/SubmitInput";
import Header from "../../Components/Header";
import BASE_URL from "../../settings";
import UserContext from "../../Contexts/UserContext";
import Button from "../../Utilities/Button";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import TextAreaInput from "../../Utilities/TextArea";

interface Ingredients {
  id: number;
}

function AddRecipe() {
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);

  async function addRecipeData(formData: FormData) {
    let data = {
      name: formData.get("name"),
      instructions: formData.get("instructions"),
      prep_time: formData.get("prep_time"),
      cook_time: formData.get("cook_time"),
      ingredients: ingredients,
    };

    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/recipes`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Successfully added recipe");
        navigate(`/${userId}`);
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.log("Error adding recipe");
    }
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addRecipeData(formData);
  }

  async function addIngredientData(formData: FormData) {
    let data = {
      name: formData.get("ingredient"),
    };

    try {
      const response = await fetch(`${BASE_URL}/users/1/ingredients`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log("Successfully added ingredient");
        setIngredients([...ingredients, responseData.data.id]);
        console.log(ingredients);
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.log("Error adding ingredient");
    }
  }

  function handleIngredientSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addIngredientData(formData);
  }

  return (
    <>
      <Header title="Add Recipe" />
      <Link className="ml-5 mt-4" to={`/recipes`}>
        <Button value="Back" width="w-20" height="h-10" />
      </Link>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="w-full px-5 mt-4">
          <TextInput
            title="Recipe name:"
            name="name"
            id="addrecipe"
            placeholder="enter recipe name"
            required={true}
          />
          <TextAreaInput
            title="Cooking instructions:"
            name="instructions"
            id="instructions"
            required={true}
          />
          <div className="flex space-x-4 mb-4">
            <NumberInput
              title="Prep time mins:"
              name="prep_time"
              id="preptime"
            />
            <NumberInput
              title="Cook time mins:"
              name="cook_time"
              id="cooktime"
              required={true}
            />
          </div>
          <SubmitInput value="Add recipe" />
        </div>
      </form>
      <div className="w-full px-5 mt-4">
        <form action="" method="post" onSubmit={handleIngredientSubmit}>
          <div className="flex space-x-4">
            <TextInput
              title="Add Ingredient:"
              name="ingredient"
              id="addingredient"
              placeholder="enter ingredient name"
              required={false}
            />
            <SubmitInput value="+" />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddRecipe;
