const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('../swagger.json');

if(process.env.USERNAME === 'alvar') {
    swaggerDocument = require('../swagger-dev.json');
}

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument), () => {
    // #swagger.ignore = true
});
module.exports = router;