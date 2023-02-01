package com.codecool.hogwartshouses.api;

import com.codecool.hogwartshouses.persistence.entity.Room;
import com.codecool.hogwartshouses.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    List<Room> getRooms() {
        return roomService.findAll();
    }

}
