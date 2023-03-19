package com.codecool.hogwartshouses.service;

import com.codecool.hogwartshouses.persistence.entity.Room;
import com.codecool.hogwartshouses.persistence.entity.types.House;
import com.codecool.hogwartshouses.persistence.entity.types.Pet;
import com.codecool.hogwartshouses.persistence.repository.RoomRepository;
import com.codecool.hogwartshouses.service.exception.RoomNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class RoomServiceTest {
    RoomRepository roomRepository = Mockito.mock(RoomRepository.class);
    RoomService roomService = new RoomService(roomRepository);

    @Test
    void findAll() {
        roomService.findAll();
        Mockito.verify(roomRepository, Mockito.times(1)).findAll();
    }

    @Test
    void save() {
        Room room = Room.builder().build();
        roomService.save(room);
        Mockito.verify(roomRepository).save(room);
    }

    @Test
    void findById() throws RoomNotFoundException {
        long id = 1;
        roomService.findById(id);
        Mockito.verify(roomRepository).findById(id);
    }

    @Test
    void deleteById() {
        long id = 1;
        roomService.deleteById(id);
        Mockito.verify(roomRepository).deleteById(id);
    }

    @Test
    void update() {
        Room room = Room.builder().build();
        long id = 1;
        roomService.update(id, room);
        Mockito.verify(roomRepository).findById(id);
        Mockito.verify(roomRepository).save(room);
    }

    @Test
    void findEmptyRooms() {
        roomService.findEmptyRooms();
        Mockito.verify(roomRepository).findByStudentsIsNull();
    }

    @Test
    void findRatOwnersRooms() {
        roomService.findRatOwnersRooms();
        Mockito.verify(roomRepository).findByStudentsPetNotIn(List.of(Pet.OWL, Pet.CAT));
    }
}