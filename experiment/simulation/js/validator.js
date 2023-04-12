import { clearResult, nodes} from "./node.js";

"use strict";

function errorMessageGeneral(msg){
    var alertmodal = document.getElementById("alertmodal1");
    alertmodal.innerText = "";
    alertmodal.style.display = "none";
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
    alertmodal = document.getElementById("alertmodal2");
    alertmodal.innerText = msg;
    alertmodal.style.display = "block";
    console.log("Failed");
}

function checkConstraints(adjlist, key, values, isCorrect, splFlag = 0){
    if(isCorrect == false)return isCorrect;
    // Changed for Inference
    // key = key.toUpperCase();
    if(splFlag == 1){
        if((key in adjlist)){
            errorMessageGeneral(`${key} is redundant variable shoudnt be there in the playground, please check hints and recheck your answers`);
            return false;
        }
        else return isCorrect;
    }

    if(!(key in adjlist)){
        console.log(key);
        console.log(adjlist);
        errorMessageGeneral(`${key} is not connected, please check hints`);
        return false;
    }
    if(adjlist[key].parents.length == values.length){
        let temp = [];
        // console.log(adjlist[key].parents);
        for(let i of adjlist[key].parents){
            temp.push(i.name.toLowerCase());
        }
        for(let i of values){
            if(temp.includes(i)===false){
                errorMessageGeneral(`In the current scenario, ${i} is not a parent of ${key}, please check hints and recheck your answer`);
                return false;
            }
        }
    }   
    else{
        errorMessageGeneral(`Number of parents for ${key} doesnt match please check hints`);
        return false;
    } 
    return isCorrect;
}

function successMessageGeneral(){
    var alertmodal = document.getElementById("alertmodal2");
            alertmodal.innerText = "";
            alertmodal.style.display = "none";

            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            alertmodal = document.getElementById("alertmodal1");
            alertmodal.innerText = "The Bayesian Network is connected properly";
            alertmodal.style.display = "block";
            window.onclick = function(event) {
                if (event.target == modal) {
                  modal.style.display = "none";
                }
            }
            console.log("Sucesss");
}

export function domainValidator1() {
    let node_list = nodes;
    clearResult();
    // console.log(nodes)
    let isCorrect = true;
    let adjlist = {};
    let newdic = {};
    for(let [key, value] of Object.entries(node_list)){
        adjlist[value.name] = value;
    }
    let edges = {};
    let spcedges = {};
    if(window.currentTab === "Domain2"){
        edges = {"electricityfailure": [], "computermalfunction": [], "lightfailure": ["electricityfailure"], "computerfailure": ["electricityfailure", "computermalfunction"]};
        spcedges = {"india": [], "olympics": [], "earthquake": []}; 
    }
    else if(window.currentTab === "Domain1"){
        edges = {"alarm": ["earthquake", "burglary"], "earthquake": [], "burglary": [], "johncalls": ["alarm"], "marycalls": ["alarm"] };
        spcedges = {"india": [], "olympics": []}; 
    }
    else if(window.currentTab === "Domain3"){
        edges = {"examdifficulty": [], "iq": [], "score": ["iq", "examdifficulty"], "aptitudescore": ["iq"]};
        spcedges = {"worldcup": [], "hallticket": []}; 
    }
    else if(window.currentTab === "Domain4"){
        edges = {"windy": [], "cloudy": [], "rain": ["cloudy", "windy"], "match": ["rain"]};
        spcedges = {"worldcup": [], "hallticket": []}; 
    }
    else if(window.currentTab === "Domain5"){
        edges = {"yellowcard": [], "harshtackle": [], "redcard": ["yellowcard", "harshtackle"]};
        spcedges = {"worldcup": [], "hallticket": [], "bluecard": []}; 
    }
    
    // console.log(adjlist)
    for(let [key, value] of Object.entries(edges) ){
        isCorrect = checkConstraints(adjlist, key, value, isCorrect);
    } 
    for(let [key, value] of Object.entries(spcedges) ){
        isCorrect = checkConstraints(adjlist, key, value, isCorrect, 1);
    }
    
    const result = document.getElementById("result");

    if (isCorrect) {
        // successMessageGeneral();
        result.innerHTML = "<span>&#10003;</span> Success";
        result.className = "success-message";

        for(let [key, value] of Object.entries(adjlist)){
            const ele = document.getElementById(value.id);
            ele.onclick = function(event) {addCPT(event);};
        }
        const elel  = document.getElementById("finalbutton");
        elel.innerText = "Check";
        elel.onclick = function(){checkCPT();};
        let eeel;
        if(window.currentTab === "Domain1"){
            eeel = document.getElementById(adjlist["alarm"].id);
        }
        if(window.currentTab === "Domain2"){
            eeel = document.getElementById(adjlist["computerfailure"].id);
        }
        if(window.currentTab === "Domain3"){
            eeel = document.getElementById(adjlist["iq"].id);
        }
        if(window.currentTab === "Domain4"){
            eeel = document.getElementById(adjlist["cloudy"].id);
        }
        if(window.currentTab === "Domain5"){
            eeel = document.getElementById(adjlist["redcard"].id);
        }
        eeel.style.backgroundColor = "#FFA500";

        setTimeout(function () {result.innerHTML = "";}, 3000);
    } else {
        result.innerHTML = "<span>&#10007;</span> Fail";
        result.className = "failure-message";
        for(let [key, value] of Object.entries(adjlist)){
            const ele = document.getElementById(value.id);
            ele.onclick = function(event) {};
        }
        setTimeout(function () {result.innerHTML = "";}, 3000);
    }
}

