import jwt from 'jsonwebtoken'


const auth = async (req, res, next) => {
    try {
        const token = req.header.Authorization.token.split(" ")[1];
        const isCustomAuth = token.length < 500

        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, "CHROLLO")
            
            req.userId = decodedData?.id

        }else{
            decodedData = jwt.decode(token)
            
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error)
    }
}


export default auth