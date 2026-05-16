package com.example.etudiants.controller;

import com.example.etudiants.entity.Cours;
import com.example.etudiants.service.CoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cours")
@CrossOrigin(origins = "http://localhost:3000")
public class CoursController {
    @Autowired
    private CoursService coursService;

    @GetMapping
    public List<Cours> getAll() { return coursService.getAll(); }

    @GetMapping("/{id}")
    public Cours getById(@PathVariable Long id) { return coursService.getById(id); }

    @PostMapping
    public Cours create(@RequestBody Cours cours) { return coursService.save(cours); }

    @PutMapping("/{id}")
    public Cours update(@PathVariable Long id, @RequestBody Cours cours) {
        cours.setId(id);
        return coursService.save(cours);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { coursService.delete(id); }
}