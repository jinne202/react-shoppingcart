import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import axios from 'axios';
import { PromiseProvider } from 'mongoose';

const FileUpload = (props) => {

    const [images, setImages] = useState([]);

    const handleDropzone = (files) => {

        let formData = new FormData();

        const config = {
            header : {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        axios.post('/api/product/image', formData, config)
            .then(response => {
                if(response.data.success){
                    // console.log(response.data)
                    setImages([...images, response.data.filePath]);
                    props.refreshFunction([...images, response.data.filePath]);
                } else {
                    alert("file upload error!");
                }
            })
    }

    const handleDeleteImage = (image) => {
        const currentIndex = images.indexOf(image);
        
        let newImages = [...images];
        newImages.splice(currentIndex, 1);

        setImages(newImages);
        props.refreshFunction(newImages);
    }

    return (
        <FileUploadWrapper>
            <DropzoneWrapper>
                <Dropzone onDrop={handleDropzone}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <DropZoneStyle {...getRootProps()}>
                        <input {...getInputProps()} />
                        <UploadText>Image Upload</UploadText>
                    </DropZoneStyle>
                    </section>
                )}
                </Dropzone>
            </DropzoneWrapper>
            <ImagePreview>
                {images.map((image, index) => (
                    <ImageBoxWrapper key={index}>
                        <ImageBox>
                            <img src={`http://localhost:5000/${image}`} alt={"productImage"}/>
                        </ImageBox>
                        <DeleteButton onClick={() => handleDeleteImage(image)}>삭제하기</DeleteButton>
                    </ImageBoxWrapper>
                ))}
            </ImagePreview>
        </FileUploadWrapper>
    )
}

const FileUploadWrapper = styled.div`
    margin : 0 0 70px 0;
`

const DropzoneWrapper = styled.div`
    width : 100%;
    border : 2px solid black;
    height : 70px;
    cursor : pointer;
`

const UploadText = styled.p`
    text-align : center;
    font-size : 18px;
    margin : 0;
    padding : 21px 0;
    color : black;
`

const ImagePreview = styled.div`
    width : 100%;
    display : flex;
    flex-wrap: wrap;
    gap : 2%;
    margin : 30px 0 0 0;
`

const ImageBoxWrapper = styled.div`
    width : 32%;
    margin : 0 0 10px 0;
`

const ImageBox = styled.div`
    border : 2px solid black;
    margin : 0 0 5px 0;

    & > img {
        width : 100%;
    }
`

const DeleteButton = styled.div`
    width : 100%;
    outline : none;
    background-color : black;
    color : white;
    border : 0;
    padding : 5px 0;
    cursor : pointer;
    text-align : center;
`

const DropZoneStyle = styled.div`
    outline : none;
    height : 70px;
`

export default FileUpload;