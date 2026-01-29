package com.sunrobotics.service;

import com.sunrobotics.dto.ApplicationRequestDto;
import com.sunrobotics.model.Application;
import com.sunrobotics.model.Job;
import com.sunrobotics.repository.ApplicationRepository;
import com.sunrobotics.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    public Application submitApplication(ApplicationRequestDto dto) {
        Job job = jobRepository.findById(dto.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found with ID: " + dto.getJobId()));

        Application app = new Application();
        app.setJob(job);
        app.setFullName(dto.getFullName());
        app.setEmail(dto.getEmail());
        app.setPhone(dto.getPhone());
        app.setResumeUrl(dto.getResumeUrl());
        app.setCoverLetter(dto.getCoverLetter());

        return applicationRepository.save(app);
    }
}