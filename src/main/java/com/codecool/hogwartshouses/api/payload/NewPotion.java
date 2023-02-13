package com.codecool.hogwartshouses.api.payload;

import com.codecool.hogwartshouses.persistence.entity.Ingredient;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewPotion {
    long brewingStudentId;
    List<Ingredient> ingredients;
}
