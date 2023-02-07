//@flow
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import * as loadables from 'lib/loadables';

const ModuleTemplateWithRoutes = () => {
  const location = useLocation();
  // TODO: Probably add User Context Provider here since almost every major component needs it
  return (
    <>
      <Routes location={location}>
        <Route path={'/*'} element={<loadables.LoadableDashboardScreen />} />
      </Routes>
    </>
  );
};

export default ModuleTemplateWithRoutes;
