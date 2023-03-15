package com.codecool.hogwartshouses.service;

import com.codecool.hogwartshouses.persistence.entity.Student;
import com.codecool.hogwartshouses.persistence.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> findAll() {
        return studentRepository.findAll();
    }
}
