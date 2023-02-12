package com.codecool.hogwartshouses.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Recipe {
    @Id @GeneratedValue
    private long id;
    private String name;
    @OneToOne
    private Student brewer;
    @OneToMany
    List<Ingredient> ingredients;
}
