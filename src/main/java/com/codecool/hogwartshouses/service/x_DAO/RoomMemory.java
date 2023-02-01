package com.codecool.hogwartshouses.service.x_DAO;

import com.codecool.hogwartshouses.persistence.entity.Room;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public class RoomMemory implements RoomDAO {

    private Set<Room> rooms;

    public RoomMemory(Set<Room> rooms) {
        this.rooms = rooms;
    }
}
