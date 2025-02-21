import { Route } from 'react-router';
import { Routes } from 'react-router';
import Home from '../page/Home';
import Nav from '../components/Nav';
import Shop from '../page/Shop';
import Footer from '../components/Footer';
import ProductDetail from '../components/About';

import Cart from '../page/Card';
import Checkout from '../page/Checkout';

function Router() {
    return (
        <div >
            <Nav />
         
               <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/shop" element={ <Shop />} />
      <Route path="/about/:_id" element={ <ProductDetail />} />
      <Route path="/cart" element={ <Cart />} />
      <Route path="/checkout" element={ <Checkout />} />

     


  

    </Routes>
    <Footer/>
        </div>
    );
}

export default Router;