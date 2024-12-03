import React, { useState } from 'react';
import { Card, Input, Button } from "@material-tailwind/react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { RegisterAPI } from '../../../api/auth/AuthController.js';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    if (!userName.trim()) {
      newErrors.userName = "User Name is required.";
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "A valid email is required.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
      newErrors.password = "Password must be at least 6 characters, and contain at least one letter, one number, and one special character.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return; // Exit if validation fails
    }

    const payload = {
      userName,
      email,
      password,
    };

    try {
      await RegisterAPI(payload);
      alert('Registration successful! Redirecting to login...');
      window.location.replace('/login');
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Failed to register. Please try again later.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
    window.location.replace('/login');
  };

  return (
    <Card className="px-10 py-20 w-1/4 h-auto flex flex-col justify-center shadow-lg align-middle gap-6 content-center text-center">
      <p className="text-3xl">Register</p>

      {/* User Name Field */}
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          label="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          error={Boolean(errors.userName)}
        />
        {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-2">
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-2">
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(errors.password)}
          icon={
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="focus:outline-none text-gray-600"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          }
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      {/* Confirm Password Field */}
      <div className="flex flex-col gap-2">
        <Input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          label="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={Boolean(errors.confirmPassword)}
          icon={
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="focus:outline-none text-gray-600"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          }
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
      </div>

      {/* Register Button */}
      <Button
        onClick={handleSubmit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        Register
      </Button>

      {/* Redirect to Login */}
      <a className="underline cursor-pointer" onClick={handleLogin}>
        Already have an account?
      </a>
    </Card>
  );
};

export default RegisterForm;