function successMessageCPT(){
    var alertmodal = document.getElementById("alertmodal2");
            alertmodal.innerText = "";
            alertmodal.style.display = "none";

            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            alertmodal = document.getElementById("alertmodal1");
            alertmodal.innerText = "Your Answers are Valid!!";
            alertmodal.style.display = "block";
            window.onclick = function(event) {
                if (event.target == modal) {
                  modal.style.display = "none";
                }
            }
            console.log("Sucesss");
}

function errorMessageCPT(){
    var alertmodal = document.getElementById("alertmodal1");
    alertmodal.innerText = "";
    alertmodal.style.display = "none";
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
    alertmodal = document.getElementById("alertmodal2");
    alertmodal.innerText = "Your Answers are incorrect!!!";
    alertmodal.style.display = "block";
    console.log("Failed");
}

function calcContribution(tem, edges, tagname){
    let tttem =1;
    for(let key in tagname){
        // console.log(key)
        let curnum = ""
        for(let par in edges[key]){
            curnum = curnum + (tem[tagname[edges[key][par]]]).toString();
        }
        curnum = curnum + "1";
        curnum = key + curnum;
        // console.log(curnum);
        const el = document.getElementById(curnum);
        let vl = parseFloat(el.innerText);
        // console.log(vl);
        if(tem[tagname[key]] == 0){
            vl= 1-vl;
        }
        tttem = tttem*vl;
    }
    return tttem;
}

function checkAnswers(question1, tagname, edges, pos){
    let n = Object.keys(tagname).length;
    // console.log(n)
    // let question1 = [1, "*", "*", 1, 1];
    // let tagname = {"burglary": 0, "alarm": 1, "earthquake": 2, "marycalls": 3, "johncalls": 4};
    for(let key in tagname){
        addCPT([], 1, key);
    }
    // let edges = {"alarm": ["burglary", "earthquake"], "earthquake": [], "burglary": [], "johncalls": ["alarm"], "marycalls": ["alarm"] };
    let numerator = 0;
    for(let i=0;i<Math.pow(2, n);i++){
        let tem = [];
        let ji = i;
        for(let j=0;j<n;j++){
            tem.push(ji%2);
            if(ji%2==1){
                ji = ji - 1;
            }
            ji=ji/2;
        }
        // console.log(tem);
        let fl = 1;
        for(let j=0;j<n;j++){
            if(question1[j] != "*"){
                if(tem[j] != question1[j]){
                    fl= 0;
                }
            }
        }
        if(fl==1){
            // console.log(tem);
            numerator = numerator + calcContribution(tem, edges, tagname);
        }
    }
    // console.log(numerator)
    let denominator = numerator;
    question1[pos] = 1 - question1[pos]
    // question1 = [0, "*", "*", 1, 1];
    for(let i=0;i<Math.pow(2, n);i++){
        let tem = [];
        let ji = i;
        for(let j=0;j<n;j++){
            tem.push(ji%2);
            if(ji%2==1){
                ji = ji - 1;
            }
            ji=ji/2;
        }
        // console.log(tem);
        let fl = 1;
        for(let j=0;j<n;j++){
            if(question1[j] != "*"){
                if(tem[j] != question1[j]){
                    fl= 0;
                }
            }
        }
        if(fl==1){
            // console.log(calcContribution(tem, edges, tagname));
            numerator = numerator + calcContribution(tem, edges, tagname);
        }
    }
    let ansQn = denominator/numerator;
    // console.log(ansQn)
    return ansQn.toFixed(3);
    // console.log(denominator/numerator)
}

function aretheycorrect(ans1, ans2){
    const el = document.getElementById("ans1");
        const vl = parseFloat(el.innerText);
        const el2 = document.getElementById("ans2");
        const vl2 = parseFloat(el2.innerText);
        
        if(vl == ans1 && vl2 == ans2){
            successMessageCPT();
        }
        else{
            // console.log(vl===ans1);
            // console.log(vl2);
            errorMessageCPT();
        }
}

