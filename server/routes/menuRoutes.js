const express = require('express');
const MenuItem = require('../models/MenuItem');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/menu
// @desc    Get all menu items
// @access  Public
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find({});
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items' });
    }
});

// @route   GET /api/menu/:id
// @desc    Get a single menu item by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (menuItem) {
            res.json(menuItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu item' });
    }
});

// @route   POST /api/menu
// @desc    Create a new menu item
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { name, description, price, category, image, modelUrl, tags } = req.body;
        const newItem = new MenuItem({
            name, description, price, category, image, modelUrl, tags
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: 'Error creating menu item' });
    }
});

// @route   PUT /api/menu/:id
// @desc    Update a menu item
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedItem) {
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating menu item' });
    }
});

// @route   DELETE /api/menu/:id
// @desc    Delete a menu item
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (deletedItem) {
            res.json({ message: 'Menu item deleted successfully' });
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting menu item' });
    }
});

module.exports = router;
