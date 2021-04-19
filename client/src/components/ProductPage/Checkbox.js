import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Checkbox = (props) => {

    const [isChecked, setIsChecked] = useState([]);

    const handleCheckbox = (value) => {
        const currentIndex = isChecked.indexOf(value);
        const newChecked = [...isChecked]

        if (currentIndex === -1) {
            newChecked.pop();
            newChecked.push(value);

            if (value === 0) {
                newChecked.pop();
            }
        } else {
            newChecked.splice(currentIndex, 1)
        }
        console.log("handlecheckbox", value, currentIndex, newChecked)

        setIsChecked(newChecked);

        props.handleFilters(newChecked);
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <CheckboxContent>
            <CheckboxLabel checked={isChecked.indexOf(value.id) === -1 ? false : true}>
                <CheckboxInput type="checkbox" onChange={() => handleCheckbox(value.id)} checked={isChecked.indexOf(value.id) === -1 ? false : true}/>
                {value.name}
            </CheckboxLabel>
            </CheckboxContent>
        </React.Fragment>
    ))

    return (
        <CheckboxWrapper>
            {renderCheckboxLists()}
        </CheckboxWrapper>
    )
}

const CheckboxWrapper = styled.div`
    width : 600px;
    display : flex;
    justify-content : space-between;
    font-family: 'Poppins', sans-serif;

    @media (max-width : 500px) {
        display : block;
        width : 100%;
    }
`

const CheckboxContent = styled.div`
    width : 50px;
    text-align : center;
    color : black;
    
    @media (max-width : 500px) {
        width : 100%;
        margin : 10px 0 0 0;
    }
`

const CheckboxLabel = styled.label`
    cursor : pointer;

    ${props => props.checked === true &&
        css`
          font-style : italic;
          font-weight : 500;
    `}
`

const CheckboxInput = styled.input`
    display : none;
`

export default Checkbox;