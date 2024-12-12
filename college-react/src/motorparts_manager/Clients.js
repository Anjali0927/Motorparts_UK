import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Notification from './Notification';

const Client = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    contact: '',
    active: true,
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetch('/api/clients/')
      .then(res => res.json())
      .then(data => setClients(data))
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
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitAction = () => {
      if (editMode) {
        fetch(`/api/clients/${currentId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then(res => res.json())
          .then(data => {
            setClients(clients.map(client => (client.id === currentId ? data : client)));
            setEditMode(false);
            setFormData({
              name: '',
              industry: '',
              contact: '',
              active: true,
            });
            showSuccess('Client successfully updated');
          })
          .catch(err => showError(err));
      } else {
        fetch('/api/clients/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then(res => res.json())
          .then(data => {
            setClients([...clients, data]);
            setFormData({
              name: '',
              industry: '',
              contact: '',
              active: true,
            });
            showSuccess('Client successfully added');
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
      },
    });
    setShowModal(true);
  };

  const handleEdit = (client) => {
    setEditMode(true);
    setCurrentId(client.id);
    setFormData({
      name: client.name,
      industry: client.industry,
      contact: client.contact,
      active: client.active,
    });

    setModalProps({
      title: 'Confirm Edit',
      message: 'Are you sure you want to edit this client?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        const submitAction = () => {
          fetch(`/api/clients/${currentId}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
            .then(res => res.json())
            .then(data => {
              setClients(clients.map(client => (client.id === currentId ? data : client)));
              setEditMode(false);
              setFormData({
                name: '',
                industry: '',
                contact: '',
                active: true,
              });
              showSuccess('Client successfully updated');
            })
            .catch(err => showError(err));
        };
        submitAction();
      },
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setModalProps({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this client?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        fetch(`/api/clients/${id}/`, {
          method: 'DELETE',
        })
          .then(() => {
            setClients(clients.filter(client => client.id !== id));
            showSuccess('Client successfully deleted');
          })
          .catch(err => showError(err));
      },
    });
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} className="block mb-2 p-2 border" />
        <label className="block mb-2">
          <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="mr-2" />
          Active
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2">{editMode ? 'Update Client' : 'Add Client'}</button>
      </form>
      <ul>
        {clients.map(client => (
          <li key={client.id} className="mb-2 p-2 border">
            {client.name} - {client.industry} - {client.contact} - {client.active ? 'Active' : 'Inactive'}
            <button onClick={() => handleEdit(client)} className="bg-yellow-500 text-white p-1 ml-2">Edit</button>
            <button onClick={() => handleDelete(client.id)} className="bg-red-500 text-white p-1 ml-2">Delete</button>
          </li>
        ))}
      </ul>
      <Modal show={showModal} {...modalProps} />
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
    </div>
  );
};

export default Client;
