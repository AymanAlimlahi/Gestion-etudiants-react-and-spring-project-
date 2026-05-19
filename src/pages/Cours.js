import React, { useState, useEffect } from 'react';
import { getCours, createCours, updateCours, deleteCours } from '../services/api';
import { FaBook, FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';

function Cours() {
  const [cours, setCours] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCours, setEditCours] = useState(null);
  const [form, setForm] = useState({ nom: '', description: '' });

  useEffect(() => { loadCours(); }, []);

  const loadCours = async () => {
    const response = await getCours();
    setCours(response.data);
  };

  const handleSubmit = async () => {
    if (editCours) {
      await updateCours(editCours.id, form);
    } else {
      await createCours(form);
    }
    setShowForm(false);
    setEditCours(null);
    setForm({ nom: '', description: '' });
    loadCours();
  };

  const handleEdit = (c) => {
    setEditCours(c);
    setForm({ nom: c.nom, description: c.description });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours?')) {
      await deleteCours(id);
      loadCours();
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <FaBook style={{ fontSize: '35px', color: '#28a745' }} />
          <div>
            <h1 style={{ margin: 0, color: '#1F3864' }}>Cours</h1>
            <p style={{ margin: 0, color: '#666' }}>{cours.length} cours au total</p>
          </div>
        </div>
        <button onClick={() => setShowForm(true)} style={{ padding: '12px 24px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
          <FaPlus /> Ajouter un cours
        </button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', marginBottom: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1F3864', marginBottom: '20px' }}>{editCours ? '✏️ Modifier' : '➕ Ajouter'} un cours</h2>
          <input placeholder="Nom du cours" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
            style={{ display: 'block', marginBottom: '15px', padding: '10px', width: '100%', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }} />
          <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
            style={{ display: 'block', marginBottom: '15px', padding: '10px', width: '100%', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', minHeight: '100px' }} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaSave /> Enregistrer
            </button>
            <button onClick={() => { setShowForm(false); setEditCours(null); }} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaTimes /> Annuler
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {cours.map(c => (
          <div key={c.id} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderTop: '4px solid #28a745' }}>
            <FaBook style={{ fontSize: '30px', color: '#28a745', marginBottom: '10px' }} />
            <h3 style={{ color: '#1F3864', margin: '0 0 8px 0' }}>{c.nom}</h3>
            <p style={{ color: '#666', margin: '0 0 15px 0', fontSize: '14px' }}>{c.description}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleEdit(c)} style={{ padding: '8px 14px', backgroundColor: '#ffc107', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaEdit /> Modifier
              </button>
              <button onClick={() => handleDelete(c.id)} style={{ padding: '8px 14px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaTrash /> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cours;