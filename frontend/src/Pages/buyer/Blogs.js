import React, { useState } from 'react';
import ArticleCard from '../../Components/buyer/ArticleCard'; 
import articleImage1 from '../../images/pngs/articleImage1.png';
import articleImage2 from '../../images/pngs/articleImage2.png';
import articleImage3 from '../../images/pngs/articleImage3.png';

import BreadCrumb from '../../Components/buyer/BreadCrumb';
import banner1 from '../../images/pngs/banner1.png';
import banner2 from '../../images/pngs/banner2.jpg';
import banner3 from '../../images/pngs/banner3.jpg';


const BlogPage = () => {
    const [activeTab, setActiveTab] = useState('recipes');
  
    const articles = [
      {
        title: 'How to Make The Ultimate Chocolate Lava Cake',
        date: 'August 20, 2022',
        image: articleImage1,
        category: 'Recipes',
        slug: 'chocolate-lava-cake',
        content: {
          description: "If there's one dessert that captures the hearts of chocolate lovers worldwide...",
          ingredients: ["4 ounces (115 grams) of semi-sweet chocolate", "1/2 cup (115 grams) of unsalted butter"],
          instructions: ["Preheat oven to 425°F (220°C)", "Butter and lightly flour four 6-ounce ramekins"]
        }
      },
      {
        title: 'Healthy Smoothie Recipes',
        date: 'October 15, 2023',
        image: articleImage2,
        category: 'Healthy',
        slug: 'healthy-smoothie-recipes',
        content: {
          description: "Start your day with these nutritious smoothies...",
          ingredients: [],
          instructions: []
        }
      },
      {
        title: 'Healthy Smoothie Recipes',
        date: 'October 15, 2023',
        image: articleImage3,
        category: 'Healthy',
        slug: 'healthy-smoothie-recipes',
        content: {
          description: "Start your day with these nutritious smoothies...",
          ingredients: [],
          instructions: []
        }
      },
      {
        title: 'Healthy Smoothie Recipes',
        date: 'October 15, 2023',
        image: articleImage1,
        category: 'Healthy',
        slug: 'healthy-smoothie-recipes',
        content: {
          description: "Start your day with these nutritious smoothies...",
          ingredients: [],
          instructions: []
        }
      },
      {
        title: 'Healthy Smoothie Recipes',
        date: 'October 15, 2023',
        image: articleImage1,
        category: 'Healthy',
        slug: 'healthy-smoothie-recipes',
        content: {
          description: "Start your day with these nutritious smoothies...",
          ingredients: [],
          instructions: []
        }
      },

      {
        title: 'Healthy Smoothie Recipes',
        date: 'October 15, 2023',
        image: articleImage2,
        category: 'Yummy',
        slug: 'healthy-smoothie-recipes',
        content: {
          description: "Start your day with these nutritious smoothies...",
          ingredients: [],
          instructions: []
        }
      },
      {
        title: 'Healthy Smoothie Recipes',
        date: 'October 15, 2023',
        image: articleImage2,
        category: 'Yummy',
        slug: 'healthy-smoothie-recipes',
        content: {
          description: "Start your day with these nutritious smoothies...",
          ingredients: [],
          instructions: []
        }
      },
      {
        title: 'Healthy Smoothie Recipes',
        date: 'October 15, 2023',
        image: articleImage2,
        category: 'Yummy',
        slug: 'healthy-smoothie-recipes',
        content: {
          description: "Start your day with these nutritious smoothies...",
          ingredients: [],
          instructions: []
        }
      },
      {
        title: 'Healthy Smoothie Recipes',
        date: 'October 15, 2023',
        image: articleImage3,
        category: 'Yummy',
        slug: 'healthy-smoothie-recipes',
        content: {
          description: "Start your day with these nutritious smoothies...",
          ingredients: [],
          instructions: []
        }
      }
    ];
  
    const categoryBanners = {
      recipes: {
        title: "Recipe Categories",
        image: banner1,
        description: "Discover delicious recipes for every occasion"
      },
      healthy: {
        title: "Healthy Living",
        image: banner2,
        description: "Nutritious and wholesome meal ideas"
      },
      yummy: {
        title: "Yummy Treats",
        image: banner3,
        description: "Indulgent recipes for sweet cravings"
      }
    };
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    const filteredArticles = articles.filter(article => {
      if (activeTab === 'recipes') return article.category === 'Recipes';
      if (activeTab === 'healthy') return article.category === 'Healthy';
      if (activeTab === 'yummy') return article.category === 'Yummy';
      return true;
    });
  
    return (
      <div className="blogPage">
        <BreadCrumb />
  
        <div className="categoryBanner">
          <img 
            src={categoryBanners[activeTab].image} 
            alt={categoryBanners[activeTab].title}
          />
          <div className="categoryOverlay">
            <h1>{categoryBanners[activeTab].title}</h1>
            <p>{categoryBanners[activeTab].description}</p>
          </div>
        </div>
  
        <div className="tabsContainer">
          <button
            className={activeTab === 'recipes' ? 'activeTab' : 'tab'}
            onClick={() => handleTabClick('recipes')}
          >
            Recipes
          </button>
          <button
            className={activeTab === 'healthy' ? 'activeTab' : 'tab'}
            onClick={() => handleTabClick('healthy')}
          >
            Healthy
          </button>
          <button
            className={activeTab === 'yummy' ? 'activeTab' : 'tab'}
            onClick={() => handleTabClick('yummy')}
          >
            Yummy
          </button>
        </div>
  
        <div className="blogsContainer">
          {filteredArticles.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              date={article.date}
              image={article.image}
              category={article.category}
              slug={article.slug}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default BlogPage;