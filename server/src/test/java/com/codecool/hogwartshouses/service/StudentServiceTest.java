package com.codecool.hogwartshouses.service;

import com.codecool.hogwartshouses.persistence.repository.StudentRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

class StudentServiceTest {
    StudentRepository studentRepository = Mockito.mock(StudentRepository.class);
    StudentService studentService = new StudentService(studentRepository);

    @Test
    void findAll() {
        studentService.findAll();
        Mockito.verify(studentRepository, Mockito.times(1)).findAll();
    }
}