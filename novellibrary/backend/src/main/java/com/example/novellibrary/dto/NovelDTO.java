package com.example.novellibrary.dto;

//DTO = data transfer object
//used to transfer data from external APIs (Google Books) to your app
//prevents exposing JPA entities directly
public class NovelDTO {
    private Long id;
    private String title;
    private String author;
    private String description;
    private String sourceURL;

    public NovelDTO() { }

    public NovelDTO(String title, String author, String description, String sourceURL) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.sourceURL = sourceURL;
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
}