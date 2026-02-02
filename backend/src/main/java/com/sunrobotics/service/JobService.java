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

    // Public: Get only active jobs
    public List<Job> getAllActiveJobs() {
        return jobRepository.findByIsActiveTrue();
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    // --- ADMIN METHODS ---

    // Get ALL jobs (Active & Inactive)
    public List<Job> getAllJobsForAdmin() {
        return jobRepository.findAll();
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public Job updateJob(Long id, Job jobDetails) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));

        job.setTitle(jobDetails.getTitle());
        job.setDepartment(jobDetails.getDepartment());
        job.setLocation(jobDetails.getLocation());
        job.setType(jobDetails.getType());
        job.setDescription(jobDetails.getDescription());
        job.setRequirements(jobDetails.getRequirements());
        job.setActive(jobDetails.isActive());

        return jobRepository.save(job);
    }

    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
        jobRepository.delete(job);
    }
}