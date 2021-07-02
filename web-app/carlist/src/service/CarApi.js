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

    async Remove(id) {
        await super.Delete(`cars/delete/${id}`);
    }

    async Create(item) {

        this.body = item;
        const car = await super.Post(`cars/new`);
    }

    async Update(item) {

        this.body = item;
        const car = await super.Post(`cars/update`);
        return car;
    }

    loadItem(item) {
        return item;
    }
}