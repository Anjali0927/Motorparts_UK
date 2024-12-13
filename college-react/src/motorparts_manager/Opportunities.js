import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Notification from './Notification';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [salesTeams, setSalesTeams] = useState([]);
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    value: '',
    status: 'new',
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

    fetch('/api/customers/')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => showError(err));

    fetch('/api/salesteams/')
      .then(res => res.json())
      .then(data => setSalesTeams(data))
      .catch(err => showError(err));

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
    const { name, value } = e.target;
    console.log(`Field: ${name}, Value: ${value}`);  // Debugging line
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      customer: parseInt(formData.customer, 10),
      sales_team: parseInt(formData.sales_team, 10),
      location: parseInt(formData.location, 10),
    };

    console.log("Submitting data:", formattedData);

    const submitAction = () => {
      if (editMode) {
        fetch(`/api/opportunities/${currentId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData),
        })
          .then(res => {
            if (!res.ok) {
              return res.json().then(err => Promise.reject(err));
            }
            return res.json();
          })
          .then(data => {
            setOpportunities(opportunities.map(opportunity => (opportunity.id === currentId ? data : opportunity)));
            setEditMode(false);
            setFormData({
              name: '',
              description: '',
              value: '',
              status: 'new',
              customer: '',
              sales_team: '',
              location: ''
            });
            showSuccess('Opportunity successfully updated');
          })
          .catch(err => showError(`Error updating opportunity: ${JSON.stringify(err)}`));
      } else {
        fetch('/api/opportunities/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData),
        })
          .then(res => {
            if (!res.ok) {
              return res.json().then(err => Promise.reject(err));
            }
            return res.json();
          })
          .then(data => {
            setOpportunities([...opportunities, data]);
            setFormData({
              name: '',
              description: '',
              value: '',
              status: 'new',
              customer: '',
              sales_team: '',
              location: ''
            });
            showSuccess('Opportunity successfully added');
          })
          .catch(err => showError(`Error adding opportunity: ${JSON.stringify(err)}`));
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

  const handleEdit = (opportunity) => {
    setEditMode(true);
    setCurrentId(opportunity.id);
    setFormData({
      name: opportunity.name,
      description: opportunity.description,
      value: opportunity.value,
      status: opportunity.status,
      customer: String(opportunity.customer),
      sales_team: String(opportunity.sales_team),
      location: String(opportunity.location),
    });
  
    setModalProps({
      title: 'Confirm Edit',
      message: 'Are you sure you want to edit this opportunity?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        const formattedData = {
          ...formData,
          customer: parseInt(formData.customer, 10),
          sales_team: parseInt(formData.sales_team, 10),
          location: parseInt(formData.location, 10),
        };
        console.log("Submitting data for edit:", formattedData);
        fetch(`/api/opportunities/${currentId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData),
        })
          .then(res => {
            console.log("PUT Response:", res);
            if (!res.ok) {
              return res.json().then(err => Promise.reject(err));
            }
            return res.json();
          })
          .then(data => {
            console.log("PUT Data:", data);
            setOpportunities(opportunities.map(opportunity => (opportunity.id === currentId ? data : opportunity)));
            setEditMode(false);
            setFormData({
              name: '',
              description: '',
              value: '',
              status: 'new',
              customer: '',
              sales_team: '',
              location: ''
            });
            showSuccess('Opportunity successfully updated');
          })
          .catch(err => {
            console.error("PUT Error:", err);
            showError(`Error updating opportunity: ${JSON.stringify(err)}`);
          });
      },
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
          method: 'DELETE',
        })
          .then(() => {
            setOpportunities(opportunities.filter(opportunity => opportunity.id !== id));
            showSuccess('Opportunity successfully deleted');
          })
          .catch(err => showError(err));
      },
    });
    setShowModal(true);
  };
  const getCustomerNameById = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? `${customer.first_name} ${customer.last_name}` : 'Unknown';
  };
  
  const getSalesTeamNameById = (teamId) => {
    const salesTeam = salesTeams.find(t => t.id === teamId);
    return salesTeam ? salesTeam.name : 'Unknown';
  };
  
  const getLocationNameById = (locationId) => {
    const location = locations.find(l => l.id === locationId);
    return location ? location.name : 'Unknown';
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Opportunities</h1>
      <div className="flex flex-row flex-wrap justify-between basis-3/12">
        <form onSubmit={handleSubmit} className="mb-4 w-full lg:w-1/2 xl:w-1/3">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="block mb-2 p-2 border w-full" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="block mb-2 p-2 border w-full" />
          <input type="number" name="value" placeholder="Value" value={formData.value} onChange={handleChange} className="block mb-2 p-2 border w-full" />
          <select name="status" value={formData.status} onChange={handleChange} className="block mb-2 p-2 border w-full">
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
          <select name="customer" value={formData.customer} onChange={handleChange} className="block mb-2 p-2 border w-full">
            <option value="">Select Customer</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.first_name} {customer.last_name}
              </option>
            ))}
          </select>
          <select name="sales_team" value={formData.sales_team} onChange={handleChange} className="block mb-2 p-2 border w-full">
            <option value="">Select Sales Team</option>
            {salesTeams.map(team => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <select name="location" value={formData.location} onChange={handleChange} className="block mb-2 p-2 border w-full">
            <option value="">Select Location</option>
            {locations.map(location => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2">{editMode ? 'Update Opportunity' : 'Add Opportunity'}</button>
        </form>
        <ul className="basis-7/12 lg:w-1/2 xl:w-2/3">
          {opportunities.map(opportunity => (
            <li key={opportunity.id} className="mb-2 p-2 w-full border">
              <div className="flex justify-between">
                <div>
                  <p><strong>Name:</strong> {opportunity.name}</p>
                  <p><strong>Description:</strong> {opportunity.description}</p>
                  <p><strong>Value:</strong> ${opportunity.value.toLocaleString()}</p>
                  <p><strong>Status:</strong> {opportunity.status}</p>
                  <p><strong>Customer:</strong> {getCustomerNameById(opportunity.customer)}</p>
                  <p><strong>Sales Team:</strong> {getSalesTeamNameById(opportunity.sales_team)}</p>
                  <p><strong>Location:</strong> {getLocationNameById(opportunity.location)}</p>
                </div>
                <div>
                  <button onClick={() => handleEdit(opportunity)} className="bg-yellow-500 text-white p-1 ml-2">Edit</button>
                  <button onClick={() => handleDelete(opportunity.id)} className="bg-red-500 text-white p-1 ml-2">Delete</button>
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
  
}  

  export default Opportunities;
