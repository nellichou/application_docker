import React from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { PiBowlFoodFill } from "react-icons/pi";

export default function Navbar() {
  return (
    <div className={styles.navbarContainer}>
      <header className={styles.navbar}>
        <Link href="/" className={styles.iconHref}>
          <img
            src="/assets/images/icon.svg"
            alt="Icon"
            className={styles.icon}
          />
        </Link>
        <div className={styles.links}>
          <Link href="/recipe/add" className={styles.addRecipe}>
            <PiBowlFoodFill size={18} />
            <span>Ajouter une Recette</span>
          </Link>
        </div>
      </header>
    </div>
  );
}
