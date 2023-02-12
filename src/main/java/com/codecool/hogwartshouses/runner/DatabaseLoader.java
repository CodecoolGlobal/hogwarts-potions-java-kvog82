package com.codecool.hogwartshouses.runner;

import com.codecool.hogwartshouses.persistence.entity.Room;
import com.codecool.hogwartshouses.persistence.entity.Student;
import com.codecool.hogwartshouses.persistence.repository.RoomRepository;
import com.codecool.hogwartshouses.persistence.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
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

            Room room1 = rooms.get(0);
            Room room2 = rooms.get(1);

            Student harry = students.get(0);
            Student ron = students.get(1);
            Student hermine = students.get(2);
            Student draco = students.get(3);

            room1.setStudents(List.of(harry, ron, hermine));
            room2.setStudents(List.of(draco));

            roomRepository.saveAll(List.of(room1, room2));


        };
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }
}
