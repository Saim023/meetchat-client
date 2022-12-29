import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('User logout successfully!')
            })
            .catch(error => console.error(error))
    }

    const menuItems =
        <React.Fragment>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/media'>Media</Link></li>
            <li><Link to='#'>Message</Link></li>
            <li><Link to='/about'>About</Link></li>
            {
                user?.uid ?
                    <>

                        <li><Link>{user?.displayName}</Link></li>
                        <li><button onClick={handleLogOut}>Logout</button></li>
                    </>
                    :
                    <>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/signup'>Sign Up</Link></li>
                    </>
            }
        </React.Fragment>

    return (
        <div>
            <div className="navbar bg-transparent glass text-white px-8">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-transparent rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">MEETCHAT</a>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menuItems}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;