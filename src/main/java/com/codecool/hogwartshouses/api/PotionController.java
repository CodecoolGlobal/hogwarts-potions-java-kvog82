package com.codecool.hogwartshouses.api;

import com.codecool.hogwartshouses.persistence.entity.Potion;
import com.codecool.hogwartshouses.service.PotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PotionController {

    private final PotionService potionService;

    @GetMapping("/potions")
    List<Potion> getPotions() {
        return potionService.findAll();
    }
}
