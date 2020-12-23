import React from 'react';
import './App.css';
import DocumentTitle from 'react-document-title';
import { AppRouter } from './routes/AppRouter';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-chat-widget/lib/styles.css';

const App = () => {
  return (
    <>
      <ToastContainer
        position='bottom-right'
        transition={Flip}
        toastStyle={{ fontSize: 18 }}
      />
      <DocumentTitle title='Easy Accommod'>
        {/* <div id='background-left'>
          <div id='background-right'> */}
        <AppRouter />
        {/* </div>
        </div> */}
      </DocumentTitle>
    </>
  );
};

export default App;
