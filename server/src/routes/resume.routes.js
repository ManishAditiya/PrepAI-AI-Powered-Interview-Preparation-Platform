const router = require('express').Router();
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbac');
const upload = require('../middleware/upload');
const { uploadResume } = require('../controllers/resume.controller');

router.post('/upload', auth, rbac('candidate'), upload.single('resume'), uploadResume);

module.exports = router;