import { Button } from 'antd';
import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../const';

const clientId = GOOGLE_CLIENT_ID;

function GoogleLogoutBtn() {
  const onLogoutSuccess = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const onFailure = () => {
    console.log('Login failed: res:');
    alert(`Đăng nhập thất bại 😢`);
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onFailure,
    onLogoutSuccess,
  });

  return (
    <>
      <Button onClick={signOut} className="button">
        <span className="buttonText">Sign out</span>
      </Button>
    </>
  );
}

export default GoogleLogoutBtn;
