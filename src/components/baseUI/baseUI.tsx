import { Fragment, ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import { Box } from '@mui/material';

interface BaseUIProps {
  children: ReactNode;
}

const BaseUI: React.FC<BaseUIProps> = ({ children }) => {
  return (
    <Fragment>
      <Header/>
      <Box sx={{marginTop:'5.5rem'}}>
        {children}
      </Box>
      <Footer />
    </Fragment>
  );
};

export default BaseUI;
