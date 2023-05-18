//Your JavaScript goes in here
import { deleteElement, Node, nodes } from "./node.js";
"use strict";
import {
    connectNode,
    unbindEvent,
    refreshWorkingArea,
    connectEdge,
} from "./main.js";
import { domainValidator1, domainValidator2, checkCPT } from "./validator.js";

export const wireColours = "#ff0000";
const menu = document.querySelector(".menu");
const menuOption = document.querySelector(".menu-option");
let allTimeOuts = [];

export const setPosition = ({ top, left }) => {
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
    menu.style.display = "block";
};

window.addEventListener("click", e => {
    if (menu.style.display != "none")
    {
      menu.style.display = "none";
    }
    window.selectedComponent = null;
    window.componentType = null;
});

menuOption.addEventListener("click", e => {
    
  // Changed for inference

  // if (e.target.innerHTML === "Delete") {
    //   if (window.componentType === "node") {
    //     deleteElement(window.selectedComponent);
    //   }
    // }
    window.selectedComponent = null;
    window.componentType = null;
});

export function changeTabs(e) {
    const task = e.target.parentNode.id;
    if (window.currentTab === task) {
        return;
    }
    if (window.currentTab != null) {
        document.getElementById(window.currentTab).classList.remove("is-active");
    }
    window.currentTab = task;
    document.getElementById(task).classList.add("is-active");
    var path = window.location.pathname;
    var page = path.split("/").pop(); 
    // console.log( page );
    unbindEvent();
    connectNode();
    refreshWorkingArea();
    // Changed for Inference
    // updateToolbar();marycmarycallsalls
    updateHints();
    updateQuestion();
    updateInstructions();
    if(page == "simulation.html")
    clearSolution();
    updateWorkingArea();
    clearObservations();
    resize();
}


window.changeTabs = changeTabs;

function clearSolution(){
  for(let i in allTimeOuts){
    clearTimeout(allTimeOuts[i])
    // console.log(i)
  }
  allTimeOuts = []
  document.getElementById("solutionid").style.fontSize = "small";
  document.getElementById("solutionid").innerHTML = "";
}

export const updateWorkingArea = () => {
    const task = window.currentTab;
    let namelist = []
    let cordinatelist = []
    // console.log("HI")
    // console.log(task)
    let nodeslist = []
    if(task === "Domain1"){
      namelist = ["alarm", "earthquake", "burglary", "johncalls", "marycalls"]
      cordinatelist = [[40, 40], [15, 15], [60, 15], [60, 60], [15, 60]];

    }
    else if (task === "Domain2"){
      namelist = ["electricityfailure", "computermalfunction", "lightfailure", "computerfailure"];
      cordinatelist = [[10, 10], [30, 30], [60, 60], [20, 80]];
    }
    else if (task === "Domain3"){
      namelist = ["examdifficulty", "iq", "score", "aptitudescore"];
      cordinatelist = [[15, 20], [80, 20], [60, 70], [20, 60]];
    }
    else if (task === "Domain4"){
      namelist = ["windy", "cloudy", "rain", "match"];
      cordinatelist = [[15, 20], [60, 20], [30, 50], [50, 70]];
    }
    else if (task === "Domain5"){
      namelist = ["yellowcard", "harshtackle", "redcard"]
      cordinatelist = [[15, 20], [60, 20], [40, 60]];
    }
    
    for(let i=0;i < namelist.length; i++){
      const node = new Node(namelist[i]);
      const component = node.generateComponent();
      // console.log("Onit")
      const wa = document.getElementById("working-area");
      // console.log(wa)
      wa.insertAdjacentHTML("beforeend", component);
      node.registerComponent("working-area", cordinatelist[i][0], cordinatelist[i][1]);
      nodeslist.push(node);
    }
    // console.log(nodeslist)
    let edgeslist = []
    if(task === "Domain1"){
      edgeslist = [ [1, 0], [2, 0], [0, 3], [0, 4] ];
    }
    else if (task === "Domain2"){
      edgeslist = [[0,2], [0,3], [1,3]];
    }
    else if (task === "Domain3"){
      edgeslist = [[1,2], [1,3], [0,2]];
    }
    else if (task === "Domain4"){
      edgeslist = [[0,2], [1,2], [2,3]];
    }
    else{
      edgeslist = [[0,2], [1,2]]
    }
    for(let i = 0; i<edgeslist.length; i++){
      connectEdge(nodeslist, edgeslist[i][0], edgeslist[i][1])
    }
    domainValidator1();
}

