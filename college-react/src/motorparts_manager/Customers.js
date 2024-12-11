import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Notification from './Notification';
import client from './Clients';



const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    contact_info: '',
    address: '',
    customer_type: '',
    location: '',
    client: ''
  });

  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetch('/api/customers/')
      .then(res => res.json())
      .then(data => setCustomers(data))
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
        fetch(`/api/customers/${currentId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(res => res.json())
          .then(data => {
            setCustomers(customers.map(loc => (loc.id === currentId ? data : loc)));
            setEditMode(false);
            setFormData({
              first_name: '',
              last_name: '',
              contact_info: '',
              address: '',
              customer_type: '',
              location: '',
              client: '',
            });
            showSuccess('Customer successfully updated');
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
            setCustomers([...customers, data]);
            setFormData({
              first_name: '',
              last_name: '',
              contact_info: '',
              address: '',
              customer_type: '',
              location: '',
              client: ''
            });
            showSuccess('Customer successfully added');
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

  const handleEdit = (customer) => {
    setEditMode(true);
    setCurrentId(customer.id);
    setFormData({
      first_name: customer.first_name,
      last_name: customer.last_name,
      contact_info: customer.contact_info,
      address: customer.address,
      customer_type: customer.customer_type,
      location: customer.location,
      client: customer.client
    });
    
    setModalProps({
      title: 'Confirm Edit',
      message: 'Are you sure you want to edit this customer?',
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
              setCustomers(customers.map(loc => (loc.id === currentId ? data : loc)));
              setEditMode(false);
              setFormData({
                first_name: '',
                last_name: '',
                contact_info: '',
                address: '',
                customer_type: '',
                location: '',
                client: ''
              });
              showSuccess('Customer successfully updated');
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
        fetch(`/api/locations/${id}/`, {
          method: 'DELETE'
        })
          .then(() => {
            setCustomers(customers.filter(customer => customer.id !== id));
            showSuccess('Customer successfully deleted');
          })
          .catch(err => showError(err));
      }
    });
    setShowModal(true);
  };

  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="first_name" placeholder="first_name" value={formData.first_name} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="last_name" placeholder="last_name" value={formData.last_name} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="contact_info" placeholder="contact_info" value={formData.contact_info} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="address" placeholder="address" value={formData.address} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="customer_type" placeholder="customer_type" value={formData.customer_type} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="location" placeholder="location" value={formData.location} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name=" client" placeholder=" client" value={formData.client} onChange={handleChange} className="block mb-2 p-2 border" />
        <button type="submit" className="bg-blue-500 text-white p-2">{editMode ? 'Update Customer' : 'Add Customer'}</button>
      </form>
      <ul>
        {customers.map(customer => (
          <li key={customer.id} className="mb-2 p-2 border">
            {customer.name} - {customer.customerID} - {customer.city} - {customer.phone} - {customer.email}
            <button onClick={() => handleEdit(customer)} className="bg-yellow-500 text-white p-1 ml-2">Edit</button>
            <button onClick={() => handleDelete(customer.id)} className="bg-red-500 text-white p-1 ml-2">Delete</button>
          </li>
        ))}
      </ul>
      <Modal show={showModal} {...modalProps} />
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
    </div>
  );
};

export default Customer;


 
