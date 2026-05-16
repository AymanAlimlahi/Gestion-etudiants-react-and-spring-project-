import React, { useState, useEffect } from 'react';
import { getEtudiants, deleteEtudiant, getFilieres, getCours, createEtudiant, updateEtudiant } from '../services/api';
import { FaUserGraduate, FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaSearch } from 'react-icons/fa';

function Etudiants() {
  const [etudiants, setEtudiants] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [cours, setCours] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editEtudiant, setEditEtudiant] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', dateNaissance: '', filiere: null, cours: [] });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const [e, f, c] = await Promise.all([getEtudiants(), getFilieres(), getCours()]);
    setEtudiants(e.data);
    setFilieres(f.data);
    setCours(c.data);
  };

  const handleSubmit = async () => {
    if (editEtudiant) {
      await updateEtudiant(editEtudiant.id, form);
    } else {
      await createEtudiant(form);
    }
    setShowForm(false);
    setEditEtudiant(null);
    setForm({ nom: '', prenom: '', email: '', dateNaissance: '', filiere: null, cours: [] });
    loadData();
  };

  const handleEdit = (etudiant) => {
    setEditEtudiant(etudiant);
    setForm({
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      email: etudiant.email,
      dateNaissance: etudiant.dateNaissance,
      filiere: etudiant.filiere,
      cours: etudiant.cours || []
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant?')) {
      await deleteEtudiant(id);
      loadData();
    }
  };

  const filtered = etudiants.filter(e =>
    e.nom.toLowerCase().includes(search.toLowerCase()) ||
    e.prenom.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <FaUserGraduate style={{ fontSize: '35px', color: '#2E75B6' }} />
          <div>
            <h1 style={{ margin: 0, color: '#1F3864' }}>Étudiants</h1>
            <p style={{ margin: 0, color: '#666' }}>{etudiants.length} étudiant(s) au total</p>
          </div>
        </div>
        <button onClick={() => setShowForm(true)} style={{ padding: '12px 24px', backgroundColor: '#2E75B6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
          <FaPlus /> Ajouter un étudiant
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '25px' }}>
        <FaSearch style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
        <input placeholder="Rechercher un étudiant..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', backgroundColor: 'white' }} />
      </div>

      {showForm && (
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', marginBottom: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1F3864', marginBottom: '20px' }}>{editEtudiant ? '✏️ Modifier' : '➕ Ajouter'} un étudiant</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <input placeholder="Nom" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }} />
            <input placeholder="Prénom" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }} />
            <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }} />
            <input type="date" value={form.dateNaissance} onChange={e => setForm({ ...form, dateNaissance: e.target.value })}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }} />
          </div>
          <select onChange={e => setForm({ ...form, filiere: { id: e.target.value } })}
            style={{ display: 'block', marginBottom: '15px', padding: '10px', width: '100%', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }}>
            <option value="">-- Choisir une filière --</option>
            {filieres.map(f => <option key={f.id} value={f.id}>{f.nom}</option>)}
          </select>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold', color: '#1F3864' }}>Cours:</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
              {cours.map(c => (
                <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 12px', backgroundColor: form.cours.some(fc => fc.id === c.id) ? '#2E75B6' : '#f0f2f5', color: form.cours.some(fc => fc.id === c.id) ? 'white' : '#333', borderRadius: '20px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.cours.some(fc => fc.id === c.id)}
                    onChange={e => {
                      if (e.target.checked) {
                        setForm({ ...form, cours: [...form.cours, { id: c.id }] });
                      } else {
                        setForm({ ...form, cours: form.cours.filter(fc => fc.id !== c.id) });
                      }
                    }} style={{ display: 'none' }} />
                  {c.nom}
                </label>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaSave /> Enregistrer
            </button>
            <button onClick={() => { setShowForm(false); setEditEtudiant(null); }} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaTimes /> Annuler
            </button>
          </div>
        </div>
      )}

      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#1F3864', color: 'white' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>Prénom</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Nom</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Filière</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Cours</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((etudiant, index) => (
              <tr key={etudiant.id} style={{ borderBottom: '1px solid #f0f2f5', backgroundColor: index % 2 === 0 ? 'white' : '#fafafa' }}>
                <td style={{ padding: '15px' }}>{etudiant.prenom}</td>
                <td style={{ padding: '15px' }}>{etudiant.nom}</td>
                <td style={{ padding: '15px' }}>{etudiant.email}</td>
                <td style={{ padding: '15px' }}>
                  {etudiant.filiere ? (
                    <span style={{ padding: '4px 10px', backgroundColor: '#e3f2fd', color: '#2E75B6', borderRadius: '20px', fontSize: '13px' }}>
                      {etudiant.filiere.nom}
                    </span>
                  ) : '-'}
                </td>
                <td style={{ padding: '15px' }}>
                  {etudiant.cours && etudiant.cours.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {etudiant.cours.map(c => (
                        <span key={c.id} style={{ padding: '3px 8px', backgroundColor: '#e8f5e9', color: '#28a745', borderRadius: '20px', fontSize: '12px' }}>
                          {c.nom}
                        </span>
                      ))}
                    </div>
                  ) : '-'}
                </td>
                <td style={{ padding: '15px' }}>
                  <button onClick={() => handleEdit(etudiant)} style={{ padding: '7px 12px', backgroundColor: '#ffc107', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '8px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <FaEdit /> Modifier
                  </button>
                  <button onClick={() => handleDelete(etudiant.id)} style={{ padding: '7px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <FaTrash /> Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Etudiants;