const updateSimQuestion = () => {
  const task = window.currentTab;
  let qn = ``
  if (task === "Domain1"){
    qn = `<table class="table is-bordered is-fullwidth">
    <thead id="table-head">
        <tr>
          <th colspan="1">Question</th>
          <th colspan="1">Enter Probability</th>
        </tr>
    </thead>
    <tbody id="table-body">
        <tr>
          <td>Find the probability of Burglary given that both mary and john call?</td>
          <td id="ans1" contenteditable="true">?</td>
        </tr>
    </tbody>
</table>`
  }
  else if(task === "Domain2"){
    qn = `<table class="table is-bordered is-fullwidth">
    <thead id="table-head">
        <tr>
          <th colspan="1">Question</th>
          <th colspan="1">Enter Probability</th>
        </tr>
    </thead>
    <tbody id="table-body">
        <tr>
          <td>Find the probability of computerfailure given there is light failure?</td>
          <td id="ans1" contenteditable="true">?</td>
        </tr>
    </tbody>
</table>`
  }
  else if(task  === "Domain3"){
    qn = `<table class="table is-bordered is-fullwidth">
    <thead id="table-head">
        <tr>
          <th colspan="1">Question</th>
          <th colspan="1">Enter Probability</th>
        </tr>
    </thead>
    <tbody id="table-body">
        <tr>
          <td>Find the probability of having high IQ if the score is low?</td>
          <td id="ans1" contenteditable="true">?</td>
        </tr>
    </tbody>
</table>`
  }
  else if(task === "Domain4"){
    qn = `<table class="table is-bordered is-fullwidth">
    <thead id="table-head">
        <tr>
          <th colspan="1">Question</th>
          <th colspan="1">Enter Probability</th>
        </tr>
    </thead>
    <tbody id="table-body">
        <tr>
          <td>Find the probability of rain if the weather is cloudy and windy?</td>
          <td id="ans1" contenteditable="true">?</td>
        </tr>
    </tbody>
</table>`
  }
  else{
    qn = `<table class="table is-bordered is-fullwidth">
    <thead id="table-head">
        <tr>
          <th colspan="1">Question</th>
          <th colspan="1">Enter Probability</th>
        </tr>
    </thead>
    <tbody id="table-body">
        <tr>
          <td>Find the probability of having red card if a yellow card is given?</td>
          <td id="ans1" contenteditable="true">?</td>
        </tr>
    </tbody>
</table>`
  }
  return qn;
}


const updateQuestion = () => {
  const task = window.currentTab;
  const questiontab = document.getElementById("displayqn");
  var path = window.location.pathname;
  var page = path.split("/").pop();
  // console.log( page );
  let qn = "";
  if(page == "simulation.html"){
    qn = updateSimQuestion()
    questiontab.innerHTML = qn
    return
  }

  if (task === "Domain1"){
    qn = `<table class="table is-bordered is-fullwidth">
    <thead id="table-head">
        <tr>
          <th colspan="1">Question</th>
          <th colspan="1">Enter Probability</th>
        </tr>
    </thead>
    <tbody id="table-body">
        <tr>
          <td>Find the probability of Burglary given that both mary and john call?</td>
          <td id="ans1" contenteditable="true">?</td>
        </tr>
<tr>
          <td>Find the probability of Earthquake given that Mary calls and there is an alarm?</td>
          <td id="ans2" contenteditable="true">?</td>
        </tr>
        <tr>
        <td>Find the probability of Johncalls given that both Marycalls and earthquake occurs?</td>
        <td id="ans3" contenteditable="true">?</td>
      </tr>
      <tr>
      <td>Find the probability of Johncalls given that both Marycalls and earthquake occurs and alarm rings?</td>
      <td id="ans4" contenteditable="true">?</td>
    </tr>
    </tbody>
</table>`
  }
  else if(task === "Domain2"){
    qn = `<table class="table is-bordered is-fullwidth">
    <thead id="table-head">
        <tr>
          <th colspan="1">Question</th>
          <th colspan="1">Enter Probability</th>
        </tr>
    </thead>
    <tbody id="table-body">
        <tr>
          <td>Find the probability of computerfailure given there is light failure?</td>
          <td id="ans1" contenteditable="true">?</td>
        </tr>
<tr>
          <td>Find the probability of computermalfunction given that there is computer failiure and light failure?</td>
          <td id="ans2" contenteditable="true">?</td>
        </tr>
        <tr>
          <td>Find the probability of computerfailure given there is no light failure?</td>
          <td id="ans3" contenteditable="true">?</td>
        </tr>
<tr>
          <td>Find the probability of computermalfunction given that there is computer failiure and light failure and electricityfailure?</td>
          <td id="ans4" contenteditable="true">?</td>
        </tr>
    </tbody>
</table>`
  }
  else if(task  === "Domain3"){
    qn = `<table class="table is-bordered is-fullwidth">
    <thead id="table-head">
        <tr>
          <th colspan="1">Question</th>
          <th colspan="1">Enter Probability</th>
        </tr>
    </thead>
    <tbody id="table-body">
        <tr>
          <td>Find the probability of having high IQ if the score is low?</td>
          <td id="ans1" contenteditable="true">?</td>
        </tr>
<tr>
          <td>Find the probability of getting high aptitude score if IQ is low and score is high?</td>
          <td id="ans2" contenteditable="true">?</td>
        </tr>
        <tr>
        <td>Find the probability of having high IQ if the score is high?</td>
        <td id="ans3" contenteditable="true">?</td>
      </tr>
      <tr>
      <td>Find the probability of having high Score if the IQ is high?</td>
      <td id="ans4" contenteditable="true">?</td>
    </tr>
    </tbody>
</table>`
  }
  else if(task === "Domain4"){
    qn = `<table class="table is-bordered is-fullwidth">
    <thead id="table-head">
        <tr>
          <th colspan="1">Question</th>
          <th colspan="1">Enter Probability</th>
        </tr>
    </thead>
    <tbody id="table-body">
        <tr>
          <td>Find the probability of rain if the weather is cloudy and windy?</td>
          <td id="ans1" contenteditable="true">?</td>
        </tr>
<tr>
          <td>Find the probability of having a match if it is windy?</td>
          <td id="ans2" contenteditable="true">?</td>
        </tr>
        <tr>
          <td>Find the probability of not having a match if it is not windy?</td>
          <td id="ans3" contenteditable="true">?</td>
        </tr>
        <tr>
          <td>Find the probability of not having a match if it is not windy but rainy?</td>
          <td id="ans4" contenteditable="true">?</td>
        </tr>
    </tbody>
</table>`
  }
  else{
    qn = `<table class="table is-bordered is-fullwidth">
    <thead id="table-head">
        <tr>
          <th colspan="1">Question</th>
          <th colspan="1">Enter Probability</th>
        </tr>
    </thead>
    <tbody id="table-body">
        <tr>
          <td>Find the probability of having red card if a yellow card is given?</td>
          <td id="ans1" contenteditable="true">?</td>
        </tr>
<tr>
          <td>Find the probability of harshtackle if both yellow and red card are given to a player?</td>
          <td id="ans2" contenteditable="true">?</td>
        </tr>
    </tbody>
</table>`
  }
  questiontab.innerHTML = qn
}


