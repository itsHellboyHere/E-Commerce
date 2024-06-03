import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { FaBarsStaggered } from 'react-icons/fa6';
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from 'react-router-dom';
import NavLinks from './NavLinks';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/user/userSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userState.user);
    const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

    const handleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <nav className='bg-base-100 relative'> {/* Set a higher z-index */}
            <div className="navbar align-element">
                <div className="navbar-start">
                    {/* TITLE */}
                     < NavLink to='/' className='hidden lg:flex btn btn-primary text-3xl items-center'>
    P
</NavLink>
                    {/* DROPDOWN */}
                    <div className="dropdown relative z-50"> {/* Set a higher z-index and position */}
                        <label tabIndex={0} className='btn btn-ghost lg:hidden'>
                            <GiHamburgerMenu className='h-6 w-6' />
                        </label>
                        <ul
                            tabIndex={0}
                            className='menu menu-sm dropdown-content mt-3 z-[9999] p-2 shadow bg-base-200 rounded-box w-48'
                        >
                            <NavLinks />
                        </ul>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className='menu menu-horizontal'>
                        <NavLinks />
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* THEME SETUP */}
                    <label className='swap swap-rotate'>
                        <input type='checkbox' onChange={handleTheme}></input>
                        {/* sun icon*/}
                        <BsSunFill className='swap-on h-4 w-4'></BsSunFill>
                        {/* moon icon */}
                        <BsMoonFill className='swap-off h-4 w-4'></BsMoonFill>
                    </label>
                    {/* CART LINK */}
                    {user && user.role === 'seller' ? null : (
                        <NavLink to='/cart' className='btn btn-ghost btn-circle btn-md ml-4'>
                            <div className="indicator">
                                <BsCart3 className='h-6 w-6' />
                                <span className='badge badge-sm badge-primary indicator-item'>
                                    {numItemsInCart}
                                </span>
                            </div>
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
