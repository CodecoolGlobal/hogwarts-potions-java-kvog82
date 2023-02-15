package com.codecool.hogwartshouses.service.exception;

public class PotionNotFoundException extends RuntimeException {
    public PotionNotFoundException(Long id) {
        super("Could not find potion " + id);
    }
}