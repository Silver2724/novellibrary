package com.example.novellibrary.repository;

import com.example.novellibrary.model.Novel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

public interface NovelRepository extends JpaRepository<Novel, Long> {
    List<Novel> findByTitleContainingIgnoreCase(String title);
    List<Novel> findByAuthorContainingIgnoreCase(String author);
}