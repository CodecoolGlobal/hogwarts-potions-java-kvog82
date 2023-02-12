package com.codecool.hogwartshouses.api;

import com.codecool.hogwartshouses.api.payload.NewPotion;
import com.codecool.hogwartshouses.persistence.entity.Potion;
import com.codecool.hogwartshouses.service.PotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
}
