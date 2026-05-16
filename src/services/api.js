import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Filieres
export const getFilieres = () => axios.get(`${BASE_URL}/filieres`);
export const createFiliere = (filiere) => axios.post(`${BASE_URL}/filieres`, filiere);
export const updateFiliere = (id, filiere) => axios.put(`${BASE_URL}/filieres/${id}`, filiere);
export const deleteFiliere = (id) => axios.delete(`${BASE_URL}/filieres/${id}`);

// Cours
export const getCours = () => axios.get(`${BASE_URL}/cours`);
export const createCours = (cours) => axios.post(`${BASE_URL}/cours`, cours);
export const updateCours = (id, cours) => axios.put(`${BASE_URL}/cours/${id}`, cours);
export const deleteCours = (id) => axios.delete(`${BASE_URL}/cours/${id}`);

// Etudiants
export const getEtudiants = () => axios.get(`${BASE_URL}/etudiants`);
export const getEtudiant = (id) => axios.get(`${BASE_URL}/etudiants/${id}`);
export const createEtudiant = (etudiant) => axios.post(`${BASE_URL}/etudiants`, etudiant);
export const updateEtudiant = (id, etudiant) => axios.put(`${BASE_URL}/etudiants/${id}`, etudiant);
export const deleteEtudiant = (id) => axios.delete(`${BASE_URL}/etudiants/${id}`);
export const getEtudiantsByFiliere = (filiereId) => axios.get(`${BASE_URL}/etudiants/filiere/${filiereId}`);
export const getEtudiantsByCours = (coursId) => axios.get(`${BASE_URL}/etudiants/cours/${coursId}`);