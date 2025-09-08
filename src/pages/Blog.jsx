import React, { useState, useEffect } from "react";
import "../css/Blog.css";
import Okra from "../assets/images/Blog/Okra.jpg";
import Carrot from "../assets/images/Blog/carrot.jpg";

const recipes = [
  {
    id: 1,
    title: "Crispy Ladies Finger Fry",
    description: "Crispy and tasty fried ladies finger snack.",
    image: Okra,
    ingredients: ["Ladies finger", "Oil", "Chili powder", "Salt", "Turmeric"],
    instructions:
      "Slice ladies finger, mix with spices, deep fry until golden and crispy.",
  },
  {
    id: 2,
    title: "Ladies Finger Curry",
    description: "Traditional curry made with fresh ladies finger and spices.",
    image: Carrot,
    ingredients: ["Ladies finger", "Onion", "Tomato", "Coconut milk", "Spices"],
    instructions:
      "Cook onion and tomato, add ladies finger and spices, finish with coconut milk.",
  }
];

export default function BlogPage() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [search, setSearch] = useState("");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Track cursor movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Filter recipes based on search
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase()) ||
    recipe.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="blog-container">
      <h1>🍲 Recipes from Our Harvest</h1>

      {/* Floating Cook Emoji */}
      <div
        className="cook-emoji"
        style={{
          left: cursorPos.x + 10,
          top: cursorPos.y + 10,
        }}
      >
        👨‍🍳
      </div>

      {/* Search Box */}
      {!selectedRecipe && (
        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search recipes (e.g. brinjal, okra)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {/* Recipe Details or List */}
      {selectedRecipe ? (
        <div className="recipe-details">
          <img src={selectedRecipe.image} alt={selectedRecipe.title} />
          <h2>{selectedRecipe.title}</h2>
          <h3>Ingredients</h3>
          <ul>
            {selectedRecipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <p>{selectedRecipe.instructions}</p>
          <button className="back-btn" onClick={() => setSelectedRecipe(null)}>
            ⬅ Back to Recipes
          </button>
        </div>
      ) : (
        <div className="recipe-list">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div
                className="recipe-card"
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
              >
                <img src={recipe.image} alt={recipe.title} />
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
              </div>
            ))
          ) : (
            <p className="no-results">❌ No recipes found for "{search}"</p>
          )}
        </div>
      )}
    </div>
  );
}
