package com.codecool.hogwartshouses.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Recipe {
    @Id @GeneratedValue
    private long id;
    private String name;
    @OneToOne
    private Student student;
    @OneToMany
    List<Ingredient> ingredients;
}
