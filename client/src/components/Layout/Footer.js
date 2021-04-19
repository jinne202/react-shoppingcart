import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterWrapper>
            <Copyright>
                © 2021. EUNJIN HAN Co. all rights reserved.
            </Copyright>
            <ProductInfo>
                Product information from FRONTROW, I don't use this commercially.
            </ProductInfo>
        </FooterWrapper>
    )
}

const FooterWrapper = styled.div`
    background-color : black;
    margin : 0 0 0 0;
    padding : 70px 80px;
    font-family: 'Poppins', sans-serif;

    @media (min-width: 501px) and (max-width: 768px) {
        font-size : 12px;
    }

    @media (max-width : 500px) {
        padding : 70px 20px;
        font-size : 10px;
    }
`

const Copyright = styled.p`
    color : white;
    text-align : right;
    margin : 0;
`

const ProductInfo = styled.p`
    color : white;
    text-align : right;
    margin : 0;
`

export default Footer;
