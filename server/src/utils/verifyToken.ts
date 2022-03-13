import Database from "../database/Database"


export function verifyToken(req, res, next){
    const token = req.body['token']    
        next();


}