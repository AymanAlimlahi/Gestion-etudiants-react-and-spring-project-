package com.example.etudiants.service;

import com.example.etudiants.entity.Etudiant;
import com.example.etudiants.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EtudiantService {
    @Autowired
    private EtudiantRepository etudiantRepository;

    public List<Etudiant> getAll() { return etudiantRepository.findAll(); }
    public Etudiant getById(Long id) { return etudiantRepository.findById(id).orElse(null); }
    public Etudiant save(Etudiant etudiant) { return etudiantRepository.save(etudiant); }
    public void delete(Long id) { etudiantRepository.deleteById(id); }
    public List<Etudiant> getByFiliere(Long filiereId) { return etudiantRepository.findByFiliereId(filiereId); }
    public List<Etudiant> getByCours(Long coursId) { return etudiantRepository.findByCoursId(coursId); }
}