import React, { Fragment, useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner/Loading';
import { useParams } from 'react-router-dom';
import NetworkError from './Errors/NetworkError';

const Recipe = () => {
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [networkError, setNetworkError] = useState({
        bool: false,
        text: ''
    });
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetchRecipe();
    }, []);

    const fetchRecipe = async () => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`)
            console.log(response)
            if (response.ok === true && response.status === 200) {
                setIsLoaded(true);
                const toJson = await response.json();
                setRecipe(toJson);
                setIngredients(toJson.extendedIngredients);
            };
            if (response.ok === false && response.status === 402) {
                setIsLoaded(true);
                throw new Error('Too many requests. Only 150 requests per day on the free plan.');
            };
        } catch (err) {
            console.error(err);
            setNetworkError({ bool: true, text: 'Sorry! The Spoonacular API only allows 150 requests per day on the free plan.' });
        };
    };

    const handleChange = (e) => {
        const newArr = [...ingredients];
        newArr.map(i => {
            return i.newAmount = i.amount * e.target.value
        });
        setIngredients(newArr);
    };

    return (
        <Fragment>
            <LoadingSpinner bool={isLoaded} />
            {recipe &&
                <Fragment>
                    <div>{recipe.id}</div>
                    <div>{recipe.title}</div>
                    <img src={recipe.image} />
                    <p>{recipe.summary.replace(/(<([^>]+)>)/gi, "")}</p>
                    <div>
                        {ingredients && ingredients.map(ingredient => {
                            return (
                                <div>{ingredient.name} | {ingredient.newAmount ? ingredient.newAmount : ingredient.amount} {ingredient.unit}</div>
                            );
                        })}
                        <input type="number" onChange={(e) => handleChange(e)} min="1" max="20" step="1" />
                    </div>
                </Fragment>}
            <NetworkError bool={networkError.bool} text={networkError.text} />
        </Fragment>
    );
};

export default Recipe;