import React from 'react';
import './App.css';
import DocumentTitle from 'react-document-title';
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <>
      <DocumentTitle title="Easy Accommod">
        {/* <GoogleAuthProvider> */}
        <AppRouter />
        {/* </GoogleAuthProvider> */}
      </DocumentTitle>
    </>
  );
}

export default App;
