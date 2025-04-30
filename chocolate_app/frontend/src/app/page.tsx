import React from "react";
import styles from "./page.module.scss";
import RecipeType from "@/types/RecipeType";
import RecipesContainer from "@/components/RecipesContainer";

export default async function Home() {
  const res = await fetch("http://127.0.0.1:8080/recipes");
  const recipes: RecipeType[] = await res.json();

  return <RecipesContainer recipes={recipes} />;
}
