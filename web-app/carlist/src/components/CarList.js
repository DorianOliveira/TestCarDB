import { Component } from "react";
import CarApi from "../service/CarApi";

export class CarListComponent extends Component {

    cars;
    carApi;

    constructor() {
        super();
        this.carApi = new CarApi();
    }

    async componentDidMount() {

        this.cars = await this.carApi.GetAll();

        this.setState({
            cars: this.cars
        });
    }

    getAll() {

    }

    render() {


        let cars = null 
        
        if (this.state?.cars)
            cars = this.state.cars;

        return (
            <div>
                <h2>Carros encontrados:</h2>
                <table>
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
                                    <a href="">Editar</a>
                                </td>
                                <td>
                                    <a href="">Excluir</a>
                                </td>
                            </tr>

                        }) : []}

                    </tbody>
                </table>
            </div>


        );
    }


}