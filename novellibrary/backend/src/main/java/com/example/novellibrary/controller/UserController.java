package com.example.novellibrary.controller;

import com.example.novellibrary.model.User;
import com.example.novellibrary.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final UserService service;

    //initialze service
    public UserController(UserService service) {
        this.service = service;
    }

    //register a new user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String email = body.get("email");
        String password = body.get("password");
        User user = service.register(name, email, password);
        return ResponseEntity.ok(user);
    }

    //login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        Optional<User> user = service.login(email, password);

        if(user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }

        return ResponseEntity.status(401).body("Invalid credentials.");
    }
}
