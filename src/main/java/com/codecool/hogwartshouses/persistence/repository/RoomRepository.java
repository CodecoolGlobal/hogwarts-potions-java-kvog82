package com.codecool.hogwartshouses.persistence.repository;

import com.codecool.hogwartshouses.persistence.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
