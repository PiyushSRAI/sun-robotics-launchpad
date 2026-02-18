package com.sunrobotics.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "blogs")
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String excerpt;

    @Column(columnDefinition = "TEXT")
    private String content; // Support for HTML or Markdown

    private String category;
    private String author;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "read_time")
    private String readTime; // e.g., "5 min read"

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}