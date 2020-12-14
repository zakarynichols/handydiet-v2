import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

const Loading = styled.div`
    text-align: center;
`;

const NetworkError = styled.div`
    text-align: center;
`;

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [networkError, setNetworkError] = useState(false);

    useEffect(() => {
            const fetchRecipes = async () => {
                const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`)
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
                setRecipes(toJson.recipes);
            };
            fetchRecipes();
    }, []);

    const map = (rec) => {
        return rec && rec.map(r => {
            return (
                <Fragment>
                    <div key={r.id}>{r.title}</div>
                    <div>{r.ingredients}</div>
                </Fragment>
            );
        });
    };

    const loading = (bool) => {
        if (bool === false) {
            return <Loading>Loading...</Loading>;
        } else {
            return null;
        };
    };

    const isNetworkError = (bool) => {
        if (bool === true) {
            return <NetworkError>Failed to fetch. Too many requests have been made to the server for today.</NetworkError>
        };
    };

    return (
        <Fragment>
            {loading(isLoaded)}
            {map(recipes)}
            {isNetworkError(networkError)}
        </Fragment>
    );
};

export default Home;