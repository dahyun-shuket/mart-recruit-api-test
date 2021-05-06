const logger = require("../config/logger");
var userModel = require("../models/users");

module.exports = class userService {
    static create(userId, password, userType, active) {
        return new Promise(function (resolve, reject) {
            try {
                let createUser = userModel.create(userId, password, userType, active);
                resolve(createUser);
            } catch (error) {
                reject(error);
                logger.writeLog("error", `API - services/createUserService/post: ${error}`);
            }
        });
    };

    static async login(userId) {
        let login = await userModel.login(userId);
        return login;
    };

    static async list(usertype, userLoginId, page, rowCount) {
        return new Promise(function(resolve, reject) {
            try {
                var offset = (page - 1) * rowCount;
                console.log(rowCount)
                // let list = userModel.list(searchName, rowCount, offset);
                let list = userModel.list(usertype, userLoginId, rowCount, offset);
                // console.log(list)
                resolve(list)
                // return list;
            } catch(error){
                logger.writeLog('error', `API - services/userService/list: ${error}`)
            }
        })
    };
    

    static async get(seq){
        let get = await userModel.get(seq);
        return get;
    };

    static async update(userId, password, userType, active, seq){
        return new Promise(function (resolve, reject) {
            try {
                let update = userModel.update(userId, password, userType, active, seq);
                resolve(update);
            } catch (error) {
                reject(error);
            }
    })
    };
    static async remove(seq){
        return new Promise(function (resolve, reject) {
            try {
                let remove = userModel.remove(seq);        
                resolve(remove);
            } catch (error) {
                reject(error);
            }
    })
    };
    static async checkId(userId){
        return new Promise(function (resolve, reject) {
            try {
                let checkId = userModel.checkId(userId);        
                resolve(checkId);
            } catch (error) {
                reject(error);
            }
    })
    };
    static async paging(rowPerPage, beginRow){
        let paging = await userModel.paging(rowPerPage, beginRow);
        return paging;
    };
    
    static async count(searchId, usertype){
        return new Promise(function (resolve, reject) {
            try {
                let count = userModel.count(searchId, usertype);
                resolve(count);
            } catch (error) {
                logger.writeLog('error', `services/userService/count: ${error}`);           
            }
    })
    };
    
    
};
