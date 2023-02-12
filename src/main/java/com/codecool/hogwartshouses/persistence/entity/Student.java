package com.codecool.hogwartshouses.persistence.entity;

import com.codecool.hogwartshouses.persistence.entity.types.Pet;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {
    private @Id
    @GeneratedValue long id;
    private String name;
    private Pet pet;
}
