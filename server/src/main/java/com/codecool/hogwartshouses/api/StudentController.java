package com.codecool.hogwartshouses.api;

import com.codecool.hogwartshouses.persistence.entity.Room;
import com.codecool.hogwartshouses.persistence.entity.Student;
import com.codecool.hogwartshouses.service.RoomService;
import com.codecool.hogwartshouses.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("students")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    List<Student> getStudents() {
        return studentService.findAll();
    }

}
