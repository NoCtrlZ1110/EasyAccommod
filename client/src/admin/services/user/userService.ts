import { ChangeLanguagaInput } from './dto/changeLanguageInput';
import { CreateOrUpdateUserInput } from './dto/createOrUpdateUserInput';
import { EntityDto } from '../dto/entityDto';
import { GetAllUserOutput } from './dto/getAllUserOutput';
import { PagedResultDto } from '../dto/pagedResultDto';
import { PagedUserResultRequestDto } from "./dto/PagedUserResultRequestDto";
import { UpdateUserInput } from './dto/updateUserInput';
import http from '../httpService';
import {EntityId} from "../dto/entityId";
import {toast} from "react-toastify";
import history from "../../../services/history";

class UserService {
  public async create(createUserInput: CreateOrUpdateUserInput) {
    let result = await http.post('/services/app/User/Create', createUserInput);
    return result.data.result;
  }
  public  async approve(entityDto: EntityId){
    await http.post('/services/app/User/ActiveUser', entityDto).then(() => {
      toast.success(
          '✅ Tài khoản này đã được kích hoạt!'
      );
      history.push('/admin/management_user/approve');
    });
  }
  public  async block(entityDto: EntityId){
    await http.post('/services/app/User/BlockUser', entityDto).then(() => {
      toast.success(
          '✅ Tài khoản này đã bị khóa!'
      );
      history.push('/admin/management_user/active');
    });
  }
  public async update(updateUserInput: UpdateUserInput) {
    let result = await http.put('/services/app/User/Update', updateUserInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('/services/app/User/Delete', { params: entityDto });
    return result.data;
  }

  public async getRoles() {
    let result = await http.get('/services/app/User/GetRoles');
    return result.data.result.items;
  }

  public async changeLanguage(changeLanguageInput: ChangeLanguagaInput) {
    let result = await http.post('/services/app/User/ChangeLanguage', changeLanguageInput);
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<CreateOrUpdateUserInput> {
    let result = await http.get('/services/app/User/Get', { params: entityDto });
    return result.data.result;
  }

    public async getAll(pagedFilterAndSortedRequest: PagedUserResultRequestDto): Promise<PagedResultDto<GetAllUserOutput>> {
    let result = await http.get('/services/app/User/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }
}

export default new UserService();
