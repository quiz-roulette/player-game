import axios from 'axios';

class Server {

    static URL(){
        return "https://bcsechdularapp.azurewebsites.net";
    }
    
    static signin(username, password){
        return axios.post(Server.URL()+"/authenticate",{Username: username, Password: password});
    }

    static signup(username, password, email){
        return axios.post(Server.URL()+"/addUser",{Username: username, Password: password, Email: email});
    }

    static getAllSchedule(){
        return axios.get(Server.URL()+"/getallschedule");
    }
    
    static getScheduleByClient(clientPartner){
        return axios.get(Server.URL()+"/getschedulebyclientpartner?clientpartner="+clientPartner);
    }

    static getScheduleById(id){
        return axios.get(Server.URL()+"/getschedulebyid?id="+id);
    }

    static addSchedule(schedule){
        return axios.post(Server.URL()+"/addschedule",schedule);
    }

    static updateSchedule(schedule){
        return axios.post(Server.URL()+"/updateschedule",schedule);
    }

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