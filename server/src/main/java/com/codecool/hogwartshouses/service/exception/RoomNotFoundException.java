package com.codecool.hogwartshouses.service.exception;

public class RoomNotFoundException extends RuntimeException {
    public RoomNotFoundException(Long id) {
        super("Could not find room " + id);
    }
}
