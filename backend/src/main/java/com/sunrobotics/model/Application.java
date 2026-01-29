package com.sunrobotics.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    private String fullName;
    private String email;
    private String phone;
    private String resumeUrl;

    @Column(columnDefinition = "TEXT")
    private String coverLetter;

    private String status = "NEW"; // NEW, REVIEWING, REJECTED

    @Column(name = "applied_at", updatable = false)
    private LocalDateTime appliedAt = LocalDateTime.now();
}