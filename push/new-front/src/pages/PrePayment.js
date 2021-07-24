import React from 'react';
import Navbar2 from '../components/navbar2';

import { Container } from '@material-ui/core';
import ShowCoupon from '../components/ShowCoupon';

const PrePayment = () => {
  return (
    <div style={{ flexDirection: 'column' }}>
      <Navbar2 />
      <ShowCoupon />
    </div>
  );
};

export default PrePayment;
