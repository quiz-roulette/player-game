import axios from 'axios';

class Server {

    static URL(){
        return "https://axperienceapp.azurewebsites.net/api";
    }
    
    static signin(username, password){
        return axios.get(Server.URL()+ '/authenticate?userId=' + username + '&userPassword=' + password);
    }

    static signup(username, password, email){
        return axios.post(Server.URL()+"/addUser",{Username: username, Password: password, Email: email});
    }

    static getAvatars(){
        return axios.get(Server.URL()+'/avatar');
    }

    static getQuizList(){
        return axios.get(Server.URL()+'/quiz');
    }

    static getQuizListWithEnded(){
        return axios.get(Server.URL()+'/getAllQuizWithEnded');
    }

    static getQuizByGroupByUserId(userid){
        return axios.get(Server.URL()+'/quizbygroup?userid='+userid);
    }

    static getQuizById(id){
        var x = axios.get(Server.URL()+'/question?userid='+id);
        var y = axios.get(Server.URL()+'/choice');
        var z = axios.get(Server.URL()+'/correctchoice');
        return Promise.all([x, y, z]);
    }

    static getQuizByUserIdAndQuizId(userid,quizid){
        var x = axios.get(Server.URL()+'/question?userid='+userid+'&quizid='+quizid);
        var y = axios.get(Server.URL()+'/choice');
        var z = axios.get(Server.URL()+'/correctchoice');
        return Promise.all([x, y, z]);
    }

    static getQuizLogSummationForUserByQuiz(userid,quizid){
        return axios.get(Server.URL()+'/getQuizLogSummationForUserByQuiz?quizid='+quizid+'&userid='+userid);
    }

    static addQuizLog(quizlog){
        return axios.post(Server.URL()+'/quizlog',quizlog);
    }

    static getQuizLog(quizId){
        return axios.get(Server.URL()+'/quizlog?QuizId='+quizId);
    }

    static getQuizLogByUserId(quizId,userid){
        return axios.get(Server.URL()+'/quizlog?QuizId='+quizId+'&QuizUserId='+userid);
    }

    static getQuestionCountForQuiz(quizId){
        return axios.get(Server.URL()+'/getQuestionCountForQuiz?QuizId='+quizId);
    }

    static updateUserScore(quizId,userId){}

    static updateUser(user){}

    static sendReport(id){
        return axios.get(Server.URL()+"/sendreport/"+id);
    }
    static getAccountByName(id){
        return axios.get(Server.URL()+"/forgetPassword/"+id);
    }
    static ResetAccountPassword(password,code){
        return axios.post(Server.URL()+"/resetPassword",{Password: password, Code: code});
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
}

export default Server;