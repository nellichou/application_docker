"use client";

import React from "react";
import RecipeType from "@/types/RecipeType";
import styles from "./Recipe.module.scss";
import { MdEdit, MdDelete } from "react-icons/md";
import Link from "next/link";

export default function Recipe({
  recipe,
  removeRecipe,
}: {
  recipe: RecipeType;
  removeRecipe: () => void;
}) {
  return (
    <article className={styles.recipe}>
      <div className={styles.recipeContent}>
        <h3 className={styles.title}>{recipe.nom}</h3>
        <pre className={styles.description}>{recipe.details}</pre>
        <h4 className={styles.label}>Ingrédients</h4>
        <pre className={styles.content}>{recipe.ingredients}</pre>
        <h4 className={styles.label}>Préparation</h4>
        <pre className={styles.content}>{recipe.preparation}</pre>
      </div>
      <Link href={`/recipe/${recipe.id}/edit`} className={styles.utilButton}>
        <MdEdit color="#333" />
      </Link>
      <button className={styles.utilButton} onClick={removeRecipe}>
        <MdDelete color="#333" />
      </button>
    </article>
  );
}
