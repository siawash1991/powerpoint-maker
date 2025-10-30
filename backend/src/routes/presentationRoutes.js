import express from 'express';
import { generatePresentation, downloadPresentation, getPreview } from '../controllers/presentationController.js';

const router = express.Router();

// Generate a new presentation
router.post('/generate-presentation', generatePresentation);

// Download generated presentation
router.get('/download/:presentationId', downloadPresentation);

// Get slide preview
router.get('/preview/:presentationId/:slideNumber', getPreview);

export default router;
