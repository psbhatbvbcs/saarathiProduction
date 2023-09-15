import React, { useEffect } from 'react'
import Hero from 'components/Landing/Hero'
import Companies from 'components/Landing/Companies';
import Guide from 'components/Landing/Guide';
import Details from 'components/Landing/Details';
import ComingSoon from 'components/Landing/ComingSoon';
import GetStarted from 'components/Landing/GetStarted';

import Footer from 'components/Landing/Footer';

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

const Landing = () => {

  const isAuthenticated = useSelector((state) => state.app.isAuthenticated)

  useEffect(() => {
    document.title = "CC | Home"
  }, [])

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <>
        <Hero />
        <Companies />
        <Guide />
        <Details />
        <ComingSoon />
        <GetStarted />
        <Footer />
    </>
  );

};

export default Landing