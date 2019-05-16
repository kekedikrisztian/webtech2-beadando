import React from 'react';
import ShutterStore from "../store/ShutterStore";
import StoreActions from '../actions/StoreActions';


class WorkerForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            signed: false,
            signWId: undefined,
            shutters: ShutterStore._shutters,
            workers: ShutterStore._workers,
            orders: ShutterStore._orders
        };

        StoreActions.listOrders();
        StoreActions.listShutters();
        StoreActions.listWorkers();
        this._onChange = this._onChange.bind(this);
        this.handleStateSet = this.handleStateSet.bind(this);
    }

    _onChange(){
        this.setState({orders : ShutterStore._orders});
        this.setState({shutters : ShutterStore._shutters});
        this.setState({workers : ShutterStore._workers});
    }

    componentDidMount(){
        ShutterStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        ShutterStore.removeChangeListener(this._onChange)
    }


    handleStateSet({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }


    finishOrder = (e) => {
        StoreActions.finishOrder(e);
        StoreActions.listOrders(e);

        alert("OrderID is finished!");
    };


    signIn = () =>  {
        let validate = false;

        this.state.workers.map(worker => {
            if(Number(this.state.signWId) === Number(worker.workerID)) {
                this.setState({signed: true});
                validate = true;
            }
        });

        if(validate === false) {
            alert(this.state.signWId + " worker ID does not exists!");
        }
    };

    signOut = () =>  {
        this.setState({signed: false});
    };

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
                                        Number(worker.workerID) === Number(order.workerID) && order.state === "inprogress"
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
                                                           value={worker.workerID} name={order.orderID}
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

export default WorkerForm;