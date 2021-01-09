import React, {
    useState,
    useEffect
} from 'react';
import LoadingSpinner from './LoadingSpinner/Loading';
import { useParams } from 'react-router-dom';
import NetworkError from './Errors/NetworkError';
import CanvasJSReact from '../assets/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Recipe = () => {
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [networkError, setNetworkError] = useState({
        bool: false,
        message: ''
    });
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [nutrition, setNutrition] = useState([]);

    const options = {
        backgroundColor: "#f9f9f9",
        animationEnabled: true,
        title: {
            text: "Calorie & Macronutrients"
        },
        subtitles: [{
            text: "Nutrient Analysis",
            verticalAlign: "center",
            fontSize: 22,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: `{name} - {y}`,
            yValueFormatString: "#,###'%'",
            dataPoints: [
                {
                    y: nutrition.caloricBreakdown ? nutrition.caloricBreakdown.percentCarbs : null,
                    name: `Carbs ${nutrition.caloricBreakdown ? parseInt(nutrition.nutrients[3].amount, 10) : null}g`
                },
                {
                    y: nutrition.caloricBreakdown ? nutrition.caloricBreakdown.percentProtein : null,
                    name: `Protein ${nutrition.caloricBreakdown ? parseInt(nutrition.nutrients[8].amount, 10) : null}g`
                },
                {
                    y: nutrition.caloricBreakdown ? nutrition.caloricBreakdown.percentFat : null,
                    name: `Fat ${nutrition.caloricBreakdown ? parseInt(nutrition.nutrients[1].amount, 10) : null}g`
                },
            ]
        }]
    };

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`)
                console.log(response)
                if (response.ok === true && response.status === 200) {
                    setIsLoaded(true);
                    const toJson = await response.json();
                    console.warn(toJson);
                    setRecipe(toJson);
                    setIngredients(toJson.extendedIngredients);
                    setNutrition(toJson.nutrition)
                };
                if (response.ok === false && response.status === 402) {
                    setIsLoaded(true);
                    throw new Error('Too many requests. Only 150 requests per day on the free plan.');
                };
            } catch (err) {
                console.error(err);
                setNetworkError({ bool: true, message: 'Sorry! The Spoonacular API only allows 150 requests per day on the free plan.' });
            };
        };
        fetchRecipe();
    }, [id]);

    const handleChange = (e) => {
        const newArr = [...ingredients];
        newArr.map(ingredient => ingredient.newAmount = ingredient.amount * e.target.value);
        setIngredients(newArr);
    };

    return (
<<<<<<< HEAD
        <div className="recipe-details" style={{margin: 'auto'}}>
            <LoadingSpinner bool={isLoaded} />
            {recipe &&
                <div key={recipe.id}>
                    <div>{recipe.id}</div>
                    <h1>{recipe.title}</h1>
                    <img className="responsive" alt="recipe" src={recipe.image} />
                    <p style={{ padding: '2em', margin: 'auto', marginTop: '2em' }}>{recipe.summary.replace(/(<([^>]+)>)/gi, "")}</p>
=======
        <div>
            {isLoaded === false && networkError.bool === false ? <LoadingSpinner /> :
                recipe &&
                <div style={{ marginBottom: '5em' }} key={recipe.id}>
                    <div>{recipe.id}</div>
                    <h1>{recipe.title}</h1>
                    <img className="responsive" alt="recipe" src={recipe.image} />
                    <p style={{ width: '70vw', padding: '2em', margin: 'auto', marginTop: '2em' }}>{recipe.summary.replace(/(<([^>]+)>)/gi, "")}</p>
>>>>>>> 59b94c074e2820253969f4cfa6fa5025878c50a5
                    <div style={{textAlign: 'center'}}>
                        <label>Servings: </label>
                        <input type="number" onChange={(e) => handleChange(e)} min="1" max="20" step="1" />
                    </div>
<<<<<<< HEAD
                    <div style={{ margin: 'auto', display: 'flex', flexWrap: 'wrap' }}>
=======
                    <div style={{ width: '80vw', margin: 'auto', display: 'flex', flexWrap: 'wrap' }}>
>>>>>>> 59b94c074e2820253969f4cfa6fa5025878c50a5
                        {ingredients && ingredients.map(ingredient => {
                            return (
                                <div style={{ padding: '2em', 'flex': '1 1 80px' }} key={ingredient.id}>
                                    <strong>{ingredient.name}</strong>
                                    <br />
                                    {ingredient.newAmount ? ingredient.newAmount : ingredient.amount} {ingredient.unit}
                                </div>
                            );
                        })}
                    </div>
                </div>}
            {networkError.bool === true && <NetworkError bool={networkError.bool} message={networkError.message} />}
            {nutrition.caloricBreakdown && <CanvasJSChart options={options} />}
        </div>
    );
};

export default Recipe;