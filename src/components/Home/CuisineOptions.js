import React from 'react';

const CuisineOptions = ({ setCuisine }) => {
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

    const handleClick = (value) => {
        setCuisine(value);
    };

    return (
        <div>
            <div style={{ fontSize: '2em' }}><strong>Search Recipes</strong></div>
            <div className="container">
                {cuisines.map((cuisine, index) => {
                    return (
                        <div key={index} onClick={() => handleClick(cuisine)} name={cuisine} value={cuisine} className="cuisine-option"><i className="fas fa-leaf"></i> {cuisine}</div>
                    );
                })}
            </div>
        </div>
    )
};

export default CuisineOptions;