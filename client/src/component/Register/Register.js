import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Register.css';
import { registerUser } from './../../api/api';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'buyer',
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            userName: formData.username,
            email: formData.email,
            password: formData.password,
            userType: formData.role,
        };

        try {
            const data = await registerUser(userData);
            console.log('Registration successful:', data);
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Create an Account</h2>
                <p>Join us and start your floral journey!</p>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            placeholder="Choose a username"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Create a password"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="role">Are you a...</label>
                        <select id="role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required>
                            <option value="Buyer">Buyer</option>
                            <option value="Seler">Seller</option>
                        </select>
                    </div>
                    <button type="submit" className="register-button">Sign Up</button>
                </form> 
                <div className="register-footer">
                    <p>Already have an account? <NavLink to="/login">Log in</NavLink></p>
                </div>
            </div>
        </div>
    );
};

export default Register;