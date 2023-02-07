import React from 'react';

// TODO: -hassan: Move all loadables to their corresponding modules

const makeLoadable = React.lazy;


/* Private Routes (Only accessible after login) */
export const LoadablePrivateRoutes = makeLoadable(
    () => import('modules/app/components/PrivateRoutes')
);

/* Dashboard Module */
export const LoadableDashboardModuleTemplateWithRoutes = makeLoadable(
    () => import('modules/dashboard/components/ModuleTemplateWithRoutes')
);

export const LoadableDashboardScreen = makeLoadable(() => import('modules/dashboard'));

