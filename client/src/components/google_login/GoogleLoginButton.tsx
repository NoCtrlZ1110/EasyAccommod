import { Button } from 'antd';
import React from 'react';
import GOOGLE_LOGO from '../../assets/images/google.svg';
import { useGoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../const';
// refresh token
import { refreshTokenSetup } from '../../utils/refreshToken';

const clientId = GOOGLE_CLIENT_ID;

function GoogleLoginBtn() {
  const onSuccess = (res: any) => {
    localStorage.setItem('loginData', JSON.stringify(res.profileObj));
    localStorage.setItem('accessToken', res.accessToken);
    console.log('Login Success:', res);
    // alert(`Đăng nhập thành công, xin chào ${res.profileObj.name} 😍`);
    refreshTokenSetup(res);
    window.location.href = '/';
  };

  const onFailure = (res: any) => {
    console.log('Login failed: res:', res);
    alert(`Đăng nhập thất bại 😢`);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
  });

  return (
    <>
      <Button onClick={signIn} className="button">
        <img
          src={GOOGLE_LOGO}
          alt="google login"
          className="mb-1"
          height={20}
        ></img>
        <span className="buttonText ml-3">Đăng nhập với Google</span>
      </Button>
    </>
  );
}

export default GoogleLoginBtn;