const updateInstructions = () => {
    const task = window.currentTab;
    const instructionBox = document.getElementById("instruction-title");
    let title = ""; 
    if (task === "Domain1") {

      title = `<b>Burglary Alarm</b>

      <ul style="list-style: disc;">
         You have a new burglar alarm installed at home. It is fairly reliable at detecting a burglary, but also responds on occasion to minor earthquakes. (This example is due to Judea Pearl, a resident of Los Angeles—hence the acute interest in earthquakes.) You also have two neighbors, John and Mary, who have promised to call you at work when they hear the alarm. John nearly always calls when he hears the alarm, but sometimes confuses the telephone ringing with the alarm and calls then, too. Mary, on the other hand, likes rather loud music and often misses the alarm altogether. Given the evidence of who has or has not called, we would like to estimate the probability of a burglary.
      </ul>`;
    } else if (task === "Domain2") {
        title = `<b>Malfunctioning AC</b>

        <ul style="list-style: disc;">
        Imagine an AC which is used extensively in summer seasons. And a scenario where you switch on AC but it doesn’t work.
        There is a possibility that the AC is not working or maybe because the plug is not working.
        Now imagine a case where we have charger connected to same plug. 
        Now using observations from charger and AC we can derive many inferences about the probabilities.        
        </ul>`;
    }
    else if (task === "Domain3"){
      title = `<b>Marks in an Examination</b>
      
      <ul style="list-style: disc;">
      Imagine you apply for admission into a famous univeristy, most of the unviersities have a standard exam like CAT. Where the score/marks of the students are determined not only by how smart/inteligent you are but also on the level (difficulty level of the paper). So the score will consider both these factors into account. You cannot expect to get good marks when the paper difficulty is way above normal. On contrast to aptitude score which only depends on how smart you are or on you IQ.
      </ul>`;
    }
    else if (task === "Domain4"){
      title = `<b>Rain Interruption</b>
      
      <ul style="list-style: disc;">
      We all enjoy cricket. There are woos and aah all over the ground by different teams fans cheering for their teams. But there is something we all are on same page. Rain... Usally in crunch match situations we get interrpted by rain gods. And we repeatedly hear the term dreaded word forecast. But how does forecast help us. It is because we can estimate whether there will be rain or not depending on the weather conditions. If it is windy or not, and if it is cloudy or not. And depending on if it rains or not we can predict if there will be match or not.
      </ul>`;
    }
    else if (task === "Domain5"){
      title = `<b>Red Card?</b>
      
      <ul style="list-style: disc;">
      In many sports there are penalties for various kinds of fouls. For example in football there are fouls like you should not touch ball with your hand, or willingly hurting opponents players is also considered foul. There can be various levels of fouls. Some fouls can lead to immediate expulsion but some might be okay. So consider football game where there are YELLOW and RED cards given to players for fouls. Now the probability of getting a red card is huge if u already have YELLOW card and you perform a harsh tackle. But there is posibility that you might end up RED card even if you dont have YELLOW card. Now consider a scenario where you dont have YELLOW card and you didnt perform a harsh tackle in this case the probability of you getting RED card is very less.
      </ul>`;
    }
    instructionBox.innerHTML = title;
}

