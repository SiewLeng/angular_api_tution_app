const express = require('express');
const router = express.Router();

const teacher_controller = require('../controllers/teacher.controller');

router.get('/', teacher_controller.home);
router.get('/find/:id', teacher_controller.find);
router.delete('/delete/:id', teacher_controller.delete);
router.post('/create', teacher_controller.create);
router.put('/update', teacher_controller.update);

module.exports = router;