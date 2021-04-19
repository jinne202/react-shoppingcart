import React from 'react';
import styled, { css } from 'styled-components';
import RightMenu from './RightMenu';

const Sidebar = ({ open }) => {
    return (
    <RightNavMenu>
        <RightNavWrapper open={open}>
            <RightMenu/>
        </RightNavWrapper>
    </RightNavMenu>
  )
}

const RightNavMenu = styled.div`
`

const RightNavWrapper = styled.div`
    position : fixed;
    height : calc(100vh - 70px);
    width : 100%;
    display : block;
    background : black;
    right : -100%;
    top : 70px;
    z-index : 5;
    transition: all 0.4s;
    ${props =>
        props.open === true &&
        css`
            right : 0;
    `}
`


export default Sidebar;