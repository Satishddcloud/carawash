import Base from './BaseApi';
import { saveUserId, saveUserProfileInfo } from '../Constants/AsyncStorageHelper';

export default class UserAPI extends Base {
  
  async login(intl, data) {
    return this.apiClient.post(intl, 'api/Account/Login', data);
  }
  async Logout() {
    await saveUserId(undefined);
    await saveUserProfileInfo({});
  }

}
