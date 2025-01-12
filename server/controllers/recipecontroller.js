import Recipe from '../models/coffee_recipes.js'; // Sample Import

// GET ALL RECIPES
export const getAllRecipes = async (req, res) => {
    try {
        const Recipes = await Recipe.findAll();
        res.status(200).json(Recipes);
    } catch (error) {
        res.status(500).json({error: "Failed to get all Recipies"});        
    }
}

// CREATE RECIPE
export const createRecipe = async (req, res) => {
    try {
        const {name, ingredients, servings} = req.body;

        if (!name || !ingredients || !servings) {
            return res.status(200).json({ message: "Please enter all required fields"});
        }
        
        
        
    } catch (error) {
        
    }
}

// UPDATE RECIPE 



// DELETE RECIPE