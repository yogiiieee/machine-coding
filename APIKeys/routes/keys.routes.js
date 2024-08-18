module.exports = app => {
    const router = require('express').Router();
    const apiController = require('../controllers/keys.controller.js');

    // POST /keys: Generate new API key
    router.post('/keys', apiController.generate);
    // GET /keys: Find and block the next available API key
    router.get('/keys', apiController.findKey);
    // GET /keys/:id: Get information about a specific API key
    router.get('/keys/:id', apiController.getKey);
    // DELETE /keys/:id: Remove a specific API key
    router.delete('/keys/:id', apiController.removeKey);
    // PUT /keys/:id: Unblock a specific API key
    router.put('/keys/:id', apiController.unBlockKey);
    // PUT /keepalive/:id: Update the last used time of a specific API key
    router.put('/keepalive/:id', apiController.keepAliveKey);

    app.use('/api', router);
};