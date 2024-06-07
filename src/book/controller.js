const pool = require('../../db');
const queries = require('./queries')

const getBooks = (req,res) => {
    pool.query(queries.getBook, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const getBookById = (req,res) => {
    const book_id = parseInt(req.params.book_id);
    pool.query(queries.getBookById, [book_id], (error,results) =>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const addBook = (req,res) => {
    const { book_id, book_name, title, author_id, publisher_name, isbn, price, pages, publication_year, category_id, stock_quantity, inventory_id } = req.body;

    //ngecek 
    pool.query(queries.checkTitleExist, [title], (error,results) =>{
        if (results.rows.length) {
            res.send("Title already exists");
        }

        pool.query(queries.addBook, [book_id, book_name, title, author_id, publisher_name, isbn, price, pages, publication_year, category_id, stock_quantity, inventory_id], (error,results) => {
            if (error) throw error;
            res.status(201).send("Book succesfully added");
            console.log("Book added");
        })
    });
};

const removeBook = (req,res) => {
    const book_id = parseInt(req.params.book_id);

    pool.query(queries.getBookById, [book_id], (error,results) => {
        const noBookFound = !results.rows.length;
        if (noBookFound){
            res.send("Book not found in database");
        }

    pool.query(queries.removeBook, [book_id], (error,results) => {
        if (error) throw error;
        res.status(200).send("Book succesfully deleted");
    })
    })
}

const updateBook = (req,res) => {
    const book_id = parseInt(req.params.book_id);
    const { title } = req.body;
    
    pool.query(queries.getBookById, [book_id], (error,results) => {
        const noBookFound = !results.rows.length;
        if (noBookFound){   
            res.send("Book not found in database");
        }

        pool.query(queries.updateBook, [title , book_id], (error,results) => {
            if (error) throw error;
            res.status(200).send("Student succesfully updated");
        });
    });
};


const getReviews = (req,res) => {
    pool.query(queries.getReview, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const getReviewByRating = (req,res) => {
    const rating = parseInt(req.params.rating);
    pool.query(queries.getReviewByRating, [rating], (error,results) =>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const getInventory = (req,res) => {
    pool.query(queries.getInventory, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const getInventoryByQuantity = (req,res) => {
    const quantity = parseInt(req.params.quantity);
    pool.query(queries.getInventoryByQuantity, [quantity], (error,results) =>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const getInventoryById = (req,res) => {
    const book_id = parseInt(req.params.book_id);
    pool.query(queries.getInventoryById, [book_id], (error,results) =>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const updateInventory = (req,res) => {
    const inventory_id = parseInt(req.params.inventory_id);
    const { quantity } = req.body;
    
    pool.query(queries.getInventoryByQuantity, [inventory_id], (error,results) => {
        const noInventoryFound = !results.rows.length;
        if (noInventoryFound){   
            res.send("Inventory not found in database");
        }

        pool.query(queries.updateInventory, [quantity , inventory_id], (error,results) => {
            if (error) throw error;
            res.status(200).send("Inventory succesfully updated");
        });
    });
};

const searchBooks = (req, res) => {
    const keyword = `%${req.query.keyword}%`;
    pool.query(queries.searchBooks, [keyword], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getFilteredBooks = (req, res) => {
    const filters = req.body.filters || {};
    let query = queries.getFilteredBooksBase;
    const queryParams = [];

    // Dynamically build the query based on filters
    if (filters.title) {
        query += " AND title ILIKE $1";
        queryParams.push(`%${filters.title}%`);
    }


    pool.query(query, queryParams, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const performReviewTransaction = async (req, res) => {
    const { reviews, averageRatingUpdate } = req.body;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Insert multiple reviews
        for (let review of reviews) {
            await client.query(queries.insertReview, [
                review.review_id, 
                review.book_id, 
                review.rating, 
                review.review_date,
                review.customer_id
            ]);
        }

        await client.query('COMMIT');
        res.status(200).send("Review transaction completed successfully");
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(500).send("Transaction failed: " + error.message);
    } finally {
        client.release();
    }
};

module.exports = {
    getBooks,
    getBookById,
    addBook,
    removeBook,
    updateBook,
    getReviews,
    getReviewByRating,
    getInventory,
    getInventoryByQuantity,
    getInventoryById,
    updateInventory,
    searchBooks,
    getFilteredBooks,
    performReviewTransaction,
}