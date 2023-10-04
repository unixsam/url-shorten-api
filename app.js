const express = require('express');
const mysql = require('mysql2/promise');
const shortid = require('shortid');

const app = express();
const PORT = process.env.PORT || 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'url_shortener',
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
});

// Middleware
app.use(express.json());

// Shorten URL endpoint
app.post('/shorten', async (req, res) => {
   const { original_url } = req.body;

   try {
       const connection = await pool.getConnection();
       
       // Check if a short URL already exists for the original URL
       const [existingUrls] = await connection.query('SELECT * FROM short_urls WHERE original_url = ?', [original_url]);

       if (existingUrls.length > 0) {
           // If a short URL exists, return it
           connection.release();
           res.json(existingUrls[0]);
       } else {
           // Generate a unique short URL
           let short_url;
           let isUnique = false;
           while (!isUnique) {
               short_url = shortid.generate();
               try {
                   const [existingShortUrls] = await connection.query('SELECT * FROM short_urls WHERE short_url = ?', [short_url]);
                   if (existingShortUrls.length === 0) {
                       isUnique = true;
                   }
               } catch (error) {
                   console.error(error);
                   res.status(500).json({ error: 'Internal Server Error' });
                   return;
               }
           }

           // Insert the new short URL into the database
           await connection.query('INSERT INTO short_urls (original_url, short_url) VALUES (?, ?)', [original_url, short_url]);
           connection.release();

           res.json({
               short_url,
               original_url,
               click_count: 0, // Initialize the click count to 0
               created_at: new Date(),
               updated_at: new Date()
           });
       }
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal Server Error' });
   }
});

// List all URLs endpoint
app.get('/urls', async (req, res) => {
   try {
       const connection = await pool.getConnection();
       const [results] = await connection.query('SELECT * FROM short_urls');
       connection.release();
       res.json(results);
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal Server Error' });
   }
});

// Redirect to original URL endpoint
app.get('/:short_url', async (req, res) => {
   const { short_url } = req.params;

   try {
       const connection = await pool.getConnection();
       const [results] = await connection.query('SELECT original_url FROM short_urls WHERE short_url = ?', [short_url]);
       
       if (results.length === 0) {
           res.status(404).json({ error: 'URL not found' });
       } else {
           const original_url = results[0].original_url;
           // Update the click count
           await connection.query('UPDATE short_urls SET click_count = click_count + 1 WHERE short_url = ?', [short_url]);
           connection.release();
           res.redirect(original_url);
       }
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal Server Error' });
   }
});

// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
