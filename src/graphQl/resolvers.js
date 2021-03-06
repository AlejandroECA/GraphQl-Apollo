import { gql } from 'apollo-boost'
import {addItemToCart, getCartItemCount} from './cart.utils2'

export const typeDefs = gql`

    extend type Item{
        quantity: Int,
    }

    extend type Mutation {
        ToggleCartHidden: Boolean!
        AdditemToCart( item: Item! ): [Item]!
    }

`;

const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`

const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`

const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`

export const resolvers = {

    Mutation: {

        toggleCartHidden: (_root, _args, _context, _info) => {

            const { cache } = _context;

            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN
            })

            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden }
            })

            return !cartHidden;
        },

        addItemToCart: (_root, _args, _context, _info) => {
            
            const {item} = _args;
            const {cache} = _context;

            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = addItemToCart(cartItems, item);

            cache.writeQuery({ 
                query:GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            })

            //number in the icons
            cache.writeQuery({ 
                query:GET_ITEM_COUNT,
                data:{itemCount: getCartItemCount(newCartItems)}
            })

            return newCartItems

        }

    }
}