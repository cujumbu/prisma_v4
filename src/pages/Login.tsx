import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

const Login: React.FC = () => {
  // ... (keep the existing state and imports)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user && await bcrypt.compare(password, user.password)) {
        login({ email: user.email, isAdmin: user.isAdmin });
        navigate(user.isAdmin ? '/admin' : '/status');
      } else {
        const claim = await prisma.claim.findFirst({
          where: { email, orderNumber: password }
        });
        if (claim) {
          login({ email, isAdmin: false });
          navigate('/status', { state: { claimId: claim.id } });
        } else {
          setError('Invalid credentials');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  // ... (keep the rest of the component unchanged)
};

export default Login;