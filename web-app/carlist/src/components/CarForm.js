import { Component } from "react";
import CarApi from '../service/CarApi';


export class CarFormComponent extends Component {

    constructor() {
        super();
        this.carApi = new CarApi();

        this.state = {
            car: null,
            cancel: false,
            errors: {}
        };
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

    async onSubmit() {


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
                loading: true
            }));

            if (this.props.new)
                await this.carApi.Create(this.state.car);
            else
                await this.carApi.Update(this.state.car);

            this.setState(state => ({
                ready: true,
                loading: false,
                car: {}
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

        if (!this.props.car && !this.props.new || this.state.cancel)
            return null;

        return (
            <div class="modal form">

                <h2>Dados do carro</h2>
                <hr></hr>
                <div class="fields">

                    <div class="form-field">
                        <label>Marca:</label>
                        <input type="text" onChange={__ => this.onChangeBrand(__)} value={this.state.car?.brand}></input>
                        <span class="error">{this.state.errors.brandError}</span>
                    </div>

                    <div class="form-field">
                        <label>Modelo:</label>
                        <input type="text" onChange={__ => this.onChangeModel(__)} value={this.state.car?.model}></input>
                        <span class="error">{this.state.errors.modelError}</span>
                    </div>

                    <div class="form-field">
                        <label>Ano:</label>
                        <input type="text" onChange={__ => this.onChangeYear(__)} value={this.state.car?.year}></input>
                        <span class="error">{this.state.errors.yearError}</span>

                    </div>
                </div>


                <button class="button" onClick={__ => this.onSubmit()}>Salvar</button>
                &nbsp;<button class="button cancel" onClick={__ => this.setState( state => ({cancel: true}))}>Cancelar</button>

                {this.state?.loading ? <h3>Aguarde...</h3> : []}
                {this.state?.ready ? <h3 class="success">Dados atualizados com sucesso</h3> : []}
                {this.state?.error ? <h3 class="error">Ocorreu um erro ao processar os dados</h3> : []}
            </div>

        );
    }
}