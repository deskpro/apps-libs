import React from 'react';
import DeskproApp from './DeskproApp';
import AppFrame from '../AppFrame';

const DefaultDeskproApp = ( { dpapp, phrasePacks, children, ...props} ) => (
  <DeskproApp dpapp={dpapp} phrasePacks={phrasePacks}>
    <AppFrame {...props}>
      {children}
    </AppFrame>
  </DeskproApp>
);

export default DefaultDeskproApp;
