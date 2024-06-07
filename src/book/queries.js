const getBook = "SELECT * FROM book ";
const getBookById = "SELECT * FROM book WHERE book_id = $1";
const checkTitleExist = "SELECT b FROM book b WHERE b.title = $1";
const addBook = "INSERT INTO book (book_id, book_name, title, author_id, publisher_name, isbn, price, pages, publication_year, category_id, stock_quantity, inventory_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)";
const removeBook = "DELETE FROM book WHERE book_id = $1";
const updateBook = "UPDATE book SET title = $1 WHERE book_id = $2";

const getReview = "SELECT * FROM reviews";
const getReviewByRating = "SELECT * FROM reviews WHERE rating > $1";
const insertReview = "INSERT INTO reviews (review_id, book_id, rating, review_date, customer_id) VALUES ($1, $2, $3, $4, $5)";

const getInventory = "SELECT * FROM inventory";
const getInventoryByQuantity = "SELECT * FROM inventory WHERE quantity > $1";
const getInventoryById = "SELECT * FROM inventory WHERE book_id = $1";
const updateInventory = "UPDATE inventory SET quantity = $1 WHERE inventory_id = $2"

const searchBooks = "SELECT * FROM book WHERE title ILIKE $1 OR book_name ILIKE $1 OR author_id IN (SELECT author_id FROM author WHERE first_name ILIKE $1)";
const getFilteredBooksBase = "SELECT * FROM book WHERE 1=1";

module.exports = {
    getBook,
    getBookById,
    checkTitleExist,
    addBook,
    removeBook,
    updateBook,
    getReview,
    getReviewByRating,
    getInventory,
    getInventoryByQuantity,
    updateInventory,
    searchBooks,
    getFilteredBooksBase,
    getInventoryById,
    insertReview,
};