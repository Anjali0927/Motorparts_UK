import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Notification from './Notification';

const Customers = () => {
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
              client: ''
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
                client: ''
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

  const getLocationNameById = (id) => {
    const location = locations.find(loc => loc.id === id);
    return location ? location.name : 'Unknown Location';
  };

  const getClientNameById = (id) => {
    const client = clients.find(cli => cli.id === id);
    return client ? client.name : 'Unknown Client';
  };

return (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Customers</h1>
    <div className="flex flex-row flex-wrap justify-between basis-3/12">
      <form onSubmit={handleSubmit} className="mb-4 w-full lg:w-1/2 xl:w-1/3">
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} className="block mb-2 w-full p-2 border" />
        <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} className="block mb-2 p-2 w-full border" />
        <input type="text" name="contact_info" placeholder="Contact Info" value={formData.contact_info} onChange={handleChange} className="block mb-2 w-full p-2 border" />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="block mb-2 w-full p-2 border" />
        <input type="text" name="customer_type" placeholder="Customer Type" value={formData.customer_type} onChange={handleChange} className="block mb-2 w-full p-2 border" />
        <select name="location" value={formData.location} onChange={handleChange} className="block mb-2 w-full p-2 border">
          <option value="">Select Location</option>
          {locations.map(location => (
            <option key={location.id} value={location.id}>{location.name}</option>
          ))}
        </select>
        <select name="client" value={formData.client} onChange={handleChange} className="block mb-2 w-full p-2 border">
          <option value="">Select Client</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2">{editMode ? 'Update Customer' : 'Add Customer'}</button>
      </form>
      <ul className="basis-7/12 lg:w-1/2 xl:w-2/3">
        {customers.map(customer => (
          <div key={customer.id} className="flex flex-row place-items-center border mb-2 p-2">
            <div>
              <p><strong>{customer.first_name} {customer.last_name}</strong></p>
              <p>{customer.contact_info}</p>
              <p>{customer.address}</p>
              <p>{customer.customer_type}</p>
              <p>{getLocationNameById(customer.location)}</p>
              <p>{getClientNameById(customer.client)}</p>
            </div>
            <div className='ml-auto'>
              <button onClick={() => handleEdit(customer)} className="bg-yellow-500 text-white p-1 ml-2">Edit</button>
              <button onClick={() => handleDelete(customer.id)} className="bg-red-500 text-white p-1 ml-2">Delete</button>
            </div>
          </div>
        ))}
      </ul>
    </div>
    <Modal show={showModal} {...modalProps} />
    <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
  </div>
);
}

export default Customers;
