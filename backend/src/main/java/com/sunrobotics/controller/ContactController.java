package com.sunrobotics.controller;

import com.sunrobotics.dto.ContactMessageDto;
import com.sunrobotics.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    @Autowired
    private ContactService contactService;

    @PostMapping
    public ResponseEntity<?> sendMessage(@Valid @RequestBody ContactMessageDto request) {
        contactService.saveMessage(request);
        return ResponseEntity.ok().body("{\"message\": \"Message sent successfully\"}");
    }
}