package com.sunrobotics.service;

import com.sunrobotics.model.Job;
import com.sunrobotics.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    @Autowired
    private JobRepository jobRepository;

    public List<Job> getAllActiveJobs() {
        return jobRepository.findByIsActiveTrue();
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }
}