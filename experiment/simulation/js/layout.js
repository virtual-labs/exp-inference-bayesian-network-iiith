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
    unbindEvent();
    connectNode();
    refreshWorkingArea();
    // Changed for Inference
    // updateToolbar();marycmarycallsalls
    // updateHints();
    updateQuestion();
    // updateInstructions();
    updateWorkingArea();
    clearObservations();
    resize();
}


window.changeTabs = changeTabs;

export const updateWorkingArea = () => {
    const task = window.currentTab;
    let namelist = []
    let cordinatelist = []
    // console.log("HI")
    // console.log(task)
    let nodeslist = []
    if(task === "Domain1"){
      namelist = ["alarm", "earthquake", "burglary", "johncalls", "marycalls"]
      cordinatelist = [[50, 50], [20, 20], [70, 20], [70, 70], [20, 70]];

    }
    else if (task === "Domain2"){
      namelist = ["electricityfailure", "computermalfunction", "lightfailure", "computerfailure"];
      cordinatelist = [[15, 20], [60, 20], [60, 70], [20, 60]];
    }
    else if (task === "Domain3"){
      namelist = ["examdifficulty", "iq", "score", "aptitudescore"];
      cordinatelist = [[15, 20], [60, 20], [60, 70], [20, 60]];
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

const updateQuestion = () => {
  const task = window.currentTab;
  const questiontab = document.getElementById("displayqn");
  let qn = "";
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

function updateHints(){
  let elem = "";
  if(window.currentTab === "Domain1"){
      elem = `<li>Alarm setsoff when there is a burglary or ocassionally when there is a earthquake.</li>
      <li>John, Mary calling depends on whether the alarm is ringing</li>
      <li>Are you getting any additional information about John/Mary calling if you know the reason why alarm is ringing?</li>
      <li>Not really, as John/ Mary give least attention to reason why alarm is ringing.</li>
      <li>You can ignore listening to music and telephone ringing, we can embed their probabilities in the Mary/John calling itself.</li>`
  }
  else if (window.currentTab === "Domain2"){
      elem = `
      <li> A computer can fail because of various reasons but two primary reasons are electricity failure and computer malfunction</li>
      <li>But a light fails only because of electricity failure and possibly becae of some light malfunction</li>
      <li>Notice that light failure has nothing to do with computer malfunctioning</li>`;
  }
  else if(window.currentTab === "Domain3"){
    elem = `<li> Your score in an examination is dependent on how intelligent you are and also on how difficult the paper is</li> 
    <li> You cannot write all questions even you are so intelligent</li>
    <li> But your aptitude score only depends on the IQ and nothing else.</li>
    `
  }
  else if(window.currentTab === "Domain4"){
    elem = `<li> Rain depends on two factors  cloudiness, and the windspeed</li> 
    <li> And a cricket match will most likely be afftected due to rain because of wet outfield</li>
    `
  }
  else if(window.currentTab === "Domain5"){
    elem = `<li>A player will be given Red card based on how harsh the tackle is</li>
    <li>And also on if he already got any warnings (Yellow card) </li> 

    `
  }
  
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
    elel.innerText = "Check";
    elel.onclick = function(){checkCPT();}; 
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

