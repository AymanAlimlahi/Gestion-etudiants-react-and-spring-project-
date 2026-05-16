package com.example.etudiants.controller;

import com.example.etudiants.entity.Filiere;
import com.example.etudiants.service.FiliereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/filieres")
@CrossOrigin(origins = "http://localhost:3000")
public class FiliereController {
    @Autowired
    private FiliereService filiereService;

    @GetMapping
    public List<Filiere> getAll() { return filiereService.getAll(); }

    @GetMapping("/{id}")
    public Filiere getById(@PathVariable Long id) { return filiereService.getById(id); }

    @PostMapping
    public Filiere create(@RequestBody Filiere filiere) { return filiereService.save(filiere); }

    @PutMapping("/{id}")
    public Filiere update(@PathVariable Long id, @RequestBody Filiere filiere) {
        filiere.setId(id);
        return filiereService.save(filiere);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { filiereService.delete(id); }
}