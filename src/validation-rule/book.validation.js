
const { body } = require('express-validator');
const { book } = require('../models');

const checkDuplicateTitles = async (title) => {
    const existingbook = await book.findOne({ "title": { $regex: `^${title}$`, $options: 'i' }});
    if (existingbook) {
        throw new Error('Title already exists.');
    }
    return true;
}

exports.title = body('title').notEmpty().withMessage('Title is required').isLength({ max: 10 }).withMessage('Title cannot exceed more than 10 characters').custom(checkDuplicateTitles)

exports.genre = body('genre').notEmpty().withMessage('genre is required').isLength({ max: 10 }).withMessage('genre cannot exceed more than 10 characters')

exports.author = body('author').notEmpty().withMessage('Author is required').isLength({ max: 10 }).withMessage('Author cannot exceed more than 10 characters')

exports.description = body('description').notEmpty().withMessage('Description is required').isLength({ max: 50 }).withMessage('Description cannot exceed 50 characters')

exports.published = body('published').trim().notEmpty().withMessage('published is required').isISO8601().withMessage('Date shoulg be in yyyy-yy-dd formate').custom(async date => {
    let inputdate = new Date(date);
    let todaydate = new Date();
    try {
        if (inputdate > todaydate) {
            throw new Error('Date cannot be in the future Date');
        }
    } catch (err) {
        throw err;
    }
})

