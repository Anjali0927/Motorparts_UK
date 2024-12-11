import React, { useState, useEffect } from 'react';

// Mock API service (replace with actual API calls)
const ApiService = {
  fetchSalesTeams: async () => {
    try {
      // Replace with actual API endpoint
      const response = await fetch('/api/salesteams');
      if (!response.ok) {
        throw new Error('Failed to fetch sales teams');
      }
      return response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  },

  createSalesTeam: async (teamData) => {
    try {
      const response = await fetch('/api/salesteams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
      });
      if (!response.ok) {
        throw new Error('Failed to create sales team');
      }
      return response.json();
    } catch (error) {
      console.error('Create error:', error);
      throw error;
    }
  },

  updateSalesTeam: async (id, teamData) => {
    try {
      const response = await fetch(`/api/salesteams/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
      });
      if (!response.ok) {
        throw new Error('Failed to update sales team');
      }
      return response.json();
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  },

  deleteSalesTeam: async (id) => {
    try {
      const response = await fetch(`/api/salesteams/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete sales team');
      }
      return true;
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }
};

// Simple Modal Component (if not already existing)
const Modal = ({ show, title, message, onConfirm, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose} 
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple Notification Component (if not already existing)
const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500'
  };

  return (
    <div 
      className={`fixed top-4 right-4 p-4 text-white rounded shadow-lg ${typeStyles[type] || typeStyles.success}`}
    >
      {message}
      <button 
        onClick={onClose} 
        className="ml-4 text-white font-bold"
      >
        ×
      </button>
    </div>
  );
};

const SalesTeams = () => {
  const [salesTeams, setSalesTeams] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    salesdepartment: '',
    salesengangementteam: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch sales teams on component mount
  useEffect(() => {
    loadSalesTeams();
  }, []);

  // Load sales teams
  const loadSalesTeams = async () => {
    setIsLoading(true);
    try {
      const data = await ApiService.fetchSalesTeams();
      setSalesTeams(data);
    } catch (error) {
      showError('Failed to load sales teams');
    } finally {
      setIsLoading(false);
    }
  };

  // Error notification handler
  const showError = (message) => {
    setNotification({ 
      message, 
      type: 'error' 
    });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  // Success notification handler
  const showSuccess = (message) => {
    setNotification({ message, type: 'success' });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.manager) {
      showError('Name and Manager are required');
      return;
    }

    // Confirmation modal
    setModalProps({
      title: editMode ? 'Confirm Edit' : 'Confirm Add',
      message: 'Are these details correct?',
      onClose: () => setShowModal(false),
      onConfirm: () => {
        setShowModal(false);
        submitSalesTeam();
      }
    });
    setShowModal(true);
  };

  // Submit sales team data
  const submitSalesTeam = async () => {
    setIsLoading(true);
    try {
      let result;
      if (editMode) {
        // Update existing team
        result = await ApiService.updateSalesTeam(currentId, formData);
        setSalesTeams(prevTeams => 
          prevTeams.map(team => 
            team.id === currentId ? result : team
          )
        );
        showSuccess('Sales team successfully updated');
      } else {
        // Add new team
        result = await ApiService.createSalesTeam(formData);
        setSalesTeams(prevTeams => [...prevTeams, result]);
        showSuccess('Sales team successfully added');
      }

      // Reset form
      resetForm();
    } catch (error) {
      showError(error.message || 'Failed to submit sales team');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: '',
      manager: '',
      salesdepartment: '',
      salesengangementteam: ''
    });
    setEditMode(false);
    setCurrentId(null);
    setShowEntryForm(false);
  };

  // Edit sales team handler
  const handleEdit = (team) => {
    setEditMode(true);
    setCurrentId(team.id);
    
    // Populate form with existing data
    setFormData({
      name: team.name,
      manager: team.manager,
      salesdepartment: team.salesdepartment,
      salesengangementteam: team.salesengangementteam
    });

    // Show entry form
    setShowEntryForm(true);
  };

  // Delete sales team handler
  const handleDelete = (id) => {
    setModalProps({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this sales team?',
      onClose: () => setShowModal(false),
      onConfirm: async () => {
        setShowModal(false);
        setIsLoading(true);
        
        try {
          await ApiService.deleteSalesTeam(id);
          
          // Remove team from list
          setSalesTeams(prevTeams => 
            prevTeams.filter(team => team.id !== id)
          );
          
          // Show success message
          showSuccess('Sales team successfully deleted');
        } catch (error) {
          showError('Failed to delete sales team');
        } finally {
          setIsLoading(false);
        }
      }
    });
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sales Teams Management</h1>
      
      {/* Add/Edit Team Button */}
      <div className="mb-4">
        <button 
          onClick={() => setShowEntryForm(!showEntryForm)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {showEntryForm ? 'Close Form' : 'Add New Sales Team'}
        </button>
      </div>

      {/* Form - Conditionally Rendered */}
      {showEntryForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">
            {editMode ? 'Edit Sales Team' : 'Add New Sales Team'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="name" 
              placeholder="Team Name" 
              value={formData.name} 
              onChange={handleChange} 
              className="p-2 border rounded w-full" 
              required
            />
            <input 
              type="text" 
              name="manager" 
              placeholder="Team Manager" 
              value={formData.manager} 
              onChange={handleChange} 
              className="p-2 border rounded w-full" 
              required
            />
            <input 
              type="text" 
              name="salesdepartment" 
              placeholder="Sales Department" 
              value={formData.salesdepartment} 
              onChange={handleChange} 
              className="p-2 border rounded w-full" 
            />
            <input 
              type="text" 
              name="salesengangementteam" 
              placeholder="Sales Engagement Team" 
              value={formData.salesengangementteam} 
              onChange={handleChange} 
              className="p-2 border rounded w-full" 
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            {editMode && (
              <button 
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : (editMode ? 'Update Team' : 'Add Team')}
            </button>
          </div>
        </form>
      )}

      {/* Sales Teams List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Existing Sales Teams</h2>
        {isLoading ? (
          <p className="text-gray-500">Loading sales teams...</p>
        ) : salesTeams.length === 0 ? (
          <p className="text-gray-500">No sales teams found</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {salesTeams.map(team => (
              <div 
                key={team.id} 
                className="border rounded p-4 bg-white shadow-md"
              >
                <h3 className="text-lg font-bold mb-2">{team.name}</h3>
                <p><strong>Manager:</strong> {team.manager}</p>
                <p><strong>Department:</strong> {team.salesdepartment}</p>
                <p><strong>Engagement Team:</strong> {team.salesengangementteam}</p>
                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={() => handleEdit(team)} 
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(team.id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal and Notification Components */}
      <Modal 
        show={showModal} 
        {...modalProps} 
      />
      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={() => setNotification({ message: '', type: '' })} 
      />
    </div>
  );
};

export default SalesTeams;