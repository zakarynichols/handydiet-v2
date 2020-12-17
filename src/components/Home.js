import React, { useState, useEffect } from 'react';
import CuisineOptions from './CuisineOptions';
import LoadingSpinner from './LoadingSpinner';

const Map = ({ rec }) => {
    if (rec === undefined) {
        return <div style={{
            color: 'red',
            textAlign: 'center'
        }}>Failed too fetch. Too many requests have been made for the day.</div>
    }
    return rec.map(r => {
        return (
            <div key={r.id} className="recipe-card">
                <img src={r.image} className="responsive" />
                <div style={{ overflowWrap: 'break-word' }}>{r.title}</div>
                <br />
                <div style={{
                    position: 'absolute',
                    bottom: 5,
                    left: 10,
                    fontSize: '1.5rem'
                }}>{r.spoonacularScore}%</div>
                <div style={{
                    position: 'absolute',
                    bottom: 5,
                    right: 10,
                    fontSize: '1.5rem'
                }}><i style={{ color: 'red' }} className="fas fa-heart"></i></div>
            </div>
        );
    });
};

const Loading = ({ bool }) => {

    if (bool === false) {
        return <LoadingSpinner style={{textAlign: 'center'}} />;
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
    const [cuisine, setCuisine] = useState('');

    const fetchRecipes = async () => {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch/?cuisine=${cuisine}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`)
            .then(res => {
                console.warn(res)
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

    useEffect(() => {
        fetchRecipes();
    }, []);

    useEffect(() => {
        fetchRecipes();
    }, [cuisine, setCuisine]);

    return (
        <div>
            <CuisineOptions setCuisine={setCuisine} setIsLoaded={setIsLoaded} />
            <div style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                <Map rec={recipes} />
            </div>
            <Loading bool={isLoaded} />
            <NetworkError bool={networkError} />
        </div>
    );
};

export default Home;