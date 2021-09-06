const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

//Any other route
router.use((req, res) => {
    res.render('error');
  });

module.exports = router;
