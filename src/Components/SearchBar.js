import React from 'react';
import styled from 'styled-components';

const Bar = styled.input`
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
`;

const SearchBar = ({input, onChange, onKeyDown}) => {
    return (
      <div>
        <Bar 
          key="search_movie"
          input={input}
          placeholder={"Search Movie Here"}
          onChange={onChange}
          onKeyDown={onKeyDown}
        ></Bar>
      </div>
    );
  }

  export default SearchBar