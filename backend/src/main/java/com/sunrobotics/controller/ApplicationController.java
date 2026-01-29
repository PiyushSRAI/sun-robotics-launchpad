package com.sunrobotics.controller;

import com.sunrobotics.dto.ApplicationRequestDto;
import com.sunrobotics.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyForJob(@Valid @RequestBody ApplicationRequestDto request) {
        // The GlobalExceptionHandler will catch the RuntimeException automatically
        applicationService.submitApplication(request);
        return ResponseEntity.ok().body("{\"message\": \"Application submitted successfully\"}");
    }
}