import cakecard from '../images/pngs/cakecard.png';
import profile from '../images/pngs/profile.png';
import cakecard2 from '../images/pngs/cakecard2.png';
import cakecard3 from '../images/pngs/cakecard3.png';

export const sweetsCategory = [
    {
        images: [cakecard3, cakecard2, cakecard], 
        isVariable:true,
        distance: 22,
        profileImageUrl: profile,
        name: 'Sophia Smith',
        location: 'Chicago, IL',
        pickupLocation: '789 Sweet Avenue, Chicago, IL',
        sellerDetails: {
            name: 'Sophia Smith',
            contact: 'sophia@example.com',
            phone: '+1 555-654-3210',
            languages: ['English', 'Spanish'],
            ordersCompleted: 275,
            sellerRating: '4.7'
        },
        rating: '4.6',
        reviews: '85',
        description: 'Delicate French Pastries Assortment',
        price: '30.00',
        categoryName: 'Pastries',
        ingredients: 'Almond Flour, Butter, Sugar, Eggs',
        allergyInfo: 'Contains gluten, dairy, and nuts.',
        minDaysToMake: "2 days",
        events: ['High Tea', 'Celebrations'],
        fullDescription: 'Enjoy a variety of delicate French pastries, including éclairs, fruit tarts, and almond croissants. Perfect for high tea or celebrations.',
        additionalInfo: {
            packaging: 'Delivered in a luxurious pastry box.',
            storageInstructions: 'Store in a cool place and consume within 2 days.',
            customizations: 'Available for custom assortments or flavors.'
        },
        variableData:{
            
                size: {
                  options: ['Small', 'Medium', 'Large'],
                  prices: [0, 2, 4],
                  defaultIndex: 1
                },
                filling: {
                  options: ['Chocolate', 'Vanilla', 'Strawberry'],
                  prices: [0, 1, 1.5],
                  defaultIndex: 0
                },
                flavour: {
                  options: ['Regular', 'Premium', 'Deluxe'],
                  prices: [0, 2.5, 5],
                  defaultIndex: 0
                }
              }
        
    },
    {
        images: [cakecard3, cakecard2, cakecard], 
        profileImageUrl: profile,
        name: 'Liam Johnson',
        distance: 46,
        location: 'San Francisco, CA',
        pickupLocation: '101 Bakery Road, San Francisco, CA',
        sellerDetails: {
            name: 'Liam Johnson',
            contact: 'liam@example.com',
            phone: '+1 555-678-9102',
            languages: ['English', 'Italian'],
            ordersCompleted: 400,
            sellerRating: '4.9'
        },
        rating: '4.9',
        reviews: '140',
        isDiscounted: true,
        originalPrice: '54.30',
        description: 'Classic Vanilla Buttercream Cake with Floral Decorations',
        price: '38.50',
        categoryName: 'Cakes',
        ingredients: 'Flour, Sugar, Butter, Eggs, Vanilla Extract, Cream',
        allergyInfo: 'Contains gluten, dairy, and eggs. Nut-free.',
        minDaysToMake:"2 days",
        events: ['Birthday', 'Anniversary', 'Party'],
        fullDescription: 'A classic vanilla cake with smooth buttercream frosting and delicate floral decorations, perfect for any special occasion.',
        additionalInfo: {
            packaging: 'Delivered in an elegant cake box.',
            storageInstructions: 'Keep refrigerated and consume within 3 days.',
            customizations: 'Available in different sizes and floral designs.'
        },
        packages: {
            basic: {
                price: 30.00,
                name: "Basic Assortment",
                deliveryTime: "2 days",
                features: [
                    "6 pieces assortment",
                    "Standard packaging",
                    "Basic decoration",
                    "4-days delivery"
                ]
            },
            standard: {
                price: 45.00,
                name: "Premium Selection",
                deliveryTime: "1 day",
                features: [
                    "12 pieces assortment",
                    "Premium packaging",
                    "Custom decoration",
                    "2-days delivery",
                    "2 special flavors"
                ]
            },
            premium: {
                price: 65.00,
                name: "Deluxe Collection",
                deliveryTime: "6 hours",
                features: [
                    "18 pieces assortment",
                    "Luxury gift packaging",
                    "Premium decoration",
                    "24-hours delivery",
                    "4 special flavors",
                    "Personalized message"
                ]
            }
        },
    },
    {
        images: [cakecard3, cakecard2, cakecard], 
        isVariable:true,
        distance: 22,
        profileImageUrl: profile,
        name: 'Sophia Smith',
        location: 'Chicago, IL',
        pickupLocation: '789 Sweet Avenue, Chicago, IL',
        sellerDetails: {
            name: 'Sophia Smith',
            contact: 'sophia@example.com',
            phone: '+1 555-654-3210',
            languages: ['English', 'Spanish'],
            ordersCompleted: 275,
            sellerRating: '4.7'
        },
        rating: '4.6',
        reviews: '85',
        description: 'Delicate French Pastries Assortment',
        price: '30.00',
        categoryName: 'Pastries',
        ingredients: 'Almond Flour, Butter, Sugar, Eggs',
        allergyInfo: 'Contains gluten, dairy, and nuts.',
        minDaysToMake: "2 days",
        events: ['High Tea', 'Celebrations'],
        fullDescription: 'Enjoy a variety of delicate French pastries, including éclairs, fruit tarts, and almond croissants. Perfect for high tea or celebrations.',
        additionalInfo: {
            packaging: 'Delivered in a luxurious pastry box.',
            storageInstructions: 'Store in a cool place and consume within 2 days.',
            customizations: 'Available for custom assortments or flavors.'
        },
        variableData:{
            
                size: {
                  options: ['Small', 'Medium', 'Large'],
                  prices: [0, 2, 4],
                  defaultIndex: 1
                },
                filling: {
                  options: ['Chocolate', 'Vanilla', 'Strawberry'],
                  prices: [0, 1, 1.5],
                  defaultIndex: 0
                },
                flavour: {
                  options: ['Regular', 'Premium', 'Deluxe'],
                  prices: [0, 2.5, 5],
                  defaultIndex: 0
                }
              }
        
    },
    {
        images: [cakecard3, cakecard2, cakecard], 
        profileImageUrl: profile,
        name: 'Liam Johnson',
        distance: 46,
        location: 'San Francisco, CA',
        pickupLocation: '101 Bakery Road, San Francisco, CA',
        sellerDetails: {
            name: 'Liam Johnson',
            contact: 'liam@example.com',
            phone: '+1 555-678-9102',
            languages: ['English', 'Italian'],
            ordersCompleted: 400,
            sellerRating: '4.9'
        },
        rating: '4.9',
        reviews: '140',
        isDiscounted: true,
        originalPrice: '54.30',
        description: 'Classic Vanilla Buttercream Cake with Floral Decorations',
        price: '38.50',
        categoryName: 'Cakes',
        ingredients: 'Flour, Sugar, Butter, Eggs, Vanilla Extract, Cream',
        allergyInfo: 'Contains gluten, dairy, and eggs. Nut-free.',
        minDaysToMake:"2 days",
        events: ['Birthday', 'Anniversary', 'Party'],
        fullDescription: 'A classic vanilla cake with smooth buttercream frosting and delicate floral decorations, perfect for any special occasion.',
        additionalInfo: {
            packaging: 'Delivered in an elegant cake box.',
            storageInstructions: 'Keep refrigerated and consume within 3 days.',
            customizations: 'Available in different sizes and floral designs.'
        },
        packages: {
            basic: {
                price: 30.00,
                name: "Basic Assortment",
                deliveryTime: "2 days",
                features: [
                    "6 pieces assortment",
                    "Standard packaging",
                    "Basic decoration",
                    "4-days delivery"
                ]
            },
            standard: {
                price: 45.00,
                name: "Premium Selection",
                deliveryTime: "1 day",
                features: [
                    "12 pieces assortment",
                    "Premium packaging",
                    "Custom decoration",
                    "2-days delivery",
                    "2 special flavors"
                ]
            },
            premium: {
                price: 65.00,
                name: "Deluxe Collection",
                deliveryTime: "6 hours",
                features: [
                    "18 pieces assortment",
                    "Luxury gift packaging",
                    "Premium decoration",
                    "24-hours delivery",
                    "4 special flavors",
                    "Personalized message"
                ]
            }
        },
    },
    {
        images: [cakecard3, cakecard2, cakecard], 
        isVariable:true,
        distance: 22,
        profileImageUrl: profile,
        name: 'Sophia Smith',
        location: 'Chicago, IL',
        pickupLocation: '789 Sweet Avenue, Chicago, IL',
        sellerDetails: {
            name: 'Sophia Smith',
            contact: 'sophia@example.com',
            phone: '+1 555-654-3210',
            languages: ['English', 'Spanish'],
            ordersCompleted: 275,
            sellerRating: '4.7'
        },
        rating: '4.6',
        reviews: '85',
        description: 'Delicate French Pastries Assortment',
        price: '30.00',
        categoryName: 'Pastries',
        ingredients: 'Almond Flour, Butter, Sugar, Eggs',
        allergyInfo: 'Contains gluten, dairy, and nuts.',
        minDaysToMake: "2 days",
        events: ['High Tea', 'Celebrations'],
        fullDescription: 'Enjoy a variety of delicate French pastries, including éclairs, fruit tarts, and almond croissants. Perfect for high tea or celebrations.',
        additionalInfo: {
            packaging: 'Delivered in a luxurious pastry box.',
            storageInstructions: 'Store in a cool place and consume within 2 days.',
            customizations: 'Available for custom assortments or flavors.'
        },
        variableData:{
            
                size: {
                  options: ['Small', 'Medium', 'Large'],
                  prices: [0, 2, 4],
                  defaultIndex: 1
                },
                filling: {
                  options: ['Chocolate', 'Vanilla', 'Strawberry'],
                  prices: [0, 1, 1.5],
                  defaultIndex: 0
                },
                flavour: {
                  options: ['Regular', 'Premium', 'Deluxe'],
                  prices: [0, 2.5, 5],
                  defaultIndex: 0
                }
              }
        
    },
    {
        images: [cakecard3, cakecard2, cakecard], 
        profileImageUrl: profile,
        name: 'Liam Johnson',
        distance: 46,
        location: 'San Francisco, CA',
        pickupLocation: '101 Bakery Road, San Francisco, CA',
        sellerDetails: {
            name: 'Liam Johnson',
            contact: 'liam@example.com',
            phone: '+1 555-678-9102',
            languages: ['English', 'Italian'],
            ordersCompleted: 400,
            sellerRating: '4.9'
        },
        rating: '4.9',
        reviews: '140',
        isDiscounted: true,
        originalPrice: '54.30',
        description: 'Classic Vanilla Buttercream Cake with Floral Decorations',
        price: '38.50',
        categoryName: 'Cakes',
        ingredients: 'Flour, Sugar, Butter, Eggs, Vanilla Extract, Cream',
        allergyInfo: 'Contains gluten, dairy, and eggs. Nut-free.',
        minDaysToMake:"2 days",
        events: ['Birthday', 'Anniversary', 'Party'],
        fullDescription: 'A classic vanilla cake with smooth buttercream frosting and delicate floral decorations, perfect for any special occasion.',
        additionalInfo: {
            packaging: 'Delivered in an elegant cake box.',
            storageInstructions: 'Keep refrigerated and consume within 3 days.',
            customizations: 'Available in different sizes and floral designs.'
        },
        packages: {
            basic: {
                price: 30.00,
                name: "Basic Assortment",
                deliveryTime: "2 days",
                features: [
                    "6 pieces assortment",
                    "Standard packaging",
                    "Basic decoration",
                    "4-days delivery"
                ]
            },
            standard: {
                price: 45.00,
                name: "Premium Selection",
                deliveryTime: "1 day",
                features: [
                    "12 pieces assortment",
                    "Premium packaging",
                    "Custom decoration",
                    "2-days delivery",
                    "2 special flavors"
                ]
            },
            premium: {
                price: 65.00,
                name: "Deluxe Collection",
                deliveryTime: "6 hours",
                features: [
                    "18 pieces assortment",
                    "Luxury gift packaging",
                    "Premium decoration",
                    "24-hours delivery",
                    "4 special flavors",
                    "Personalized message"
                ]
            }
        },
    },
    {
        images: [cakecard3, cakecard2, cakecard], 
        isVariable:true,
        distance: 22,
        profileImageUrl: profile,
        name: 'Sophia Smith',
        location: 'Chicago, IL',
        pickupLocation: '789 Sweet Avenue, Chicago, IL',
        sellerDetails: {
            name: 'Sophia Smith',
            contact: 'sophia@example.com',
            phone: '+1 555-654-3210',
            languages: ['English', 'Spanish'],
            ordersCompleted: 275,
            sellerRating: '4.7'
        },
        rating: '4.6',
        reviews: '85',
        description: 'Delicate French Pastries Assortment',
        price: '30.00',
        categoryName: 'Pastries',
        ingredients: 'Almond Flour, Butter, Sugar, Eggs',
        allergyInfo: 'Contains gluten, dairy, and nuts.',
        minDaysToMake: "2 days",
        events: ['High Tea', 'Celebrations'],
        fullDescription: 'Enjoy a variety of delicate French pastries, including éclairs, fruit tarts, and almond croissants. Perfect for high tea or celebrations.',
        additionalInfo: {
            packaging: 'Delivered in a luxurious pastry box.',
            storageInstructions: 'Store in a cool place and consume within 2 days.',
            customizations: 'Available for custom assortments or flavors.'
        },
        variableData:{
            
                size: {
                  options: ['Small', 'Medium', 'Large'],
                  prices: [0, 2, 4],
                  defaultIndex: 1
                },
                filling: {
                  options: ['Chocolate', 'Vanilla', 'Strawberry'],
                  prices: [0, 1, 1.5],
                  defaultIndex: 0
                },
                flavour: {
                  options: ['Regular', 'Premium', 'Deluxe'],
                  prices: [0, 2.5, 5],
                  defaultIndex: 0
                }
              }
        
    },
    {
        images: [cakecard3, cakecard2, cakecard], 
        profileImageUrl: profile,
        name: 'Liam Johnson',
        distance: 46,
        location: 'San Francisco, CA',
        pickupLocation: '101 Bakery Road, San Francisco, CA',
        sellerDetails: {
            name: 'Liam Johnson',
            contact: 'liam@example.com',
            phone: '+1 555-678-9102',
            languages: ['English', 'Italian'],
            ordersCompleted: 400,
            sellerRating: '4.9'
        },
        rating: '4.9',
        reviews: '140',
        isDiscounted: true,
        originalPrice: '54.30',
        description: 'Classic Vanilla Buttercream Cake with Floral Decorations',
        price: '38.50',
        categoryName: 'Cakes',
        ingredients: 'Flour, Sugar, Butter, Eggs, Vanilla Extract, Cream',
        allergyInfo: 'Contains gluten, dairy, and eggs. Nut-free.',
        minDaysToMake:"2 days",
        events: ['Birthday', 'Anniversary', 'Party'],
        fullDescription: 'A classic vanilla cake with smooth buttercream frosting and delicate floral decorations, perfect for any special occasion.',
        additionalInfo: {
            packaging: 'Delivered in an elegant cake box.',
            storageInstructions: 'Keep refrigerated and consume within 3 days.',
            customizations: 'Available in different sizes and floral designs.'
        },
        packages: {
            basic: {
                price: 30.00,
                name: "Basic Assortment",
                deliveryTime: "2 days",
                features: [
                    "6 pieces assortment",
                    "Standard packaging",
                    "Basic decoration",
                    "4-days delivery"
                ]
            },
            standard: {
                price: 45.00,
                name: "Premium Selection",
                deliveryTime: "1 day",
                features: [
                    "12 pieces assortment",
                    "Premium packaging",
                    "Custom decoration",
                    "2-days delivery",
                    "2 special flavors"
                ]
            },
            premium: {
                price: 65.00,
                name: "Deluxe Collection",
                deliveryTime: "6 hours",
                features: [
                    "18 pieces assortment",
                    "Luxury gift packaging",
                    "Premium decoration",
                    "24-hours delivery",
                    "4 special flavors",
                    "Personalized message"
                ]
            }
        },
    },
];
