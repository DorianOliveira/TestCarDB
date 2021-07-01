import { Component } from "react";
import CarApi from '../service/CarApi';


export class CarFormComponent extends Component {

    constructor() {
        super();
        this.carApi = new CarApi();

        this.setState({
            car: null
        });
    }

    async componentDidUpdate(props) {

        if (props.id !== this.props.id)
            await this.updateCar();

    }

    async updateCar() {
        const id = this.props.id;

        const car = await this.carApi.GetById(id);

        if (car) {
            this.setState({
                car: car
            });
        }
    }

    async componentDidMount() {
       
    }

    async onSubmit() {



    }

    render() {

        if (!this.state?.car)
            return null;


        return (
            <form onSubmit={this.onSubmit}>
                <label>Marca:</label>
                <input type="text" value={this.state.car.brand}></input>
                <label>Modelo:</label>
                <input type="text" value={this.state.car.model}></input>
                <label>Ano:</label>
                <input type="text" value={this.state.car.year}></input>
                <button type="submit">Salvar</button>
            </form>
        );
    }


}