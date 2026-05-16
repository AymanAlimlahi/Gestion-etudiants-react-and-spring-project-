package com.example.etudiants.service;

import com.example.etudiants.entity.Filiere;
import com.example.etudiants.repository.FiliereRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FiliereService {
    @Autowired
    private FiliereRepository filiereRepository;

    public List<Filiere> getAll() { return filiereRepository.findAll(); }
    public Filiere getById(Long id) { return filiereRepository.findById(id).orElse(null); }
    public Filiere save(Filiere filiere) { return filiereRepository.save(filiere); }
    public void delete(Long id) { filiereRepository.deleteById(id); }
}