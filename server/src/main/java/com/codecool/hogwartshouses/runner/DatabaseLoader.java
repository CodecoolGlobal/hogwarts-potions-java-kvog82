package com.codecool.hogwartshouses.runner;

import com.codecool.hogwartshouses.persistence.entity.*;
import com.codecool.hogwartshouses.persistence.entity.types.BrewingStatus;
import com.codecool.hogwartshouses.persistence.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.util.List;

@Configuration
@ConfigurationProperties("datasets")
public class DatabaseLoader {
    private static final Logger log = LoggerFactory.getLogger(DatabaseLoader.class);

    private List<Room> rooms;
    private List<Student> students;
    private List<Ingredient> ingredients;
    private List<Recipe> recipes;
    private List<Potion> potions;

    @Bean
    ApplicationRunner initDatabase(RoomRepository roomRepository, StudentRepository studentRepository,
                                   IngredientRepository ingredientRepository, RecipeRepository recipeRepository,
                                   PotionRepository potionRepository) {
        return args -> {
            roomRepository.saveAll(rooms);
            studentRepository.saveAll(students);
            ingredientRepository.saveAll(ingredients);
            recipeRepository.saveAll(recipes);
            potionRepository.saveAll(potions);

            Room room1 = rooms.get(0);
            Room room2 = rooms.get(1);

            Student harry = students.get(0);
            Student ron = students.get(1);
            Student hermine = students.get(2);
            Student draco = students.get(3);

            room1.setStudents(List.of(harry, ron, hermine));
            room2.setStudents(List.of(draco));

            roomRepository.saveAll(List.of(room1, room2));

            Recipe strength = recipes.get(0);
            strength.setBrewer(harry);
            strength.setIngredients(List.of(ingredients.get(0), ingredients.get(1), ingredients.get(2),
                    ingredients.get(3), ingredients.get(4)));

            Recipe healing = recipes.get(1);
            healing.setBrewer(ron);
            healing.setIngredients(List.of(ingredients.get(5), ingredients.get(6), ingredients.get(7),
                    ingredients.get(8), ingredients.get(9)));

            recipeRepository.saveAll(List.of(strength, healing));

            Potion strengthPotion = potions.get(0);
            strengthPotion.setBrewingStudent(harry);
            strengthPotion.setIngredients(List.of(ingredients.get(0), ingredients.get(1), ingredients.get(2),
                    ingredients.get(3), ingredients.get(4)));
            strengthPotion.setBrewingStatus(BrewingStatus.DISCOVERY);
            strengthPotion.setRecipe(strength);


            potionRepository.saveAll(List.of(strengthPotion));
        };
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }

    public void setPotions(List<Potion> potions) {
        this.potions = potions;
    }
}
