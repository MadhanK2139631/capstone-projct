const controller = require("../controllers/book.controllers");
const { title, author, description,genre , published} = require("../validation-rule/book.validation");

module.exports = (app) => {
    app.post("/books", validate([title,author,description,genre,published]),controller.add);

    app.get("/books", controller.findAll);

    app.get("/books/:id", controller.getBookId);

    app.put("/books/:id", controller.update);

    app.delete("/books/:id", controller.delete);
}

const validate = validations => {
    return async (req, res, next) => {
        for (const validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
        }
        next();
    };
};

