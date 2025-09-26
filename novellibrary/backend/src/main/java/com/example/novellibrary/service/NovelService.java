package com.example.novellibrary.service;

import com.example.novellibrary.model.Novel;
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

    public List<Novel> listAll() {
        return repo.findAll();
    }

    public Novel save(Novel novel) {
        return repo.save(novel);
    }

    public Optional<Novel> findById(Long id) {
        return repo.findById(id);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Novel> searchByTitle(String title) {
        return repo.findByTitleContainingIgnoreCase(title);
    }

    public List<Novel> searchByAuthor(String author) {
        return repo.findByAuthorContainingIgnoreCase(author);
    }
}