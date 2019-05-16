import React from 'react'
import ShutterStore from "../store/ShutterStore";
import StoreActions from "../actions/StoreActions";


class ManagerForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listOrders: false,
            shutters: ShutterStore._shutters,
            workers: ShutterStore._workers,
            orders: ShutterStore._orders,
            customers: ShutterStore._customers,
            selectedWorker: [],
            selectedShutter: []
        };

        StoreActions.listOrders();
        StoreActions.listWorkers();
        StoreActions.listShutters();
        StoreActions.listCustomers();
        this._onChange = this._onChange.bind(this);
    }

    _onChange(){
        this.setState({orders : ShutterStore._orders});
        this.setState({shutters : ShutterStore._shutters});
        this.setState({workers : ShutterStore._workers});
        this.setState({customers : ShutterStore._customers});
    }

    componentDidMount(){
        ShutterStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        ShutterStore.removeChangeListener(this._onChange)
    }


    saveOrderSettings = (orderID, workerID) => {
        workerID = this.state.selectedWorker;
        StoreActions.saveOrderSettings(orderID, workerID);
        StoreActions.listOrders(orderID);

        alert("Order is assigned to " + workerID);
    };

    handleInputChange = (e) => {
        this.setState({selectedWorker: Number(e.target.value)});
    };

    setPayed = (e) => {
        StoreActions.setPayed(e);
        StoreActions.listOrders(e);

        alert("Order is payed!");
    };

    listOrders = () =>  {
        this.setState({listOrders: true});
    };

    showData = (e) =>  {
        let identifier = e.target.name;
        document.getElementById(identifier).classList.toggle("show-more");
    };

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
                                            ""
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
                                            ""
                                        ))}
                                        <div>
                                            {order.state === "finished"
                                                ?
                                                <div className="mt-16">
                                                    <label className="checkbox-holder">
                                                        <input className="input-checkbox" type="checkbox"
                                                               name={order.shutter}
                                                               value={order.orderID}
                                                        />
                                                        <span className="checkbox">
                                                            <strong>payed</strong>
                                                        </span>
                                                    </label>
                                                    <div>
                                                        <button className="user-form__btn"  value={order.orderID}
                                                                onClick={this.setPayed}>
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                                :
                                                ""
                                            }
                                            {order.state === "payed"
                                                ?
                                                <div className="mt-16">
                                                    <label className="checkbox-holder">
                                                        <input className="input-checkbox" type="checkbox"
                                                               name={order.shutter}
                                                               value={order.orderID}
                                                               checked
                                                        />
                                                        <span className="checkbox">
                                                            <strong>payed</strong>
                                                        </span>
                                                    </label>
                                                </div>
                                                :
                                                ""
                                            }
                                        </div>
                                        <div className="mt-16">
                                            {!order.workerID
                                            ?
                                            <div>
                                                <div>
                                                    Select worker
                                                </div>
                                                {this.state.workers.map(worker => (
                                                    <label className="radio-holder">
                                                        <input className="input-radio" name="worker" value={worker.workerID} type="radio" onChange={this.handleInputChange}/>
                                                        <span className="radio-label">
                                                            {worker.workerID}
                                                        </span>
                                                    </label>
                                                ))}
                                                <div className="mt-16">
                                                    <button className="user-form__btn" name={order.orderID} onClick={()=>this.saveOrderSettings(order.orderID)}>
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                            :
                                            ""
                                            }
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