module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const urlController = require('../controllers/urlController.controllers');

    // Generate a short, unique alias for a given long URL. Optionally, a custom alias and a time-to-live (TTL) can be specified.
    router.post('/shorten', urlController.shortenURL);

    // Redirect to the original long URL associated with the given alias.
    router.get('/:alias', urlController.redirectToURL);

    // Retrieve access statistics for a given shortened URL alias.
    router.get('/analytics/:alias', urlController.URLAnalytics);

    // Update the custom alias and TTL for a given alias.
    router.put('/update/:alias', urlController.updateURL);

    // Delete the shortened URL data for the given alias.
    router.delete('/delete/:alias', urlController.deleteURL)

    app.use('/', router);
    app.use((err, req, res, next) => {
        return res.status(err.status).json({
            message: err.message
        });
    });
};