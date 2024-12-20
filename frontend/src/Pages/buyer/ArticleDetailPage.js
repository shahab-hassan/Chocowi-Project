import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

export const ArticleDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { slug } = useParams();

    // Sample detailed recipe data - in production, this would come from your backend
    const recipeDetails = {
        title: "How to Make the Perfect Chocolate Lava Cake: A Detailed Guide",
        description: "If there's one dessert that captures the hearts of chocolate lovers worldwide, it's the Chocolate Lava Cake. With its rich, gooey center and perfectly baked outer layer, this indulgent treat is a showstopper on any dessert menu. But did you know that you can easily make this restaurant-quality dessert at home? In this blog, we'll dive into the origins of Chocolate Lava Cake, what makes it so irresistible, and how you can bake the perfect one in your own kitchen. Whether you're a seasoned baker or a novice in the kitchen, this recipe is simple enough to follow and impressive enough to make for any occasion.",
        ingredients: [
            {
                title: "To make 4 servings of chocolate lava cake, you will need:",
                items: [
                    "4 ounces (115 grams) of semi-sweet or bittersweet chocolate: Choose high-quality chocolate for the best flavor.",
                    "1/2 cup (115 grams) of unsalted butter: Adds richness to the cake.",
                    "1 cup (120 grams) of powdered sugar: Helps sweeten and stabilize the cake.",
                    "2 large eggs: Provides structure and richness.",
                    "2 large egg yolks: Adds extra richness and helps achieve the lava-like consistency.",
                    "1/4 cup (30 grams) of all-purpose flour: Helps bind the ingredients together.",
                    "1 teaspoon of vanilla extract: Enhances the flavor of the chocolate.",
                    "A pinch of salt: Balances the sweetness and brings out the flavors.",
                    "Optional: A dusting of powdered sugar or a scoop of vanilla ice cream for serving."
                ]
            }
        ],
        equipment: [
            "Ramekins or muffin tins",
            "Double boiler or microwave-safe bowl",
            "Mixing bowls",
            "Whisk or electric mixer",
            "Baking sheet",
            "Spatula"
        ],
        instructions: [
            {
                title: "1. Preheat Your Oven:",
                details: "Set your oven to 425°F (220°C). This high temperature will help the outside of the cake bake quickly while keeping the center molten."
            },
            {
                title: "2. Prepare the Ramekins:",
                details: "Generously butter the insides of four 6-ounce ramekins. You can also dust them with cocoa powder to prevent sticking and add extra flavor. Place the prepared ramekins on a baking sheet for easy transfer to the oven."
            }
        ]
    };

    if (!location.state) {
        return (
            <div className="errorContainer">
                <p>Article not found</p>
                <button onClick={() => navigate('/blog')}>Back to Articles</button>
            </div>
        );
    }

    return (
        <div className="articleDetailContainer">
            <div className="articleHeader">
                <span className="categoryLabel">{location.state.category}</span>
                <h1 className="articleDetailTitle">{recipeDetails.title}</h1>
                <div className="articleMeta">
                    <span className="articleDate">{location.state.date}</span>
                </div>
            </div>

            <div className="mainImageContainer">
                <img src={location.state.image} alt={recipeDetails.title} className="mainImage" />
            </div>

            <div className="mainContent">
                <div className="articleDescription">
                    {recipeDetails.description}
                </div>

                <div className="ingredientsSection">
                    <h2>Ingredients</h2>
                    {recipeDetails.ingredients.map((section, index) => (
                        <div key={index} className="ingredientGroup">
                            <p className="ingredientGroupTitle">{section.title}</p>
                            <ul className="ingredientsList">
                                {section.items.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="equipmentSection">
                    <h2>Equipment</h2>
                    <ul className="equipmentList">
                        {recipeDetails.equipment.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="instructionsSection">
                    <h2>Step-by-Step Instructions</h2>
                    {recipeDetails.instructions.map((step, index) => (
                        <div key={index} className="instructionStep">
                            <h3>{step.title}</h3>
                            <p>{step.details}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

