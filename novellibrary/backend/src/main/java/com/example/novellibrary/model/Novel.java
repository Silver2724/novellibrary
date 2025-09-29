package com.example.novellibrary.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity //tells JPA/Hibernate this class maps to a SQL table
@Table(name = "novels") //gives the SQL table name ("novels")
public class Novel {
    @Id //marks primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto-increments @ID
    private Long id;

    private String title;
    private String author;

    @Column(length = 5000)
    private String description;

    private String sourceURL;
    private OffsetDateTime addedAt;

    @ManyToOne
    @JoinColumn(name = "user_id",  nullable = false)
    private User user;

    public Novel() { }

    public Novel(String title, String author, String description, String sourceURL, User user) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.sourceURL = sourceURL;
        this.addedAt = OffsetDateTime.now();
        this.user = user;
    }

    //getters and settters - needed by JPA and for JSON serialization
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSourceURL() { return sourceURL; }
    public void setSourceURL(String sourceURL) { this.sourceURL = sourceURL; }

    public OffsetDateTime getAddedAt() { return addedAt; }
    public void setAddedAt(OffsetDateTime addedAt) { this.addedAt = addedAt; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
