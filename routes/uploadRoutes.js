import express from 'express';
const router = express.Router();
import {
  uploadSingleHandler,
  uploadMultipleHandler,
} from '../controllers/uploadController.js';

import multer from 'multer';

const upload = multer({
  dest: 'temp',
});

router.post('/file', upload.single('image'), uploadSingleHandler);
router.post('/files', upload.array('image'), uploadMultipleHandler);
export default router;
