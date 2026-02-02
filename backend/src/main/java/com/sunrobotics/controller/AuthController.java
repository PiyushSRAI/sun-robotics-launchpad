package com.sunrobotics.controller;

import com.sunrobotics.model.User;
import com.sunrobotics.repository.UserRepository;
import com.sunrobotics.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(username);
        return Map.of("token", token);
    }

    // Run this ONCE to create your admin user, then delete/comment it out!
//    @PostMapping("/setup")
//    public String setupAdmin() {
//        if(userRepository.findByUsername("admin").isPresent()) return "Admin already exists";
//
//        User admin = new User();
//        admin.setUsername("admin");
//        admin.setPassword(passwordEncoder.encode("admin123")); // CHANGE THIS PASSWORD
//        admin.setRole("ROLE_ADMIN");
//        userRepository.save(admin);
//        return "Admin user created";
//    }
}