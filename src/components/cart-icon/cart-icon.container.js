import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CartIcon from './cart-icon.component';

const TOOGLE_CART_HIDDEN = gql`
    mutation ToogleCartHidden {
        toggleCartHidden @client
    }
`

const CartIconContainer = () => {
    return(
        <Mutation mutation={TOOGLE_CART_HIDDEN}>
            {
                toggleCartHidden => <CartIcon toggleCartHidden={toggleCartHidden} />
            }
        </Mutation>
    )
}

export default CartIconContainer