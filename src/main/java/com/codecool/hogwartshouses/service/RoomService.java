package com.codecool.hogwartshouses.service;

import com.codecool.hogwartshouses.persistence.entity.Room;
import com.codecool.hogwartshouses.persistence.repository.RoomRepository;
import com.codecool.hogwartshouses.service.x_DAO.RoomDAO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public List<Room> findAll() {
        return roomRepository.findAll();
    }
}
