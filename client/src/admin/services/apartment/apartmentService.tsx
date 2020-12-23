import http from "../httpService";
import {GetListApartmentInput} from "./dto/getListApartmentInput";
import {PagedResultDto} from "../dto/pagedResultDto";
import {ApartmentOutput} from "./dto/apartmentOutput";
import {ApproveNewsInput} from "./dto/approveNewsInput";

class ApartmentService {
    public async getListAppartmentOfAdmin(getListApartmentInput: GetListApartmentInput): Promise<PagedResultDto<ApartmentOutput>> {
        let result = await http.get('/services/app/Apartment/GetListAppartmentOfAdmin', {params: getListApartmentInput});
        return result.data.result;
    }

    public async approveNews(approveNewInput: ApproveNewsInput) {
        await http.post('/services/app/Apartment/ApproveNews', approveNewInput);
    }
}

export default new ApartmentService();