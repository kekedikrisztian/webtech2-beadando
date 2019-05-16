import React from 'react'

import SakilaDispatcher from '../dispatcher/SakilaDispatcher'
import ManagerConstants from "../constants/ManagerConstants";
import ShutterStore from "../store/ShutterStore";
import CustomerConstants from "../constants/CustomerConstants";
import WorkerConstants from "../constants/WorkerConstants";

class ManagerForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            listOrders: false,
            jobs: [
                {id: 0, wid: 0, customer: "Bela", address: "Miskolc, Teknős utca 27.", windowHeight: 100, windowWidth: 200, material: "wood", color: "brown", checked: true},
                {id: 1, wid: 1, customer: "Erzsi", address: "Szeged, Kaja tér 14.", windowHeight: 120, windowWidth: 180, material: "plastic", color: "white", checked: false},
                {id: 2, wid: undefined, customer: "Jozsi", address: "Győr, Nyúl utca 6.", windowHeight: 90, windowWidth: 220, material: "metal", color: "gray", checked: false}
            ],
            workers: [],
            orders: [],
            shutters: [],
            customers: []
        }

        this.handleChange = this.handleChange.bind(this);
        ShutterStore.addChangeListener(this.handleChange);
    }

    componentDidMount(){
        SakilaDispatcher.handleViewAction(
            { actionType: WorkerConstants.LIST_ORDERS }
        );

        SakilaDispatcher.handleViewAction(
            { actionType: CustomerConstants.LIST_SHUTTERS }
        );

        SakilaDispatcher.handleViewAction(
            { actionType: CustomerConstants.LIST_CUSTOMERS }
        );

        SakilaDispatcher.handleViewAction(
            { actionType: ManagerConstants.LIST_WORKERS }
        );
    }

    componentWillUnmount(){

    }

    handleChange() {
        this.state.orders = ShutterStore._orders;

        this.state.shutters = ShutterStore._shutters;

        this.state.customers = ShutterStore._customers;

        this.state.workers = ShutterStore._workers;
    }

    saveOrderSettings = (e) => {

        let orderID = Number(e.target.name);
        let workerID = Number(e.target.value);

        SakilaDispatcher.handlePostAction({
                actionType: ManagerConstants.ASSIGN_ORDER,
                payload: {
                    orderID: orderID,
                    workerID: workerID
                }
            }
        );
    }

    setPayed = (e) => {
        let orderID = Number(e.target.value);

        SakilaDispatcher.handlePostAction({
                actionType: ManagerConstants.CREATE_INVOICE,
                payload: {
                    orderID: orderID
                }
            }
        );

        e.target.className = "checked input-checkbox";
    }

    listOrders = () =>  {
        this.setState({listOrders: true});
    }

    showData = (e) =>  {
        let identifier = e.target.name;
        document.getElementById(identifier).classList.toggle("show-more");
    }

    render() {
        return (
            <div className="user-form">
                <div className="user-form__title">
                    <div>
                        Manager
                    </div>
                </div>
                <div className="user-form__content">
                    <div className="user-form__section-title">
                        List orders
                    </div>
                    {this.state.listOrders === false
                        ?
                        <div className="user-form__section">
                            <button className="user-form__btn" onClick={this.listOrders}>
                                List orders
                            </button>
                        </div>
                        :
                        <div className="user-form__section">
                            <div className="input-holder">
                                {this.state.orders.map(order => (
                                    <div>
                                        <div>
                                            <div className="data-title">
                                                Order ID:
                                            </div>
                                            <div className="data-content">
                                                {order.orderID}
                                            </div>
                                        </div>
                                        {this.state.customers.map(customer => (
                                            customer.customerID === order.customerID
                                            ?
                                            <div>
                                                <div className="customer-data" id={order.orderID}>
                                                    <div className="data-title">
                                                        Customer's ID:
                                                    </div>
                                                    <button name={order.orderID} className="hide-button" onClick={this.showData}>
                                                        {customer.customerID}
                                                    </button>
                                                </div>
                                                <div className="customer-more-data">
                                                    <div>
                                                        <div className="data-title">
                                                            Name:
                                                        </div>
                                                        <div className="data-content">
                                                            {customer.firstName} {customer.lastName}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="data-title">
                                                            Address:
                                                        </div>
                                                        <div className="data-content">
                                                            {customer.address}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="data-title">
                                                            E-mail:
                                                        </div>
                                                        <div className="data-content">
                                                            {customer.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div>

                                            </div>
                                            ))}
                                        <div>

                                        </div>
                                        <div>
                                            <div className="data-title">
                                                Window size:
                                            </div>
                                            <div className="data-content">
                                                {order.windowWidth} * {order.windowHeight}
                                            </div>
                                        </div>
                                        {this.state.shutters.map(shutter => (
                                            shutter.shutterID === order.shutter
                                            ?
                                            <div>
                                                <div>
                                                    <div className="data-title">
                                                        Shutter material:
                                                    </div>
                                                    <div className="data-content">
                                                        {shutter.material}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="data-title">
                                                        Shutter color:
                                                    </div>
                                                    <div className="data-content">
                                                        {shutter.color}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="data-title">
                                                        Shutter price:
                                                    </div>
                                                    <div className="data-content">
                                                        {shutter.price}
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div>

                                            </div>
                                            ))}

                                        {order.state === "finished" || order.state === "payed"
                                        ?
                                        <div className="mt-16">
                                            <label className="checkbox-holder">
                                            <input className="input-checkbox" type="checkbox"
                                                   value={order.orderID} checked={order.state === "payed"}
                                                   onChange={this.setPayed}/>
                                                <span className="checkbox">
                                                    <strong>payed</strong>
                                                </span>
                                            </label>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                        }
                                        <div className="mt-16">
                                            {!order.workerID
                                            ?
                                            <div>
                                                <div>
                                                    Select worker
                                                </div>
                                                {this.state.workers.map(worker => (
                                                    <label className="radio-holder" onClick={this.selectedRadio}>
                                                        <input className="input-radio" name="worker" type="radio"/>
                                                        <span className="radio-label">
                                                            {worker.workerID}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                            :
                                            <div>

                                            </div>
                                            }
                                        </div>
                                        <div className="mt-16">
                                            <button className="user-form__btn" name={order.orderID} onClick={this.saveOrderSettings}>
                                                Save
                                            </button>
                                        </div>
                                        <hr/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default ManagerForm;