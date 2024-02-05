const { ObjectId } = require('mongodb');
const Customer = require('../models/Customer');
const AppError = require('../helpers/AppError');
const formatResponse = require('../helpers/formatResponse');

class CustomerController {
    static async createCustomer(req, res, next) {
        return res.status(500).json({
             message:
             'This route is  not defined. Kindly, use /signup to create account',
        });
    }

    static async getAllCustomers(req, res, next) {
        try {
            const customers = await Customer.find();
            const data = customers.map((customer) => formatResponse(customer));

            return res.status(200).json({
                results: customers.length,
                customers: data,
            });
        } catch (err) {
              return next(err);
          }
    }

    static async getCustomer(req, res, next) {
        try {
            const customer = await Customer.findById(req.params.id);
            if (!customer) {
                 return next(new AppError('Customer with this ID does not exist', 404));
            }

            return res.status(200).json({ customer: formatResponse(customer) });
        } catch (err) {
              return next(err);
          }
    }

    /**static async deleteCustomer(req, res, next) {
        try {
            const { customerid } = req.headers;
            if (!customerid) {
                return next(new AppError('Forbidden', 403));
            }
            const customer = await Customer.findByIdAndDelete(customerid);

            if (!customer) {
                return next(new AppError('Customer with this ID does not exist', 404));
            }

            return res.status(204).end({ status: 'success' });
        } catch (err) {
              return next(err);
          }
    }**/
}

module.exports = CustomerController;
