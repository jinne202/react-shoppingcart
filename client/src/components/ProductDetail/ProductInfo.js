import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../reducers/userReducer';

const ProductInfo = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleAddCart = () => {
        dispatch(addToCart(props.detail._id, quantity))
        history.push("/user/cart");
    }

    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        if (quantity >=  10) {
            setQuantity(10);
        } else {
            setQuantity(prevQuantity => prevQuantity + 1)
        }
    }

    const handleDecrease = () => {
        if (quantity <= 1) {
            setQuantity(1);
        } else {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <ProductInfoWrapper>
            <Title>{props.detail.title}</Title>
            <Price>${props.detail.price}.00</Price>
            <Description>{props.detail.description}</Description>
            <QuantityWrapper>
                <QtyBox>{quantity}</QtyBox>
                <QtyButton onClick={handleIncrease}>+</QtyButton>
                <QtyButton onClick={handleDecrease}>-</QtyButton>
            </QuantityWrapper>
            <AddCartButton onClick={handleAddCart}>
                ADD TO CART
            </AddCartButton>
        </ProductInfoWrapper>
    )
}

const ProductInfoWrapper = styled.div`
    width : 50%;
    padding : 40px 60px 0 60px;
    font-family: 'Poppins', sans-serif;

    @media (min-width: 501px) and (max-width: 768px) {
        padding : 0 40px 0 40px;
    }

    @media (max-width : 500px) {
        width : 100%;
        padding : 0;
    }
`

const Title = styled.h3`
    font-size : 18px;
    margin : 40px 0 0 0;

    @media (min-width: 501px) and (max-width: 768px) {
        margin : 0;
    }
`

const Price = styled.p`
    font-size : 18px;
    margin : 40px 0 0 0;
`

const Description = styled.p`
    font-size : 14px;
    margin : 40px 0 0 0;
    padding : 0 40px 0 0;
`

const AddCartButton = styled.button`
    width : 100%;
    outline : none;
    border : 0;
    color : white;
    background-color : black;
    margin : 60px 0 0 0;
    height : 40px;
    cursor : pointer;
`

const QuantityWrapper = styled.div`
    margin : 60px 0 0 0;
    display : flex;
`

const QtyBox = styled.div`
    border : 1px solid black;
    padding : 1px 10px;
    width : 50px;
    height : 25px;
`

const QtyButton = styled.button`
    margin : 0 0 0 10px;
    width : 36px;
    font-size : 20px;
    color : white;
    border : 0;
    background-color : black;
    cursor : pointer;
    outline : none;
`

export default ProductInfo;