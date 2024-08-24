"use client"
import { useContext } from 'react';
import { UserContext } from './UserContext';

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context.user;
}

export default useUser;
