//@flow
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import * as loadables from 'lib/loadables';

const PrivateRoutes = () => {
  const location = useLocation();
  return (
    <>
      <Routes location={location}>
        <Route path={'/*'} element={<loadables.LoadableDashboardModuleTemplateWithRoutes />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
