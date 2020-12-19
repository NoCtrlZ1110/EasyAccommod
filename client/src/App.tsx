import React from 'react';
import './App.css';
import DocumentTitle from 'react-document-title';
import { AppRouter } from './routes/AppRouter';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        transition={Flip}
        toastStyle={{ fontSize: 18 }}
      />
      <DocumentTitle title="Easy Accommod">
        <AppRouter />
      </DocumentTitle>
    </>
  );
}

export default App;
