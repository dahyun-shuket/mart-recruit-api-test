const userService = require("../services/users");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const secretKey = require("../config/secretKey").secretKey;
const options = require("../config/secretKey").options;

module.exports = {
    // 유저 생성
    async create(req, res, next) {
        try {
            let userId = req.body.userId
            let password = req.body.password
            let userType = req.body.userType
            let active = req.body.active
            let salt = genSaltSync(10);
            password = hashSync(password, salt);
            let createUser = await userService.create(userId, password, userType, active);

            res.json({
                result: "success",
                data: createUser,
            });
        } catch (error) {
            return res.json({
                result: "fail",
                data: "Database connect error",
            });
        }
    },
    // 로그인
    async login(req, res, next) {
        // const body = req.body;
        let userId = req.body.userId
        let password = req.body.password
        let results = await userService.login(userId);
        if (!results) {
            return res.json({
                result: "fail",
                data: "Invalid ID or Password",
            });
        }
        const result = compareSync(password, results.PWD);
        if (result) {
            // 토큰 생성
            results.password = undefined;
            let accessToken = sign({ result: results }, secretKey, options);
            console.log("Access Token ? ? : " + accessToken);
            return res.json({
                result: "success",
                data: results,
                token: accessToken,
            });
        } else {
            return res.json({
                result: "fail",
                data: "Invalid ID or Password",
            });
        }
    },
    // 유저 전체조회
    async list(req, res) {
        const getUsers = await userService.list();
        return res.json({
            result: "success",
            data: getUsers,
        });
    },
    // 유저 한명조회
    async get(req, res) {
        const seq = req.param.seq;
        const getUser = await userService.get(seq);
        return res.json({
            result: "success",
            data: getUser,
        });
    },
    // 유저 수정
    async update(req, res) {
        let userId = req.body.userId
        let password = req.body.password
        let userType = req.body.userType
        let active = req.body.active
        let seq = req.body.seq
        const salt = genSaltSync(10);
        password = hashSync(password, salt);
        let updateUser = await userService.update(userId, password, userType, active, seq);
        console.log(updateUser);
        return res.json({
            result: "success",
            data: updateUser,
        });
    },
    // 유저 삭제
    async remove(req, res) {
        let seq = req.body.seq
        let removeUser = await userService.remove(seq);
        console.log(removeUser);
        return res.json({
            result: "success",
            data: removeUser,
        });
    },
    // 아이디 중복 체크
    async checkid(req, res) {
        const userId = req.body.userId
        let checkIdUser = await userService.checkId(userId);
        console.log(checkIdUser);
        return res.json({
            result: "success",
            data: checkIdUser,
        });
    },
    async paging(req, res) {
        let rowPerPage = 10;    // 페이지당 보여줄 글목록 : 10개
        let currentPage = 1;    // 기본 페이지값
        let pnSize = 10;         // 페이지네이션 개수 설정.
        
        // 어드민페이지에서 요청한 페이지 (req.params.currentPage) 가 있다면
        // 기본 페이지를 요청값으로 변경.
        if(req.params.currentPage){
            currentPage = Number(req.params.currentPage);  
        };
        // 다음 페이지 갈 때 건너뛸 리스트 개수.
        let beginPage = Number((currentPage - 1) * rowPerPage);
        let totalCount = await userService.count();
        console.log("토탈 카운트  ? ? ? : " + totalCount);
        let totalRow = totalCount
        // 페이지네이션의 전체 카운트
        let pnTotal = Math.ceil(totalRow / rowPerPage); 
        // 토탈셋
        let totalSet = Math.ceil(pnTotal / pnSize);
        let curSet = Math.ceil(currentPage / pnSize) // 현재 셋트 번호
        // 현재 페이지의 페이지네이션 시작 번호.
        let pnStart = ((curSet - 1) * pnSize) + 1; 
        // 현재 페이지의 페이지네이션 끝 번호.
        let pnEnd = (pnStart + pnSize) - 1; 
        let page = await userService.paging(beginPage, rowPerPage);

        return res.json({
            result: "success",
            data: page,                     // 뿌려줄 데이터.(10개.)
            pnTotal: pnTotal,               // 페이지네이션의 전체 수
            pnEnd: pnEnd,                   // 페이지네이션 끝번호
            pnSize: pnSize,                 // 페이지네이션 표시될 갯수
            pageNum: currentPage,           // 현제 페이지
            TotalNum : totalRow,            // 전체 회원 수
            showUser: rowPerPage,           // 보여질 회원의 수 (10)
            totalSet: totalSet,             
            curSet : curSet,
            pntStart : pnStart
        });
    }
    
};
