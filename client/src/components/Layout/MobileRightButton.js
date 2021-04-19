import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Sidebar from './Sidebar';

const MobileRightButton = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <>
            <MenuBtn open={open} onClick={handleOpen}>
                <HamburgerMenu open={open}></HamburgerMenu>
            </MenuBtn>
            <Sidebar open={open}/>
        </>
    )
}

const MenuBtn = styled.div`
    width: 60px;
    height: 60px;
    cursor: pointer;
    top : 7px;
    position : fixed;
    z-index : 1000;
    right : 10px;
    overflow: visible;
    transition: 0.2s ease-in all;
    -moz-transition: 0.2s ease-in all;
    -webkit-transition: 0.2s ease-in all;
`

const HamburgerMenu = styled.div`
    position: relative;
    transform: translateY(25px);
    background: white;
    width: 20px;
    height: 2px;
    margin : 4px 0 0 17px;
    transition: top 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
    @media (max-width : 420px) {
        margin : 4px 0 0 35px;
    }
    ${props =>
    props.open === true &&
    css`
        background: transparent;
    `}
    
    &:after {
        width: 20px;
        height: 2px;
        content: "";
        position: absolute;
        left: 0;
        top: 6px;
        background: white;
        transition: top 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
        ${props =>
        props.open === true &&
        css`
            top: 0;
            transform: rotate(45deg);
            transition: top 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
            background : white;
        `}
    }
    &:before {
        width: 20px;
        height: 2px;
        content: "";
        position: absolute;
        left: 0;
        bottom: 6px;
        background: white;
        transition: bottom 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
        ${props =>
        props.open === true &&
        css`
            bottom: 0;
            transform: rotate(-45deg);
            transition: bottom 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
            background : white;
        `}
    }
`

export default MobileRightButton;