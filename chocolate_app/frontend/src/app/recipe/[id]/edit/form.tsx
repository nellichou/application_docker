"use client";

import RecipeType from "@/types/RecipeType";
import React from "react";
import styles from "./page.module.scss";

export default function Form({ recipe }: { recipe: RecipeType }) {
  const nomRef = React.useRef<HTMLInputElement>(null);
  const detailsRef = React.useRef<HTMLTextAreaElement>(null);
  const ingredientsRef = React.useRef<HTMLTextAreaElement>(null);
  const preparationRef = React.useRef<HTMLTextAreaElement>(null);

  async function editRecipe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch("http://127.0.0.1:8080/recipes/" + recipe.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: nomRef.current?.value,
        details: detailsRef.current?.value,
        ingredients: ingredientsRef.current?.value,
        preparation: preparationRef.current?.value,
      }),
    });

    if (res.ok) {
      console.log("Recipe added successfully");
      window.location.href = "/";
    } else {
      alert("Failed to update recipe");
    }
  }

  return (
    <form className={styles.form} onSubmit={editRecipe}>
      <div className={styles.fieldContainer}>
        <label htmlFor="nom" className={styles.label}>
          Nom
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          className={styles.value}
          required
          defaultValue={recipe.nom}
          ref={nomRef}
        />
      </div>
      <div className={styles.fieldContainer}>
        <label htmlFor="details" className={styles.label}>
          Details
        </label>
        <textarea
          id="details"
          name="details"
          className={styles.value}
          required
          defaultValue={recipe.details}
          ref={detailsRef}
        />
      </div>
      <div className={styles.fieldContainer}>
        <label htmlFor="ingredients" className={styles.label}>
          Ingredients
        </label>
        <textarea
          id="ingredients"
          name="ingredients"
          className={styles.value}
          required
          defaultValue={recipe.ingredients}
          ref={ingredientsRef}
        />
      </div>
      <div className={styles.fieldContainer}>
        <label htmlFor="preparation" className={styles.label}>
          Preparation
        </label>
        <textarea
          id="preparation"
          name="preparation"
          className={styles.value}
          required
          defaultValue={recipe.preparation}
          ref={preparationRef}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Sauvegarder
      </button>
    </form>
  );
}
