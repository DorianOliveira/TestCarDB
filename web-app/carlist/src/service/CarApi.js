import { BaseRequest } from "./BaseRequest";

export default class CarApi extends BaseRequest {

    async GetAll() {

        const data = await super.GetList('cars');
        return data;
    }

    loadItem(item) {
        
        return item;
    }
}