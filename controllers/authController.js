const Customer = require('../models/Customer');
//const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const formatResponse = require('../helpers/formatResponse');
const AppError = require('../helpers/AppError');
const handleValidationError = require('../helpers/handleValidationError');
const generateJWToken = require('../helpers/generateJWToken');


class AuthController {
    static async signup(req, res, next) {
        try {
	    const newCustomer = new Customer({
		username: req.body.username,
		password: req.body.password,
		passwordConfirmation: req.body.passwordConfirmation,
	    });
	
	    await newCustomer.save();
	    return res.status(201).json({
               status: 'success',
               data: formatResponse(newCustomer),
               });
         } catch (err) {
            let errors;
            if (err.name === 'ValidationError') {
                errors = handleValidationError(err, req);
                return res.status(400).json({
                      error: { ...errors },
                      });
            }
            return next(err);
        }
    }

    static async login(req, res, next) {
       const { username, password } = req.body;
        try {
            if (!username || !password) {
                return next(new AppError('Invalid login credentials', 400));
                }
            let customer = await Customer.findOne({ username });
            if (!customer) {
                return next(new AppError('Customer not found', 404));
                }
            customer = await Customer.findOne({ username, password });
            if (!customer) {
                return next(new AppError('Invalid login credentials', 400));
                }
            const token = generateJWToken(customer._id.toString());
	    return res.status(200).send({ token, customer: formatResponse(customer) });
        } catch (error) {
              next(error);
          }
    }

    static async protect(req, res, next) {
        let token;
        const { authorization } = req.headers;
        if (!authorization) {
            return next(new AppError('Unauthorised', 401));
        }
        if (authorization.startsWith('Bearer ')) {
            token = authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
              token = req.cookies.jwt;
          }
        if (!token) {
            return next(new AppError('Unauthorised', 401));
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const CurrentCustomer = await Customer.findOne({
                                           _id: decoded.customerId,
                                    });
            if (!CurrentCustomer) {
                return next(new AppError('Unauthorised', 401));
            }
            req.user = formatResponse(CurrentCustomer);
            req.headers.user = formatResponse(CurrentCustomer);
            next();
        } catch (error) {
              if (error.message === 'invalid signature') {
                  return next(new AppError('Unauthorised', 401));
              }
              if (error.message === 'jwt malformed') {
                  return next(new AppError('Server error...', 500));
              }
              return next(error);
           }
    } 

    /**static async authenticate(req, res) {
    let token;
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: "You have to provide a token" });
        }
    if (authorization.startsWith('Bearer ')) {
        token = authorization.split(' ')[1];
        }
    if (!token) {
        return res.status(401).json({ active: false });
        }
    console.log(`TOKEN ${token}`);
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(`DECODE ${decoded.customerId}`);
            const CurrentCustomer = await Customer.findOne({
                _id: decoded.customerId,
            });
            if (!CurrentCustomer) {
                return res.status(401).json({ message: "We could not find a customer with this token" });
               }
	    console.log(`CUSTOMER ${CurrentCustomer.username}`);

            return res.status(200).json({
                customerid: CurrentCustomer._id,
                username: CurrentCustomer.username
	    });
        } catch (error) {
              if (error.message === 'invalid signature') {
                  return res.status(401).json({ message: "invalid signature" });
                 }
          return res.status(500).json({ active: false });
          }
     }**/
}

module.exports = AuthController;
