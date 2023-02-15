package com.codecool.hogwartshouses.api;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;

@RestController
@CrossOrigin("http://localhost:3000")
public class GreetingController {

    @GetMapping
    public String greeting(@RequestParam(name = "name", required = false, defaultValue = "Witches and Wizards") String name, Model model) {
        model.addAttribute("name", name);
        return "greeting";
    }

    @GetMapping(
            value = "/get-background-image",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public ResponseEntity<InputStreamResource> getImage() throws IOException {
        var imgFile = new ClassPathResource("static/img/background.jpg");

        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(new InputStreamResource(imgFile.getInputStream()));
    }
}
