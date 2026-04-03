const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/augmented-menu');
        
        // Clear existing
        await User.deleteMany({});
        await MenuItem.deleteMany({});

        // Create Admin
        const admin = await User.create({
            username: 'admin',
            password: 'password123',
            role: 'Admin'
        });

        console.log('Admin user created successfully');

        // Create Menu Items with 4K Premium Photography
        const items = [
            { 
                name: 'Cyber Burger', 
                price: 15.99, 
                category: 'Main', 
                image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop', 
                description: 'A 4K Gourmet Cyber Burger with bioluminescent ingredients and prime protein.', 
                tags: ['Premium', 'High Protein'] 
            },
            { 
                name: 'Quantum Pizza', 
                price: 18.50, 
                category: 'Main', 
                image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop', 
                description: '3D-printed quantum crust with multi-layered cheese that morphs flavor as you rotate it.', 
                tags: ['Ultra HD', 'Bestseller'] 
            },
            { 
                name: 'Neon Sushi', 
                price: 24.50, 
                category: 'Main', 
                image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop', 
                description: 'High-detail sushi rolls with synthetically enhanced tuna and electric ginger.', 
                tags: ['Exquisite', 'Gluten-Free'] 
            },
            { 
                name: 'Plasma Pasta', 
                price: 18.20, 
                category: 'Main', 
                image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=1994&auto=format&fit=crop', 
                description: '4K Carbonara-style plasma sauce with glowing fluid noodles.', 
                tags: ['Classic', 'Futuristic'] 
            },
            { 
                name: 'Nebula Nectar', 
                price: 9.99, 
                category: 'Drinks', 
                image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=1887&auto=format&fit=crop', 
                description: 'Mood-sensitive nebula nectar cocktail in 4K resolution.', 
                tags: ['Refreshing', 'Neon Glow'] 
            },
            { 
                name: 'Zero-G Cake', 
                price: 12.50, 
                category: 'Desserts', 
                image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop', 
                description: 'A 4K floating dessert where each layer stays suspended independently of each other.', 
                tags: ['Sweet', 'Gravity-Defying'] 
            },
            { 
                name: 'Stellar Salad', 
                price: 14.00, 
                category: 'Entrees', 
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop', 
                description: '4K mixed celestial greens with asteroid crumbs and star-dried tomatoes.', 
                tags: ['Health', 'Organic'] 
            }
        ];

        await MenuItem.insertMany(items);
        console.log('Menu items seeded successfully');

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
