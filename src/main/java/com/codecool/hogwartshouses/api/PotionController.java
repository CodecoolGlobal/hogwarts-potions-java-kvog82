package com.codecool.hogwartshouses.api;

import com.codecool.hogwartshouses.api.payload.NewPotion;
import com.codecool.hogwartshouses.persistence.entity.Ingredient;
import com.codecool.hogwartshouses.persistence.entity.Potion;
import com.codecool.hogwartshouses.persistence.entity.Recipe;
import com.codecool.hogwartshouses.service.PotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("potions")
@RequiredArgsConstructor
public class PotionController {

    private final PotionService potionService;

    @GetMapping
    List<Potion> getPotions() {
        return potionService.findAll();
    }

    @PostMapping
    Potion addPotion(@RequestBody NewPotion newPotion) {
        return potionService.addPotion(newPotion);
    }

    @GetMapping("/{studentId}")
    List<Potion> getPotionsForStudent(@PathVariable long studentId) {
        return potionService.findAllByStudentId(studentId);
    }

    @PostMapping("/brew")
    Potion createNewPotion(@RequestBody long studentId) {
        NewPotion newPotion = new NewPotion(studentId, new ArrayList<>());
        return potionService.addPotion(newPotion);
    }

    @PutMapping("/{potionId}/add")
    Potion addIngredient(@PathVariable long potionId, @RequestBody Ingredient ingredient) {
        return potionService.addIngredient(potionId, ingredient);
    }

    @GetMapping("/{potionId}/help")
    List<Recipe> getRecipesWithBrewingPotionIngredients(@PathVariable long potionId) {
        return potionService.getRecipesWithBrewingPotionIngredients(potionId);
    }
}
