package com.codecool.hogwartshouses.persistence.repository;

import com.codecool.hogwartshouses.persistence.entity.Ingredient;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@DataJpaTest
class IngredientRepositoryTest {

    @Autowired
    IngredientRepository ingredientRepository;

    Ingredient ingredient = new Ingredient("Unicorn hair");

    @BeforeEach
    void before() {
        ingredientRepository.save(ingredient);
    }

    @AfterEach
    void after() {
        ingredientRepository.delete(ingredient);
    }

    @Test
    void findByNameFindsOne() {
        String name = "Unicorn hair";
        Ingredient ingredient = ingredientRepository.findByName(name);

        assertEquals(name, ingredient.getName());
    }

    @Test
    void findByNameFindsNone() {
        String name = "null";
        Optional<Ingredient> ingredient = Optional.ofNullable(ingredientRepository.findByName(name));

        assertTrue(ingredient.isEmpty());
    }
}