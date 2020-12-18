import React, { Fragment, useState, useEffect } from 'react';
import CuisineOptions from './CuisineOptions';
import LoadingSpinner from '../LoadingSpinner';
import Recipes from './Recipes';

const Loading = ({ bool }) => {

    if (bool === false) {
        return <LoadingSpinner style={{ textAlign: 'center' }} />;
    } else {
        return null;
    };
};

const NetworkError = ({ bool }) => {
    if (bool === true) {
        return (
            <div style={{ color: 'red', textAlign: 'center' }}>Failed to fetch. Too many requests for the day.</div>
        );
    } else {
        return null;
    };
};

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [networkError, setNetworkError] = useState(false);
    const [cuisine, setCuisine] = useState('American');

    useEffect(() => {
        fetchRecipes();
    }, []);

    useEffect(() => {
        fetchCuisine();
    }, [cuisine]);

    const fetchRecipes = async () => {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch/?cuisine=American&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`)
            .then(res => {
                if (res.ok === false && res.status === 402) {
                    console.error(res);
                    setIsLoaded(true);
                    setNetworkError(true);
                    throw new Error('Too many requests. Only 150 requests per day on the free plan.')
                };
                if (res.ok === true) {
                    setIsLoaded(true);
                    return res;
                };
            }).catch(err => console.error(err))
        const toJson = await response.json();
        setRecipes(toJson.results);
    };

    const fetchCuisine = async () => {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch/?cuisine=${cuisine}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`)
            .then(res => {
                if (res.ok === false && res.status === 402) {
                    console.error(res);
                    setIsLoaded(true);
                    setNetworkError(true);
                    throw new Error('Too many requests. Only 150 requests per day on the free plan.');
                };
                if (res.ok === true) {
                    setIsLoaded(true);
                    return res;
                };
            }).catch(err => console.error(err));
        const toJson = await response.json();
        setRecipes(toJson.results);
    }

    return (
        <Fragment>
            <CuisineOptions setCuisine={setCuisine} />
            <Recipes rec={recipes} />
            <Loading bool={isLoaded} />
            <NetworkError bool={networkError} />
        </Fragment>
    );
};

export default Home;