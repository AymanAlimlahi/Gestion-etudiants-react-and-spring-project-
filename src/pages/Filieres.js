import React, { useState, useEffect } from 'react';
import { getFilieres, createFiliere, updateFiliere, deleteFiliere } from '../services/api';
import { FaUniversity, FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';

function Filieres() {
  const [filieres, setFilieres] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editFiliere, setEditFiliere] = useState(null);
  const [form, setForm] = useState({ nom: '' });

  useEffect(() => { loadFilieres(); }, []);

  const loadFilieres = async () => {
    const response = await getFilieres();
    setFilieres(response.data);
  };

  const handleSubmit = async () => {
    if (editFiliere) {
      await updateFiliere(editFiliere.id, form);
    } else {
      await createFiliere(form);
    }
    setShowForm(false);
    setEditFiliere(null);
    setForm({ nom: '' });
    loadFilieres();
  };

  const handleEdit = (f) => {
    setEditFiliere(f);
    setForm({ nom: f.nom });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette filière?')) {
      await deleteFiliere(id);
      loadFilieres();
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <FaUniversity style={{ fontSize: '35px', color: '#dc3545' }} />
          <div>
            <h1 style={{ margin: 0, color: '#1F3864' }}>Filières</h1>
            <p style={{ margin: 0, color: '#666' }}>{filieres.length} filière(s) au total</p>
          </div>
        </div>
        <button onClick={() => setShowForm(true)} style={{ padding: '12px 24px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
          <FaPlus /> Ajouter une filière
        </button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', marginBottom: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1F3864', marginBottom: '20px' }}>{editFiliere ? '✏️ Modifier' : '➕ Ajouter'} une filière</h2>
          <input placeholder="Nom de la filière" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
            style={{ display: 'block', marginBottom: '15px', padding: '10px', width: '100%', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaSave /> Enregistrer
            </button>
            <button onClick={() => { setShowForm(false); setEditFiliere(null); }} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaTimes /> Annuler
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {filieres.map(f => (
          <div key={f.id} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderTop: '4px solid #dc3545' }}>
            <FaUniversity style={{ fontSize: '30px', color: '#dc3545', marginBottom: '10px' }} />
            <h3 style={{ color: '#1F3864', margin: '0 0 15px 0' }}>{f.nom}</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleEdit(f)} style={{ padding: '8px 14px', backgroundColor: '#ffc107', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaEdit /> Modifier
              </button>
              <button onClick={() => handleDelete(f.id)} style={{ padding: '8px 14px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaTrash /> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filieres;