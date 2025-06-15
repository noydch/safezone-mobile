import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from './../../assets/logo-sz.png'
import { IoMdCart, IoMdMenu, IoMdClose } from 'react-icons/io'
import { IoHome } from "react-icons/io5";
import { IoIosListBox } from "react-icons/io";
import { LuNotebookPen } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import Cart from '../cart/Cart';
import useSafezoneStore from '../../store/safezoneStore';
import { FaPerson } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';

const Navbar = ({ children }) => {
    const navigate = useNavigate()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;
    const carts = useSafezoneStore((state) => state.carts);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const menuListData = [
        {
            title: 'ໜ້າຫຼັກ',
            icon: <IoHome />,
            path: '/'
        },
        {
            title: 'ລາຍການອໍເດິ',
            icon: <IoIosListBox />,
            path: '/orders'
        },
        {
            title: 'ການຈອງ',
            icon: <LuNotebookPen />,
            path: '/booking'
        },
        {
            title: 'ອອກຈາກລະບົບ',
            icon: <MdLogout />,
            path: '/login'
        }
    ]
    return (
        <div>
            <nav className='px-2 md:px-10 lg:px-10 h-[50px] md:h-[60px] bg-red-700 text-white flex items-center justify-between relative'>
                <div className=' cursor-pointer'
                    onClick={() => navigate('/')}>
                    <img src={logo} alt="Safezone"
                        className='w-[120px] md:w-[140px] lg:w-[160px]'
                    />
                </div>
                <div className="flex items-center space-x-4">
                    {currentPath === '/' && (
                        <div className="relative">
                            <IoMdCart
                                size={28}
                                onClick={() => setIsCartOpen(true)}
                                className="cursor-pointer md:text-[32px] lg:text-[36px]"
                            />
                            <div className="absolute -top-1 -right-1 bg-red-500 w-[16px] h-[16px] md:w-[18px] md:h-[18px] flex items-center justify-center font-medium text-white text-[10px] md:text-[12px] rounded-full">
                                <span>{carts.length}</span>
                            </div>
                        </div>
                    )}
                    <div className="relative">
                        {isDropdownOpen ? (
                            <IoMdClose
                                size={30}
                                onClick={toggleDropdown}
                                className="cursor-pointer md:text-[32px] lg:text-[36px]"
                            />
                        ) : (
                            <IoMdMenu
                                size={30}
                                onClick={toggleDropdown}
                                className="cursor-pointer md:text-[32px] lg:text-[36px]"
                            />
                        )}
                        <div
                            className={`absolute border border-gray-100 right-0 mt-2 w-[145px] md:w-[180px] bg-gray-100 flex flex-col gap-y-0.5 rounded p-0.5 shadow-lg py-1 z-50 text-gray-700 transition-all duration-300 ease-in-out transform ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                                }`}
                        >
                            {menuListData.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.path}
                                    className="flex items-center px-4 py-2 text-sm md:text-base rounded bg-white hover:bg-gray-100"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <span className="mr-3 md:text-[18px] lg:text-[20px]">{item.icon}</span>
                                    {item.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={[]}
            />
            <main className=''>
                {children}
            </main>
        </div>
    )
}

export default Navbar