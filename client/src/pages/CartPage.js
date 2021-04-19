import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../reducers/userReducer';
import CartComponent from '../components/CartPage/CartComponent';
import Paypal from '../utils/Paypal';
import styled from 'styled-components';

const CartPage = (props) => {

    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const [showPrice, setShowPrice] = useState(false);
    const [showSuccess , setShowSuccess] = useState(false);
    const [shippingFee, setShippingFee] = useState(0);

    useEffect(() => {

        let cartItems = [];

        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })

                dispatch(getCartItems(cartItems, props.user.userData.cart))
                .then(response => {
                    calculateTotal(response.payload);
                })
            }
        }
    }, [props.user.userData])

    let calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        })

        setTotalPrice(total);
        setShowPrice(true);

        if (total > 499) {
            setShippingFee(0)
        } else {
            setShippingFee(5)
        }
    }

    let removeFromCart = (productId) => {
        
        dispatch(removeCartItem(productId))
            .then(response => {
                if(response.payload.productInfo.length === 0) {
                    setShowPrice(false);
                }
            })
    }

    const paymentSuccess = (data) => {
        dispatch(onSuccessBuy({
            paymentData : data,
            cartDetail : props.user.cartDetail
        }))
        .then(response => {
            if(response.payload.success) {
                setShowPrice(false)
                setShowSuccess(true)
            }
        })
    }

    return (
        <CartPageWrapper>
            <Title>MY CART</Title>
            <CartComponent products={props.user.cartDetail} removeItem={removeFromCart}/>

            {showPrice ? 
            <>
            <CartPriceWrapper>
            <ProductPrice>
                <PriceTitle>Product Price</PriceTitle>
                <PriceDesc>${totalPrice}.00</PriceDesc>
            </ProductPrice>
            <DeliveryPrice>
                <PriceTitle>Shipping Fee</PriceTitle>
                <PriceDesc>
                    ${shippingFee}.00
                </PriceDesc>
            </DeliveryPrice>
            <TotlePrice>
                <PriceTitle>Total Price</PriceTitle>
                <PriceDesc>${totalPrice + shippingFee}.00</PriceDesc>
            </TotlePrice>
            </CartPriceWrapper>
            </>
            : showSuccess ? 
            <SuccessWrapper>
                <p>Payment Success!</p>
                <a href="/history">
                <HistoryButton>Go to Order History</HistoryButton>
                </a>
            </SuccessWrapper>
                :
                <CartNoItem>
                    Your shopping cart is empty
                </CartNoItem>
            }
            {showPrice && 
            <>
            <PaypalButtonWrapper>
                <PayalButton>
                    <Paypal totalPrice={totalPrice + shippingFee} onSuccess={paymentSuccess}/>
                </PayalButton>
            </PaypalButtonWrapper>
            </>
            }
        </CartPageWrapper>
    )
}

const CartPageWrapper = styled.div`
    width : 90%;
    margin : 0 5% 0;
    padding : 170px 0 100px 0;
    font-family: 'Poppins', sans-serif;
`

const Title = styled.h3`
    font-size : 18px;
    margin : 0 0 30px 0;
`

const CartPriceWrapper = styled.div`
    margin : 70px 20%;
    width : 60%;
    display : flex;
    justify-content : space-between;

    @media (max-width : 500px) {
        width : 90%;
        display : block;
        margin : 70px 5%;
    }
`

const ProductPrice = styled.div`
`

const TotlePrice = styled.div``

const PriceTitle = styled.h3`
    font-size : 18px;
    text-align : left;

    @media (max-width : 500px) {
        text-align : center;
    }
`

const DeliveryPrice = styled.div`
`

const PriceDesc = styled.p`
    font-size : 18px;
    text-align : left;

    @media (max-width : 500px) {
        margin : 0 0 20px 0;
        text-align : center;
    }
`

const CartNoItem = styled.div`
    margin : 60px 0 0 0;
    font-size : 14px;
    text-align : center;
    border : 1px solid #eee;
    padding : 60px 0;
`


const PayalButton = styled.div`
`

const PaypalButtonWrapper = styled.div`
    width : 100%;
`



const SuccessWrapper = styled.div`
    margin : 60px 0 0 0;
    font-size : 14px;
    text-align : center;
    border : 1px solid #eee;
    padding : 60px 0;
`

const HistoryButton = styled.button`
    border : 0;
    background-color : black;
    color : white;
    width : 250px;
    height : 60px;
    font-size : 18px;
    margin : 30px 0 0 0;
    cursor : pointer;
    outline : none;
`


export default CartPage;