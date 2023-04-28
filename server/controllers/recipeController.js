require('../models/connection')
const Category = require('../models/Category')
const Recipe = require('../models/Recipe')

// GET Homepage

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


// GET categories

exports.exploreCategories = async(req,res) => {
    try {

        const limitNumber = 20
        const categories = await Category.find({}).limit(limitNumber)

        res.render('categories', {title: 'Cooking Blog - Categories', categories});

    } catch (err) {
        res.status(500).send({ message: err.message || "Error ocurred"})
    }

}


// GET category/:id

exports.exploreCategoriesById = async(req,res) => {
    try {
        const categoryId = req.params.id
        const limitNumber = 20
        const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber)

        res.render('categories', {title: 'Cooking Blog - Categories', categoryById});

    } catch (err) {
        res.status(500).send({ message: err.message || "Error ocurred"})
    }
}


// GET recipe/:id

exports.exploreRecipe = async(req,res) => {
    try {
        
        const recipeId = req.params.id
        const recipe = await Recipe.findById(recipeId)

        res.render('recipe', {title: 'Cooking Blog - Recipe', recipe});

    } catch (err) {
        res.status(500).send({ message: err.message || "Error ocurred"})
    }

}

// GET /explore-latest

exports.exploreLatest = async(req,res) => {
    try {
        const limitNumber = 20
        const recipe = await Recipe.find({}).sort({_id: -1 }).limit(limitNumber)

        res.render('explore-latest', {title: 'Cooking Blog - Latest Recipes', recipe});

    } catch (err) {
        res.status(500).send({ message: err.message || "Error ocurred"})
    }

}

// GET /explore-random

exports.exploreRandom = async(req,res) => {
    try {
        const count = await Recipe.find().countDocuments()
        const randomNum = Math.floor(Math.random() * count)
        const recipe = await Recipe.findOne().skip(randomNum).exec()

        res.render('explore-random', {title: 'Cooking Blog - Random Recipe', recipe});

    } catch (err) {
        res.status(500).send({ message: err.message || "Error ocurred"})
    }

}

// POST Search

exports.searchRecipe = async(req,res) => {
    try {
        const searchTerm = req.body.searchTerm
        const recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true }})

        res.render('search', {title: 'Cooking Blog - Search', recipe});

    } catch (err) {
        res.status(500).send({ message: err.message || "Error ocurred"})
    }
}