function helperprint(question1, tagname, i, convname){
  let denominator = ``
  // console.log(convname)
  // console.log("HI")
  if(question1[tagname[i]]==1)
  denominator += `${convname[i]}=T`
  else if (question1[tagname[i]]==0)
  denominator += `${convname[i]}=F`
  else
  denominator += `${convname[i]}=*`
  return denominator
}

export function showSimSolution(){
  let elem = "";
  let defval = 1;
  if(window.currentTab === "Domain1"){
      let question1 = [1, "*", "*", 1, 1];
      let tagname = {"burglary": 0, "alarm": 1, "earthquake": 2, "marycalls": 3, "johncalls": 4};
      let convname = {"burglary": "B", "alarm": "A", "earthquake": "E", "marycalls": "M", "johncalls":"J"};

      let edges = {"alarm": ["burglary", "earthquake"], "earthquake": [], "burglary": [], "johncalls": ["alarm"], "marycalls": ["alarm"] };
      elem = findValidTermSim(question1, tagname, edges, 0, convname, defval)

  }
  else if (window.currentTab === "Domain2"){
    let edges = {"electricityfailure": [], "computermalfunction": [], "lightfailure": ["electricityfailure"], "computerfailure": ["electricityfailure", "computermalfunction"]};
    let tagname = {"electricityfailure": 0, "computermalfunction": 1, "lightfailure": 2, "computerfailure": 3};
    let convname = {"electricityfailure": "E", "computermalfunction": "CM", "lightfailure": "L", "computerfailure": "CF"};
    let question1 = ["*", "*" , 1, 1];
    elem = findValidTermSim(question1, tagname, edges, 3, convname, defval);
  }
  else if(window.currentTab === "Domain3"){
    let edges = {"examdifficulty": [], "iq": [], "score": ["examdifficulty", "iq"], "aptitudescore": ["iq"]};
        let tagname = {"examdifficulty": 0, "iq": 1, "score": 2, "aptitudescore": 3};
        let convname = {"examdifficulty": "E", "iq": "IQ", "score": "S", "aptitudescore": "A"};
        
        let question1 = ["*", 1, 0, "*"];
    elem = findValidTermSim(question1, tagname, edges, 1, convname, defval);
  }
  else if(window.currentTab === "Domain4"){
    let edges = {"windy": [], "cloudy": [], "rain": ["windy", "cloudy"], "match": ["rain"]};
    let tagname = {"windy": 0, "cloudy": 1, "rain": 2, "match": 3};
    let convname = {"windy": "W", "cloudy": "C", "rain": "R", "match": "M"};

    let question1 = [1,1,1,"*"];
    elem = findValidTermSim(question1, tagname, edges, 2, convname, defval);
  }
  else if(window.currentTab === "Domain5"){
    let edges = {"yellowcard": [], "harshtackle": [], "redcard": ["harshtackle", "yellowcard"]};
    let tagname = {"yellowcard": 0, "harshtackle":1, "redcard": 2};
    let convname = {"yellowcard": "Y", "harshtackle":"H", "redcard": "R"};

    let question1 = [1, "*", 1]
    elem = findValidTermSim(question1, tagname, edges, 2, convname, defval);
  }
}

function findparentchild(edges, curname, tagname, question1, convname){
  let elem = ``
  let denominator = ``
  // console.log(edges[curname])

  for(let j in edges[curname]){
    let i = edges[curname][j]
    denominator += ` `
    denominator += helperprint(question1, tagname, i, convname);
  }
  if(denominator!=``)
  elem += `P(${helperprint(question1, tagname, curname, convname)} | ${denominator})`
  else
  elem += `P(${helperprint(question1, tagname, curname, convname)})`
  
  return elem;

}
function printRelevantHints(tem, edges, tagname, pos, convname){
  // console.log(convname)
  let tttem = 1;
  let elem = ``
  elem += `<br />`
  elem += `<b>For a specific case:</b> `
  elem += `<br /> <div id="coloredbox">`
  // console.log(convname)
  for(let i in tagname){
    if(tem[tagname[i]]==1)
      elem += `${i}(${convname[i]})=T `
    else if(tem[tagname[i]]==0)
      elem += `${i}(${convname[i]})=F `
    else
      elem += `${i}(${convname[i]})=*`
  }
  elem += `</div><br />`
  let elem1 = ``
  let fffff = 0
  for(let i in tagname){
    // console.log(i)
    if(fffff == 0){
    elem1 += findparentchild(edges, i, tagname, tem, convname)
      fffff = 1
  }
  else{
    elem1 += ` x `
    elem1 += findparentchild(edges, i, tagname, tem, convname)
    
  }
  }

  elem1 += ` = `

  // return elem;
  fffff = 0
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
      // console.log(fffff)
      if(fffff == 0){
        elem1 += `${vl.toFixed(3)}`
        fffff = 1
      }
      else{
        elem1 += ` x `
        elem1 += `${vl.toFixed(3)}`
      }
      tttem = tttem*vl;
  }
  return elem+elem1;
}


