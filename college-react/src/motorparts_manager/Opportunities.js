import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Notification from './Notification';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    value: '',
    status: '',
    customer: '',
    sales_team: '',
    location: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetch('/api/opportunities/')
      .then(res => res.json())
      .then(data => setOpportunities(data))
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
        fetch(`/api/opportunities/${currentId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(res => res.json())
          .then(data => {
            setOpportunities(opportunities.map(op => (op.id === currentId ? data : op)));
            setEditMode(false);
            setFormData({
              name: '',
              description: '',
              value: '',
              status: '',
              customer: '',
              sales_team: '',
              location: ''
            });
            showSuccess('Opportunity successfully updated');
          })
          .catch(err => showError(err));
      } else {
        fetch('/api/opportunities/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(res => res.json())
          .then(data => {
            setOpportunities([...opportunities, data]);
            setFormData({
              name: '',
              description: '',
              value: '',
              status: '',
              customer: '',
              sales_team: '',
              location: ''
            });
            showSuccess('Opportunity successfully added');
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

  const handleEdit = (opportunity) => {
    setEditMode(true);
    setCurrentId(opportunity.id);
    setFormData({
      name: opportunity.name,
      description: opportunity.description,
      value: opportunity.value,
      status: opportunity.status,
      customer: opportunity.customer,
      sales_team: opportunity.sales_team,
      location: opportunity.location
    });

    setModalProps({
      title: 'Confirm Edit',
      message: 'Are you sure you want to edit this opportunity?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        const submitAction = () => {
          fetch(`/api/opportunities/${currentId}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
            .then(res => res.json())
            .then(data => {
              setOpportunities(opportunities.map(op => (op.id === currentId ? data : op)));
              setEditMode(false);
              setFormData({
                name: '',
                description: '',
                value: '',
                status: '',
                customer: '',
                sales_team: '',
                location: ''
              });
              showSuccess('Opportunity successfully updated');
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
      message: 'Are you sure you want to delete this opportunity?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        fetch(`/api/opportunities/${id}/`, {
          method: 'DELETE'
        })
          .then(() => {
            setOpportunities(opportunities.filter(op => op.id !== id));
            showSuccess('Opportunity successfully deleted');
          })
          .catch(err => showError(err));
      }
    });
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Opportunities</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="number" name="value" placeholder="Value" value={formData.value} onChange={handleChange} className="block mb-2 p-2 border" />
        <select name="status" value={formData.status} onChange={handleChange} className="block mb-2 p-2 border">
          <option value="">Select Status</option>
          <option value="new">New</option>
          <option value="qualified">Qualified</option>
          <option value="proposal_sent">Proposal Sent</option>
          <option value="negotiation">Negotiation</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
          <option value="on_hold">On Hold</option>
          <option value="closed">Closed</option>
          <option value="disqualified">Disqualified</option>
          <option value="follow_up">Follow-Up Required</option>
        </select>
        <input type="text" name="customer" placeholder="Customer" value={formData.customer} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="sales_team" placeholder="Sales Team" value={formData.sales_team} onChange={handleChange} className="block mb-2 p-2 border" />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="block mb-2 p-2 border" />
        <button type="submit" className="bg-blue-500 text-white p-2">{editMode ? 'Update Opportunity' : 'Add Opportunity'}</button>
      </form>
      <ul>
        {opportunities.map(opportunity => (
          <li key={opportunity.id} className="mb-2 p-2 border">
            {opportunity.name} - {opportunity.description} - {opportunity.value} - {opportunity.status} - {opportunity.customer} - {opportunity.sales_team} - {opportunity.location}
            <button onClick={() => handleEdit(opportunity)} className="bg-yellow-500 text-white p-1 ml-2">Edit</button>
            <button onClick={() => handleDelete(opportunity.id)} className="bg-red-500 text-white p-1 ml-2">Delete</button>
          </li>
        ))}
      </ul>
      <Modal show={showModal} {...modalProps} />
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
    </div>
  );
};

export default Opportunities;
