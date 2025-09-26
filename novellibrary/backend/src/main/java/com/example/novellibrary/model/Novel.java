package com.example.novellibrary.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "novels")
public class Novel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;

    @Column(length = 5000)
    private String description;

    private String sourceURL;
    private OffsetDateTime addedAt;

    // @ManytoOne
    // @JoinColumn(name = "user_id",  nullable = false)
    // private User user;

    public Novel() { }

    public Novel(String title, String author, String description, String sourceURL) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.sourceURL = sourceURL;
        this.addedAt = OffsetDateTime.now();
    }

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
}
