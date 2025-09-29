package com.example.novellibrary.service;

import com.example.novellibrary.model.User;
import com.example.novellibrary.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder;

    public UserService(UserRepository repo, BCryptPasswordEncoder encoder) { 
        this.repo = repo;
        this.encoder = encoder;
    }

    public Optional<User> findById(Long id) {
        return repo.findById(id);
    }

    public User register(String name, String email, String password) {
        String hashed = encoder.encode(password);
        User user = new User(name, email, hashed);
        return repo.save(user);
    }

    public Optional<User> login(String email, String password) {
        Optional<User> userOpt = repo.findByEmail(email);
        if(userOpt.isPresent()) {
            User user = userOpt.get();
            if(encoder.matches(password, user.getPassword())) {
                return userOpt;
            }
        }
        return Optional.empty();
    }

    //find by email
    public Optional<User> findByEmail(String email) {
        return repo.findByEmail(email);
    }
}