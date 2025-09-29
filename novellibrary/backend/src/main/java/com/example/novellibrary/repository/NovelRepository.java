package com.example.novellibrary.repository;

import com.example.novellibrary.model.Novel;
import com.example.novellibrary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

public interface NovelRepository extends JpaRepository<Novel, Long> {
    //SELECT * FROM novels WHERE title ILIKE '%?%';
    List<Novel> findByTitleContainingIgnoreCaseAndUser(String title, User user);
    
    //SELECT * FROM novels WHERE author ILIKE '%?%';
    List<Novel> findByAuthorContainingIgnoreCaseAndUser(String author, User user);

    List<Novel> findByUser(User user);
}