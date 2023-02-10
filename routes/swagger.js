const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('../swagger-dev.json');

if(process.env.PORT == 10000) {
    swaggerDocument = require('../swagger.json');
}

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument), () => {
    // #swagger.ignore = true
});
module.exports = router;