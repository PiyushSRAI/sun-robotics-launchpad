package com.sunrobotics.service;

import com.sunrobotics.dto.ContactMessageDto;
import com.sunrobotics.model.ContactMessage;
import com.sunrobotics.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    @Autowired
    private ContactMessageRepository repository;

    public ContactMessage saveMessage(ContactMessageDto dto) {
        ContactMessage msg = new ContactMessage();
        msg.setName(dto.getName());
        msg.setEmail(dto.getEmail());
        msg.setCompany(dto.getCompany());
        msg.setPhone(dto.getPhone());
        msg.setSubject(dto.getSubject());
        msg.setMessage(dto.getMessage());
        return repository.save(msg);
    }
}