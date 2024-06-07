const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get("/book", controller.getBooks);
router.get("/book/:book_id", controller.getBookById);
router.post("/book", controller.addBook);
router.delete("/book/:book_id", controller.removeBook);
router.put("/book/update/:book_id", controller.updateBook);

router.get("/review", controller.getReviews);
router.get("/review/:rating", controller.getReviewByRating);

router.get("/inventory", controller.getInventory);
router.get("/inventory/stock/:quantity", controller.getInventoryByQuantity);
router.get("/inventory/:book_id", controller.getInventoryById);
router.put("/inventory/update/:inventory_id", controller.updateInventory);

router.get("/search", controller.searchBooks); 
router.put("/filterBooks", controller.getFilteredBooks);

router.put("/reviewTransaction", controller.performReviewTransaction);

module.exports = router;