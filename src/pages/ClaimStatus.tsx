import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import prisma from '../lib/prisma';

// ... (keep the existing imports and interface)

const ClaimStatus: React.FC = () => {
  // ... (keep the existing state and useEffect)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const foundClaim = await prisma.claim.findFirst({
        where: {
          orderNumber: orderNumber,
          email: email
        }
      });
      setClaim(foundClaim);
    } catch (error) {
      console.error('Error fetching claim:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  // ... (keep the rest of the component unchanged)
};

export default ClaimStatus;