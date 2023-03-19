package com.codecool.hogwartshouses.persistence.repository;

import com.codecool.hogwartshouses.persistence.entity.Potion;
import com.codecool.hogwartshouses.persistence.entity.Recipe;
import com.codecool.hogwartshouses.persistence.entity.Student;
import com.codecool.hogwartshouses.persistence.entity.types.BrewingStatus;
import com.codecool.hogwartshouses.persistence.entity.types.Pet;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@DataJpaTest
class PotionRepositoryTest {

    @Autowired
    PotionRepository potionRepository;
    @Autowired
    RecipeRepository recipeRepository;
    @Autowired
    StudentRepository studentRepository;

   Student student = new Student(0, "Harry Potter", Pet.OWL);
   Recipe recipe = new Recipe(0, "Test", student, List.of());
   Potion potion = new Potion(0, "Test", student, List.of(), BrewingStatus.BREW, recipe);

   @BeforeEach
   void before() {
       studentRepository.save(student);
       recipeRepository.save(recipe);
       potionRepository.save(potion);

   }

   @AfterEach
   void after() {
       studentRepository.delete(student);
       recipeRepository.delete(recipe);
       potionRepository.delete(potion);
   }

    @Test
    void findAllByBrewingStudentId() {
       long id = 1;
       List<Potion> potions = potionRepository.findAllByBrewingStudentId(id);
       assertEquals(1, potions.size());
    }
}