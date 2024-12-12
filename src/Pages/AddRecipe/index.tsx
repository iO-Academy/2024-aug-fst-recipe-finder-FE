import { FormEvent, useContext } from "react";
import NumberInput from "../../Utilities/NumberInput";
import TextInput from "../../Utilities/TextInput";
import SubmitInput from "../../Utilities/SubmitInput";
import Header from "../../Components/Header";
import BASE_URL from "../../settings";
import Textarea from "../../Utilities/TextArea";
import UserContext from "../../Contexts/UserContext";
import Button from "../../Utilities/Button";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  async function addRecipeData(formData: FormData) {
    let data = {
      name: formData.get("name"),
      instructions: formData.get("instructions"),
      prep_time: formData.get("prep_time"),
      cook_time: formData.get("cook_time"),
      ingredients: [],
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
        navigate(`/recipes/${userId}`);
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

  return (
    <>
      <Header title="Add Recipe" />
      <Link className="ml-5 mt-4" to={`/recipes/${userId}`}>
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
          <Textarea
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
    </>
  );
}

export default AddRecipe;