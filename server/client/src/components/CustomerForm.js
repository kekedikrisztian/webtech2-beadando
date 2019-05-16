import React from 'react'
import ShutterStore from "../store/ShutterStore";
import StoreActions from "../actions/StoreActions";


class CustomerForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            signed: false,
            orders: ShutterStore._orders,
            customers: ShutterStore._customers,
            shutters: ShutterStore._shutters,
            signedCustomer: undefined,
            selectedShutter: undefined,
            number: 0
        };

        StoreActions.listShutters();
        StoreActions.listOrders();
        StoreActions.listCustomers();
        this._onChange = this._onChange.bind(this);
    }

    _onChange(){
        this.setState({orders : ShutterStore._orders});
        this.setState({shutters : ShutterStore._shutters});
        this.setState({customers : ShutterStore._customers});
    }

    componentDidMount(){
        ShutterStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        ShutterStore.removeChangeListener(this._onChange)
    }


    signIn = () =>  {
        this.state.customers.map(customer => {
            if(document.getElementById("signInEmail").value === customer.email) {
                this.setState({signed: true});
                this.state.signedCustomer = customer.customerID;
            }
        });
        if(this.state.signedCustomer === undefined) {
            alert("Please register before sign in!");
        }
    };

    registration = (id) => {
        id = this.state.customers.length+1;
        StoreActions.registration(id);

        this.state.signedCustomer = id;
        this.setState({signed: true});

        alert("Your registration is succeed!");
    };

    signOut = () =>  {
        this.setState({signed: false});
        this.state.signedCustomer = undefined;
    };

    createOrder = (shutter, orderID, customerID) => {
        shutter = this.state.selectedShutter;
        orderID = this.state.orders.length + 1;
        customerID =  this.state.signedCustomer;

        StoreActions.createOrder(shutter, orderID, customerID);
        StoreActions.listOrders(orderID);

        alert("Order created!");
    };

    selectShutter = (e) => {
        this.state.selectedShutter = Number(e.target.value);
    };

    render() {
        return (
            <div className="user-form">
                <div className="user-form__title">
                    {this.state.signed === false
                        ?
                        <span>Customer</span>
                        :
                        <div>
                            Welcome {this.state.customers.map( customer => (
                            customer.customerID === this.state.signedCustomer
                                ?
                                <span>{customer.firstName}</span>
                                :
                                ""
                        ))}
                            <div className="fab-button-holder">
                                <button className="fab-button" onClick={this.signOut}>LOG<br/>OUT</button>
                            </div>
                        </div>
                    }
                </div>
                {this.state.signed === false
                    ?
                    <div>
                        <div className="user-form__content">
                            <div className="user-form__section-title">
                                Sign in
                            </div>
                            <div className="user-form__section">
                                <div className="input-holder">
                                    <input id="signInEmail" className="input-field" type="email"/>
                                    <span className="input-label">E-mail</span>
                                </div>
                                <button className="user-form__btn" onClick={this.signIn}>
                                    Sign in
                                </button>
                            </div>
                        </div>
                        <hr/>
                        <div className="user-form__content">
                            <div className="user-form__section-title">
                                Registration
                            </div>
                            <div className="user-form__section">
                                <div className="input-holder">
                                    <input id="firstName" className="input-field" type="text"/>
                                    <span className="input-label">First name</span>
                                </div>
                                <div className="input-holder">
                                    <input id="lastName" className="input-field" type="text"/>
                                    <span className="input-label">Last name</span>
                                </div>
                                <div className="input-holder">
                                    <input id="email" className="input-field" type="text"/>
                                    <span className="input-label">E-mail</span>
                                </div>
                                <div className="input-holder">
                                    <input id="address" className="input-field" type="text"/>
                                    <span className="input-label">Address</span>
                                </div>
                                <button className="user-form__btn" onClick={this.registration}>
                                    Registration
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="user-form__content">
                            <div className="user-form__section-title">
                                Ordering
                            </div>
                            <div>
                                <div className="user-form__section">
                                    <div className="input-holder">
                                        <input id="windowWidth" className="input-field" type="text"/>
                                        <span className="input-label">Window width</span>
                                    </div>
                                    <div className="input-holder">
                                        <input id="windowHeight" className="input-field" type="text"/>
                                        <span className="input-label">Window height</span>
                                    </div>
                                    <div className="input-holder">
                                        <div className="input-title">
                                            Shutter
                                        </div>
                                        {this.state.shutters.map(shutter => (
                                            <label className="radio-holder">
                                                <input className="input-radio" name="shutter" value={shutter.shutterID} type="radio" onClick={this.selectShutter}/>
                                                <span className="radio-label">
                                                {shutter.material}, {shutter.color}, {shutter.price}
                                            </span>
                                            </label>
                                        ))}
                                    </div>
                                    <button className="user-form__btn" onClick={this.createOrder}>
                                        Send order
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="user-form__content">
                            <div className="user-form__section-title">
                                List my orders
                            </div>
                            <div className="user-form__section">
                                {this.state.orders.map(order => (
                                    order.customerID === this.state.signedCustomer
                                        ?
                                        <div>
                                            <div className="data-title">
                                                Order ID
                                            </div>
                                            <div className="data-content">
                                                {order.orderID}
                                            </div>
                                            <div className="data-title">
                                                Window
                                            </div>
                                            <div className="data-content">
                                                {order.windowWidth} * {order.windowHeight}
                                            </div>
                                            {this.state.shutters.map(shutter => (
                                                shutter.shutterID === order.shutter
                                                ?
                                                <div>
                                                    <div className="data-title">
                                                        material of the shutter:
                                                    </div>
                                                    <div className="data-content">
                                                        {shutter.material}
                                                    </div>
                                                    <div className="data-title">
                                                        color of the shutter:
                                                    </div>
                                                    <div className="data-content">
                                                        {shutter.color}
                                                    </div>
                                                </div>
                                                :
                                                ""
                                            ))}
                                            {this.state.shutters.map(shutter => (
                                                (shutter.shutterID === order.shutter) && (order.date)
                                                    ?
                                                <div>
                                                    <div className="data-title">
                                                        price of the shutter:
                                                    </div>
                                                    <div className="data-content">
                                                        {shutter.price}$
                                                    </div>
                                                    <div className="data-title">
                                                        price of the installation:
                                                    </div>
                                                    <div className="data-content">
                                                        14$
                                                    </div>
                                                    <div className="data-title">
                                                        final price:
                                                    </div>
                                                    <div className="data-content">
                                                        {shutter.price} + 14$ = <strong>{shutter.price + 14}$</strong>
                                                    </div>
                                                </div>
                                                    :
                                                ""
                                                ))}
                                            <hr/>
                                        </div>
                                        :
                                        ""
                                ))}
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default CustomerForm;