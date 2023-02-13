package com.codecool.hogwartshouses.persistence.repository;

import com.codecool.hogwartshouses.persistence.entity.Potion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PotionRepository extends JpaRepository<Potion, Long> {
    List<Potion> findAllByBrewingStudentId(long id);
}
