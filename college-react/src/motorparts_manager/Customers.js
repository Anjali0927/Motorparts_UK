import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Notification from './Notification';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    contact_info: '',
    address: '',
    customer_type: '',
    location: '',
    client: '',
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
    
    fetch('/api/locations/')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => showError(err));
    
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitAction = () => {
      if (editMode) {
        fetch(`/api/customers/${currentId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then(res => res.json())
          .then(data => {
            setCustomers(customers.map(customer => (customer.id === currentId ? data : customer)));
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
        fetch('/api/customers/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
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
              client: '',
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
      },
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
      location: customer.location.id,
      client: customer.client.id,
    });

    setModalProps({
      title: 'Confirm Edit',
      message: 'Are you sure you want to edit this customer?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        const submitAction = () => {
          fetch(`/api/customers/${currentId}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
            .then(res => res.json())
            .then(data => {
              setCustomers(customers.map(customer => (customer.id === currentId ? data : customer)));
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
        };
        submitAction();
      },
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
        fetch(`/api/customers/${id}/`, {
          method: 'DELETE',
        })
          .then(() => {
            setCustomers(customers.filter(customer => customer.id !== id));
            showSuccess('Customer successfully deleted');
          })
          .catch(err => showError(err));
      },
    });
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="contact_info" placeholder="Contact Info" value={formData.contact_info} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="customer_type" placeholder="Customer Type" value={formData.customer_type} onChange={handleChange} className="block mb-2 p-2 border" />
        <select name="location" value={formData.location} onChange={handleChange} className="block mb-2 p-2 border">
          <option value="">Select Location</option>
          {locations.map(location => (
            <option key={location.id} value={location.id}>{location.name}</option>
          ))}
        </select>
        <select name="client" value={formData.client} onChange={handleChange} className="block mb-2 p-2 border">
          <option value="">Select Client</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2">{editMode ? 'Update Customer' : 'Add Customer'}</button>
      </form>
      <ul>
        {customers.map(customer => (
          <li key={customer.id} className="mb-2 p-2 border">
            {customer.first_name} {customer.last_name} - {customer.contact_info} - {customer.address} - {customer.customer_type} - {customer.location.name} - {customer.client.name}
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
