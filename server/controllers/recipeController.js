require('../models/connection')
const Category = require('../models/Category')
const Recipe = require('../models/Recipe')

// Get Homepage

exports.homepage = async(req,res) => {
    try {

        const limitNumber = 5
        const categories = await Category.find({}).limit(limitNumber)
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber)
        const japanese = await Recipe.find({ 'category': 'Japanese' }).limit(limitNumber);
        const italian = await Recipe.find({ 'category': 'Italian' }).limit(limitNumber);
        const mexican = await Recipe.find({ 'category': 'Mexican' }).limit(limitNumber);

        const food = { latest, japanese, italian, mexican }

        res.render('index', {title: 'Cooking Blog - Home', categories, food});

    } catch (err) {
        res.status(500).send({ message: err.message || "Error ocurred"})
    }

}


// Get categories

exports.exploreCategories = async(req,res) => {
    try {

        const limitNumber = 20
        const categories = await Category.find({}).limit(limitNumber)

        res.render('categories', {title: 'Cooking Blog - Categories', categories});

    } catch (err) {
        res.status(500).send({ message: err.message || "Error ocurred"})
    }

}

// Get recipe/:id

exports.exploreRecipe = async(req,res) => {
    try {
        
        const recipeId = req.params.id
        const recipe = await Recipe.findById(recipeId)

        res.render('recipe', {title: 'Cooking Blog - Recipe', recipe});

    } catch (err) {
        res.status(500).send({ message: err.message || "Error ocurred"})
    }

}

