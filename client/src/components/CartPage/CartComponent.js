import React, { useState , useEffect } from 'react';
import styled from 'styled-components';
import useWindowSize from '../../hooks/useWindowSize'

const CartComponent = (props) => {


    const windowSize = useWindowSize();
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        if (windowSize === "mobile") {
            setMobile(true)
        } else {
            setMobile(false)
        }
    }, [windowSize]);

    const renderCartImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    const renderItemsDesktop = () => (
        props.products && props.products.map((product, index) => (
            <CartCard key={index}>
                <ImageSection>
                    <img src={renderCartImage(product.images)} alt={product.title}/>
                </ImageSection>
                <ProductTitle>
                    {product.title}
                </ProductTitle>
                <ProductQty>
                    Qty {product.quantity}
                </ProductQty>
                <ProductPrice>
                    ${product.price}.00
                </ProductPrice>
                <RemoveButton onClick={() => props.removeItem(product._id)}>
                    Remove
                </RemoveButton>
            </CartCard>
        ))
    )

    const renderItemsMobile = () => (
        props.products && props.products.map((product, index) => (
            <MobileCartCard key={index}>
                <MobileProductTitle>
                    {product.title}
                </MobileProductTitle>
                <MobileImgQtyRemove>
                <ImageSection>
                    <img src={renderCartImage(product.images)} alt={product.title}/>
                </ImageSection>
                <MobileProductQty>
                    Qty {product.quantity}
                </MobileProductQty>
                <ProductPrice>
                    ${product.price}.00
                </ProductPrice>
                <RemoveButton onClick={() => props.removeItem(product._id)}>
                    Remove
                </RemoveButton>
                </MobileImgQtyRemove>
            </MobileCartCard>
        ))
    )

    return (
        <CartComponentWrapper>
            {mobile ? renderItemsMobile() : renderItemsDesktop()}
        </CartComponentWrapper>
    )
}

const CartComponentWrapper = styled.div`
    width : 100%;
`

const CartCard = styled.div`
    width : 100%;
    display : flex;
    padding : 30px 0 30px 0;
    border-bottom : 1px solid #eee;
`

const ImageSection = styled.div`
    width : 100px;

    & > img {
        width : 100%;
    }
`

const ProductTitle = styled.div`
    font-size : 14px;
    width : 40%;
    margin : 53px 0 0 5%;
`

const ProductQty = styled.div`
    font-size : 14px;
    width : 15%;
    margin : 53px 0 0 15px;
`

const ProductPrice = styled.div`
    font-size : 14px;
    width : 20%;
    margin : 53px 0 0 0;
`

const RemoveButton = styled.button`
    border : 0;
    outline : none;
    cursor : pointer;
    font-size : 14px;
    height : 30px;
    width : 100px;
    margin : 48px 0 0 0;
    background-color : black;
    color : white;
`

const MobileCartCard = styled.div`
    width : 100%;
    padding : 30px 0 30px 0;
    border-bottom : 1px solid #eee;
`

const MobileImgQtyRemove = styled.div`
    width : 100%;
    display : flex;
    justify-content : space-between;
`

const MobileProductTitle = styled.div`
    width : 100%;
    margin : 0 0 10px 0;
`

const MobileProductQty = styled(ProductQty)`
    margin : 53px 0 0 15px;
`

export default CartComponent;