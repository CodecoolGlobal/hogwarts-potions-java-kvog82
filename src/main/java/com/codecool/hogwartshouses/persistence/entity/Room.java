package com.codecool.hogwartshouses.persistence.entity;

import com.codecool.hogwartshouses.persistence.entity.types.House;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    private @Id @GeneratedValue Long id;
    private int number;
    private House house;
//    private List<Student> students;


}
