import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import CuisineOptions from './CuisineOptions';

const Map = ({ rec }) => {
    return rec.map(r => {
        return (
            <div key={r.id} className="recipe-card">
                <img src={r.image} className="responsive" />
                <div style={{overflowWrap: 'break-word'}}>{r.title}</div>
                <br />
                <div style={{position: 'absolute', bottom: 5, left: 10, fontSize: '1.5rem'}}>{r.spoonacularScore}%</div>
                <div style={{position: 'absolute', bottom: 5, right: 10, fontSize: '1.5rem'}}><i style={{color: 'red'}} class="fas fa-heart"></i></div>
            </div>
        );
    });
};

const Loading = ({ bool }) => {
    const LoadingStyle = styled.div`
        text-align: center;
    `;
    if (bool === false) {
        return <LoadingStyle>Loading...</LoadingStyle>;
    } else {
        return null;
    };
};

const NetworkError = ({ bool }) => {
    const NetworkErrorStyle = styled.div`
        text-align: center;
    `;
    if (bool === true) {
        return (
            <NetworkErrorStyle>Failed to fetch. Too many requests for the day.</NetworkErrorStyle>
        );
    } else {
        return null;
    };
};

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [networkError, setNetworkError] = useState(false);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch(`https://api.spoonacular.com/recipes/random?number=12&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`)
                .then(res => {
                    if (res.ok === false) {
                        setIsLoaded(true);
                        setNetworkError(true);
                        throw new Error('Failed to fetch.');
                    }
                    if (res.ok === true) {
                        setIsLoaded(true);
                        return res;
                    };
                });
            const toJson = await response.json();
            console.log(toJson)
            setRecipes(toJson.recipes);
        };
        fetchRecipes();
    }, []);

    return (
        <div>
            <CuisineOptions />
            <div style={{ display: 'flex', width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Map rec={recipes} />
            </div>
            <Loading bool={isLoaded} />
            <NetworkError bool={networkError} />
        </div>
    );
};

export default Home;