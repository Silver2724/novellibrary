package com.example.novellibrary.service;

import com.example.novellibrary.model.Novel;
import com.example.novellibrary.model.User;
import com.example.novellibrary.repository.NovelRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NovelService {
    private final NovelRepository repo;

    public NovelService(NovelRepository repo) {
        this.repo = repo;
    }

    //find all novels in the library
    public List<Novel> listAll(User user) {
        return repo.findByUser(user);
    }

    //save a new novel/update existing
    public Novel save(Novel novel, User user) {
        novel.setUser(user);
        return repo.save(novel);
    }

    //find novel by primary key
    public Optional<Novel> findById(Long id) {
        return repo.findById(id);
    }

    //delete novel by id
    public void delete(Long id) {
        repo.deleteById(id);
    }

    //search by title (case insensitive)
    public List<Novel> searchByTitle(String title, User user) {
        return repo.findByTitleContainingIgnoreCaseAndUser(title, user);
    }

    //search by author(case insensitive)
    public List<Novel> searchByAuthor(String author, User user) {
        return repo.findByAuthorContainingIgnoreCaseAndUser(author, user);
    }
}