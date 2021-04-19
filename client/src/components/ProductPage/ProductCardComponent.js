import React from 'react';
import styled from 'styled-components';

const ProductCardComponent = ({ product }) => {
    return (
        <ProductCard>
            <ProductCardUI>
                <a href={`/product/${product._id}`}>
                <ProductCardImgWrapper>
                    <img src={`http://localhost:5000/${product.images[0]}`} alt={`product.title}`}/>
                </ProductCardImgWrapper>
                </a>
            </ProductCardUI>
            <ProductInfo>
                <ProductTitle>
                    {product.title}
                </ProductTitle>
                <ProductPrice>
                    ${product.price}.00
                </ProductPrice>
            </ProductInfo>
        </ProductCard>
    )
}


const ProductCardUI = styled.div`
    position: relative;
    max-width : 633px;
    min-width : 250px;
	height: 0;
	overflow: hidden;
	padding-bottom: 130%;
`

const ProductCard = styled.div`
`

const ProductCardImgWrapper = styled.div`
    cursor : pointer;
    position: absolute;
    overflow : hidden;
    width : 100%;
    height : 100%;
    display : block;
	top: 0;
	left: 0;
    transition: all 0.5s ease-out;

    & > img {
        width : 100%;
        height : 100%;
        object-fit: cover;
        transition: all 0.5s ease-out;
    }
    
    & > div {
        width : 100%;
        height : 100%;
    }

    &:hover {
        & > img {
            transform:scale(1.05);
            -webkit-transform:scale(1.05);
            -moz-transform:scale(1.05);
            -o-transform:scale(1.05);
        }
    }
`
const ProductInfo = styled.div`
    text-align : center;
    padding : 15px 0 0 0;
`

const ProductTitle = styled.p`
    font-family: 'Poppins', sans-serif;

    @media (max-width : 500px) {
        width : 80%;
        margin : 0 auto;
    }
`

const ProductPrice = styled.p`
    font-family: 'Poppins', sans-serif;
    color : black;

    @media (max-width : 500px) {
        margin : 10px 0 0 0;
    }
`

export default ProductCardComponent;