import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import ProductCardComponent from '../components/ProductPage/ProductCardComponent';
import Checkbox from '../components/ProductPage/Checkbox';
import SearchComponent from '../components/ProductPage/SearchComponent';
import { Category } from '../static/data/Category';
import Pagination from '../components/ProductPage/Pagination';

const ProductPage = () => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [filterCategory, setFilterCategory] = useState({
        category : []
    })
    const [searchTerm, setSearchTerm] = useState("");

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
        .then(response => {
            if (response.data.success) {
                const productData = response.data.productInfo
                setProducts(productData.reverse());
            } else {
                alert("상품 로딩에 실패했습니다")
            }
        })
    }

    const indexOfLast = currentPage * limit;
    const indexOfFirst = indexOfLast - limit;

    useEffect(() => {

        let body = {
        }

        getProducts(body);
    }, []);

    const showFilteredResults = (filters) => {

        let body = {
            filters : filters
        }

        getProducts(body);
        setCurrentPage(1);
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
            filters : filterCategory,
            searchTerm : newSearchTerm
        }

        getProducts(body);
        setCurrentPage(1);
    }


    const currentPosts = products.slice(indexOfFirst, indexOfLast);
    console.log(products);

    return (
        <ProductPageWrapper>
            <FilterWrapper>
                <Checkbox list={Category} handleFilters={filters => handleFilters(filters, "category")}/>
                <SearchComponent searchFilters={updateSearchTerm}/>
            </FilterWrapper>
            <ProductCardWrapper>
                {currentPosts.map((c) => {
                    return (
                    <ProductCardComponent key={c.index} product={c} />
                    );
                })}
            </ProductCardWrapper>
            <Pagination postsPerPage={limit} totalPosts={products.length} paginate={setCurrentPage}></Pagination>
        </ProductPageWrapper>
    )
}

const ProductPageWrapper = styled.div`
    width : 100%;
    max-width : 1300px;
    margin : 0 auto 100px;
    padding : 100px 0 0 0;
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

const FilterWrapper = styled.div`
    display : flex;
    justify-content : space-between;
    margin : 100px 0 60px 0;

    @media (max-width : 500px) {
        display : block;
        margin : 40px 0 60px 0;
    }
`

export default ProductPage;
