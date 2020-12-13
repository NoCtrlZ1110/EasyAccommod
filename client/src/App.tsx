import React from 'react';
import './App.css';
import DocumentTitle from 'react-document-title';
import { AppRouter } from './routes/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <DocumentTitle title="Easy Accommod">
        <AppRouter />
      </DocumentTitle>
    </>
  );
}

export default App;
