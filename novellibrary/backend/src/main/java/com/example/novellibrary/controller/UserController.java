package com.example.novellibrary.controller;

import com.example.novellibrary.model.User;
import com.example.novellibrary.service.UserService;
import com.example.novellibrary.dto.UserDTO;
import com.example.novellibrary.util.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import jakarta.servlet.http.HttpServletRequest;

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
            //check if user already exists
            Optional<User> existing = service.findByEmail(request.getEmail());
            if(existing.isPresent()) {
                return ResponseEntity.badRequest().body("Email is already in use.");
            }
            
            User user = service.register(request.getName(), request.getEmail(), request.getPassword());

            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO request) {
        Optional<User> user = service.login(request.getEmail(), request.getPassword());

        if(user.isPresent()) {
            String token = jwtUtil.generateToken(request.getEmail());
            Map<String, Object> response = new HashMap<>();

            //send user back (no password)
            User u = user.get();
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("id", u.getId());
            userInfo.put("name", u.getName());
            userInfo.put("email", u.getEmail());

            response.put("user", userInfo);
            response.put("token", token);
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body("Invalid credentials");
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

    //for authenticated user
    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        Optional<User> userOpt = service.findByEmail(email);
        if(userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }
}