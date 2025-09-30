package com.example.novellibrary.controller;

import com.example.novellibrary.model.User;
import com.example.novellibrary.service.UserService;
import com.example.novellibrary.dto.UserDTO;
import com.example.novellibrary.util.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.HashMap;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final UserService service;
    private final JwtUtil jwtUtil;

    //initialze service
    public UserController(UserService service, JwtUtil jwtUtil) {
        this.service = service;
        this.jwtUtil = jwtUtil;
    }

    //register a new user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO request) {
        try {
            User user = service.register(request.getName(), request.getEmail(), request.getPassword());

            //check if user already exists
            Optional<User> existing = service.findByEmail(request.getEmail());
            if(existing.isPresent()) {
                return ResponseEntity.badRequest().body("Email is already in use.");
            }

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO request) {
        String email = request.getEmail();
        String password = request.getPassword();
        Optional<User> user = service.login(email, password);

        if(user.isPresent()) {
            String token = jwtUtil.generateToken(email);
            Map<String, Object> response = new HashMap<>();
            
            response.put("token", token);
            response.put("user", user.get());
            
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body("Invalid credentials.");
    }

    //reset password
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody UserDTO request) {
        String email = request.getEmail();
        String newPassword = request.getPassword();

        try {
            boolean updated = service.resetPassword(email, newPassword);
            if(updated) {
                return ResponseEntity.ok("Password updated successfully.");
            } else {
                return ResponseEntity.badRequest().body("User not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating password: " + e.getMessage());
        }
    }
}