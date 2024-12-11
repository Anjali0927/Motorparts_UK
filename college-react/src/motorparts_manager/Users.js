import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Notification from './Notification';

const Users = () => {
  const [Users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    position: '',
    phonenumber: '',
    email: '',
    role: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetch('/api/users/')
      .then(res => res.json())
      .then(data => setUsers(data))
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
        fetch(`/api/users/${currentId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(res => res.json())
          .then(data => {
            setUsers(Users.map(loc => (loc.id === currentId ? data : loc)));
            setEditMode(false);
            setFormData({
              first_namename: '',
              last_name: '',
              position: '',
              phonenumber: '',
              email: '',
              role: ''
            });
            showSuccess('Users successfully updated');
          })
          .catch(err => showError(err));
      } else {
        fetch('/api/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(res => res.json())
          .then(data => {
            setUsers([...Users, data]);
            setFormData({
              first_namename: '',
              last_name: '',
              position: '',
              phonenumber: '',
              email: '',
              role: ''
            });
            showSuccess('Users successfully added');
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

  const handleEdit = (users) => {
    setEditMode(true);
    setCurrentId(users.id);
    setFormData({
      first_name: users.first_name,
      last_name: users.last_name,
      position: users.position,
      phonenumber: users.phonenumber,
      email: users.email,
      role: users.role,

    });
    
    setModalProps({
      title: 'Confirm Edit',
      message: 'Are you sure you want to edit this user?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        const submitAction = () => {
          fetch(`/api/users/${currentId}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
            .then(res => res.json())
            .then(data => {
              setUsers(users.map(loc => (loc.id === currentId ? data : loc)));
              setEditMode(false);
              setFormData({
                first_name: '',
                last_name: '',
                position: '',
                phonenumber: '',
                email: '',
                role: ''
              });
              showSuccess('User successfully updated');
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
      message: 'Are you sure you want to delete this user?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        fetch(`/api/users/${id}/`, {
          method: 'DELETE'
        })
          .then(() => {
            setUsers(Users.filter(users => users.id !== id));
            showSuccess('Users successfully deleted');
          })
          .catch(err => showError(err));
      }
    });
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="first_name" placeholder="first_name" value={formData.first_name} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="last_name" placeholder="last_name" value={formData.last_name} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="position" placeholder="position" value={formData.position} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="phonenumber" placeholder="phonenumber" value={formData.phonenumber} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="email" placeholder="email" value={formData.email} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="role" placeholder="role" value={formData.role} onChange={handleChange} className="block mb-2 p-2 border" />
        <button type="submit" className="bg-blue-500 text-white p-2">{editMode ? 'Update Location' : 'Add Location'}</button>
      </form>
      <ul>
        {Users.map(users => (
          <li key={users.id} className="mb-2 p-2 border">
            {users.name} - {users.address} - {users.city} - {users.county} - {users.postcode}
            <button onClick={() => handleEdit(users)} className="bg-yellow-500 text-white p-1 ml-2">Edit</button>
            <button onClick={() => handleDelete(users.id)} className="bg-red-500 text-white p-1 ml-2">Delete</button>
          </li>
        ))}
      </ul>
      <Modal show={showModal} {...modalProps} />
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
    </div>
  );
};

export default Users;
