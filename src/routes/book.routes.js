const bookController = require("../controllers/book.controllers");
const { title, author, description,genre , published} = require("../validation-rule/book.validation");

module.exports = (app) => {
    app.post("/books", validate([title,author,description,genre,published]),bookController.add);

    app.get("/books", bookController.findAll);

    app.get("/books/:id", bookController.getBookId);

    app.put("/books/:id", bookController.update);

    app.post("/books/review/:id", bookController.addReview);
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

