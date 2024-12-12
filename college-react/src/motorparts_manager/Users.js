import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Notification from './Notification';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    position: '',
    phone_number: '',
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
            setUsers(users.map(user => (user.id === currentId ? data : user)));
            setEditMode(false);
            setFormData({
              first_name: '',
              last_name: '',
              position: '',
              phone_number: '',
              email: '',
              role: ''
            });
            showSuccess('User successfully updated');
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
            setUsers([...users, data]);
            setFormData({
              first_name: '',
              last_name: '',
              position: '',
              phone_number: '',
              email: '',
              role: ''
            });
            showSuccess('User successfully added');
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

  const handleEdit = (user) => {
    setEditMode(true);
    setCurrentId(user.id);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      position: user.position,
      phone_number: user.phone_number,
      email: user.email,
      role: user.role
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
              setUsers(users.map(user => (user.id === currentId ? data : user)));
              setEditMode(false);
              setFormData({
                first_name: '',
                last_name: '',
                position: '',
                phone_number: '',
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
            setUsers(users.filter(user => user.id !== id));
            showSuccess('User successfully deleted');
          })
          .catch(err => showError(err));
      }
    });
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="flex flex-row flex-wrap justify-between">
        <form onSubmit={handleSubmit} className="mb-4 w-full lg:w-1/2 xl:w-1/3">
          <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} className="block mb-2 p-2 border" />
          <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} className="block mb-2 p-2 border" />
          <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} className="block mb-2 p-2 border" />
          <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} className="block mb-2 p-2 border" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="block mb-2 p-2 border" />
          <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} className="block mb-2 p-2 border" />
          <button type="submit" className="bg-blue-500 text-white p-2">{editMode ? 'Update User' : 'Add User'}</button>
        </form>
        <ul className="w-full lg:w-1/2 xl:w-2/3">
          {users.map(user => (
            <li key={user.id} className="mb-2 p-2 border">
              {user.first_name} {user.last_name} - {user.position} - {user.phone_number} - {user.email} - {user.role}
              <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white p-1 ml-2">Edit</button>
              <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white p-1 ml-2">Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <Modal show={showModal} {...modalProps} />
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
    </div>
  );
};

export default Users;
