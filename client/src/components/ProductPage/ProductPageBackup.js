import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import ProductCardComponent from './ProductCardComponent';
import Checkbox from './Checkbox';
import SearchComponent from './SearchComponent';
import { Category } from '../../static/Data/Category';

const ProductPage = () => {

    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(6);
    const [showLoadButton, setShowLoadButton] = useState(0);
    const [filterCategory, setFilterCategory] = useState({
        category : []
    })
    const [searchTerm, setSearchTerm] = useState("");

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
        .then(response => {
            if (response.data.success) {
                if(body.loadMore) {
                    setProducts([...products, ...response.data.productInfo])
                } else {
                    setProducts(response.data.productInfo)
                }
                setShowLoadButton(response.data.postSize);
            } else {
                alert("상품 로딩에 실패했습니다")
            }
        })
    }

    useEffect(() => {

        let body = {
            skip : skip,
            limit : limit,
        }

        getProducts(body);

    }, []);

    const handleLoadMore = () => {

        let skipPlus = skip + limit

        let body = {
            skip : skipPlus,
            limit : limit,
            loadMore : true,
        }

        getProducts(body)
        setSkip(skipPlus)
    }

    const showFilteredResults = (filters) => {

        let body = {
            skip : 0,
            limit : limit,
            filters : filters
        }

        getProducts(body);
        setSkip(0);
    }

    const handleFilters = (filters, category) => {

        const newFilters = {...filterCategory};

        newFilters[category] = filters;

        showFilteredResults(newFilters);
        setFilterCategory(newFilters);
    }

    const updateSearchTerm = (newSearchTerm) => {

        setSearchTerm(newSearchTerm);

        let body = {
            skip : 0,
            limit : limit,
            filters : filterCategory,
            searchTerm : newSearchTerm
        }

        setSkip(0);
        getProducts(body);
    }

    return (
        <ProductPageWrapper>
            <FilterWrapper>
                <Checkbox list={Category} handleFilters={filters => handleFilters(filters, "category")}/>
                <SearchComponent searchFilters={updateSearchTerm}/>
            </FilterWrapper>
            <ProductCardWrapper>
                {products.map((c) => {
                    return (
                    <ProductCardComponent key={c.index} product={c} />
                    );
                })}
            </ProductCardWrapper>
            {showLoadButton >= limit &&
            <ShowMoreButton onClick={handleLoadMore}>LOAD MORE</ShowMoreButton>
            }
        </ProductPageWrapper>
    )
}

const ProductPageWrapper = styled.div`
    width : 100%;
    max-width : 1300px;
    margin : 0 auto;
`



const ProductCardWrapper = styled.div`
    width : 100%;
    display : inline-grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 30px;
    row-gap : 30px;

    @media (min-width: 633px) and (max-width: 962px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 633px) {
        grid-template-columns: repeat(1, 1fr);
    }
`


const ShowMoreButton = styled.button`
    border : 2px solid black;
    background : white;
    padding : 10px 30px;
    margin : 50px auto 0;
    display : block;
    cursor : pointer;
    outline : none;
`

const FilterWrapper = styled.div`
    display : flex;
    justify-content : space-between;
    margin : 100px 0 60px 0;
`

export default ProductPage;