function printRelevantSol(tem, edges, tagname, pos, convname, defflag = 0){
  // console.log(convname)
  let tttem = 1;
  let elem = ``
  // console.log(convname)
  let elem1 = ``
  let fffff = 0
  for(let i in tagname){
    // console.log(i)
    if(fffff == 0){
    elem1 += findparentchild(edges, i, tagname, tem, convname)
      fffff = 1
  }
  else{
    elem1 += ` x `
    elem1 += findparentchild(edges, i, tagname, tem, convname)
    
  }
  }
  if(defflag == 1){
    return elem1
  }
  elem1 = ``

  // return elem;
  fffff = 0
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
      // console.log(fffff)
      if(fffff == 0){
        elem1 += `${vl.toFixed(3)}`
        fffff = 1
      }
      else{
        elem1 += ` x `
        elem1 += `${vl.toFixed(3)}`
      }
      tttem = tttem*vl;
  }
  if(defflag==2)return elem1;
  else return `${tttem}`

  return elem+elem1;
}

function findValidTerm(question1, tagname, edges, pos, convname, defval){
  
  let n = Object.keys(tagname).length;
  let elem = `<b>From the given question[1] what we need to find is</b> <br />`
  for(let key in tagname){
    addCPT([], 1, key);
}
  let denominator = ``
  let fulldenom = ``
  for(let i=0;i<n;i++){
    if(i!=pos && question1[i]!="*"){
      for(let ed in edges){
        if(tagname[ed] == i){
          denominator += ` `
          if(question1[i]==1)
          denominator += `${convname[ed]}=T`
          else
          denominator += `${convname[ed]}=F`
        }
      }
    }
    for(let ed in edges){
      if(tagname[ed] == i){
        fulldenom += ` `
        if(question1[i]==1)
        fulldenom += `${convname[ed]}=T`
        else if(question1[i]==0)
        fulldenom += `${convname[ed]}=F`
        else
        fulldenom += `${convname[ed]}=*` 
      }
    }

  }
  let nodeimp = ``
  for(let ed in edges){
    if(tagname[ed] == pos){
      // denominator += ` `
      if(question1[pos]==1)
        nodeimp += `${convname[ed]}=T`
      else
        nodeimp += `${convname[ed]}=F`
    }
  }
  // console.log(denominator)
  elem += `P(${nodeimp} | ${denominator})`
  // console.log(elem)
  // elem += `<br />`
  // elem += `= const x P(${nodeimp} ${denominator})`
  // // elem += `<br />`

  // // elem += `= const * 	\u2211 P(${nodeimp} ${denominator} RestVariables = True/False)`
  // elem += `<br />`
  // elem += `= const x	\u2211 P(${fulldenom})`
  elem += `<br />`
  elem += `= const x \u2211 `
  let fffff = 0
  for(let i in tagname){
    // console.log(i)
    if(fffff == 0){
    elem += findparentchild(edges, i, tagname, question1, convname)
      fffff = 1
  }
  else{
    elem += ` x `
    elem += findparentchild(edges, i, tagname, question1, convname)
    
  }
  }

  // return elem
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
          // console.log(convname)
          elem += printRelevantHints(tem, edges, tagname, pos, convname);
          if(defval == 0)
          return elem;
          // break;
      }
  }
  return elem
}

function timeoutCustom(elem, timeoutduration){
  return setTimeout(function(){
    document.getElementById("solutionid").style.fontSize = "small";
    document.getElementById("solutionid").innerHTML = elem;
  }, timeoutduration); 

}

