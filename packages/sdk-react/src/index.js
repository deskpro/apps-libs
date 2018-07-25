import React from 'react';
import ReactDOM from 'react-dom';
import { createApp, createMockApp } from '@deskpro/apps-sdk-core';

export const AppContext = React.createContext({
  dpapp: null
});

let windowDpApp = null;

export const getDpApp = () => windowDpApp;

export const bootReactApp = function(renderFn, options = { rootElementId: 'root' }) {

  if (window.IS_DEV_FRAME) {
    // This means the app is embedded in the dev frame, which is used for test dev
    return;
  }

  const mockWindow = process.env.DESKPRO_ENV && process.env.DESKPRO_ENV === 'test';
  const fn = mockWindow ? createMockApp : createApp;

  return new Promise((res, err) => {
    fn(dpapp => {
      windowDpApp = dpapp;

      ReactDOM.render(
        <AppContext.Provider value={{dpapp}}>{renderFn(dpapp)}</AppContext.Provider>,
        document.getElementById(options.rootElementId)
      );
    });
  });
}
