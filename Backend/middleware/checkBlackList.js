let tokenBlacklist = [];

// Check if token is blacklisted
function checkBlacklist(req, res, next) {
    const token = req.headers['x-auth-token'];
    if (tokenBlacklist.includes(token)) {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }
    next();
}

module.exports = {
    checkBlacklist,
    tokenBlacklist
};