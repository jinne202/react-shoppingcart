import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RightMenu from './RightMenu';
import MobileRightButton from './MobileRightButton';
import useWindowSize from '../../hooks/useWindowSize';

const NavLayout = () => {

  const windowSize = useWindowSize();
  console.log(windowSize);

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (windowSize === "mobile") {
        setMobile(true)
    } else {
        setMobile(false)
    }
  }, [windowSize]);

  return (
    <NavWrapper>
      <LogoWrapper>
        <a href="/"><span>FRONT</span>ROW</a>
      </LogoWrapper>
      <RightMenuWrapper>
        {mobile ? <MobileRightButton/> : <RightMenu/>}
      </RightMenuWrapper>
    </NavWrapper>
  )
}

const NavWrapper = styled.div`
  position : fixed;
  z-index : 10;
  top : 0;
  width : 100%;
  display : flex;
  justify-content : space-between;
  font-family: 'Poppins', sans-serif;

  @media (max-width : 500px) {
    background-color : black;
    width : 100%;
  }
`

const LogoWrapper = styled.div`
  margin : 0 0 0 50px;
  padding : 50px 0 20px;

  @media (max-width : 500px) {
    margin : 0 0 0 20px;
    padding : 20px 0
  }

   & > a {
      font-size : 30px;
      color : black;
      text-decoration : none;


      @media (max-width : 500px) {
        color : white;
        font-size : 20px;
      }
   }

   & > a > span {
     font-weight : 700;
   }

`

const RightMenuWrapper = styled.div`
   margin : 0 50px 0 0;
`

export default NavLayout;