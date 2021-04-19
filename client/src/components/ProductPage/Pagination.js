import React from 'react';
import styled from 'styled-components';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }


  const handlePaginationClick = () => {
    window.scrollTo(0, 0)
    console.log("www")
  }

  return (
    <PaginationWrapper>
        <PageUl>
          {pageNumbers.map(number => (
            <PageLi key={number} onClick={handlePaginationClick}>
              <PageSpan onClick={() => paginate(number)}>
                {number}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
    </PaginationWrapper>
  );
};


const PaginationWrapper = styled.div`
  margin : 50px 0 0 0;
`

const PageUl = styled.ul`
  list-style: none;
  text-align : center;
  padding : 0;
`;

const PageLi = styled.li`
  display : inline-block;
  font-size : 14px;
  padding : 20px;
  cursor : pointer;
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after{
    border-radius:100%;
    color:white;
    background-color:#263A6C;
  }
`;

export default Pagination;