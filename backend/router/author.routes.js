import { Router } from "express";
import Author from "../models/author.js";



const authorRouter = Router();


// GET
authorRouter.get("/", async (req, res, next) => {
    try {
        const authors = await Author.find();
        res.send(`List of authors: ${authors}`);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});






// GET BY ID

authorRouter.get("/:id", async (req, res, next) => {
    try {
        const author = await Author.findById(req.params.id);
        res.send(`Author: ${author}`);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});






// POST

authorRouter.post("/", async (req, res, next) => {
    try {
        const { name, lastName, email, dateOfBirth, avatar } = req.body;
        const newAuthor = new Author({ name, lastName, email, dateOfBirth, avatar });
        await newAuthor.save();
        res.send(`Author: ${newAuthor}`);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }   
});






// PUT

authorRouter.put("/:id", async (req, res, next) => {
    try {
        const { name, lastName, email, dateOfBirth, avatar } = req.body;
        const updatedAuthor = await Author.findByIdAndUpdate(
            req.params.id,
            { name, lastName, email, dateOfBirth, avatar },
            { new: true }            
        );
        if (!updatedAuthor) {
            return res.status(404).send({ error: "Author not found" });
        }
        res.send(`Author: ${updatedAuthor}`);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }   
});






// DELETE

authorRouter.delete("/:id", async (req, res, next) => {
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) {
            return res.status(404).send({ error: "Author not found" });
        }
        res.send(`Author: ${deletedAuthor}`);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }   
});



export default authorRouter;