import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch } from "react-icons/fi";

const SearchComponent = (props) => {

    const [serachTerm, setSearchTerm] = useState("");

    const hanldeSearch = (event) => {
        setSearchTerm(event.currentTarget.value);
        props.searchFilters(event.currentTarget.value);
    }

    return (
        <SearchWrapper>
            <SearchInput type="text" onChange={hanldeSearch} value={serachTerm}/>
            <SearchIcon>
                <FiSearch/>
            </SearchIcon>
        </SearchWrapper>
    )
}

const SearchWrapper = styled.div`
    width : 200px;
    border-bottom : 2px solid black;
    position : relative;

    @media (max-width : 500px) {
        margin : 50px auto 0;
    }
`

const SearchInput = styled.input`
    border : 0;
    outline : none;
    width : 100%;
    font-family: 'Poppins', sans-serif;
`

const SearchIcon = styled.div`
    position : absolute;
    right : 0;
    font-size : 18px;
    top : -3px;
`

export default SearchComponent;