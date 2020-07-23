import { Database } from '../database/database';
const db = new Database();
export const loginController = (req, res, next) => {
    res.status(201).json({ message: 'It\'s working' });
};
export const storeUserDataController = (req, res, next) => {
    db.storeUserDetails(req.body.uid, req.body.name, req.body.email).then(() => {
        res.status(201).send({ status: 'User added to database successfully' });
    }).catch((err) => {
        res.status(501).send(err);
    });
};
export const getUserDataController = (req, res, next) => {
    const userUID = req.body.uid;
    db.getUserDetails(userUID).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.status(501).send(err);
    });
};
//# sourceMappingURL=controllers.js.map