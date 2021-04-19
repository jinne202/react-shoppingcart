import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const HistoryPage = (props) => {
    return (
        <HistoryPageWrapper>
            <Title>ORDER HISTORY</Title>
            <div>
            {props.user.userData && props.user.userData.history.dateOfPurchase}
            </div>
            {props.user.userData && props.user.userData.history.map(item => (
                <HistoryCard key={item._id}>
                    <HistoryName>{item.name}</HistoryName>
                    <HistoryPrice>${item.price}.00</HistoryPrice>
                    <HistoryQty>Qty.{item.quantity}</HistoryQty>
                </HistoryCard>
            ))}
            <ButtonWrapper>
                <a href="/shop">
                    <HomeButton>Shop</HomeButton>
                </a>
            </ButtonWrapper>
        </HistoryPageWrapper>
    )
}

const HistoryPageWrapper = styled.div`
    width : 90%;
    margin : 0 5% 0;
    padding : 170px 0 100px 0;
    font-family: 'Poppins', sans-serif;
`

const Title = styled.h2`
    font-size : 18px;
    margin : 0 0 30px 0;
`

const HistoryCard = styled.div`
    border-bottom : 1px solid #eee;
    display : flex;
    width : 100%;
    padding : 20px 0;
`

const HistoryName = styled.div`
    width : 50%;
`

const HistoryPrice = styled.div`
    width : 25%;
`

const HistoryQty = styled.div`
    width : 25%;
`

const ButtonWrapper = styled.div`
    width : 100%;
    text-align : center;
`

const HomeButton = styled.button`
    border : 0;
    background-color : black;
    color : white;
    width : 250px;
    height : 60px;
    font-size : 18px;
    margin : 50px 0 0 0;
    cursor : pointer;
    outline : none;
    text-align : center;
`

export default HistoryPage;