const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const path = require('path')

const createProduct = async (req, res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({ product });
}

const getAllProducts = async (req, res) => {
    try {
        const { featured, company, name, sort, fields, numericFilters, freeShipping, category, priceRange } = req.query;

        const queryObject = {};

        if (featured) {
            queryObject.featured = featured === 'true' ? true : false;
        }
        if (freeShipping) {
            queryObject.freeShipping = freeShipping === 'true' ? true : false;
        }
        if (company && company.toLowerCase() !== 'all') {
            queryObject.company = company;
        }
        if (category && category.toLowerCase() !== 'all') {
            queryObject.category = category;
        }
        if (name) {
            queryObject.name = { $regex: name, $options: 'i' };
        }
        if (numericFilters) {
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
            };
            const regEx = /\b(<|>|>=|=|<|<=)\b/g;
            let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
            const options = ['price', 'rating'];
            filters = filters.split(',').map((item) => {
                const [field, operator, value] = item.split('-');
                if (options.includes(field)) {
                    return { [field]: { [operator]: Number(value) } };
                }
            });
            queryObject.$and = filters;
        }
        // if (priceRange) {
        //     const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        //     queryObject.price = {};
        //     if (!isNaN(minPrice)) {
        //         queryObject.price.$gte = minPrice;
        //     }
        //     if (!isNaN(maxPrice)) {
        //         queryObject.price.$lte = maxPrice;
        //     }
        // }
        // let result = Product.find(queryObject);
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-').map(Number);
            queryObject.price = {};
            if (!isNaN(minPrice)) {
                queryObject.price.$gte = minPrice;
            }
            if (!isNaN(maxPrice)) {
                queryObject.price.$lte = maxPrice;
            }
        }

        let result = Product.find(queryObject);

        // Sorting
        if (sort) {
            switch (sort) {
                case 'a-z':
                    result = result.sort({ name: 1 });
                    break;
                case 'z-a':
                    result = result.sort({ name: -1 });
                    break;
                case 'high':
                    result = result.sort({ price: -1 });
                    break;
                case 'low':
                    result = result.sort({ price: 1 });
                    break;
                default:
                    result = result.sort('createdAt');
                    break;
            }
        } else {
            result = result.sort('createdAt');
        }

        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        result = result.skip(skip).limit(limit);

        // Select Fields
        if (fields) {
            const fieldsList = fields.split(',').join(' ');
            result = result.select(fieldsList);
        }

        const products = await result.sort('-createdAt');
        const total = await Product.countDocuments(queryObject); // Total number of products matching the query
        // Get distinct categories and companies
        const categories = await Product.distinct('category').lean();
        const companies = await Product.distinct('company').lean();
        categories.unshift('all');
        companies.unshift('all');
        const metadata = {
            total,
            page: page,
            pageCount: Math.ceil(total / limit),
            pageSize: limit,
            categories: categories || [],
            companies: companies || [],
        };

        res.status(200).json({ products, metadata });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getSingleProduct = async (req, res) => {
    const { id: productId } = req.params;

    const product = await Product.findOne({ _id: productId }).populate('reviews');

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }
    res.status(StatusCodes.OK).json({ product });
}
const updateProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }
    res.status(StatusCodes.OK).json({ product });
}
const deleteProduct = async (req, res) => {
    const { id: productId } = req.params;

    const product = await Product.findOne({ _id: productId });
    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`)
    }
    await product.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success Product removed.' })
}
const uploadImage = async (req, res) => {
    console.log(req.files);
    if (!req.files) {
        throw new CustomError.BadRequestError('No File Uploaded')
    }
    const productImage = req.files.image;
    if (!productImage.mimetype.startsWith("image")) {
        throw new CustomError.BadRequestError('please upload an image.')
    }
    const maxSize = 5 * (1024 * 1024)
    if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError('Please upload  an image less than 5MB');
    }

    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);
    await productImage.mv(imagePath);

    res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });

}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
}