package com.codecool.hogwartshouses.persistence.repository;

import com.codecool.hogwartshouses.persistence.entity.Room;
import com.codecool.hogwartshouses.persistence.entity.types.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByStudentsIsNull();

    @Query("SELECT r FROM Room r WHERE r NOT IN "
            + "(SELECT DISTINCT room FROM Room room JOIN room.students s WHERE s.pet IN (:pets))")
    List<Room> findByStudentsPetNotIn(@Param("pets") List<Pet> petsToExclude);





}
