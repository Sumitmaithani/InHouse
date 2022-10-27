const router = require('express').Router();
const activateController = require('./controllers/activate-controller');
const AuthController = require('./controllers/auth-controller');
const authMiddleware = require('./middlewares/auth-middleware');

router.post('/api/send-otp', AuthController.sendOtp);
router.post('/api/verify-otp', AuthController.verifyOtp);
router.post("/api/activate", authMiddleware, activateController.activate);

module.exports = router;