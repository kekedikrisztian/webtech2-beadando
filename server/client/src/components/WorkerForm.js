import React from 'react';

import SakilaDispatcher from '../dispatcher/SakilaDispatcher'
import WorkerConstants from "../constants/WorkerConstants";
import ManagerConstants from "../constants/ManagerConstants";
import CustomerConstants from "../constants/CustomerConstants";
import ShutterStore from "../store/ShutterStore";

class CustomerForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            signed: false,
            jobs: [
                {id: 0, wid: 1, customer: "Bela", address: "Miskolc, Teknős utca 27.", windowHeight: 100, windowWidth: 200, material: "wood", color: "brown", checked: true},
                {id: 1, wid: 1, customer: "Erzsi", address: "Szeged, Kaja tér 14.", windowHeight: 120, windowWidth: 180, material: "plastic", color: "white", checked: false},
                {id: 2, wid: 2, customer: "Jozsi", address: "Győr, Nyúl utca 6.", windowHeight: 90, windowWidth: 220, material: "metal", color: "gray", checked: false}
            ],
            signWId: undefined,
            shutters: [],
            workers: [],
            orders: []
        }


        this.handleStateSet = this.handleStateSet.bind(this);
        this.handleChange = this.handleChange.bind(this);
        ShutterStore.addChangeListener(this.handleChange);
    }

    handleStateSet({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    finishOrder = (e) => {
        let orderID = Number(e.target.name);
        let workerID = Number(e.target.value);
        console.log(workerID + ", " + orderID);
        console.log(e.target.checked);

        SakilaDispatcher.handlePostAction({
                actionType: WorkerConstants.FINISH_ORDER,
                payload: {
                    orderID: orderID,
                    workerID: workerID
                }
            }
        );

        e.target.className = "checked input-checkbox";
        console.log(e.target.checked);
    }

    componentDidMount(){
        SakilaDispatcher.handleViewAction(
            { actionType: WorkerConstants.LIST_PENDING_ORDERS }
        );

        SakilaDispatcher.handleViewAction(
            { actionType: ManagerConstants.LIST_WORKERS }
        );

        SakilaDispatcher.handleViewAction(
            { actionType: CustomerConstants.LIST_SHUTTERS }
        );
    }

    componentWillUnmount(){

    }

    signIn = () =>  {
        let validate = false;

        this.state.workers.map(worker => {
            console.log(this.state.signWId + ", " + worker.workerID);
            if(Number(this.state.signWId) === Number(worker.workerID)) {
                this.setState({signed: true});
                validate = true;
            }
        });

        if(validate === false) {
            alert("There isn't worker with id: " + this.state.signWId);
        }
    }

    signOut = () =>  {
        this.setState({signed: false});
    }

    handleChange() {
        this.state.orders = ShutterStore._orders;

        this.state.workers = ShutterStore._workers;

        this.state.shutters = ShutterStore._shutters;
    }

    handleSymbolSelect = (e)=>{
        let newOrders = [...this.state.orders];
        let selected;
        newOrders.map(order => {
            if(Number(order.orderID) === Number(e.target.value)) {
                selected = order;
            }
        })
        selected.checked = e.target.checked;
        this.setState({orders:newOrders});
    }

    sendData () {

    }

    render() {
        return (
            <div className="user-form">
                {this.state.signed === false
                    ?
                    <div>
                        <div className="user-form__title">
                            <div>
                                Worker
                            </div>
                        </div>
                        <div className="user-form__section">
                            <div className="user-form__section-title">
                                Sign in
                            </div>
                            <div className="user-form__content">
                                <div className="user-form__section">
                                    <div className="input-holder">
                                        <input className="input-field" type="number" name="signWId" onChange={this.handleStateSet}/>
                                        <span className="input-label">Your ID</span>
                                    </div>
                                    <button className="user-form__btn" onClick={this.signIn}>
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                    {this.state.workers.map(worker => (
                        Number(worker.workerID) === Number(this.state.signWId)
                        ?
                        <div>
                            <div className="user-form__title">
                                <div>
                                    Welcome {worker.firstName}
                                    <div className="fab-button-holder">
                                        <button className="fab-button" onClick={this.signOut}>LOG<br/>OUT</button>
                                    </div>
                                </div>
                            </div>
                            <div className="user-form__section">
                                <div className="user-form__section-title">
                                    List of the jobs
                                </div>
                                <div className="input-holder">
                                    {this.state.orders.map(order => (
                                        Number(worker.workerID) === Number(order.workerID)
                                        ?
                                        <div>
                                            <div>
                                                <div className="data-title">
                                                    Job ID:
                                                </div>
                                                <div className="data-content">
                                                    {order.orderID}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="data-title">
                                                    Customer's ID:
                                                </div>
                                                <div className="data-content">
                                                    {order.customerID}
                                                </div>
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
                                                            Shutter's material:
                                                        </div>
                                                        <div className="data-content">
                                                            {shutter.material}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="data-title">
                                                            Shutter's color:
                                                        </div>
                                                        <div className="data-content">
                                                            {shutter.color}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="data-title">
                                                            Shutter's price:
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

                                            <div className="mt-16">
                                                <label className="checkbox-holder">
                                                    <input className="input-checkbox" type="checkbox"
                                                           value={worker.workerID} name={order.orderID} checked={order.state === "finished" || order.state === "payed"}
                                                           onChange={this.finishOrder}/>
                                                    <span className="checkbox">
                                                    <strong>finished</strong>
                                                </span>
                                                </label>
                                            </div>
                                            <hr/>
                                        </div>
                                        :
                                        <div></div>
                                    ))}
                                </div>
                                <button className="user-form__btn">
                                    Save
                                </button>
                            </div>
                        </div>
                        :
                        <div>

                        </div>
                        ))}
                    </div>
                }
            </div>
        );
    }
}

export default CustomerForm;