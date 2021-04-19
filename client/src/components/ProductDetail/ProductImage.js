import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const ProductImage = (props) => {

    const [slideImages, setSlideImages] = useState([]);

    useEffect(() => {
        if(props.detail.images && props.detail.images.length > 0){
            let images = []

            props.detail.images.map(item => (
                images.push({
                    imgUrl : `http://localhost:5000/${item}`,
                })
            ))
            setSlideImages(images);
        }
    }, [props.detail]);


    console.log("slide",slideImages);

    const SampleNextArrow = (props) => {
        const {className, style, onClick} = props
        return (
            <div
                className={className}
                style={{...style, display: 'block', right : 20, zIndex : 5, color : "white"}}
                onClick={onClick}
            >
                <AiOutlineRight/>
            </div>
        );
    }

    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
                className={className}
                style={{...style, display: 'block', left : 20, zIndex : 5, color : "white"}}
                onClick={onClick}
            >
                <AiOutlineLeft/>
            </div>
        );
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <ProductImgWrapper>
            <Slider {...settings}>
            {slideImages.map(item => {
                return (
                    <ImgWrapper>
                    <img src={item.imgUrl} />
                    </ImgWrapper>
                );
            })}
            </Slider>
        </ProductImgWrapper>
    )
}

const ProductImgWrapper = styled.div`
  width : 50%;

  @media (max-width : 500px) {
    width : 100%;
  }
`

const ImgWrapper = styled.div`
    width : 100%;

    & > img {
        width : 100%;
        display : block;
        margin : 0;
        padding : 0;
    }
`

export default ProductImage;

