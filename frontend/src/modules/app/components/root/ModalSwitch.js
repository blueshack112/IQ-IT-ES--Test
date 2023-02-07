import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import * as loadables from 'lib/loadables';
import { CircularProgress } from '@mui/material';

/** Taken from https://reacttraining.com/react-router/web/example/modal-gallery */
const ModalSwitch = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<CircularProgress size={100} />}>
      <Routes location={location}>
        <Route path={'/*'} element={<loadables.LoadableDashboardModuleTemplateWithRoutes />} />
        {/* TODO: Add not found route: <Route component={loadables.LoadableNotFound} />*/}
      </Routes>
    </Suspense>
  );
};

export default ModalSwitch;
