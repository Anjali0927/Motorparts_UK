import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Notification from './Notification';

useEffect(() => {
    fetch('/api/locations/')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => showError(err));
  }, []);