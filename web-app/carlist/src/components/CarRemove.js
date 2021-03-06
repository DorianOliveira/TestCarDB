import { Component } from "react";
import CarApi from '../service/CarApi';


export class CarRemoveComponent extends Component {

    constructor(props) {
        super(props);
        this.carApi = new CarApi();

        this.state = {
            loading: false,
            ready: false,
            error: false
        };
    }

    async componentDidUpdate(props) {

        if (props.car?.id !== this.props.car?.id) {
            this.updateCar();
        }
    }

    async componentDidMount() {
        this.updateCar();
    }

    componentWillUnmount() {
    }

    async updateCar() {
        const id = this.props.car.id;

        const car = await this.carApi.GetById(id);

        if (car) {
            this.setState(state => ({
                car: car,
                ready: false,
                loading: false,
                error: false
            }));
        }
    }

    async confirm() {

        this.setState(state => ({
            loading: true
        }))

        try {
            await this.carApi.Remove(this.props.car.id);
            this.setState(state => ({
                loading: false,
                ready: true
            }));

            if (this.props.onUpdate)
                this.props.onUpdate();

        } catch {

            this.setState(state => ({
                error: true,
            }))
        }
    }


    render() {

        if (!this.props.car)
            return null;

        const car = this.props.car;

        const content = (<>
            <h3>Tem certeza que deseja remover este carro?</h3>
            <p><strong>Id:</strong> {car?.id}</p>
            <p><strong>Marca:</strong> {car?.brand}</p>
            <p><strong>Modelo:</strong> {car?.model}</p>
            <p><strong>Brand:</strong> {car?.year}</p>

            <button class="button" onClick={__ => this.confirm()}>Confirmar</button>
        </>);

        return (
            <div class="modal">
                {!this.state.ready ? content : []}
                <hr />
                {this.state.loading ? <h3>Aguarde...</h3> : []}
                {this.state.ready ? <h3>Carro removido com sucesso!</h3> : []}
                {this.state.error ? <h3>Ocorreu um erro ao excluir este carro!</h3> : []}

            </div>
        );
    }


}