import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Notification from './Notification';

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    county: '',
    postcode: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetch('/api/locations/')
      .then(res => res.json())
      .then(data => setLocations(data))
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
        fetch(`/api/locations/${currentId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(res => res.json())
          .then(data => {
            setLocations(locations.map(loc => (loc.id === currentId ? data : loc)));
            setEditMode(false);
            setFormData({
              name: '',
              address: '',
              city: '',
              county: '',
              postcode: ''
            });
            showSuccess('Location successfully updated');
          })
          .catch(err => showError(err));
      } else {
        fetch('/api/locations/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(res => res.json())
          .then(data => {
            setLocations([...locations, data]);
            setFormData({
              name: '',
              address: '',
              city: '',
              county: '',
              postcode: ''
            });
            showSuccess('Location successfully added');
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

  const handleEdit = (location) => {
    setEditMode(true);
    setCurrentId(location.id);
    setFormData({
      name: location.name,
      address: location.address,
      city: location.city,
      county: location.county,
      postcode: location.postcode
    });
    
    setModalProps({
      title: 'Confirm Edit',
      message: 'Are you sure you want to edit this location?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        const submitAction = () => {
          fetch(`/api/locations/${currentId}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
            .then(res => res.json())
            .then(data => {
              setLocations(locations.map(loc => (loc.id === currentId ? data : loc)));
              setEditMode(false);
              setFormData({
                name: '',
                address: '',
                city: '',
                county: '',
                postcode: ''
              });
              showSuccess('Location successfully updated');
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
      message: 'Are you sure you want to delete this location?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        fetch(`/api/locations/${id}/`, {
          method: 'DELETE'
        })
          .then(() => {
            setLocations(locations.filter(location => location.id !== id));
            showSuccess('Location successfully deleted');
          })
          .catch(err => showError(err));
      }
    });
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Locations</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="county" placeholder="County" value={formData.county} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="postcode" placeholder="Postcode" value={formData.postcode} onChange={handleChange} className="block mb-2 p-2 border" />
        <button type="submit" className="bg-blue-500 text-white p-2">{editMode ? 'Update Location' : 'Add Location'}</button>
      </form>
      <ul>
        {locations.map(location => (
          <li key={location.id} className="mb-2 p-2 border">
            {location.name} - {location.address} - {location.city} - {location.county} - {location.postcode}
            <button onClick={() => handleEdit(location)} className="bg-yellow-500 text-white p-1 ml-2">Edit</button>
            <button onClick={() => handleDelete(location.id)} className="bg-red-500 text-white p-1 ml-2">Delete</button>
          </li>
        ))}
      </ul>
      <Modal show={showModal} {...modalProps} />
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
    </div>
  );
};

export default Location;
