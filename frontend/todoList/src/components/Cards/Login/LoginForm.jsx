import React, { useState } from 'react';
import { Card, Input, Button } from "@material-tailwind/react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoginAPI } from '../../../api/auth/AuthController.js';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    const payload = {
        "email": email,
        "password": password
    }

    await LoginAPI(payload);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister= () => {
    window.location.replace('/register')
  }

  return (
    <Card className="px-10 py-20 w-1/4 h-auto flex flex-col justify-center shadow-lg align-middle gap-10 content-center text-center">

        <p className="text-3xl">
          Login
        </p>

      <Input type="email" label="Email" value={email} onChange={handleEmailChange}/>

      <Input
        type={showPassword ? "text" : "password"}
        value={password}
        label="Password"
        onChange={handlePasswordChange}
        icon={
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="focus:outline-none text-gray-600 "
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        }
      />

      <Button
        onClick={handleLogin}
      >
        Login
      </Button>

        <a
          className='underline cursor-pointer'
          onClick={handleRegister}
        >
          Don't have a account register?
        </a>
    </Card>
  );
};

export default LoginForm;