function findValidTermSim(question1, tagname, edges, pos, convname, defval){
  // if(page == "simulation.html")
    clearSolution();

  allTimeOuts = [] 
  let n = Object.keys(tagname).length;
  let elem = `<br /><b>From the given question what we need to find is</b> <br />`
  for(let key in tagname){
    addCPT([], 1, key);
}
  let fixedDurationSim = 1400
  // console.log(fixedDurationSim)
  fixedDurationSim =parseInt(document.getElementById("speedslider").value)
  // console.log(fixedDurationSim)
  let timeoutduration = 0
  allTimeOuts.push(timeoutCustom(elem, timeoutduration))
  let temelem = ``
    let denominator = ``
  let fulldenom = ``
  for(let i=0;i<n;i++){
    if(i!=pos && question1[i]!="*"){
      for(let ed in edges){
        if(tagname[ed] == i){
          denominator += ` `
          if(question1[i]==1)
          denominator += `${convname[ed]}=T`
          else
          denominator += `${convname[ed]}=F`
        }
      }
    }
    for(let ed in edges){
      if(tagname[ed] == i){
        fulldenom += ` `
        if(question1[i]==1)
        fulldenom += `${convname[ed]}=T`
        else if(question1[i]==0)
        fulldenom += `${convname[ed]}=F`
        else
        fulldenom += `${convname[ed]}=*` 
      }
    }

  }
  let nodeimp = ``
  for(let ed in edges){
    if(tagname[ed] == pos){
      // denominator += ` `
      if(question1[pos]==1)
        nodeimp += `${convname[ed]}=T`
      else
        nodeimp += `${convname[ed]}=F`
    }
  }
  temelem += `P(${nodeimp} | ${denominator})`
  temelem += `<br />`
  timeoutduration += fixedDurationSim
  allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
  elem = elem + temelem
  temelem =``
  temelem += `= const x \u2211 `
  let fffff = 0
  for(let i in tagname){
    // console.log(i)
    if(fffff == 0){
    temelem += findparentchild(edges, i, tagname, question1, convname)
      fffff = 1
  }
  else{
    temelem += ` x `
    temelem += findparentchild(edges, i, tagname, question1, convname)
    
  }
  }
  timeoutduration += fixedDurationSim
  allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
  
  elem += temelem
  let total = 0;
 for(let ii=1;ii<=3;ii++){
  temelem = `<br\ >= const x (`
  let flagforfirst = 1
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
      let fl = 1;
      for(let j=0;j<n;j++){
          if(question1[j] != "*"){
              if(tem[j] != question1[j]){
                  fl= 0;
              }
          }
      }
      if(fl==1){
          if(flagforfirst==0){
            temelem += `<br\ >   + `
          }
          let teme = printRelevantSol(tem, edges, tagname, pos, convname, ii);
          if(ii==3){
            total += parseFloat(teme)
          }
          temelem += teme
          
          flagforfirst = 0;
          timeoutduration += fixedDurationSim
          allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
          elem += temelem
          temelem = ``
      }
  }
  console.log(total)
  temelem += ` )`
  // timeoutduration += fixedDurationSim
  allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
  elem += temelem
  temelem = ``
  
}
  temelem = `<br\ >= const x ${total}`
  allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
  elem += temelem
  temelem = ``

  temelem = `<br\ ><br\ ><br\ >But we need to eliminate the const, for this we need to calculate the other possiblity of query variable also. So that we will get probability for both T and F, so we could divide and eliminate the const, So we have: <br\ >`
  allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
  elem += temelem
  temelem = ``
  
  question1[pos] = 1 - question1[pos]

  let denominator2 = ``
  let fulldenom2 = ``
  for(let i=0;i<n;i++){
    if(i!=pos && question1[i]!="*"){
      for(let ed in edges){
        if(tagname[ed] == i){
          denominator2 += ` `
          if(question1[i]==1)
          denominator2 += `${convname[ed]}=T`
          else
          denominator2 += `${convname[ed]}=F`
        }
      }
    }
    for(let ed in edges){
      if(tagname[ed] == i){
        fulldenom2 += ` `
        if(question1[i]==1)
        fulldenom2 += `${convname[ed]}=T`
        else if(question1[i]==0)
        fulldenom2 += `${convname[ed]}=F`
        else
        fulldenom2 += `${convname[ed]}=*` 
      }
    }

  }
  let nodeimp2 = ``
  for(let ed in edges){
    if(tagname[ed] == pos){
      // denominator += ` `
      if(question1[pos]==1)
        nodeimp2 += `${convname[ed]}=T`
      else
        nodeimp2 += `${convname[ed]}=F`
    }
  }
  temelem = ``
  temelem += `P(${nodeimp2} | ${denominator2})`
  temelem += `<br />`
  timeoutduration += fixedDurationSim
  allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
  elem = elem + temelem
  temelem =``
  temelem += `= const x \u2211 `
  fffff = 0
  for(let i in tagname){
    // console.log(i)
    if(fffff == 0){
    temelem += findparentchild(edges, i, tagname, question1, convname)
      fffff = 1
  }
  else{
    temelem += ` x `
    temelem += findparentchild(edges, i, tagname, question1, convname)
    
  }
  }
  timeoutduration += fixedDurationSim
  allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
  
  elem += temelem
  let total2 = 0;
 for(let ii=1;ii<=3;ii++){
  temelem = `<br\ >= const x (`
  let flagforfirst = 1
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
      let fl = 1;
      for(let j=0;j<n;j++){
          if(question1[j] != "*"){
              if(tem[j] != question1[j]){
                  fl= 0;
              }
          }
      }
      if(fl==1){
          if(flagforfirst==0){
            temelem += `<br\ >   + `
          }
          let teme = printRelevantSol(tem, edges, tagname, pos, convname, ii);
          if(ii==3){
            total2 += parseFloat(teme)
          }
          temelem += teme
          
          flagforfirst = 0;
          timeoutduration += fixedDurationSim
          allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
          elem += temelem
          temelem = ``
      }
  }
  // console.log(total2)
  temelem += ` )`
  allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
  elem += temelem
  temelem = ``
  
}
  temelem = `<br\ >= const x ${total2}`
  timeoutduration += fixedDurationSim
  allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
  elem += temelem
  temelem = ``

  temelem = `<br\ ><br\ ><br\ >We need to use the above computed probabilites to eliminate constant which is there in solution <br\ >`
  timeoutduration += fixedDurationSim
  allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
  elem += temelem
  temelem = ``

  temelem += `P(${nodeimp} | ${denominator}) = P(${nodeimp} | ${denominator}) / (P(${nodeimp} | ${denominator}) + P(${nodeimp2} | ${denominator2}))`
  temelem += `<br />`
  timeoutduration += fixedDurationSim
  allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
  elem += temelem
  temelem = ``
  
  temelem += `P(${nodeimp} | ${denominator}) = (const x ${total}) / (const x ${total} + const x ${total2})`
  temelem += `<br />`
  timeoutduration += fixedDurationSim
  allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
  elem += temelem
  temelem = ``
  
  temelem += `P(${nodeimp} | ${denominator}) = (${total}) / (${total} + ${total2})`
  temelem += `<br />`
  timeoutduration += fixedDurationSim
  allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
  elem += temelem
  temelem = ``
  let finalanssol = parseFloat(total)/(parseFloat(total) + parseFloat(total2))
  temelem += `P(${nodeimp} | ${denominator}) = ${finalanssol}`
  temelem += `<br />`
  timeoutduration += fixedDurationSim
  allTimeOuts.push(timeoutCustom(elem + `<b>` + temelem + `\b`, timeoutduration))
  elem += temelem
  temelem = ``



  return elem
}


