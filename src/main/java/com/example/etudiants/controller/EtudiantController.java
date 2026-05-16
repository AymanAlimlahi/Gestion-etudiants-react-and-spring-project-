package com.example.etudiants.controller;

import com.example.etudiants.entity.Etudiant;
import com.example.etudiants.service.EtudiantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/etudiants")
@CrossOrigin(origins = "http://localhost:3000")
public class EtudiantController {
    @Autowired
    private EtudiantService etudiantService;

    @GetMapping
    public List<Etudiant> getAll() { return etudiantService.getAll(); }

    @GetMapping("/{id}")
    public Etudiant getById(@PathVariable Long id) { return etudiantService.getById(id); }

    @PostMapping
    public Etudiant create(@RequestBody Etudiant etudiant) { return etudiantService.save(etudiant); }

    @PutMapping("/{id}")
    public Etudiant update(@PathVariable Long id, @RequestBody Etudiant etudiant) {
        etudiant.setId(id);
        return etudiantService.save(etudiant);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { etudiantService.delete(id); }

    @GetMapping("/filiere/{filiereId}")
    public List<Etudiant> getByFiliere(@PathVariable Long filiereId) { return etudiantService.getByFiliere(filiereId); }

    @GetMapping("/cours/{coursId}")
    public List<Etudiant> getByCours(@PathVariable Long coursId) { return etudiantService.getByCours(coursId); }
}