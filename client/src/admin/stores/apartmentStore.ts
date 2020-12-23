import { action, observable } from 'mobx';
import apartmentService from "../services/apartment/apartmentService";
import {PagedResultDto} from "../services/dto/pagedResultDto";
import {ApartmentOutput} from "../services/apartment/dto/apartmentOutput";
import {GetListApartmentInput} from "../services/apartment/dto/getListApartmentInput";
import {ApproveNewsInput} from "../services/apartment/dto/approveNewsInput";

class ApartmentStore {
    @observable apartment!: PagedResultDto<ApartmentOutput>;

    @action
    public getListApartmentForAdmin = async (input: GetListApartmentInput) => {
        this.apartment = await apartmentService.getListAppartmentOfAdmin(input);
    };
    @action
    async approveNews (input: ApproveNewsInput) {
        await apartmentService.approveNews(input);
        this.apartment.items=this.apartment.items.filter((x:ApartmentOutput)=>x.id!==input.apartmentId)
    };
}

export default ApartmentStore;
