import React from 'react';
import styled from 'styled-components';
import Button from './Button.js';

const StyledListItem = styled.li`
    padding-left: 30px;
    padding-top: 10px;
`;

const ResultList = ({resultList=[], handleClick, disabledButtonsList=[]}) => {
    return (
        <>
        { resultList.map((result) => {
            if (result) {
                let movie = {
                    id: result.imdbID,
                    attributes: {
                        title: result.Title,
                        year: result.Year
                    }
                }
                return (
                    <StyledListItem key={result.imdbID}>
                        {result.Title} ({result.Year})
                        <Button
                            id={result.imdbID}
                            handleClick={() => handleClick(movie)}
                            text="Nominate"
                            disabled={disabledButtonsList.includes(result.imdbID)}
                        />
                    </StyledListItem>
                );
            }
            return null;
        }) }
        </>
    );
  }

  export default ResultList


