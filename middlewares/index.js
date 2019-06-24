const hashingUtil = require('../utils/hashing');

exports.ensureAuthorizedUser = async function (req, res, next) {
    let bearerToken;
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        bearerToken = bearer[1];
        try {
            const decoded = await hashingUtil.verifyJWT(bearerToken);
            const userId = decoded.userId;
            req.userId = userId;
            next();
        } catch (error) {
            res.status(401).json({
                message: 'Unauthorized',
            });
        }
    } else {
        res.status(403).json({
            message: 'Forbidden - authorization required',
        });
    }
};
