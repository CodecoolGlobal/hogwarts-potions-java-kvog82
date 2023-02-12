package com.codecool.hogwartshouses.persistence.entity;

import com.codecool.hogwartshouses.persistence.entity.types.BrewingStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Potion {
    @Id @GeneratedValue
    private long id;
    private String name;
    @OneToOne
    private Student brewingStudent;
    @OneToMany
    List<Ingredient> ingredients;
    @Enumerated(value = EnumType.STRING)
    private BrewingStatus brewingStatus;
    @OneToOne
    private Recipe recipe;
}
