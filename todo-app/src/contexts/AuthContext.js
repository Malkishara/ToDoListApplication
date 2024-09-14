import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isLogin, setIsLogin] = useState(false); 
  const [users, setUsers] = useState([]); 

 
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers)); 
    }

    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); 
      setIsLogin(true); 
    }
  }, []);

  // Register a new user
  const signup = (name, email, password) => {
    
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return { success: false, message: 'User already registered with this email' };
    }

   
    const newUser = { name, email, password };
    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers); 
    localStorage.setItem('users', JSON.stringify(updatedUsers)); 
    return { success: true, message: 'Registration successful! You can now log in.' };
  };

  // Login an existing user
  const login = (email, password) => {
    
    const existingUser = users.find(user => user.email === email);
    if (!existingUser) {
      return { success: false, message: 'No user found with this email.' };
    }

   
    if (existingUser.password !== password) {
      return { success: false, message: 'Incorrect Email or Password.' };
    }

    
    setUser(existingUser);
    setIsLogin(true);
    localStorage.setItem('loggedInUser', JSON.stringify(existingUser)); 
    return { success: true, message: 'Login successful!' };
  };

  // Logout the user
  const logout = () => {
    setUser(null);
    setIsLogin(false);
    localStorage.removeItem('loggedInUser'); 
    return { success: true, message: 'Logged out successfully.' };
  };

  return (
    <AuthContext.Provider value={{ user, isLogin, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
