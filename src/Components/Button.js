import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    margin-left: 5px;
    padding: 5px 10px;
`;

const Button = ({id, text, handleClick, disabled}) => {
    return <StyledButton id={id} onClick={handleClick} disabled={disabled}>{text}</StyledButton>
}

export default Button