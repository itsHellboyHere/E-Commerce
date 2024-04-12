const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser, checkPermissions } = require('../utils')
const Product = require('../models/Product')
const Order = require('../models/Order')
const User = require('../models/User')
const stripe = require('stripe')(process.env.SECRET_KEY)
const stripeController = async ({ amount, currency }) => {

    if (amount < 42) {
        throw new CustomError.BadRequestError('Order amount should be greater then 42 INR')
    }
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.

        payment_method_types: ['card'], // Specify the accepted payment method types
        metadata: { integration_check: 'accept_a_payment' },
    });
    const client_secret = paymentIntent.client_secret
    console.log(paymentIntent);
    return { client_secret, amount };
};
const getAllOrders = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page number
    const pageSize = parseInt(req.query.pageSize) || 10; // Number of orders per page

    const total = await Order.countDocuments(); // Total count of orders
    const pageCount = Math.ceil(total / pageSize);

    const orders = await Order.find({})
        .sort('-createdAt')
        .skip((page - 1) * pageSize) // Skip orders for previous pages
        .limit(pageSize) // Limit orders per page
        .exec();

    res.status(StatusCodes.OK).json({
        orders,
        totalOrders: total,
        count: orders.length,
        meta: {
            pagination: {
                page,
                pageSize,
                pageCount,
                total
            }
        }
    });
};

const getSingleOrder = async (req, res) => {

    const { id: orderId } = req.params;

    const order = await Order.findOne({ _id: orderId })


    if (!order) {
        throw new CustomError.NotFoundError(`No order with id ${orderId} is present`)
    }
    checkPermissions(req.user, order.user)
    res.status(StatusCodes.OK).json({ order })
}

const getCurrentUserOrders = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page number
    const pageSize = parseInt(req.query.pageSize) || 10; // Number of orders per page

    const total = await Order.countDocuments({ user: req.user.userId });
    const pageCount = Math.ceil(total / pageSize);

    const orders = await Order.find({ user: req.user.userId })
        .sort('-createdAt')
        .skip((page - 1) * pageSize) // Skip orders for previous pages
        .limit(pageSize) // Limit orders per page
        .exec();

    res.status(StatusCodes.OK).json({
        orders,
        totalOrders: total,
        count: orders.length,
        meta: {
            pagination: {
                page,
                pageSize,
                pageCount,
                total
            }
        }
    });
};



const createOrder = async (req, res) => {
    const { items: cartItems, tax, shippingFee, address, name } = req.body;


    if (!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No cart items provided')
    }

    if (!tax || !shippingFee) {
        throw new CustomError.BadRequestError('Please provide tax and shipping fee')
    }
    if (!name || !address) {
        throw new CustomError.BadRequestError('Please provide name and address')
    }
    let orderItems = [];
    let subtotal = 0;

    for (const item of cartItems) {
        const dbProduct = await Product.findOne({ _id: item.product })
        if (!dbProduct) {
            throw new CustomError.NotFoundError(`No product with id ${item.product}`);
        }

        const { name, price, image, _id, colors } = dbProduct;

        let productColor;

        // Check if the cart item provides a color, otherwise use the first color from the product's colors array
        if (item.productColor) {
            if (!colors.includes(item.productColor)) {
                throw new CustomError.BadRequestError(`Invalid product color provided for product ${_id}`);
            }
            productColor = item.productColor;
        } else {
            productColor = colors.length > 0 ? colors[0] : null;
        }

        if (!productColor) {
            throw new CustomError.BadRequestError(`No valid product color found for product ${_id}`);
        }

        // const productColor = colors.length > 0 ? colors[0] : '#000';

        const singleOrderItem = {
            amount: item.amount,
            name, price, image, product: _id,
            productColor,
        }
        //add item to order
        orderItems = [...orderItems, singleOrderItem];

        subtotal += item.amount * price;
    }
    // console.log(orderItems ,subtotal);
    //fake stripe communication
    const total = tax + shippingFee + subtotal;

    //  Get user's name from the User model
    // const user = await User.findOne({ _id: req.user.userId });

    // console.log(userName);
    // get client secret
    // console.log(total);
    const paymentIntent = await stripeController({
        amount: total,
        currency: 'inr',
    });

    const order = await Order.create({
        orderItems,
        total,
        subtotal,
        tax,
        shippingFee,
        clientSecret: paymentIntent.client_secret,
        user: req.user.userId,
        name,
        address,
    });

    res
        .status(StatusCodes.CREATED)
        .json({ order, clientSecret: order.clientSecret });
}
const updateOrder = async (req, res) => {
    const { id: orderId } = req.params;

    const { paymentIntentId } = req.body;

    const order = await Order.findOne({ _id: orderId });

    if (!order) {
        throw new CustomError.NotFoundError(`No order with id ${orderId} is present`)
    }
    checkPermissions(req.user, order.user)
    order.paymentIntentId = paymentIntentId;

    order.status = 'paid';
    await order.save();
    res.status(StatusCodes.OK).json({ order })
}

module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
    stripeController,
}