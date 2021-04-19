import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Slider from 'react-slick';

import main_bg from '../static/img/main_bg.jpeg';
import main_img from '../static/img/main_img.jpeg';
import product_1 from '../static/img/product_1.jpeg';
import product_2 from '../static/img/product_2.jpeg';
import product_3 from '../static/img/product_3.jpeg';

const MainPage = () => {

    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 1400,
        cssEase: "linear"
      };

    const [position, setPosition] = useState(0);

    function onScroll() {
        setPosition(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
          window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <MainPageWrapper>
            <FirstSection>
                <FirstImgWrapper>
                    <img src={main_bg} alt="메인이미지"/>
                </FirstImgWrapper>
                <Title><span>FRONT</span>ROW</Title>
                <Description>FRONTROW is a brand that brings new lifestyle and cultural trends through each seasonal collection. FRONTROW creates simple yet distinctive silhouettes using valuable materials, intricate patterns, and unique design at an affordable price range.</Description>
            </FirstSection>
            <SecondSection>
                <MScrollTitle>
                    <MScrollWrapper>
                    <MScrollText>
                        <span> '21 SPRING COLLECTION</span> DENIM FOR DAYS <span> '21 SPRING COLLECTION</span> DENIM FOR DAYS <span> '21 SPRING COLLECTION</span> DENIM FOR DAYS 
                    </MScrollText>
                    <MScrollText>
                        <span> '21 SPRING COLLECTION</span> DENIM FOR DAYS <span> '21 SPRING COLLECTION</span> DENIM FOR DAYS <span> '21 SPRING COLLECTION</span> DENIM FOR DAYS 
                    </MScrollText>
                    </MScrollWrapper>
                </MScrollTitle>
            </SecondSection>
            <ThirdSection>
                <ImgWrapper>
                    <img src={main_img} alt="" style={{transform: `translateY(calc(${position / -5}px + 50px))`,
                }}/>
                </ImgWrapper>
                <SlideWrapper>
                    <Slider {...settings}>
                        <SlideImgWrapper>
                            <img src={product_1} alt="상품"/>
                        </SlideImgWrapper>
                        <SlideImgWrapper>
                            <img src={product_2} alt="상품"/>
                        </SlideImgWrapper>
                        <SlideImgWrapper>
                            <img src={product_3} alt="상품"/>
                        </SlideImgWrapper>
                    </Slider>
                </SlideWrapper>
                <a href="/shop">
                    <ShopButton>
                            BRAND SHOP
                    </ShopButton>
                </a>
            </ThirdSection>
        </MainPageWrapper>
    )
}

const MainPageWrapper = styled.div`
    width : 100%;
`

const FirstSection = styled.div`
    width : 100%;
    position : relative;
    font-family: 'Poppins', sans-serif;
    height : 100vh;
`

const FirstImgWrapper = styled.div`
    width : 100%;
    height : 100vh;

    & > img {
        width : 100%;
        height : 100vh;
        object-fit : cover;
    }
`

const Title = styled.h2`
    position : absolute;
    top : 0;
    left : 0;
    color : white;
    margin : 40vh 0 0 0;
    text-align : center;
    width : 100%;
    font-weight : 400;
    font-size : 50px;

    & > span {
        font-weight : 700;
    }

    @media (max-width : 500px) {
        margin : 35vh 0 0 0;
        font-size : 34px;
    }
`

const Description = styled.p`
    position : absolute;
    color : white;
    width : 50%;
    top : 0;
    text-align : center;
    margin : 55vh 25% 0;

    @media (max-width : 500px) {
        width : 80%;
        margin : 45vh 10% 0;
    }
`

const SecondSection = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 60px;
    overflow: hidden;
    z-index: 1;
    padding : 30px 0;
    background-color : white;
`

const ScrollText = keyframes`
    from {
        transform: translateX(0%);
    }
    to {
        transform: translateX(-50%);
    }
`


const MScrollTitle = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    transition: all 1s ease;
`

const MScrollWrapper = styled.div`
    display: flex;
    -webkit-animation: ${ScrollText} 33s infinite linear;
    animation: ${ScrollText} 33s infinite linear;
`
const MScrollText = styled.p`
    margin: 0;
    font-size: 40px;
    transition: all 2s ease;
    font-family: 'DM Serif Display', serif;
    font-style : italic;

    & > span {
        font-family: 'Poppins', sans-serif;
        font-style : normal;
        font-weight : 400;
    }
`

const ThirdSection = styled.div`
    width : 100%;
    position : relative;
    font-family: 'Poppins', sans-serif;
`

const ImgWrapper = styled.div`
    width : 100%;
    height : 600px;
    overflow : hidden;

    & > img {
        width : 100%;
        object-fit : cover;

        @media (max-width : 500px) {
            width : 100%;
            height : 150%;
            object-fit : cover;
        }
    }
`

const SlideWrapper = styled.div`
    position : absolute;
    width : 30%;
    height : 500px;
    top : 50px;
    left : 35%;
    font-size : 60px;
    color : white;

    @media (min-width: 501px) and (max-width: 768px) {
        width : 50%;
        left : 25%;
    }

    @media (max-width : 500px) {
        width : 70%;
        left : 15%;
    }
`

const SlideImgWrapper = styled.div`
    width : 100%;
    height : 500px;

    & > img {
        width : 100%;
        height : 500px;
        object-fit : cover;
    }
`

const ShopButton = styled.button`
    border : none;
    background-color : white;
    top : 50%;
    left : 60%;
    position : absolute;
    width : 200px;
    height : 40px;
    font-size : 18px;
    cursor : pointer;
    outline : none;
    font-family: 'DM Serif Display', serif;

    @media (max-width : 500px) {
        left : 50%;
        width : 160px;
    }
`
  
  


export default MainPage;