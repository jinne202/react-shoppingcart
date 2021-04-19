import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { USER_SERVER } from '../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

const RightMenu = (props) => {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {

    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <BeforeLoginWrapper>
        <MenuItem>
          <a href="/shop">SHOP</a>
        </MenuItem>
        <MenuItem>
          <a href="/login">LOG IN</a>
        </MenuItem>
        <MenuItem>
          <a href="/register">REGISTER</a>
        </MenuItem>
      </BeforeLoginWrapper>
    )
  } else {
    return (
      <AfterLoginWrapper>
        <MenuItem>
          <a href="/shop">SHOP</a>
        </MenuItem>
        <MenuItem>
          <a href="/user/cart">CART</a>
        </MenuItem>
        <MenuItem>
          <LogoutButton onClick={logoutHandler}>LOGOUT</LogoutButton>
        </MenuItem>
      </AfterLoginWrapper>
    )
  }
}

const BeforeLoginWrapper = styled.div`
  display : flex;
  margin : 65px 0 0 0;

  @media (max-width : 500px) {
    display : block;
  }
`

const AfterLoginWrapper = styled.div`
  display : flex;
  margin : 65px 0 0 0;

  @media (max-width : 500px) {
    display : block;
  }
`

const MenuItem = styled.div`
  font-size : 14px;
  margin : 0 0 0 20px;

  @media (max-width : 500px) {
    text-align : center;
    margin : 30px 0 0 0;
    font-size : 18px;
  }

  & > a {
    color : black;
    text-decoration : none;

    @media (max-width : 500px) {
      color : white;
    }
  }
`

const LogoutButton = styled.div`
  border : 0;
  background-color : transparent;
  cursor : pointer;

  @media (max-width : 500px) {
    color : white
  }
`

export default withRouter(RightMenu);

