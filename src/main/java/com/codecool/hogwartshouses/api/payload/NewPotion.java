package com.codecool.hogwartshouses.api.payload;

import com.codecool.hogwartshouses.persistence.entity.Ingredient;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class NewPotion {
    long brewingStudentId;
    List<Ingredient> ingredients;
}
