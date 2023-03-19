package com.codecool.hogwartshouses.persistence.entity;

import com.codecool.hogwartshouses.persistence.entity.types.House;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue
    private long id;
    private int number;
    private House house;
    @OneToMany
    private List<Student> students;

    public Room(int number, House house, List<Student> students) {
        this.number = number;
        this.house = house;
        this.students = students;
    }
}
