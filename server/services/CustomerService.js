function CustomerService(customerDAO) {
    // logger
    md5 = require('md5.js');

    if (customerDAO !== undefined && customerDAO != null) {
        this.customerDAO = customerDAO;
    } else {
        this.customerDAO = require('../dao/CustomerDAO');
    }
}

CustomerService.prototype.createCustomer = function (request, success) {
    this.customerDAO.createCustomer(request, ()=>{success()})
};

CustomerService.prototype.createOrder = function (request, callback) {
    this.customerDAO.createOrder(request, ()=>{callback()})
};


CustomerService.prototype.getShutters = function(callback){
    this.customerDAO.readShutters((requests) => {callback(requests)})
};

CustomerService.prototype.listOrders = function(callback){
    this.customerDAO.readOrders((requests) => {callback(requests)})
};


module.exports = CustomerService;