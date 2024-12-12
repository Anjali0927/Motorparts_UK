import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Notification from './Notification';
import client from './Clients';



const Sales_teams = () => {
  const [salesteams, setSalesteams] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    salesdepartment: '',
    salesengangementteam: ''
  });

  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetch('/api/salesteams/')
      .then(res => res.json())
      .then(data => setSalesteams(data))
      .catch(err => showError(err));
  }, []);

  const showError = (error) => {
    setNotification({ message: error.message, type: 'error' });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const showSuccess = (message) => {
    setNotification({ message, type: 'success' });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitAction = () => {
      if (editMode) {
        fetch(`/api/salesteams/${currentId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(res => res.json())
          .then(data => {
            setSalesteams(salesteams.map(loc => (loc.id === currentId ? data : loc)));
            setEditMode(false);
            setFormData({
              name: '',
              manager: '',
              salesdepartment: '',
              salesengangementteam: '',
            });
            showSuccess('Salesteams successfully updated');
          })
          .catch(err => showError(err));
      } else {
        fetch('/api/salesteams/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(res => res.json())
          .then(data => {
            setSalesteams([...salesteams, data]);
            setFormData({
                name: '',
                manager: '',
                salesdepartment: '',
                salesengangementteam: '',
            });
            showSuccess('Salesteams successfully added');
          })
          .catch(err => showError(err));
      }
    };

    setModalProps({
      title: editMode ? 'Confirm Edit' : 'Confirm Add',
      message: 'Are these details correct?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        submitAction();
      }
    });
    setShowModal(true);
  };

  const handleEdit = (salesteams) => {
    setEditMode(true);
    setCurrentId(salesteams.id);
    setFormData({
      name: salesteams.name,
      manager: salesteams.manager,
      salesdepartment: salesteams.salesdepartment,
      salesengangementteam: salesteams.salesengangementteam,
    });
    
    setModalProps({
      title: 'Confirm Edit',
      message: 'Are you sure you want to edit this salesteams?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        const submitAction = () => {
          fetch(`/api/salesteams/${currentId}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
            .then(res => res.json())
            .then(data => {
              setSalesteams(salesteams.map(loc => (loc.id === currentId ? data : loc)));
              setEditMode(false);
              setFormData({
                name: '',
                manager: '',
                salesdepartment: '',
                salesengangementteam: '',
              });
              showSuccess('Salesteams successfully updated');
            })
            .catch(err => showError(err));
        };
        submitAction();
      }
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setModalProps({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this customer?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        fetch(`/api/salesteams/${id}/`, {
          method: 'DELETE'
        })
          .then(() => {
            setSalesteams(salesteam.filter(salesteams => salesteams.id !== id));
            showSuccess('Salesteams successfully deleted');
          })
          .catch(err => showError(err));
      }
    });
    setShowModal(true);
  };

  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sales Teams</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="name" placeholder="name" value={formData.name} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="manager" placeholder="manager" value={formData.name} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="salesdepartment" placeholder="salesdepartment" value={formData.department} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="salesengagementteam" placeholder="salesengagementteam" value={formData.strategicsales} onChange={handleChange} className="block mb-2 p-2 border" />
        <button type="submit" className="bg-blue-500 text-white p-2">{editMode ? 'Update sales_team' : 'Add Sales_team'}</button>
      </form>
      <ul>
        {Sales_teams.map(salesteams => (
          <li key={salesteams.id} className="mb-2 p-2 border">
            {salesteams.name} - {salesteams.sales_teamsID} - {salesteams.city} - {salesteams.phone} - {salesteams.email}
            <button onClick={() => handleEdit(salesteams)} className="bg-yellow-500 text-white p-1 ml-2">Edit</button>
            <button onClick={() => handleDelete(salesteams.id)} className="bg-red-500 text-white p-1 ml-2">Delete</button>
          </li>
        ))}
      </ul>
      <Modal show={showModal} {...modalProps} />
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
    </div>
  );
};

export default Sales_teams;