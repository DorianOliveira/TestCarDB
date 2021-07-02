import { Component } from "react";
import CarApi from '../service/CarApi';


export class CarFormComponent extends Component {

    constructor(props) {
        super(props);
        this.carApi = new CarApi();



        this.state = {
            car: null,
            cancel: false,
            errors: {}
        };

        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentDidUpdate(props) {

        if (props.car !== this.props.car) {
            await this.updateCar();
        }
    }

    async componentDidMount() {
        this.updateCar();
    }

    async updateCar() {

        let car = this.props.car;

        if (!car)
            car = {};

        this.setState(state => ({
            car: car
        }));
    }
   

    onChangeBrand(event) {
        const value = event.currentTarget.value;
        this.changeCarValue('brand', value);
    }
    onChangeModel(event) {
        const value = event.currentTarget.value;
        this.changeCarValue('model', value);
    }
    onChangeYear(event) {
        const value = event.currentTarget.value;
        this.changeCarValue('year', value);
    }
    changeCarValue(name, value) {

        const car = this.state.car;
        car[name] = value;

        this.setState({
            car: car
        });
    }

    async onSubmit(event) {
        event.preventDefault();

        try {

            let hasError = false;

            const error = {};

            if (!this.state.car.brand) {
                hasError = true;
                error.brandError = 'Marca precisa ser preenchida';
            }

            if (!this.state.car.model) {
                hasError = true;
                error.modelError = 'Modelo precisa ser preenchido';
            }

            const maxAge = new Date().getFullYear() - 20
            if (!this.state.car.year || this.state.car.year < maxAge) {
                hasError = true;
                error.yearError = `O ano do veículo precisa ser preenchido e deve ser maior ou igual a ${maxAge}`;
            }

            if (hasError) {

                this.setState(state => ({
                    errors: error
                }));
                return;
            }

            this.setState(state => ({
                loading: true,
                errors: {}
            }));

            if (this.props.new)
                await this.carApi.Create(this.state.car);
            else
                await this.carApi.Update(this.state.car);

            this.setState(state => ({
                ready: true,
                loading: false
            }));

            if (this.props.onUpdate)
                this.props.onUpdate();
        }
        catch (error) {

            this.setState(state => ({
                error: true,
                loading: false
            }));
        }      
    }

    render() {

        let car = this.state.car;

        if (!car)
            car = {};

        return (
            <form onSubmit={this.onSubmit} class="modal form">

                <h2>Dados do carro</h2>
                <hr></hr>
                <div class="fields">

                    <div class="form-field">
                        <label>Marca: {this.state.car?.brand}</label> 
                        <input type="text" onChange={this.onChangeBrand} value={car.brand}></input>
                        <span class="error">{this.state.errors.brandError}</span>
                    </div>

                    <div class="form-field">
                        <label>Modelo:</label>
                        <input type="text" onChange={this.onChangeModel} value={car.model}></input>
                        <span class="error">{this.state.errors.modelError}</span>
                    </div>

                    <div class="form-field">
                        <label>Ano:</label>
                        <input type="text" onChange={this.onChangeYear} value={car.year}></input>
                        <span class="error">{this.state.errors.yearError}</span>

                    </div>
                </div>


                <button class="button" type="submit">Salvar</button>

                {this.state?.loading ? <h3>Aguarde...</h3> : []}
                {this.state?.ready ? <h3 class="success">Dados atualizados com sucesso</h3> : []}
                {this.state?.error ? <h3 class="error">Ocorreu um erro ao processar os dados</h3> : []}
            </form>

        );
    }
}