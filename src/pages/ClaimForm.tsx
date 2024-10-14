import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import prisma from '../lib/prisma';

// ... (keep the existing imports and interface)

const ClaimForm: React.FC = () => {
  // ... (keep the existing state and handleChange function)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newClaim = await prisma.claim.create({
        data: {
          ...formData,
          status: 'Pending'
        }
      });
      navigate('/status', { state: { claimId: newClaim.id } });
    } catch (error) {
      console.error('Error submitting claim:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  // ... (keep the rest of the component unchanged)
};

export default ClaimForm;