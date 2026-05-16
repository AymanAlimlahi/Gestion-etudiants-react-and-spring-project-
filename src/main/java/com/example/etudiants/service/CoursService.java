package com.example.etudiants.service;

import com.example.etudiants.entity.Cours;
import com.example.etudiants.repository.CoursRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CoursService {
    @Autowired
    private CoursRepository coursRepository;

    public List<Cours> getAll() { return coursRepository.findAll(); }
    public Cours getById(Long id) { return coursRepository.findById(id).orElse(null); }
    public Cours save(Cours cours) { return coursRepository.save(cours); }
    public void delete(Long id) { coursRepository.deleteById(id); }
}