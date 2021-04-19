import Axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import FileUpload from '../../utils/FileUpload';

const UploadProductPage = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [selectCategory, setSelectCategory] = useState(1);
    const [images, setImages] = useState([]);

    const Category = [
        {key : 1, value : "OUTER"},
        {key : 2, value : "BOTTOMS"},
        {key : 3, value : "TOPS"},
        {key : 4, value : "DRESSES"},
        {key : 5, value : "BAGS"}
    ]

    const handleTitle = (event) => {
        setTitle(event.currentTarget.value);
    }

    const handleDescription = (event) => {
        setDescription(event.currentTarget.value);
    }

    const handlePrice = (event) => {
        setPrice(event.currentTarget.value);
    }

    const handleselectCategory = (event) => {
        setSelectCategory(event.currentTarget.value);
    }

    const updateImages = (newImages) => {
        setImages(newImages);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!title || !description || !price || !selectCategory || !images) {
            return (alert("모든 정보를 입력해주세요 "))
        }

        const body = {
            // 로그인 된 사람의 id
            writer : props.user.userData._id,
            title : title,
            description : description,
            price : price,
            selectCategory : selectCategory,
            images : images,
        }

        Axios.post("/api/product", body)
            .then(response => {
                if(response.data.success) {
                    alert('상품이 업로드 되었습니다');
                    setImages([]);
                } else {
                    alert('상품 업로드에 실패했습니다')
                }
            })
    }

    return (
        <UploadWrapper>
            <Title>Upload Product</Title>
        <FormWrapper onSubmit={handleSubmit}>
            <FileUpload refreshFunction={updateImages}/>
            <UploadBox>
                <UploadLabel>Product name</UploadLabel>
                <UploadInput onChange={handleTitle} value={title}/>
            </UploadBox>
            <UploadBox>
            <UploadLabel>Product Description</UploadLabel>
            <UploadTextArea onChange={handleDescription} value={description}/>
            </UploadBox>
            <UploadBox>
            <UploadLabel>Price</UploadLabel>
            <UploadInput onChange={handlePrice} value={price} type="number"/>
            </UploadBox>
            <UploadBox>
            <UploadSelect onChange={handleselectCategory} value={selectCategory}>
                {Category.map(item => (
                    <option key={item.key} value={item.key}>{item.value}</option>
                ))}
            </UploadSelect>
            </UploadBox>
            <UploadButton type="submit">
                UPLOAD PRODUCT
            </UploadButton>
        </FormWrapper>
        </UploadWrapper>
    )
}

const UploadWrapper = styled.div`
    max-width : 700px;
    margin : 0 auto;
    font-family: 'Poppins', sans-serif;
    padding : 100px 0 0 0;
`

const Title = styled.h3`
    text-align : center;
    color : black;
    font-size : 30px;
    margin : 40px 0;
    font-weight : 400;
`

const FormWrapper = styled.form`
    margin : 60px 0 0 0;
`

const UploadBox = styled.div`
    width : 100%;
    margin : 0 0 70px 0;
`

const UploadLabel = styled.label`
    display : block;
    margin : 0 0 10px 0;
`

const UploadInput = styled.input`
    width : 100%;
    border : 0;
    border-bottom : 2px solid black;
    padding : 10px 0;
    outline : none;
    font-family: 'Poppins', sans-serif;
`

const UploadTextArea = styled.textarea`
    width : 100%;
    border : 2px solid black;
    height : 80px;
    resize : none;
    padding : 3px 5px;
    outline : none;
    font-family: 'Poppins', sans-serif;
`

const UploadButton = styled.button`
    cursor : pointer;
    width : 100%;
    height : 40px;
    background-color : black;
    outline : none;
    border : none;
    color : white;
`

const UploadSelect = styled.select`
    width : 100%;
    border : 0;
    outline : none;
    border-bottom : 2px solid black;
    padding : 10px 0;
`



export default UploadProductPage;