export function checkCPT(){

    if(window.currentTab == "Domain1" ){

        let question1 = [1, "*", "*", 1, 1];
        let tagname = {"burglary": 0, "alarm": 1, "earthquake": 2, "marycalls": 3, "johncalls": 4};
        let edges = {"alarm": ["burglary", "earthquake"], "earthquake": [], "burglary": [], "johncalls": ["alarm"], "marycalls": ["alarm"] };
        let ans1 = checkAnswers(question1, tagname, edges, 0);
        console.log(ans1);

        let question2 = ["*", 1, 1, 1, "*"];
        let ans2 = checkAnswers(question2, tagname, edges, 2);
        console.log(ans2);
        aretheycorrect(ans1, ans2);
    }
    else if(window.currentTab == "Domain2"){
        let edges = {"electricityfailure": [], "computermalfunction": [], "lightfailure": ["electricityfailure"], "computerfailure": ["electricityfailure", "computermalfunction"]};
        let tagname = {"electricityfailure": 0, "computermalfunction": 1, "lightfailure": 2, "computerfailure": 3};
        let question1 = ["*", "*" , 1, 1];
        let question2 = ["*", 1, 1, 1];
        let ans1 = checkAnswers(question1, tagname, edges, 3);
        let ans2 = checkAnswers(question2, tagname, edges, 1);
        console.log(ans1);
        console.log(ans2);
        aretheycorrect(ans1, ans2);
    }
    else if(window.currentTab == "Domain3"){
        let edges = {"examdifficulty": [], "iq": [], "score": ["examdifficulty", "iq"], "aptitudescore": ["iq"]};
        let tagname = {"examdifficulty": 0, "iq": 1, "score": 2, "aptitudescore": 3};
        let question1 = ["*", 1, 0, "*"];
        let question2 = ["*", 0, 1, 1];
        let ans1 = checkAnswers(question1, tagname, edges, 1);
        let ans2 = checkAnswers(question2, tagname, edges, 3);
        console.log(ans1);
        console.log(ans2);
        aretheycorrect(ans1, ans2);

    }
    else if(window.currentTab == "Domain4"){
        let edges = {"windy": [], "cloudy": [], "rain": ["windy", "cloudy"], "match": ["rain"]};
        let tagname = {"windy": 0, "cloudy": 1, "rain": 2, "match": 3};
        let question1 = [1,1,1,"*"];
        let question2 = [1, "*", "*", 1]
        let ans1 = checkAnswers(question1, tagname, edges, 2);
        let ans2 = checkAnswers(question2, tagname, edges, 3);
        console.log(ans1);
        console.log(ans2);
        aretheycorrect(ans1, ans2);

    }
    else if(window.currentTab == "Domain5"){
        let edges = {"yellowcard": [], "harshtackle": [], "redcard": ["harshtackle", "yellowcard"]};
        let tagname = {"yellowcard": 0, "harshtackle":1, "redcard": 2};
        let question1 = [1, "*", 1]
        let question2 = [1, 1,1 ]
        let ans1 = checkAnswers(question1, tagname, edges, 2);
        let ans2 = checkAnswers(question2, tagname, edges, 1);
        console.log(ans1);
        console.log(ans2);
        aretheycorrect(ans1, ans2);



    }
}

export function domainValidator2() {
    let node_list = nodes;
    clearResult();
    let isCorrect = true;
    let adjlist = {};
    let newdic = {};
    for(let [key, value] of Object.entries(node_list)){
        adjlist[value.name] = value;
    }
    isCorrect = checkConstraints(adjlist, "electricityfailure", [], isCorrect);
    isCorrect = checkConstraints(adjlist, "computermalfunction", [], isCorrect);
    isCorrect = checkConstraints(adjlist, "lightfailure", ["electricityfailure"], isCorrect);
    isCorrect = checkConstraints(adjlist, "computerfailure", ["electricityfailure", "computermalfunction"], isCorrect);
    isCorrect = checkConstraints(adjlist, "earthquake", [], isCorrect, 1);
    isCorrect = checkConstraints(adjlist, "india", [], isCorrect, 1);
    isCorrect = checkConstraints(adjlist, "olympics", [], isCorrect, 1);

    const result = document.getElementById("result");

    if (isCorrect) {
        result.innerHTML = "<span>&#10003;</span> Success";
        result.className = "success-message";
        setTimeout(function () {result.innerHTML = "";}, 3000);
    } else {
        result.innerHTML = "<span>&#10007;</span> Fail";
        result.className = "failure-message";
        setTimeout(function () {result.innerHTML = "";}, 3000);
    }
}