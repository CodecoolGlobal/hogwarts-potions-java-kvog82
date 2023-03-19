package com.codecool.hogwartshouses.api;

import com.codecool.hogwartshouses.persistence.entity.Room;
import com.codecool.hogwartshouses.service.RoomService;
import com.codecool.hogwartshouses.service.exception.RoomNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rooms")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    List<Room> getRooms() {
        return roomService.findAll();
    }

    @PostMapping
    Room addRoom(@RequestBody Room room) {
        return roomService.save(room);
    }

    @GetMapping("/{id}")
    Room findRoom(@PathVariable Long id) {
        return roomService.findById(id).orElseThrow((() -> new RoomNotFoundException(id)));
    }

    @PutMapping("/{id}")
    Room updateRoom(@PathVariable Long id, @RequestBody Room room) {
        return roomService.update(id, room);
    }

    @DeleteMapping("/{id}")
    void deleteRoom(@PathVariable Long id) {
        roomService.deleteById(id);
    }

    @GetMapping("/available")
    List<Room> findAvailableRooms() {
        return roomService.findEmptyRooms();
    }

    @GetMapping("/rat-owners")
    List<Room> findRoomsForRatOwners() {
        return roomService.findRatOwnersRooms();
    }
}
