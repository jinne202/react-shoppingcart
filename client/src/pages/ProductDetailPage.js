import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import ProductImage from '../components/ProductDetail/ProductImage';
import ProductInfo from '../components/ProductDetail/ProductInfo';


const ProductDetailPage = (props) => {

    const productId = props.match.params.productId;

    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
              setProduct(response.data[0]);
            })
            .catch(err => alert(err))
    }, []);

    return (
      <DetailPageWrapper>
        <DetailInner>
          <ProductImage detail={product}/>
          <ProductInfo detail={product}/>
        </DetailInner>
      </DetailPageWrapper>
    )
}

const DetailPageWrapper = styled.div`
  width : 90%;
  margin : 0 5%;
  padding : 100px 0 200px 0;
`

const DetailInner = styled.div`
  margin : 80px 0 0 0;
  display : flex;

  @media (max-width : 500px) {
    display : block;
    margin : 20px 0 0 0;
  }
`

export default ProductDetailPage;