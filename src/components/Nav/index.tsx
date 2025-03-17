import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchInput from './input';
import Logo from '../../assets/SHOP.CO.svg'
import Cart from '../../assets/Frame (1).svg'
import Admin from '../../assets/admin.svg'

import { Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store'; // RootState ni import qiling

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart);
   

    console.log("Cart Items:", cartItems); // CartItems ni console'ga chiqarish

    return (
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <div className="lg:hidden flex items-center">
                <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
            <NavLink to="/">
                <img src={Logo} alt="Shop Logo" />
            </NavLink>

            <div className="hidden lg:flex items-center gap-5">
                <NavLink to="/shop" className="text-base font-normal text-[#3D3D3D] hover:font-bold transition-all duration-200">Shop</NavLink>
                <NavLink to="/" className="text-base font-normal text-[#3D3D3D] hover:font-bold transition-all duration-200">On Sale</NavLink>
                <NavLink to="/" className="text-base font-normal text-[#3D3D3D] hover:font-bold transition-all duration-200">New Arrivals</NavLink>
                <NavLink to="/" className="text-base font-normal text-[#3D3D3D] hover:font-bold transition-all duration-200">Brands</NavLink>
            </div>

            <div className="hidden lg:block">
                <SearchInput />
            </div>

            <div className="flex">
                <NavLink to="/cart" className="relative mr-4 p-1 ">
                    
                    <img src={Cart} alt="Cart" />
                    
                </NavLink>
                <NavLink to="/#signin" className="p-1">
                    <img src={Admin} alt="Sign In" />
                </NavLink>
            </div>

            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 lg:hidden">
                    <NavLink to="/shop" className="py-2 text-lg" onClick={() => setIsOpen(false)}>Shop</NavLink>
                    <NavLink to="/" className="py-2 text-lg" onClick={() => setIsOpen(false)}>On Sale</NavLink>
                    <NavLink to="/" className="py-2 text-lg" onClick={() => setIsOpen(false)}>New Arrivals</NavLink>
                    <NavLink to="/" className="py-2 text-lg" onClick={() => setIsOpen(false)}>Brands</NavLink>
         
                    <div className="mt-4">
                        <SearchInput />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Nav;