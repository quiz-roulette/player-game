import axios from 'axios';

class Server {

    static AxiosInstance(){
        return axios.create({
            //baseURL: 'https://digitaltrackerserver.azurewebsites.net',
            baseURL: "https://axperienceapp.azurewebsites.net/api",
            headers: { 
                "Access-Control-Allow-Origin" : "*"
            },
            mode: 'no-cors'});
    }

    static URL() {
        return "";
    }
    
    static signin(username, password){
        return Server.AxiosInstance().get(Server.URL()+ '/authenticate?userId=' + username + '&userPassword=' + password);
    }

    static assignUserToGroup(groupname, userid) {
        // console.log({ GName: groupname, UserId: userid });
        return Server.AxiosInstance().post(Server.URL()+'api/quizusergroup_join', { GName: groupname, UserId: userid });
    }

    static signup(username, password){
        return Server.AxiosInstance().post(Server.URL()+"/addFrontEndQuizUser",{QuizUserId: username, Password: password});
    }

    static getAvatars(){
        return Server.AxiosInstance().get(Server.URL()+'/avatar');
    }

    static getQuizUserSummary(userid){
        return Server.AxiosInstance().get(Server.URL()+'/QuizUserSummary?QuizUserId='+userid);
    }

    static getQuizUserAvatar(userid){
        return Server.AxiosInstance().get(Server.URL()+'/getQuizUserAvatar?QuizUserId='+userid);
    }

    static getQuizList(){
        return Server.AxiosInstance().get(Server.URL()+'/quiz');
    }

    static getQuizListWithEnded(){
        return Server.AxiosInstance().get(Server.URL()+'/getAllQuizWithEnded');
    }

    static getQuizByGroupByUserId(userid){
        return Server.AxiosInstance().get(Server.URL()+'/quizbygroup?userid='+userid);
    }

    static getQuizById(id){
        var x = Server.AxiosInstance().get(Server.URL()+'/question?userid='+id);
        var y = Server.AxiosInstance().get(Server.URL()+'/choice');
        var z = Server.AxiosInstance().get(Server.URL()+'/correctchoice');
        return Promise.all([x, y, z]);
    }

    static getQuizByUserIdAndQuizId(userid,quizid){
        var x = Server.AxiosInstance().get(Server.URL()+'/question?userid='+userid+'&quizid='+quizid);
        var y = Server.AxiosInstance().get(Server.URL()+'/choice');
        var z = Server.AxiosInstance().get(Server.URL()+'/correctchoice');
        return Promise.all([x, y, z]);
    }

    static getQuizLogSummationForUserByQuiz(userid,quizid){
        return Server.AxiosInstance().get(Server.URL()+'/getQuizLogSummationForUserByQuiz?quizid='+quizid+'&userid='+userid);
    }

    static addQuizLog(quizlog){
        return Server.AxiosInstance().post(Server.URL()+'/quizlog',quizlog);
    }

    static getQuizLog(quizId){
        return Server.AxiosInstance().get(Server.URL()+'/quizlog?QuizId='+quizId);
    }

    static getQuizLogByUserId(quizId,userid){
        return Server.AxiosInstance().get(Server.URL()+'/quizlog?QuizId='+quizId+'&QuizUserId='+userid);
    }

    static getQuestionCountForQuiz(quizId){
        return Server.AxiosInstance().get(Server.URL()+'/getQuestionCountForQuiz?QuizId='+quizId);
    }

    static updateUserScore(quizId,userId){}

    //At the moment it only updates avatar
    static updateUserAvatar(userId, avatarImage){
        return Server.AxiosInstance().patch(Server.URL()+'/quizuser',{QuizUserId: userId, Avatar: avatarImage})
    }

    static sendReport(id){
        return Server.AxiosInstance().get(Server.URL()+"/sendreport/"+id);
    }
    static getAccountByName(id){
        return Server.AxiosInstance().get(Server.URL()+"/forgetPassword/"+id);
    }
    static ResetAccountPassword(password,code){
        return Server.AxiosInstance().post(Server.URL()+"/resetPassword",{Password: password, Code: code});
    }

    static getQuizOnMonth(){
        return new Promise((resolve,reject) =>{
            resolve({data: [{Month: 1, Count: 2},{Month: 2, Count: 3},{Month: 3, Count: 3},{Month: 4, Count: 2},{Month: 5,Count: 3},{Month: 6,Count: 2},{Month: 7,Count: 4}]})

        })
    }
    
    static getTotalQuizCount(){
        return new Promise((resolve,reject) =>{
            resolve({data: 19})
        })
    }
    
    static getUserOnMonth(){
        return new Promise((resolve,reject) =>{
            resolve({data: [{Month: 1, Count: 20},{Month: 2, Count: 25},{Month: 3, Count: 23},{Month: 4, Count: 19},{Month: 5,Count: 20},{Month: 6,Count: 25},{Month: 7,Count: 27}]})
        })
    }

    static getTotalUserCount(){
        return new Promise((resolve,reject) =>{
            resolve({data: 159})
        })
    }

    static getRandomFact(){
        return Server.AxiosInstance().get(Server.URL()+"/getRandomFact");
    }

    static getBlank(){
        return Server.AxiosInstance().get(Server.URL()+"/blank");
    }

    static addOneTimeQuizUser(username,token){
        return Server.AxiosInstance().post(Server.URL()+ '/quiz_token',{QuizUserId: username, Token: token});
    }

    static getOneTimeQuiz(id){
        return Server.AxiosInstance().get(Server.URL()+ '/quiz_token?quizId='+id);
    }

    static getQuizUserRank(quizid, quizuserId){
        return Server.AxiosInstance().get(Server.URL()+ '/GetQuizUserRank?quizid='+quizid+'&quizuserid='+quizuserId);
    }
}

export default Server;