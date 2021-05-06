import React from 'react';
import styled from 'styled-components';
import Button from './Button.js';

const StyledListItem = styled.li`
    padding-left: 30px;
    padding-top: 10px;
`;

const NominationList = ({nominationList=[], handleClick}) => {
      return (
        <>
            { nominationList.map((nomination) => {
                if (nomination) {
                    return (
                        <StyledListItem key={nomination.id}>
                            {nomination.attributes.title} ({nomination.attributes.year})
                            <Button
                            id={nomination.id}
                            handleClick={() => handleClick(nomination)}
                            text="Remove"
                            />
                        </StyledListItem>
                    )
                }
                return null
             }) }
        </>
      );
}

  export default NominationList