const recruitService = require('../services/recruit.js');
const resumeService = require('../services/resume.js');
const defaultRowCount = 20;

module.exports = {
    // 공고 생성
    async create(req, res, next) {
        const MART_SEQ = req.body.MART_SEQ;
        const HRONAME = req.body.HRONAME;
        const HROCONTACT = req.body.HROCONTACT;
        const HROEMAIL = req.body.HROEMAIL;
        const SUBJECT = req.body.SUBJECT;
        const CAREER_SEQ = req.body.CAREER_SEQ;
        const CHARGE = req.body.CHARGE;
        const PREFERENTIAL = req.body.PREFERENTIAL;
        const EDUCATION = req.body.EDUCATION;
        const SALARYTYPE = req.body.SALARYTYPE;
        const SALARY = req.body.SALARY;
        const PROBATIONTERM = req.body.PROBATIONTERM;
        const WORKSHIFT = req.body.WORKSHIFT;
        const WORKSHIFTTIME = req.body.WORKSHIFTTIME;
        const GENDER = req.body.GENDER;
        const AGE = req.body.AGE;
        const STARTDATE = req.body.STARTDATE;
        const ENDDATE = (req.body.ENDDATE) ? req.body.ENDDATE : null;
        const HIRINGSTEP = req.body.HIRINGSTEP;
        const REQUIREDOCS = req.body.REQUIREDOCS;
        const CONTENT = req.body.CONTENT;
        const JOBKIND = req.body.JOBKIND;
        const JOBRANK = req.body.JOBRANK;
        const WORKINGTYPE = req.body.WORKINGTYPE;
        const WORKREGION = req.body.WORKREGION;
        const ACTIVE = req.body.ACTIVE;

        const result = await recruitService.create(MART_SEQ, HRONAME, HROCONTACT, HROEMAIL, SUBJECT, CAREER_SEQ, CHARGE, 
            PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, 
            GENDER, AGE, STARTDATE, ENDDATE, HIRINGSTEP, REQUIREDOCS, CONTENT, JOBKIND, JOBRANK, WORKINGTYPE, WORKREGION, ACTIVE);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    // 공고 업데이트
    async update(req, res, next) {
        const SEQ = req.body.SEQ;
        const HRONAME = req.body.HRONAME;
        const HROCONTACT = req.body.HROCONTACT;
        const HROEMAIL = req.body.HROEMAIL;
        const SUBJECT = req.body.SUBJECT;
        const CAREER_SEQ = req.body.CAREER_SEQ;
        const CHARGE = req.body.CHARGE;
        const PREFERENTIAL = req.body.PREFERENTIAL;
        const EDUCATION = req.body.EDUCATION;
        const SALARYTYPE = req.body.SALARYTYPE;
        const SALARY = req.body.SALARY;
        const PROBATIONTERM = req.body.PROBATIONTERM;
        const WORKSHIFT = req.body.WORKSHIFT;
        const WORKSHIFTTIME = req.body.WORKSHIFTTIME;
        const GENDER = req.body.GENDER;
        const AGE = req.body.AGE;
        const STARTDATE = req.body.STARTDATE;
        const ENDDATE = (req.body.ENDDATE) ? req.body.ENDDATE : null;
        const HIRINGSTEP = req.body.HIRINGSTEP;
        const REQUIREDOCS = req.body.REQUIREDOCS;
        const CONTENT = req.body.CONTENT;
        const JOBKIND = req.body.JOBKIND;
        const JOBRANK = req.body.JOBRANK;
        const WORKINGTYPE = req.body.WORKINGTYPE;
        const WORKREGION = req.body.WORKREGION;
        const ACTIVE = req.body.ACTIVE;

        const result = await recruitService.update(SEQ, HRONAME, HROCONTACT, HROEMAIL, SUBJECT, CAREER_SEQ, CHARGE, 
            PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, GENDER, AGE, 
            STARTDATE, ENDDATE, HIRINGSTEP, REQUIREDOCS, CONTENT, JOBKIND, JOBRANK, WORKINGTYPE, WORKREGION, ACTIVE);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    // 공고 삭제
    async remove(req, res, next) {
        const seq = req.body.seq;

        const result = await recruitService.remove(seq);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    // 공고 활성화
    async active(req, res, next) {
        const seq = req.body.seq;

        const result = await recruitService.active(seq);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    // 공고 마감
    async close(req, res, next) {
        const seq = req.body.seq;

        const result = await recruitService.close(seq);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    // 한개의 공고 가져오기
    // ?martseq=&page=&criteria=
    async get(req, res, next) {
        const recruitSeq = req.body.seq;

        if (recruitSeq) {
            const jobOpeningInfo = await recruitService.get(recruitSeq);

            res.status(200).json({
                result: 'success',
                data: jobOpeningInfo
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    // 공고 복사
    async copy(req, res, next) {
        const seq = req.body.seq;

        const result = await recruitService.copy(seq);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    // http://localhost:3000/api/jobOpening/list?martSeq=1&regions=1,2&jobkinds=1,5
    // http://localhost:3000/api/jobOpening/list?martSeq=1&regions=1,2
    // http://localhost:3000/api/jobOpening/list?martSeq=1&jobkinds=1,5
    // http://localhost:3000/api/jobOpening/list?regions=1,2&jobkinds=1,5
    // 지역, 직종으로만 나열
    // 공고 리스트
    async list(req, res, next) {
        const martSeq = req.body.martSeq;
        const name = req.body.name;
        const subject = req.body.subject;
        const regions = req.body.regions;
        const jobkinds = req.body.jobKinds;
        const workingTypes = req.body.workingTypes;
        const userSeq = req.body.userSeq;
        const userOwn = req.body.userOwn;
        const active = req.body.active;

        if (userSeq) { if (userOwn == undefined) userOwn = 'N'};
        const page = (req.body.page) ? req.body.page : 1;
        const rowCount = (req.body.rowCount) ? req.body.rowCount * 1 : defaultRowCount;

        await recruitService.closeAfterDate();

        const totalCount = await recruitService.totalCount(martSeq, active, name, subject, regions, jobkinds, workingTypes);
        const list = await recruitService.list(martSeq, active, name, subject, userSeq, userOwn, regions, jobkinds, workingTypes, null, page, rowCount);

        res.status(200).json({
            result: 'success',
            data: {
                totalCount: totalCount,
                list: list
            }
        });    
    },

    // 관리자용 리스트에는 martSeq, userSeq, userOwn 이 무시된다
    async listForAdmin(req, res, next) {
        const active = req.body.active;
        const name = req.body.name;
        const subject = req.body.subject;
        const regions = req.body.regions;
        const jobkinds = req.body.jobkinds;

        const page = (req.body.page) ? req.body.page : 1;
        const rowCount = (req.body.rowCount) ? req.body.rowCount * 1 : defaultRowCount;
        
        await recruitService.closeAfterDate();

        const totalCount = await recruitService.totalCount(null, active, name, subject, regions, jobkinds, null);
        const list = await recruitService.list(null, active, name, subject, null, null, regions, jobkinds, null, null, page, rowCount);

        res.status(200).json({
            result: 'success',
            data: {
                totalCount: totalCount,
                list: list
            }
        });    
    },

    // 지정된 사용자가 지원한 공고를 리스팅, 구인 중인 리스트만 나온다
    async listUserApply(req, res, next) {
        const userSeq = req.body.userSeq;
        const userOwn = 'Y';

        const page = (req.body.page) ? req.body.page : 1;
        const rowCount = (req.body.rowCount) ? req.body.rowCount * 1 : defaultRowCount;

        await recruitService.closeAfterDate();

        const list = await recruitService.list(null, 'Y', null, null, userSeq, userOwn, null, null, null, null, page, rowCount);

        res.status(200).json({
            result: 'success',
            data: {
                totalCount: 0,
                list: list
            }
        });    
    },


    async listResume(req, res, next) {
        const recruitSeq = req.body.seq;
        const page = (req.body.page) ? req.body.page : 1;

        const list = await resumeService.listForJobOpening(recruitSeq, page, rowCount);

        res.status(200).json({
            result: 'success',
            data: list
        });    
    },

    async updateJobKind(req, res, next) {
        const recruitSeq = req.body.seq;
        const jobKinds = req.body.jobKinds;

        const result = await recruitService.updateJobKind(recruitSeq, jobKinds);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: list
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });        
        }
    },

    async updateWorkingRegion(req, res, next) {
        const recruitSeq = req.body.seq;
        const workingRegions = req.body.regions;

        const result = await recruitService.updateWorkingRegion(recruitSeq, workingRegions);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: list
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });        
        }
    },

    async getUserStatus(req, res, next) {
        const recruitSeq = req.body.recruitSeq;
        const userSeq = req.body.userSeq;

        const result = await recruitService.getUserStatus(recruitSeq, userSeq);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });        
        }
    },

    async apply(req, res, next) {
        const recruitSeq = req.body.recruitSeq;
        const userSeq = req.body.userSeq;

        const resumeInfo = await resumeService.getByUserSeq(userSeq);
        if (resumeInfo && resumeInfo.ACTIVE == 'Y'){
            const result = await recruitService.apply(recruitSeq, userSeq);
            if (result) {
                res.status(200).json({
                    result: 'success',
                    data: result
                });
            }
        }else {
            res.status(200).json({
                result: 'fail',
                data: null
            });        
        }
    },

    async cancelApply(req, res, next) {
        const recruitSeq = req.body.recruitSeq;
        const userSeq = req.body.userSeq;

        const result = await recruitService.cancelApply(recruitSeq, userSeq);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });        
        }
    },

    async getActiveCount(req, res, next) {
        const martSeq = req.body.martSeq;

        const result = await recruitService.getActiveCount(martSeq);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });        
        }
    },

    async getResumeCount(req, res, next) {
        const recruitSeq = req.body.seq;

        const result = await recruitService.getResumeCount(recruitSeq);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });        
        }
    },
    async setRead(req, res, next) {
        const recruitSeq = req.body.recruitSeq;
        const resumeSeq = req.body.resumeSeq;

        const result = await recruitService.setRead(recruitSeq, resumeSeq);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });        
        }
    },
    async setStep(req, res, next) {
        const recruitSeq = req.body.recruitSeq;
        const resumeSeq = req.body.resumeSeq;
        const step = req.body.step;

        const result = await recruitService.updateStep(recruitSeq, resumeSeq, step);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });        
        }
    },
    async getApply(req, res, next) {
        const recruitSeq = req.body.recruitSeq;
        const resumeSeq = req.body.resumeSeq;

        const result = await recruitService.getApply(recruitSeq, resumeSeq);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });        
        }
    }


}

