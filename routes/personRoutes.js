const express = require('express')
const router = express.Router()
const Person = require('../models/person')


router.post('/', async (req, res)=> {

    try {
        const newPersonData = req.body // Assuming the request body contains the person data

        //Create a new Person document using the Mongoose Model
        const newPerson = new Person(newPersonData)

        //Save the new person to the database
        const response = await newPerson.save()
        console.log('Person Data saved');
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }


    // const newPersonData = req.body // assuming the request body contains the person data

    // //create a new person document using the Mongoose Model
    // const newPerson = new Person(newPersonData);
    // // newPerson = newPersonData.name
    // // newPerson = newPersonData.age
    // // newPerson = newPersonData.mobile
    // // newPerson = newPersonData.work
    // // newPerson = newPersonData.email
    // // newPerson = newPersonData.address
    // // newPerson = newPersonData.salary
    // //it's the old and time consuming way, now we pass the data directly in model, check line no 18->const newPerson = new Person(newPersonData);


    // //save the new Person to the database
    // newPerson.save((error, savedPerson) => {
    //     if(error){
    //         console.log('Error saving persn: ', error);
    //         res.status(500).json({error: 'Internal server error'})
    //     }else{
    //         console.log('Data saved successfully')
    //         res.status(500).json(savedPerson);
    //     }
    // })
})



router.get('/', async(req, res)=>{
    try {
        const data = await Person.find();
        console.log('Person Data fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})

router.get('/:workType', async (req, res)=>{
    try {
        const workType = req.params.workType;  //Extract the work type from the url parameter

        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const response = await Person.find({work: workType});
            console.log('response fetched')
            res.status(500).json(response)
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
})

router.put('/:id', async(req, res) => {
    try {
        const personId = req.params.id; // Extarct the id from the URL parameter 
        const updatedPersonData = req.body; // Updated Data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run mongoose validation
        })

        if(!response){
            res.status(404).json({error: "Person not found"})
        }

        console.log("Data Updated")
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
})


router.delete('/:id', async (req, res)=> {
    try {
        const personId = req.params.id; // Extract the person's id from the URL parameter

        //Assuming you have a Person model
        const response = await Person.findByIdAndDelete(personId)
        if(!response){
            res.status(404).json({error: "Person not found"})
        }

        console.log("Person Data Deleted Successfully")
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
})

module.exports = router