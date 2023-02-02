package com.codecool.hogwartshouses.runner;

import com.codecool.hogwartshouses.persistence.entity.Room;
import com.codecool.hogwartshouses.persistence.entity.Student;
import com.codecool.hogwartshouses.persistence.repository.RoomRepository;
import com.codecool.hogwartshouses.persistence.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@ConfigurationProperties("datasets")
public class DatabaseLoader {
    private static final Logger log = LoggerFactory.getLogger(DatabaseLoader.class);

    private List<Room> rooms;

    private List<Student> students;

    @Bean
    ApplicationRunner initDatabase(RoomRepository roomRepository, StudentRepository studentRepository) {
        return args -> {
            roomRepository.saveAll(rooms);
            studentRepository.saveAll(students);
        };
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }
}
