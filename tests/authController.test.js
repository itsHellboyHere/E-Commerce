// authController.test.js

const { register, login, logout } = require('../controllers/authController');
const User = require('../models/User');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { attachCookiesToResponse } = require('../utils'); // Update the path as needed

jest.mock('../models/User');
jest.mock('../utils', () => ({
    createTokenUser: jest.fn().mockReturnValue({ /* mock token user */ }),
    attachCookiesToResponse: jest.fn(),
}));

describe('authController - register', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user', async () => {
        const mockReq = { body: { email: 'test@example.com', name: 'Test User', password: 'password' } };
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        User.findOne.mockResolvedValue(null);
        User.countDocuments.mockResolvedValue(0);

        // Mock the user object that would be created
        const mockCreatedUser = { email: 'test@example.com', name: 'Test User', password: 'password', role: 'admin' };
        User.create.mockResolvedValue(mockCreatedUser);

        await register(mockReq, mockRes);

        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(User.countDocuments).toHaveBeenCalled();
        expect(User.create).toHaveBeenCalledWith({ ...mockReq.body, role: 'admin' }); // Include the role property
        expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        expect(mockRes.json).toHaveBeenCalledWith({ user: { /* mock token user */ } });
        expect(attachCookiesToResponse).toHaveBeenCalled();

        // Take a snapshot of the response
        expect(mockRes.json).toMatchSnapshot();
    });

    // Add more test cases for other scenarios
});

describe('authController - login', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should login a user with correct credentials', async () => {
        const mockReq = { body: { email: 'test@example.com', password: 'password' } };
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        const mockUser = { comparePassword: jest.fn().mockResolvedValue(true) }; // Mock user object with comparePassword method
        User.findOne.mockResolvedValue(mockUser);

        await login(mockReq, mockRes);

        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(mockUser.comparePassword).toHaveBeenCalledWith('password');
        expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(mockRes.json).toHaveBeenCalledWith({ user: { /* mock token user */ } });
        expect(attachCookiesToResponse).toHaveBeenCalled();

        // Take a snapshot of the response
        expect(mockRes.json).toMatchSnapshot();
    });

    // Add more test cases for other scenarios
});

describe('authController - logout', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should logout a user', async () => {
        const mockReq = {};
        const mockRes = { cookie: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };

        await logout(mockReq, mockRes);

        expect(mockRes.cookie).toHaveBeenCalledWith('token', 'logout', {
            httpOnly: true,
            expires: expect.any(Date),
        });
        expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(mockRes.json).toHaveBeenCalledWith({ msg: 'user logged out!' });

        // Take a snapshot of the response
        expect(mockRes.json).toMatchSnapshot();
    });

    // Add more test cases for other scenarios
});