const router =
require('express').Router();

const auth =
require('../middleware/auth');

const {
 submitAnswer
} =
require('../controllers/interview.controller');

router.post(
 '/answer',
 auth,
 submitAnswer
);

module.exports = router;