export function updateHints(defval = 0){
  let elem = "";
  if(window.currentTab === "Domain1"){
      let question1 = [1, "*", "*", 1, 1];
      let tagname = {"burglary": 0, "alarm": 1, "earthquake": 2, "marycalls": 3, "johncalls": 4};
      let convname = {"burglary": "B", "alarm": "A", "earthquake": "E", "marycalls": "M", "johncalls":"J"};

      let edges = {"alarm": ["burglary", "earthquake"], "earthquake": [], "burglary": [], "johncalls": ["alarm"], "marycalls": ["alarm"] };
      elem = findValidTerm(question1, tagname, edges, 0, convname, defval)

  }
  else if (window.currentTab === "Domain2"){
    let edges = {"electricityfailure": [], "computermalfunction": [], "lightfailure": ["electricityfailure"], "computerfailure": ["electricityfailure", "computermalfunction"]};
    let tagname = {"electricityfailure": 0, "computermalfunction": 1, "lightfailure": 2, "computerfailure": 3};
    let convname = {"electricityfailure": "E", "computermalfunction": "CM", "lightfailure": "L", "computerfailure": "CF"};
    let question1 = ["*", "*" , 1, 1];
    elem = findValidTerm(question1, tagname, edges, 3, convname, defval);
  }
  else if(window.currentTab === "Domain3"){
    let edges = {"examdifficulty": [], "iq": [], "score": ["examdifficulty", "iq"], "aptitudescore": ["iq"]};
        let tagname = {"examdifficulty": 0, "iq": 1, "score": 2, "aptitudescore": 3};
        let convname = {"examdifficulty": "E", "iq": "IQ", "score": "S", "aptitudescore": "A"};
        
        let question1 = ["*", 1, 0, "*"];
    elem = findValidTerm(question1, tagname, edges, 1, convname, defval);
  }
  else if(window.currentTab === "Domain4"){
    let edges = {"windy": [], "cloudy": [], "rain": ["windy", "cloudy"], "match": ["rain"]};
    let tagname = {"windy": 0, "cloudy": 1, "rain": 2, "match": 3};
    let convname = {"windy": "W", "cloudy": "C", "rain": "R", "match": "M"};

    let question1 = [1,1,1,"*"];
    elem = findValidTerm(question1, tagname, edges, 2, convname, defval);
  }
  else if(window.currentTab === "Domain5"){
    let edges = {"yellowcard": [], "harshtackle": [], "redcard": ["harshtackle", "yellowcard"]};
    let tagname = {"yellowcard": 0, "harshtackle":1, "redcard": 2};
    let convname = {"yellowcard": "Y", "harshtackle":"H", "redcard": "R"};

    let question1 = [1, "*", 1]
    elem = findValidTerm(question1, tagname, edges, 2, convname, defval);
  }
  document.getElementById("hintsid").style.fontSize = "small";
  document.getElementById("hintsid").innerHTML = elem;
}

