package com.codecool.hogwartshouses.service;

import com.codecool.hogwartshouses.persistence.entity.Room;
import com.codecool.hogwartshouses.persistence.entity.types.Pet;
import com.codecool.hogwartshouses.persistence.repository.RoomRepository;
import com.codecool.hogwartshouses.service.exception.RoomNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    public Room save(Room room) {
        return roomRepository.save(room);
    }

    public Room findById(Long id) {
        return roomRepository.findById(id).orElseThrow(() -> new RoomNotFoundException(id));
    }

    public void deleteById(Long id) {
        roomRepository.deleteById(id);
    }

    public Room update(Long id, Room newRoom) {
        return roomRepository.findById(id).map(room -> {
            room.setNumber(newRoom.getNumber());
            room.setHouse(newRoom.getHouse());
            room.setStudents(newRoom.getStudents());
            return roomRepository.save(room);
        }).orElseGet(() -> {
            newRoom.setId(id);
            return roomRepository.save(newRoom);
        });
    }

    public List<Room> findEmptyRooms() {
        return roomRepository.findByStudentsIsNull();
    }

    public List<Room> findRatOwnersRooms() {
        return roomRepository.findByStudentsPetNotIn(List.of(Pet.OWL, Pet.CAT));
    }
}
