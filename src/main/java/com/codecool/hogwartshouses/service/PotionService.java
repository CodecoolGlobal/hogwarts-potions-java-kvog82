package com.codecool.hogwartshouses.service;

import com.codecool.hogwartshouses.api.payload.NewPotion;
import com.codecool.hogwartshouses.persistence.entity.Ingredient;
import com.codecool.hogwartshouses.persistence.entity.Potion;
import com.codecool.hogwartshouses.persistence.entity.Recipe;
import com.codecool.hogwartshouses.persistence.entity.Student;
import com.codecool.hogwartshouses.persistence.entity.types.BrewingStatus;
import com.codecool.hogwartshouses.persistence.repository.PotionRepository;
import com.codecool.hogwartshouses.persistence.repository.RecipeRepository;
import com.codecool.hogwartshouses.persistence.repository.StudentRepository;
import com.codecool.hogwartshouses.service.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@AllArgsConstructor
public class PotionService {
    private PotionRepository potionRepository;
    private StudentRepository studentRepository;
    private RecipeRepository recipeRepository;

    public List<Potion> findAll() {
        return potionRepository.findAll();
    }

    public Potion addPotion(NewPotion newPotion) {
        Potion potion = new Potion();

        long brewingStudentId = newPotion.getBrewingStudentId();
        Student brewingStudent = studentRepository.findById(brewingStudentId)
                .orElseThrow(() -> new StudentNotFoundException(brewingStudentId));
        potion.setBrewingStudent(brewingStudent);

        List<Ingredient> potionIngredients = newPotion.getIngredients();
        potion.setIngredients(potionIngredients);

        if (potionIngredients.size() < 5) {
            potion.setBrewingStatus(BrewingStatus.BREW);
        } else {
            List<Recipe> allRecipes = recipeRepository.findAll();
            Recipe existingRecipe = getExistingRecipe(potionIngredients, allRecipes);
            if (existingRecipe == null) {
                savePotionAndNewDiscoveryRecipe(potion, brewingStudent, potionIngredients, allRecipes);
            } else {
                savePotion(potion, brewingStudent, existingRecipe);
            }
        }
        return potion;
    }

    private static void savePotion(Potion potion, Student brewingStudent, Recipe existingRecipe) {
        potion.setBrewingStatus(BrewingStatus.REPLICA);
        potion.setRecipe(existingRecipe);
        potion.setName(brewingStudent.getName() + "'s Potion after " + existingRecipe.getName());
    }

    private static void savePotionAndNewDiscoveryRecipe(Potion potion, Student brewingStudent,
                                                        List<Ingredient> potionIngredients, List<Recipe> allRecipes) {
        int discoveryCount = 1;
        for (Recipe recipe : allRecipes) {
            if (recipe.getBrewer().equals(brewingStudent)) {
                discoveryCount++;
            }
        }
        Recipe newRecipe = new Recipe(0, brewingStudent.getName() +
                "'s discovery # " + discoveryCount, brewingStudent, potionIngredients);
        potion.setBrewingStatus(BrewingStatus.DISCOVERY);
        potion.setRecipe(newRecipe);
        potion.setName(brewingStudent.getName() + "'s Potion");
    }

    private static Recipe getExistingRecipe(List<Ingredient> potionIngredients, List<Recipe> allRecipes) {
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
}
