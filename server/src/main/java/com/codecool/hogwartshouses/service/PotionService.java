package com.codecool.hogwartshouses.service;

import com.codecool.hogwartshouses.api.payload.NewPotion;
import com.codecool.hogwartshouses.persistence.entity.Ingredient;
import com.codecool.hogwartshouses.persistence.entity.Potion;
import com.codecool.hogwartshouses.persistence.entity.Recipe;
import com.codecool.hogwartshouses.persistence.entity.Student;
import com.codecool.hogwartshouses.persistence.entity.types.BrewingStatus;
import com.codecool.hogwartshouses.persistence.repository.IngredientRepository;
import com.codecool.hogwartshouses.persistence.repository.PotionRepository;
import com.codecool.hogwartshouses.persistence.repository.RecipeRepository;
import com.codecool.hogwartshouses.persistence.repository.StudentRepository;
import com.codecool.hogwartshouses.service.exception.PotionNotFoundException;
import com.codecool.hogwartshouses.service.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
@AllArgsConstructor
public class PotionService {
    private PotionRepository potionRepository;
    private StudentRepository studentRepository;
    private RecipeRepository recipeRepository;
    private IngredientRepository ingredientRepository;

    public List<Potion> findAll() {
        return potionRepository.findAll();
    }

    public Potion addPotion(NewPotion newPotion) {
        Potion potion = new Potion();
        setBrewingStudent(newPotion, potion);
        checkIngredientsAndSaveIfNew(newPotion.getIngredients(), potion);
        checkStatusAndSavePotion(potion);
        return potion;
    }

    public List<Potion> findAllByStudentId(long studentId) {
        return potionRepository.findAllByBrewingStudentId(studentId);
    }

    public Potion addIngredient(long potionId, Ingredient ingredient) {
        Potion potion = potionRepository.findById(potionId).orElseThrow(() -> new PotionNotFoundException(potionId));
        List<Ingredient> existingIngredients = potion.getIngredients();

        checkIngredientsAndSaveIfNew(List.of(ingredient), potion);
        existingIngredients.add(ingredient);
        potion.setIngredients(existingIngredients);
        checkStatusAndSavePotion(potion);
        return potion;
    }

    public List<Recipe> getRecipesWithBrewingPotionIngredients(long potionId) { // TODO create query in RecipeRepository
        Potion potion = potionRepository.findById(potionId).orElseThrow(() -> new PotionNotFoundException(potionId));
        List<Ingredient> potionIngredients = potion.getIngredients();
        List<Recipe> allRecipes = recipeRepository.findAll();
        List<Recipe> recipesWithIngredients = new ArrayList<>();
        for (Recipe recipe : allRecipes) {
            List<Ingredient> recipeIngredients = recipe.getIngredients();
            if(new HashSet<>(recipeIngredients).containsAll(potionIngredients)) {
                recipesWithIngredients.add(recipe);
            }
        }
        return recipesWithIngredients;
    }

    private void setBrewingStudent(NewPotion newPotion, Potion potion) {
        long brewingStudentId = newPotion.getBrewingStudentId();
        Student brewingStudent = studentRepository.findById(brewingStudentId)
                .orElseThrow(() -> new StudentNotFoundException(brewingStudentId));
        potion.setBrewingStudent(brewingStudent);
    }

    private void checkIngredientsAndSaveIfNew(List<Ingredient> ingredients, Potion potion) {
        for (Ingredient potionIngredient : ingredients) {
            try {
                potionIngredient.setId(ingredientRepository.findByName(potionIngredient.getName()).getId());
            } catch (NullPointerException e) {
                Ingredient ingredient = new Ingredient(0, potionIngredient.getName());
                ingredient = ingredientRepository.save(ingredient);
                potionIngredient.setId(ingredient.getId());
            }
        }
        potion.setIngredients(ingredients);
    }

    private void checkStatusAndSavePotion(Potion potion) {
        List<Ingredient> potionIngredients = potion.getIngredients();
        Student brewingStudent = potion.getBrewingStudent();
        if (potionIngredients.size() < 5) {
            potion.setBrewingStatus(BrewingStatus.BREW);
            potionRepository.save(potion);
        } else {
            List<Recipe> allRecipes = recipeRepository.findAll();
            Recipe existingRecipe = getExistingRecipe(potionIngredients, allRecipes);
            if (existingRecipe == null) {
                savePotionAndNewDiscoveryRecipe(potion, brewingStudent, potionIngredients, allRecipes);
            } else {
                savePotion(potion, brewingStudent, existingRecipe);
            }
        }
    }

    private Recipe getExistingRecipe(List<Ingredient> potionIngredients, List<Recipe> allRecipes) {
        Recipe existingRecipe = null;
        for (Recipe recipe : allRecipes) {
            List<Ingredient> recipeIngredients = recipe.getIngredients();
            if (potionIngredients.size() == recipeIngredients.size()
                    && new HashSet<>(potionIngredients).containsAll(recipeIngredients)) {
                existingRecipe = recipe;
            }
        }
        return existingRecipe;
    }

    private void savePotionAndNewDiscoveryRecipe(Potion potion, Student brewingStudent,
                                                 List<Ingredient> potionIngredients, List<Recipe> allRecipes) {
        int discoveryCount = 1;
        for (Recipe recipe : allRecipes) {
            if (recipe.getBrewer().equals(brewingStudent)) {
                discoveryCount++;
            }
        }
        List<Ingredient> recipeIngredients = List.copyOf(potionIngredients);
        Recipe newRecipe = recipeRepository.save(new Recipe(0, brewingStudent.getName() +
                "'s discovery # " + discoveryCount, brewingStudent, recipeIngredients));
        potion.setBrewingStatus(BrewingStatus.DISCOVERY);
        potion.setRecipe(newRecipe);
        potion.setName(brewingStudent.getName() + "'s Potion");
        potionRepository.save(potion);
    }

    private void savePotion(Potion potion, Student brewingStudent, Recipe existingRecipe) {
        potion.setBrewingStatus(BrewingStatus.REPLICA);
        potion.setRecipe(existingRecipe);
        potion.setName(brewingStudent.getName() + "'s Potion after " + existingRecipe.getName());
        potionRepository.save(potion);
    }

}
