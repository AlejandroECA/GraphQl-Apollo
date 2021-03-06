import React from 'react';
import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';

import Header from './header.component'



//i can import from different file.. explicit code for learning purposes
const GET_CART_HIDDEN = gql`
{
    cartHidden @client
}
`;

const HeaderContainer = () => {
    return(
        <Query query={GET_CART_HIDDEN}>
            {
                ({data}) => {
                    const { cartHidden } = data;
                    return(
                        <Header hidden={cartHidden} />
                    )
                }
            }
        </Query>
    )
}

export default HeaderContainer

