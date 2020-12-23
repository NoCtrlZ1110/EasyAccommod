import {toast} from 'react-toastify';
import {API_URL} from '../config';
import API from './api';
import history from './history';

export const register = (values: any) => {
    return API.post(API_URL + 'services/app/User/Create', values)
        .then((response) => {
            const data = response.data;
            if (data.success) {
                if (values.roleNames[0] === 'Renter')
                    toast.success('✅ Đăng ký thành công, đăng nhập ngay!');
                else
                    toast.success(
                        '✅ Gửi yêu cầu đăng ký thành công, hãy chờ người kiểm duyệt phê duyệt tài khoản của bạn!'
                    );
                history.push('/login');
            }
        })
        .catch((error) => {
            const err = error.response.data.error;
            toast.error(err.message + (err.details ? '\n' + err.details : ''));
        });
};

export const login = (
    username: string,
    password: string,
    remember: boolean
) => {
    return API.post(API_URL + 'TokenAuth/Authenticate', {
        userNameOrEmailAddress: username,
        password,
        rememberClient: remember,
    })
        .then((response) => {
            const data = response.data;
            if (data.success) {
                localStorage.setItem(
                    'accessToken',
                    JSON.stringify(response.data.result.accessToken)
                );
                const id = data.result.userId;

                API.get(API_URL + `services/app/User/Get?Id=${id}`).then((response) => {
                    localStorage.setItem('user', JSON.stringify(response.data.result));
                    window.location.href = '/';
                    toast.success('Đăng nhập thành công 🚀');
                });
            }
            return response.data;
        })
        .catch((error) => {
            const err = error?.response?.data.error;
            if (err) {
            }
        });
};
export const loginAdmin = (
    username: string,
    password: string,
    remember: boolean
) => {
    return API.post(API_URL + 'TokenAuth/Authenticate', {
        userNameOrEmailAddress: username,
        password,
        rememberClient: remember,
    })
        .then((response) => {
            const data = response.data;
            if (data.result.userId===1) {
                toast.success(
                    '✅ Thành công'
                );
                localStorage.setItem(
                    'accessToken',
                    JSON.stringify(response.data.result.accessToken)
                );
                const id = data.result.userId;
                API.get(API_URL + `services/app/User/Get?Id=${id}`).then((response) => {
                    localStorage.setItem('user', JSON.stringify(response.data.result));
                    window.location.href = '/admin/dashboard';
                    toast.success('Đăng nhập thành công 🚀');
                });
            }
            else {
                toast.error(
                    '✅ Bạn không phải admin'
                );
            }
            return response.data;
        })
        .catch((error) => {
            const err = error.response.data.error;
            toast.error(err.message + (err.details ? '\n' + err.details : ''));
        });
};

export const logout = () => {
    localStorage.clear();
    window.location.href = '/';
};

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};
export const getAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken') as string;
    return accessToken ? JSON.parse(accessToken) : null;
};
export const getUserId = () => {
    const userId = JSON.parse(localStorage.getItem('user')!).id as number;
    return userId;
}
export const getCurrentUser = async () => {
    await API.get(
        API_URL +
        `services/app/User/Get?Id=${JSON.parse(localStorage.getItem('user')!).id}`
    ).then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data.result));
    });
};

export const updateUser = (data: any) => {
    API.put(API_URL + `services/app/User/Update`, data)
        .then((response) => {
            const data = response.data;
            if (data.success) {
                getCurrentUser().then(() => {
                    toast.success('Cập nhật user thành công!');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                });
            }
            return response.data;
        })
        .catch((error) => {
            const err = error.response.data.error;
            toast.error(err.message + (err.details ? '\n' + err.details : ''));
        });
};

export const changePassword = (
    currentPassword: string,
    newPassword: string
) => {
    return API.post(
        API_URL + 'services/app/User/ChangePassword',
        {
            currentPassword: currentPassword,
            newPassword: newPassword,
        },

        {headers: {Authorization: 'Bearer ' + getAccessToken()}}
    )
        .then((response) => {
            const data = response.data;
            if (data.success) {
                toast.success('✅ Đổi mật khẩu thành công');
                history.push('/profile');
            }
        })
        .catch((error) => {
            const err = error.response.data.error;
            toast.error(err.message + (err.details ? '\n' + err.details : ''));
        });
};
