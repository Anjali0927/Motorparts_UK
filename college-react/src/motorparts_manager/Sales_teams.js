import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Notification from './Notification';

const SalesTeam = () => {
  const [salesTeams, setSalesTeams] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    sales_reps: [],
    customers: []
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Fetch users and customers for dropdown options
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('/api/salesteams/')
      .then(res => res.json())
      .then(data => setSalesTeams(data))
      .catch(err => showError(err));

    fetch('/api/users/')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => showError(err));

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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting data:", formData);
    const submitAction = () => {
      if (editMode) {
        fetch(`/api/salesteams/${currentId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then(res => res.json())
          .then(data => {
            setSalesTeams(salesTeams.map(team => (team.id === currentId ? data : team)));
            setEditMode(false);
            setFormData({
              name: '',
              manager: '',
              sales_reps: [],
              customers: []
            });
            showSuccess('Sales Team successfully updated');
          })
          .catch(err => showError(err));
      } else {
        fetch('/api/salesteams/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then(res => res.json())
          .then(data => {
            setSalesTeams([...salesTeams, data]);
            setFormData({
              name: '',
              manager: '',
              sales_reps: [],
              customers: []
            });
            showSuccess('Sales Team successfully added');
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

  const handleEdit = (team) => {
    setEditMode(true);
    setCurrentId(team.id);
    setFormData({
      name: team.name,
      manager: team.manager.id,
      sales_reps: team.sales_reps.map(rep => rep.id),
      customers: team.customers.map(customer => customer.id)
    });

    setModalProps({
      title: 'Confirm Edit',
      message: 'Are you sure you want to edit this sales team?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        const submitAction = () => {
          fetch(`/api/salesteams/${currentId}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
            .then(res => res.json())
            .then(data => {
              setSalesTeams(salesTeams.map(team => (team.id === currentId ? data : team)));
              setEditMode(false);
              setFormData({
                name: '',
                manager: '',
                sales_reps: [],
                customers: []
              });
              showSuccess('Sales Team successfully updated');
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
      message: 'Are you sure you want to delete this sales team?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        fetch(`/api/salesteams/${id}/`, {
          method: 'DELETE',
        })
          .then(() => {
            setSalesTeams(salesTeams.filter(team => team.id !== id));
            showSuccess('Sales Team successfully deleted');
          })
          .catch(err => showError(err));
      },
    });
    setShowModal(true);
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const values = Array.from(options).filter(option => option.selected).map(option => option.value);
    setFormData({
      ...formData,
      [name]: values,
    });
  };

  const getUserNameById = (id) => {
    const user = users.find(user => user.id === id);
    return user ? `${user.first_name} ${user.last_name}` : 'Unknown';
  };

  const getCustomerNameById = (id) => {
    const customer = customers.find(customer => customer.id === id);
    return customer ? `${customer.first_name} ${customer.last_name}` : 'Unknown';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sales Teams</h1>
      <div className="flex flex-row flex-wrap basis-3/12 justify-between">
        <form onSubmit={handleSubmit} className="mb-4 lg:w-1/2 xl:w-1/3">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="block mb-2 p-2 border w-full" />
          <select name="manager" value={formData.manager} onChange={handleChange} className="block mb-2 p-2 border w-full">
            <option value="">Select Manager</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
          <select multiple name="sales_reps" value={formData.sales_reps} onChange={handleMultiSelectChange} className="block mb-2 p-2 border w-full">
            <option value="">Select Sales Reps</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
          <select multiple name="customers" value={formData.customers} onChange={handleMultiSelectChange} className="block mb-2 p-2 border w-full">
            <option value="">Select Customers</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.first_name} {customer.last_name}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2">{editMode ? 'Update Sales Team' : 'Add Sales Team'}</button>
        </form>
        <ul className="basis-7/12 lg:w-1/2 xl:w-2/3">
          {salesTeams.map(team => (
            <li key={team.id} className="mb-2 p-2 border">
              <div className="flex justify-between">
                <div>
                  <p><strong>Name:</strong> {team.name}</p>
                  <p><strong>Manager:</strong> {getUserNameById(team.manager)}</p>
                  <p><strong>Sales Reps:</strong> {team.sales_reps.map(rep => getUserNameById(rep)).join(', ')}</p>
                  <p><strong>Customers:</strong> {team.customers.map(customer => getCustomerNameById(customer)).join(', ')}</p>
                </div>
                <div>
                  <button onClick={() => handleEdit(team)} className="bg-yellow-500 text-white p-1 ml-2">Edit</button>
                  <button onClick={() => handleDelete(team.id)} className="bg-red-500 text-white p-1 ml-2">Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal show={showModal} {...modalProps} />
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
    </div>
  );
};

export default SalesTeam;
