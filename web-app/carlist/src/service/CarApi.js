import { BaseRequest } from "./BaseRequest";

export default class CarApi extends BaseRequest {

    async GetAll() {

        const data = await super.GetList('cars');
        return data;
    }

    async GetById(id) {

        const car = await super.Get(`cars/${id}`);
        return car;
    }

    loadItem(item) {
        
        return item;
    }
}