import React from 'react';
import { Link } from 'react-router-dom';

const Recipes = ({ recipes }) => {

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }}>
            {recipes.map(recipe => {
                return (
<<<<<<< HEAD
                    <Link key={r.id} to={`/recipe/${r.id}`} className="recipe-card">
                        <img src={r.image} alt="recipe" className="responsive" />
                        <div style={{ overflowWrap: 'break-word' }}>{r.title}</div>
=======
                    <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe-card">
                        <img src={recipe.image} alt="recipe" className="responsive" />
                        <div style={{ overflowWrap: 'break-word' }}>{recipe.title}</div>
>>>>>>> 59b94c074e2820253969f4cfa6fa5025878c50a5
                        <br />
                        <div style={{
                            position: 'absolute',
                            bottom: 5,
                            left: 10,
                            fontSize: '1.5rem'
                        }}>{recipe.spoonacularScore}%</div>
                        <div style={{
                            position: 'absolute',
                            bottom: 5,
                            right: 10,
                            fontSize: '1.5rem'
                        }}><i style={{ color: 'red' }} className="fas fa-heart"></i></div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Recipes;