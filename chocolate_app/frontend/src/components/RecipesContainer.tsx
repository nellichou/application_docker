"use client";

import React from "react";
import RecipeType from "@/types/RecipeType";
import styles from "./RecipesContainer.module.scss";
import Recipe from "./Recipe";
import { useSearchParams } from "next/navigation";

export default function RecipesContainer({
  recipes,
}: {
  recipes: RecipeType[];
}) {
  const [displayedRecipes, setDisplayedRecipes] = React.useState(recipes);

  async function removeRecipe(id: number) {
    console.log(`Removing recipe with id ${id}`);

    const res = await fetch("http://127.0.0.1:8080/recipes/" + id, {
      method: "DELETE",
    });

    if (res.ok) {
      console.log("Recipe removed successfully");

      setDisplayedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
    } else {
      alert("Failed to remove recipe");
    }
  }

  return (
    <section>
      {displayedRecipes.map((recipe) => (
        <Recipe
          key={recipe.id}
          recipe={recipe}
          removeRecipe={() => removeRecipe(recipe.id)}
        />
      ))}
    </section>
  );
}