function updateToolbar() {
    let elem = "";
    if (window.currentTab === "Domain1") {
      elem =
      '<div class="component-button burglary" onclick="addNode(event)">Burglary</div>        <div class="component-button earthquake" onclick="addNode(event)">Earthquake</div>        <div class="component-button alarm" onclick="addNode(event)">Alarm</div>        <div class="component-button johncalls" onclick="addNode(event)">Johncalls</div><div class="component-button marycalls" onclick="addNode(event)">Marycalls</div>        <div class="component-button india" onclick="addNode(event)">India</div>        <div class="component-button olympics" onclick="addNode(event)">Olympics</div>';
    } else if (window.currentTab === "Domain2"){
      elem =
        '<div class="component-button electricityfailure" onclick="addNode(event)">electricityfailure</div>        <div class="component-button earthquake" onclick="addNode(event)">Earthquake</div>        <div class="component-button computerfailure" onclick="addNode(event)">computerfailure</div>        <div class="component-button lightfailure" onclick="addNode(event)">lightfailure</div><div class="component-button computermalfunction" onclick="addNode(event)">computermalfunction</div>        <div class="component-button india" onclick="addNode(event)">India</div>        <div class="component-button olympics" onclick="addNode(event)">Olympics</div>';
    } 
    else if (window.currentTab === "Domain3"){
      elem =
        '<div class="component-button examdifficulty" onclick="addNode(event)">examdifficulty</div>        <div class="component-button IQ" onclick="addNode(event)">IQ</div>        <div class="component-button score" onclick="addNode(event)">score</div>        <div class="component-button aptitudescore" onclick="addNode(event)">aptitudescore</div>        <div class="component-button worldcup" onclick="addNode(event)">worldcup</div>        <div class="component-button hallticket" onclick="addNode(event)">hallticket</div>';
    }
    
    else if (window.currentTab === "Domain4"){
      elem =
        '<div class="component-button rain" onclick="addNode(event)">rain</div>        <div class="component-button windy" onclick="addNode(event)">windy</div>        <div class="component-button cloudy" onclick="addNode(event)">cloudy</div>        <div class="component-button match" onclick="addNode(event)">match</div>        <div class="component-button worldcup" onclick="addNode(event)">worldcup</div>        <div class="component-button hallticket" onclick="addNode(event)">hallticket</div>';
    }

    else if (window.currentTab === "Domain5"){
      elem =
        '<div class="component-button yellowcard" onclick="addNode(event)">yellowcard</div>        <div class="component-button redcard" onclick="addNode(event)">redcard</div>        <div class="component-button harshtackle" onclick="addNode(event)">harshtackle</div>        <div class="component-button bluecard" onclick="addNode(event)">bluecard</div>        <div class="component-button worldcup" onclick="addNode(event)">worldcup</div>        <div class="component-button hallticket" onclick="addNode(event)">hallticket</div>';
    }
    document.getElementById("toolbar").innerHTML = elem;
}


function clearObservations() {
    for(let i=1;i<=20;i++){
      document.getElementById("cpt"+i).innerHTML = "";
    }
    document.getElementById("result").innerHTML = "";
    const elel  = document.getElementById("finalbutton");
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if( page == "simulation.html"){
      elel.innerText = "Show Solution";
      // Write New solution here
      elel.onclick = function(){showSimSolution();};
    }
    else{
      elel.innerText = "Check";
      elel.onclick = function(){checkCPT();};
    } 
}

const circuitBoard = document.getElementById("circuit-board");
// Distance of working area from top
const circuitBoardTop = circuitBoard.offsetTop;
// Full height of window
const windowHeight = window.innerHeight;
const width = window.innerWidth;
if (width < 1024) {
  circuitBoard.style.height = 600 + "px";
} else {
  circuitBoard.style.height = windowHeight - circuitBoardTop - 20 + "px";
}

function resize() {
    const circuitBoard = document.getElementById("circuit-board");
    const sidePanels = document.getElementsByClassName("v-datalist-container");
  
    if (width >= 1024) {
      for (let i = 0; i < sidePanels.length; i++) {
        sidePanels[i].style.height = circuitBoard.style.height;
      }
    }
}
  
resize();

