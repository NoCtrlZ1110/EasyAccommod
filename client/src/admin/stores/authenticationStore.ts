import { action, observable } from 'mobx';
import LoginModel from '../models/Login/loginModel';
import tokenAuthService from '../services/tokenAuth/tokenAuthService';


class AuthenticationStore {
  @observable loginModel: LoginModel = new LoginModel();

  get isAuthenticated(): boolean {
    if (localStorage.getItem('user')==null) return false;

    return true;
  }

  @action
  public async login(model: LoginModel) {
    await tokenAuthService.authenticate({
      userNameOrEmailAddress: model.userNameOrEmailAddress,
      password: model.password,
      rememberClient: model.rememberMe,
    });
  }
  @action
  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
export default AuthenticationStore;
