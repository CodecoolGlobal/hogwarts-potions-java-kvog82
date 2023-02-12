package com.codecool.hogwartshouses.service;

import com.codecool.hogwartshouses.persistence.entity.Potion;
import com.codecool.hogwartshouses.persistence.repository.PotionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@AllArgsConstructor
public class PotionService {
    public PotionRepository potionRepository;


    public List<Potion> findAll() {
        return potionRepository.findAll();
    }
}
