const db = require('../config/db');

const getCategories = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categorys');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getCategories };
