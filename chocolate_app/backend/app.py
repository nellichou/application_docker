from typing import Union, List, Optional
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import mariadb
import os
import sys

load_dotenv()

try:
    conn = mariadb.connect(
        user=os.getenv("MARIADB_USERNAME"),
        password=os.getenv("MARIADB_PASSWORD"),
        host=os.getenv("MARIADB_ADDRESS"),
        port=int(os.getenv("MARIADB_PORT")),
        database=os.getenv("MARIADB_DATABASE")
    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

class Recipe(BaseModel):
    id: Optional[int] = None
    nom: str
    details: str
    ingredients: str
    preparation: str

cur = conn.cursor()
app = FastAPI()

@app.get("/recipes",response_model=List[Recipe])
def list_recipes():
    cur.execute(
        """SELECT *
        FROM patisseries"""
    )
    rows = cur.fetchall()
    recipes = [
        Recipe(id=row[0], nom=row[1], details=row[2], ingredients=row[3], preparation=row[4])
        for row in rows
    ]
    return recipes

@app.get("/recipes/{recipe_id}",response_model=Recipe)
def get_recipe(recipe_id: int):
    cur.execute(
        """SELECT *
        FROM patisseries
        WHERE id=?"""
    ,(recipe_id,))
    row = cur.fetchone()
    return Recipe(id=row[0],nom=row[1], details=row[2], ingredients=row[3], preparation=row[4] )


@app.post("/recipes", status_code=201)
def create_recipe(recipe: Recipe):
    cur.execute(
        f"""INSERT INTO patisseries (nom, details,ingredients,preparation)
        VALUES(?,?, ?, ?)""", 
            (recipe.nom, recipe.details, recipe.ingredients, recipe.preparation)
    )
    conn.commit()
    return {"message": "new recipe", "recipe": recipe}

@app.delete("/recipes/{recipe_id}")
def delete_recipe(recipe_id: int):
    cur.execute(
        f"""DELETE FROM patisseries
        WHERE id=?"""
    ,(recipe_id,))
    conn.commit()
    return {"message": "Recipe deleted successfully"}

@app.put("/recipes/{recipe_id}")
def update_recipe(recipe_id: int, recipe: Recipe):
    cur.execute(
        f"""UPDATE patisseries SET nom=?, details=?, ingredients=?, preparation=? WHERE id=?"""
    ,(recipe.nom, recipe.details, recipe.ingredients, recipe.preparation, recipe_id))
    conn.commit()
    return {"message": "Recipe updated successfully", "recipe": recipe}
