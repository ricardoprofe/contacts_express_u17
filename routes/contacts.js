const express = require('express');
const {protectRoute} = require(__dirname + "/../authorization");

let Contact = require(__dirname + '/../models/contact.js');
let router = express.Router();

// General listing service
router.get('/', protectRoute("user"), (req, res) => {
    Contact.find().then(result => {
        res.status(200)
           .send({ ok: true, result: result });
    }).catch (error => {
        res.status(500)
           .send({ ok: false, error: "Error retrieving contacts: ", error});
    }); 
});

// Service for listing by ID
router.get('/:id', protectRoute("user"), (req, res) => {
    Contact.findById(req.params.id).then(result => {
        if(result)
            res.status(200)
               .send({ ok: true, result: result });
        else
            res.status(400)
               .send({ ok: false, 
                       error: "No contacts found" });
    }).catch (error => {
        res.status(400)
           .send({ ok: false, 
                   error: "Error searching for the specified contact: ", error });
    }); 
});

// Service for adding contacts
router.post('/', protectRoute("admin"), (req, res) => {
    let newContact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        age: req.body.age,
        favouriteRestaurant: req.body.favouriteRestaurant,
        pets: req.body.pets
    });

    newContact.save().then(result => {
        res.status(200)
           .send({ok: true, result: result});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error: "Error adding contact: ", error});
    });
});

// Service for updating contacts
router.put('/:id', protectRoute("admin"), (req, res) => {
    Contact.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            phone: req.body.phone,
            age: req.body.age,
            favouriteRestaurant: req.body.favouriteRestaurant,
            pets: req.body.pets
        }
    }, {new: true, runValidators: true }).then(result => {
        if (result)
            res.status(200)
               .send({ok: true, result: result});
        else
            res.status(400)
               .send({ok: false, error: "Contact not found"});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error:"Error updating contact: ", error});
    });
});

// Service for deleting contacts
router.delete('/:id', protectRoute("admin"), (req, res) => {
    Contact.findByIdAndDelete(req.params.id).then(result => {
        if (result)
            res.status(200)
               .send({ok: true, result: result});
        else
            res.status(400)
               .send({ok: false, error: "Contact not found"});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error:"Error deleting contact: ", error});
    });
});

module.exports = router;
