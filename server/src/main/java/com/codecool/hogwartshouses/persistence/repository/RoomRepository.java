package com.codecool.hogwartshouses.persistence.repository;

import com.codecool.hogwartshouses.persistence.entity.Room;
import com.codecool.hogwartshouses.persistence.entity.types.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByStudentsIsNull();

//    List<Room> findByStudentsIsNullOrStudentsNotNullAndStudents_PetNotIn(List<Pet> petsToExclude);
    List<Room> findByStudentsPetNotIn(List<Pet> petsToExclude);




}
