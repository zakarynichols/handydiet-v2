import React, { Fragment } from 'react';

const CuisineOptions = () => {
    const cuisines = [
        'American',
        'Chinese',
        'Greek',
        'Indian',
        'Italian',
        'Japanese',
        'Mexican',
        'Mediterranean',
        'Thai'
    ];

    return (
        <div>
            <h1><strong>Search Recipes</strong></h1>
            <br />
            <div className="container">
            {cuisines.map(cuisine => {
                return (
                    <div className="cuisine-option">{cuisine}</div>
                );
            })}
            </div>
        </div>
    )
};

export default CuisineOptions;