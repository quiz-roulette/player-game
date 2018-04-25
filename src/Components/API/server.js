import axios from 'axios';

class Server {
    constructor(){
        var serverUrl = "https://bcsechdularapp.azurewebsites.net";
    }
    
    static signin(username, password){
        return axios.post("https://bcsechdularapp.azurewebsites.net"+"/authenticate",{Username: username, Password: password});
    }

    static signup(username, password, email){
        return axios.post("https://bcsechdularapp.azurewebsites.net"+"/addUser",{Username: username, Password: password, Email: email});
    }

    static getAllSchedule(){
        return axios.get("https://bcsechdularapp.azurewebsites.net"+"/getallschedule");
    }
    
    static getScheduleByClient(clientPartner){
        return axios.get("https://bcsechdularapp.azurewebsites.net"+"/getschedulebyclientpartner?clientpartner="+clientPartner);
    }

    static getScheduleById(id){
        return axios.get("https://bcsechdularapp.azurewebsites.net"+"/getschedulebyid?id="+id);
    }

    static addSchedule(schedule){
        return axios.post("https://bcsechdularapp.azurewebsites.net"+"/addschedule",schedule);
    }

    static updateSchedule(schedule){
        return axios.post("https://bcsechdularapp.azurewebsites.net"+"/updateschedule",schedule);
    }

    static sendReport(id){
        return axios.get("https://bcsechdularapp.azurewebsites.net"+"/sendreport/"+id);
    }
}

export default Server;