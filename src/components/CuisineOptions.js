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
            <div style={{fontSize: '2em'}}><strong>Search Recipes</strong></div>
            <div className="container">
            {cuisines.map(cuisine => {
                return (
                    <div className="cuisine-option"><i class="fas fa-leaf"></i> {cuisine}</div>
                );
            })}
            </div>
        </div>
    )
};

export default CuisineOptions;