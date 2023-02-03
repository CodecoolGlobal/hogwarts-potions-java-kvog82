package com.codecool.hogwartshouses.api;

import com.codecool.hogwartshouses.persistence.entity.Room;
import com.codecool.hogwartshouses.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping("rooms")
    List<Room> getRooms() {
        return roomService.findAll();
    }

    @PostMapping("rooms")
    Room addRoom(@RequestBody Room room) {
        return roomService.save(room);
    }

    @GetMapping("rooms/{id}")
    Room findRoom(@PathVariable Long id) {
        return roomService.findById(id);
    }

    @PutMapping("rooms/{id}")
    Room updateRoom(@PathVariable Long id, @RequestBody Room room) {
        return roomService.update(id, room);
    }

    @DeleteMapping("rooms/{id}")
    void deleteRoom(@PathVariable Long id) {
        roomService.deleteById(id);
    }

    @GetMapping("rooms/available")
    List<Room> findAvailableRooms() {
        return roomService.findEmptyRooms();
    }

    @GetMapping("rooms/rat-owners")
    List<Room> findRoomsForRatOwners() {
        return roomService.findRatOwnersRooms();
    }
}
