import { useContext } from 'react';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import './cart-drop-down.style.scss';

import Button from '../button/button';
import CartItem from '../cart-item/cart-item';

const CartDropDown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    
    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length ? (
                cartItems.map((cartItem) => (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                ))
                ) : (
                <span className='empty-message'>Your cart is empty</span>
                )}
            </div>
            <Button onClick={goToCheckoutHandler}>Checkout</Button>
        </div>
    )
}

export default CartDropDown;