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

    static getQuizById(id){
        var x = axios.get(Server.URL()+'/question');
        var y = axios.get(Server.URL()+'/choice');
        var z = axios.get(Server.URL()+'/correctchoice');
        return Promise.all([x, y, z]);
    }

    static addQuizLog(quizlog){
        return axios.post(Server.URL()+'/quizlog',quizlog);
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
}

export default Server;