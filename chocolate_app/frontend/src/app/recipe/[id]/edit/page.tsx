import React from "react";
import styles from "./page.module.scss";
import Form from "./form";
import RecipeType from "@/types/RecipeType";

export default async function RecipeEdit({ params: { id } }: any) {
  const res = await fetch("http://127.0.0.1:8080/recipes/" + id);
  const recipe: RecipeType = await res.json();

  return (
    <div className={styles.page}>
      <Form recipe={recipe} />
    </div>
  );
}
