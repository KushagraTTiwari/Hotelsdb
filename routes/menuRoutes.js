const express = require('express')
const router = express.Router()
const MenuItem = require('../models/MenuItem')

router.post('/', async (req, res)=> {
    try {
        const data = req.body

        const newMenuData = new MenuItem(data);
        const response = await newMenuData.save()
        console.log("Menu Data Saved")
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"})
    }
})

router.get('/', async (req, res)=> {
    try {
        const data = await MenuItem.find();
        console.log('Menu Data fetched')
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"})
    }
})
router.get('/:taste', async (req, res)=> {
    try {
        const tasteType = req.params.taste

        if(tasteType == 'spicy' || tasteType == 'sweet' || tasteType == 'sour'){
            const data = await MenuItem.find({taste : tasteType})
            console.log('Date fetched')
            res.status(200).json(data);
        }else{
            res.status(404).json("Data not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"})
    }
})


router.put('/:id', async(req, res)=> {
    try {
        const itemId = req.params.id;
        const updatedItemData = req.body;

        const response = await MenuItem.findByIdAndUpdate(itemId, updatedItemData, {
            new: true, //Return the updated document
            runValidators: true, //Run mongoose validation
        })

        if(!response) {
            res.status(404).json({error: "Item not found"})
        }
        console.log("Item Updated")
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
})


router.delete('/:id', async(req, res)=> {
    try {
        const itemId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(itemId)
        if(!response) {
            res.status(404).json({error: "Item not found"})
        }
        console.log("Item Deleted Successfully")
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
})

module.exports = router;