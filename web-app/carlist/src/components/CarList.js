import { Component } from "react";
import CarApi from "../service/CarApi";
import { CarFormComponent } from "./CarForm";
import { CarRemoveComponent } from "./CarRemove";

export class CarListComponent extends Component {

    carApi;

    constructor(props) {
        super(props);
        this.carApi = new CarApi();
    }

    async componentDidMount() {
        this.getAll();
    }

    async getAll() {
        let cars = await this.carApi.GetAll();

        if (cars)
            cars.sort((item1, item2) => item1.id.toString().localeCompare(item2.id.toString()));

        this.setState(state => ({ cars }));
    }

    async onUpdateCar() {
        await this.getAll();
    }

    render() {

        let cars = [];

        let carDelete = null;

        if (this.state && this.state.cars)
            cars = this.state.cars;


        if (!cars || cars.length === 0) {
            return <h3>Nenhum carro encontrado!</h3>;
        }


        console.log(this.state?.carDelete);

        return (
            <div>
                <h2>Carros encontrados:</h2>
                <div class="container">

                    <div class="main-data">
                        <table class="table">
                            <thead>
                                <th>Id</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Ano</th>
                                <th colspan="2">Ações</th>
                            </thead>
                            <tbody>
                                {cars ? cars.map(car => {
                                    return <tr key={car.id}>
                                        <td>
                                            {car.id}
                                        </td>
                                        <td>
                                            {car.brand}
                                        </td>
                                        <td>
                                            {car.model}
                                        </td>
                                        <td>
                                            {car.year}
                                        </td>
                                        <td>
                                            <a class="action-link" onClick={() =>
                                                this.setState(state => ({ carEdit: car, carDelete: null, newCar: false }))
                                            }>Editar</a>
                                        </td>
                                        <td>
                                            <a class="action-link" onClick={() =>
                                                this.setState(state => ({ carDelete: car, carEdit: null, newCar: false }))
                                            }>Excluir</a>
                                        </td>
                                    </tr>

                                }) : []}

                            </tbody>
                        </table>
                        <button class="button" onClick={() =>
                            this.setState(state => ({ carDelete: null, carEdit: null, newCar: true }))
                        }>Novo carro</button>
                    </div>

                    <div class="action-data">
                        {this.state?.newCar ? <CarFormComponent onUpdate={__ => this.onUpdateCar()} new={true}></CarFormComponent> : []}
                        {this.state?.carEdit ? <CarFormComponent onUpdate={__ => this.onUpdateCar()} car={this.state.carEdit}></CarFormComponent> : []}
                        {this.state?.carDelete ? <CarRemoveComponent onUpdate={__ => this.onUpdateCar()} car={this.state.carDelete}></CarRemoveComponent> : []}
                    </div>
                </div>

            </div>

        );
    }
}