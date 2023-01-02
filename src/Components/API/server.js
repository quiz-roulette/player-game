import axios from 'axios';

const avatarsPath = process.env.PUBLIC_URL + '/avatars/';

const avatars = [
    {
        "AvatarName": "Bee",
        "Image": "https://axperienceapp.azurewebsites.net/avatar/bee",
        "LocalUrl":avatarsPath+"bee.gif"
    },
    {
        "AvatarName": "Bird",
        "Image": "https://axperienceapp.azurewebsites.net/avatar/bird",
        "LocalUrl":avatarsPath+"bird.gif"
    },
    {
        "AvatarName": "Chameleon",
        "Image": "https://axperienceapp.azurewebsites.net/avatar/crocodile",
        "LocalUrl":avatarsPath+"crocodile.gif"
    },
    {
        "AvatarName": "Climb",
        "Image": "https://axperienceapp.azurewebsites.net/avatar/climb",
        "LocalUrl":avatarsPath+"climb.gif"
    },
    {
        "AvatarName": "fox",
        "Image": "https://axperienceapp.azurewebsites.net/avatar/fox",
        "LocalUrl":avatarsPath+"fox.gif"
    },
    {
        "AvatarName": "Horse",
        "Image": "https://axperienceapp.azurewebsites.net/avatar/horsenew",
        "LocalUrl":avatarsPath+"horsenew.gif"
    },
    {
        "AvatarName": "Marker",
        "Image": "https://axperienceapp.azurewebsites.net/avatar/marker",
        "LocalUrl":avatarsPath+"marker.gif"
    },
    {
        "AvatarName": "Walk",
        "Image": "https://axperienceapp.azurewebsites.net/avatar/walk",
        "LocalUrl":avatarsPath+"walk.gif"
    },
    {
        "AvatarName": "WUQ",
        "Image": "https://axperienceapp.azurewebsites.net/avatar/wuq",
        "LocalUrl":avatarsPath+"wuq.gif"
    }
];

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

    static AnotherAxiosInstance(){
        return axios.create({
            //baseURL: 'https://digitaltrackerserver.azurewebsites.net',
            baseURL: process.env.REACT_APP_LEGACY_SERVICE_URL,
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

    static addSIMQuizUser(name, simid, clubname,token){
        console.log({Name: name, SIMID: simid, ClubName: clubname, Token: token });
        return Server.AxiosInstance().post(Server.URL()+"/addSIMQuizUser",{Name: name, SIMID: simid, ClubName: clubname, Token: token });
    }

    static getAvatars(){
        return new Promise((resolve, reject) => {
            console.log(avatars);
            //sending similiar to what Azure will send
            var obj = {
                data: avatars
            }
            resolve(obj);
        })
    }

    static getQuizUserSummary(userid){
        return Server.AxiosInstance().get(Server.URL()+'/QuizUserSummary?QuizUserId='+userid);
    }

    static getQuizUserAvatar(userid){
        return Server.AnotherAxiosInstance().get(Server.URL()+'/getQuizUserAvatar?QuizUserId='+userid);
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
        var x = Server.AnotherAxiosInstance().get(Server.URL()+'/question?userid='+id);
        var y = Server.AnotherAxiosInstance().get(Server.URL()+'/choice');
        var z = Server.AnotherAxiosInstance().get(Server.URL()+'/correctchoice');
        return Promise.all([x, y, z]);
    }

    static getQuizByUserIdAndQuizId(userid,quizid){
        var x = Server.AnotherAxiosInstance().get(Server.URL()+'/question?userid='+userid+'&quizid='+quizid);
        var y = Server.AnotherAxiosInstance().get(Server.URL()+'/choice');
        var z = Server.AnotherAxiosInstance().get(Server.URL()+'/correctchoice');
        return Promise.all([x, y, z]);
    }

    static getQuizLogSummationForUserByQuiz(userid,quizid){
        return Server.AnotherAxiosInstance().get(Server.URL()+'/getQuizLogSummationForUserByQuiz?quizid='+quizid+'&userid='+userid);
    }

    static addQuizLog(quizlog){
        console.log("quizlog >>> ", quizlog)
        return Server.AnotherAxiosInstance().post(Server.URL()+'/quizlog',quizlog);
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
        return Server.AnotherAxiosInstance().patch(Server.URL()+'/quizuser',{QuizUserId: userId, Avatar: avatarImage})
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
        return Server.AnotherAxiosInstance().get(Server.URL()+"/getRandomFact");
    }

    static getBlank(){
        return Server.AxiosInstance().get(Server.URL()+"/blank");
    }

    static addOneTimeQuizUser(username,token){
        var badwordregex = /\b(4r5e|5h1t|5hit|a55|anal|anus|ar5e|arrse|arse|ass|ass-fucker|asses|assfucker|assfukka|asshole|assholes|asswhole|a_s_s|b!tch|b00bs|b17ch|b1tch|ballbag|balls|ballsack|bastard|beastial|beastiality|bellend|bestial|bestiality|bi\+ch|biatch|bitch|bitcher|bitchers|bitches|bitchin|bitching|bloody|blow job|blowjob|blowjobs|boiolas|bollock|bollok|boner|boob|boobs|booobs|boooobs|booooobs|booooooobs|breasts|buceta|bugger|bum|bunny fucker|butt|butthole|buttmuch|buttplug|c0ck|c0cksucker|carpet muncher|cawk|chink|cipa|cl1t|clit|clitoris|clits|cnut|cock|cock-sucker|cockface|cockhead|cockmunch|cockmuncher|cocks|cocksuck|cocksucked|cocksucker|cocksucking|cocksucks|cocksuka|cocksukka|cok|cokmuncher|coksucka|coon|cox|crap|cum|cummer|cumming|cums|cumshot|cunilingus|cunillingus|cunnilingus|cunt|cuntlick|cuntlicker|cuntlicking|cunts|cyalis|cyberfuc|cyberfuck|cyberfucked|cyberfucker|cyberfuckers|cyberfucking|d1ck|damn|dick|dickhead|dildo|dildos|dink|dinks|dirsa|dlck|dog-fucker|doggin|dogging|donkeyribber|doosh|duche|dyke|ejaculate|ejaculated|ejaculates|ejaculating|ejaculatings|ejaculation|ejakulate|f u c k|f u c k e r|f4nny|fag|fagging|faggitt|faggot|faggs|fagot|fagots|fags|fanny|fannyflaps|fannyfucker|fanyy|fatass|fcuk|fcuker|fcuking|feck|fecker|felching|fellate|fellatio|fingerfuck|fingerfucked|fingerfucker|fingerfuckers|fingerfucking|fingerfucks|fistfuck|fistfucked|fistfucker|fistfuckers|fistfucking|fistfuckings|fistfucks|flange|fook|fooker|fuck|fucka|fucked|fucker|fuckers|fuckhead|fuckheads|fuckin|fucking|fuckings|fuckingshitmotherfucker|fuckme|fucks|fuckwhit|fuckwit|fudge packer|fudgepacker|fuk|fuker|fukker|fukkin|fuks|fukwhit|fukwit|fux|fux0r|f_u_c_k|gangbang|gangbanged|gangbangs|gaylord|gaysex|goatse|God|god-dam|god-damned|goddamn|goddamned|hardcoresex|hell|heshe|hoar|hoare|hoer|homo|hore|horniest|horny|hotsex|jack-off|jackoff|jap|jerk-off|jism|jiz|jizm|jizz|kawk|knob|knobead|knobed|knobend|knobhead|knobjocky|knobjokey|kock|kondum|kondums|kum|kummer|kumming|kums|kunilingus|l3i\+ch|l3itch|labia|lust|lusting|m0f0|m0fo|m45terbate|ma5terb8|ma5terbate|masochist|master-bate|masterb8|masterbat*|masterbat3|masterbate|masterbation|masterbations|masturbate|mo-fo|mof0|mofo|mothafuck|mothafucka|mothafuckas|mothafuckaz|mothafucked|mothafucker|mothafuckers|mothafuckin|mothafucking|mothafuckings|mothafucks|mother fucker|motherfuck|motherfucked|motherfucker|motherfuckers|motherfuckin|motherfucking|motherfuckings|motherfuckka|motherfucks|muff|mutha|muthafecker|muthafuckker|muther|mutherfucker|n1gga|n1gger|nazi|nigg3r|nigg4h|nigga|niggah|niggas|niggaz|nigger|niggers|nob|nob jokey|nobhead|nobjocky|nobjokey|numbnuts|nutsack|orgasim|orgasims|orgasm|orgasms|p0rn|pawn|pecker|penis|penisfucker|phonesex|phuck|phuk|phuked|phuking|phukked|phukking|phuks|phuq|pigfucker|pimpis|piss|pissed|pisser|pissers|pisses|pissflaps|pissin|pissing|pissoff|poop|porn|porno|pornography|pornos|prick|pricks|pron|pube|pusse|pussi|pussies|pussy|pussys|rectum|retard|rimjaw|rimming|s hit|s.o.b.|sadist|schlong|screwing|scroat|scrote|scrotum|semen|sex|sh!\+|sh!t|sh1t|shag|shagger|shaggin|shagging|shemale|shi\+|shit|shitdick|shite|shited|shitey|shitfuck|shitfull|shithead|shiting|shitings|shits|shitted|shitter|shitters|shitting|shittings|shitty|skank|slut|sluts|smegma|smut|snatch|son-of-a-bitch|spac|spunk|s_h_i_t|t1tt1e5|t1tties|teets|teez|testical|testicle|tit|titfuck|tits|titt|tittie5|tittiefucker|titties|tittyfuck|tittywank|titwank|tosser|turd|tw4t|twat|twathead|twatty|twunt|twunter|v14gra|v1gra|vagina|viagra|vulva|w00se|wang|wank|wanker|wanky|whoar|whore|willies|willy|xrated|xxx)\b/gi;
        if(badwordregex.test(username)){
            throw "Username not available"
        }
        return Server.AnotherAxiosInstance().post(Server.URL()+ '/quiz_token',{QuizUserId: username, Token: token});
    }

    static getOneTimeQuiz(id){
        return Server.AnotherAxiosInstance().get(Server.URL()+ '/quiz_token?quizId='+id);
    }

    static getQuizUserRank(quizid, quizuserId){
        return Server.AnotherAxiosInstance().get(Server.URL()+ '/GetQuizUserRank?quizid='+quizid+'&quizuserid='+quizuserId);
    }

    static getPublicQuiz(){
        return Server.AxiosInstance().get(Server.URL()+ '/getPublicQuiz');
    }
}

export default Server;