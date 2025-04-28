const express = require('express');
const { uploadFile, listFiles, downloadFile, listFilesByUser } = require('../controllers/fileController');
const upload = require('../middlewares/upload');
const { body, validationResult, param } = require('express-validator');

const router = express.Router();

router.post('/upload',
  upload.single('file'),
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ errors: [{ msg: 'File is required' }] });
    }
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ errors: [{ msg: 'File size exceeds 20MB' }] });
    }
    next();
  },
  uploadFile
);

router.get('/', listFiles);

router.get('/:id/download',
  param('id').isMongoId().withMessage('Invalid file id'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
  downloadFile
);

module.exports = router;
