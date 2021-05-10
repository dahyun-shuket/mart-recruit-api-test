const logger = require("../config/logger");
var userModel = require("../models/users");
// const got = require("got");

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
                let list = userModel.list(usertype, userLoginId, rowCount, offset);
                resolve(list)
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
    
    // static async bizNoCheck(bizno){
    //     try {
            
    //         console.log(bizno);
            
    //         let apiURL = "https://teht.hometax.go.kr/wqAction.do?actionId=ATTABZAA001R08&screenId=UTEABAAA13&popupYn=false&realScreenId=";
    //         const {body} = await got.post(apiURL, '"'+bizno+'"',{
    //             headers: {
    //                 'contentType': 'application/xml'
    //             }
    //         });
    //         if (body.result === 'success') {
    //             return body.data;
    //         } else {
    //             //실패
    //             logger.writeLog('error', `services/userService/bizNoCheck: ${body.result}`);           
    //             return body.data;
    //         }
    //     } catch (error) {
    //         logger.writeLog('error', `services/userService/bizNoCheck: ${error}`);           
    //     }
    // };
    
};
