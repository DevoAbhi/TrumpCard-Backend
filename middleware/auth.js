import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        let decodedData;

        if(token) {
            decodedData = jwt.verify(token, "very-long-secret-jwt-token");

            req.userId = decodedData?.id;
        }

        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export default auth;