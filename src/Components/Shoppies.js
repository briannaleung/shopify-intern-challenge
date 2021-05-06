import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar.js';
import NominationList from './NominationList.js';
import ResultList from './ResultList.js';
import Banner from 'react-js-banner';

const ShoppiesContainer = styled.div`
    background-color: rgb(231, 231, 231);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TopContainer = styled.div`
    background-color: white;
    padding: 10px;
    margin: 10px;
    width: 1000px;
    box-sizing: border-box;
    border-radius: 3px;
`;

const BottomContainer = styled.div`
    display: flex;
    width: 1000px;
    box-sizing: border-box;
    flex-direction: row;
`;

const NominationsContainer = styled.div`
    background-color: white;
    padding: 20px;
    box-shadow: gray;
    border-radius: 3px;
    width: 100%;
`;

const ResultsContainer = styled.div`
    margin-right: 10px;
    background-color: white;
    padding: 20px;
    box-shadow: gray;
    border-radius: 3px;
    width: 100%;
`;

const Shoppies = () => {
    const [input, setInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [nominationList, setNominationList] = useState([]);
    const [resultList, setResultList] = useState([]);
    const [disabledButtonsList, setDisabledButtonsList] = useState([]);

    const BannerStylingSuccess = {
        color: "#FFF",
        backgroundColor: "green",
        width: "100%",
        position: "absolute"
    }


    const fetchData = async (input) => {
        if (input) {
            console.log("fetching");
            return await fetch(`http://www.omdbapi.com/?apikey=652c5fa0&s=${input}`)
                .then(response => response.json())
                .then(data => { 
                    data.Search ? setResultList(data.Search) : setResultList([]);
                    setSearchTerm(input)
                }
            );
        }
    }

    const handleChange = async (e) => {
        setInput(e.target.value);
        if (e.key === 'Enter') {
            e.preventDefault();
        }
        return 
    }

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter'){
            e.preventDefault();
            return fetchData(e.target.value);
        }
    }

    const addNomination = (movie) => {
        if (nominationList.filter((nom) => nom.id === movie.id).length <= 0 && nominationList.length < 5) {
            setNominationList(nominationList.concat(movie));
            setDisabledButtonsList(disabledButtonsList.concat(movie.id));
        }
    }

    const removeNomination = (movie) => {
        setNominationList(nominationList.filter((nom) => nom.id !== movie.id))
        setDisabledButtonsList(disabledButtonsList.filter((id) => id !== movie.id));
    }

    useEffect(() => {fetchData()},[]);

    return (
        <div>
            { (nominationList.length === 5) ?
                <Banner 
                    title="You have nominated 5 movies!" 
                    css={BannerStylingSuccess}
                    visibleTime={3000}
                /> : <></>
            }
            <ShoppiesContainer>
                <div>
                    <h1>The Shoppies</h1>
                    <TopContainer>
                        <p>Movie Title</p>
                        <SearchBar
                            input={input}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                    </TopContainer>
                </div>
                <BottomContainer>
                    <ResultsContainer>
                        <h2>{ (searchTerm === '') ? 'Results' : `Results for "${searchTerm}"`}</h2>
                        <ResultList
                            resultList={resultList}
                            handleClick={addNomination}
                            disabledButtonsList={disabledButtonsList}
                        />
                        { (resultList.length <= 0 && searchTerm !== '') ? <p>No Results Found</p> : ''}
                    </ResultsContainer>
                    <NominationsContainer>
                        <h2>Nominations</h2>
                        <p>Please select 5 movies to nominate.</p>
                        <NominationList nominationList={nominationList} handleClick={removeNomination}/>
                    </NominationsContainer>
                </BottomContainer>
            </ShoppiesContainer>
        </div>
    );
  }

  export default Shoppies