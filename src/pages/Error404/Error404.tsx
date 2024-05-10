import React from 'react';
import Error404Svg from './Error404svg';
import AppRoutes from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './Error404.css';

const Error404: React.FC = () => {
  const navigate = useNavigate();
  return (
      <>
      <div className="error404">
        <Error404Svg />
        <div className="message-box">
          <h1>404</h1>
          <p>Page not found</p>
          <Button onClick={() => navigate(AppRoutes.ABOUT)}>To main page</Button>
      </div>
      </div>
        
      </>
    );
};

export default Error404;
