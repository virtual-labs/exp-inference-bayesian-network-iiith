import { registerNode, jsPlumbInstance } from "./main.js";
import { setPosition } from "./layout.js";
import { domainValidator1, domainValidator2 } from "./validator.js";

'use strict';

export let nodes = {};
window.numNodes = 0;

export function clearNodes(){
    for( let id in nodes){
        delete nodes[id];
    }
    nodes = {};

}

export class Node {
    constructor(name){
        this.name = name;
        this.id = this.name + "-" + window.numNodes++;
        this.xcordinate = 0;
        this.ycordinate = 0;
        this.isConnected = false; 
        this.parents = [];
        this.inputPoints = [];
    }
    setId(id){
        this.id = id;
    }
    addParent(node){
        clearCPT();
        this.parents.push(node);
    }
    addInputPoints(input) {
        clearCPT();
        this.inputPoints.push(input);
    }
    removeNode(node){
        let index = this.parents.indexOf(node);
        if (index > -1){
            this.parents.splice(index, 1);
        }
    }
    updatePosition(id) {
        this.ycordinate =
            window.scrollY + document.getElementById(id).getBoundingClientRect().top; // Y

        this.xcordinate =
            window.scrollX + document.getElementById(id).getBoundingClientRect().left; // X
    }
    generateComponent(){
        let component = `<div class= "drag-drop node ${this.name.toLowerCase()}" id= ${this.id}>${this.name.toUpperCase()}</div>`;
        return component;
    }

    registerComponent(workingArea, x = 0, y = 0) {

        const width = document.getElementById(workingArea).offsetWidth;
        const height = document.getElementById(workingArea).offsetHeight;
        //  Changed for Inference
        // let scale = 900;
        // let yScale = 800;
        // x = (x / scale) * 100;
        // y = (y / yScale) * 100;

        const el = document.getElementById(this.id);
        el.style.left = x + "%";
        el.style.top = y + "%";

        el.addEventListener(
            "contextmenu",
            function (ev) {
                ev.preventDefault();
                const origin = {
                    left: ev.pageX - document.getScroll()[0],
                    top: ev.pageY - document.getScroll()[1],
                };
                setPosition(origin);
                window.selectedComponent = this.id;
                window.componentType = "node";
                return false;
            },
            false
        );
        
        nodes[this.id] = this;
        registerNode(this.id, this);

        this.updatePosition(this.id);
    }
    setConnected(val) {
        this.isConnected = val;
    }
}

function clearCPT(){
    for(let i=1;i<=20;i++){
        const cpttable = document.getElementById("cpt"+i);
        cpttable.innerText = "";
    }
    let node_list = nodes;
    let adjlist = {};
    for(let [key, value] of Object.entries(node_list)){
        adjlist[value.name] = value;
    }
    for(let [key, value] of Object.entries(adjlist)){
        const ele = document.getElementById(value.id);
        ele.onclick = function(){};
    }   
    const elel  = document.getElementById("finalbutton");
    elel.innerText = "Check (use after submitting sucessfully)";
    elel.onclick = function(){}; 
}

function addNode(event) {
    clearCPT();    
    const name = event.target.innerHTML.toUpperCase();
    const node = new Node(name);
    const component = node.generateComponent();
    const wa = document.getElementById("working-area");
    wa.insertAdjacentHTML("beforeend", component);
    node.registerComponent("working-area");
    event.target.outerHTML = "";
}

window.addNode = addNode;

function addCPT(event, defa = 0, defaname= "hi") {
    let name = "hi"
    // console.log("Found Ya")
    if(defa == 0){
        name = event.target.innerHTML.toUpperCase();
    }
    else{
        name = defaname.toUpperCase();
    }
    for(let i=1;i<=20;i++){
        const cpttable = document.getElementById("cpt"+i);
        cpttable.style.display = "none"
    }
    if(name == "BURGLARY"){
        const cpttable = document.getElementById("cpt1");
        cpttable.style.display = "block"
        // console.log("initialized")
        cpttable.innerHTML = `<b>CPT Table (BURGLARY)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Burglary</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td id="burglary1" >0.001</td>
                </tr>
            </tbody>
        </table>`  
    }
    else if (name == "ALARM"){
        // console.log("initialized")

        const cpttable = document.getElementById("cpt2");
        cpttable.style.display = "block"
    cpttable.innerHTML = `<b>CPT Table (ALARM)</b>
    <table class="table is-bordered is-fullwidth">
        <thead id="table-head">
            <tr>
                <th colspan="1">Burglary</th>
                <th colspan="1">Earthquake</th>
                <th colspan="1">Alarm</th>
                
            </tr>
        </thead>
        <tbody id="table-body">
                <tr>
                <td>T</td>
                <td>T</td>
                <td id="alarm111" >0.95</td>
                </tr>
                <tr>
                <td>T</td>
                <td>F</td>
                <td id="alarm101" >0.94</td>
                </tr>
                <tr>
                <td>F</td>
                <td>T</td>
                <td id="alarm011" >0.29</td>
                </tr>
                <tr>
                <td>F</td>
                <td>F</td>
                <td id="alarm001" >0.001</td>
                </tr>
        </tbody>
    </table>`
    }
    else if(name == "EARTHQUAKE"){
        // console.log("initialized")

        const cpttable = document.getElementById("cpt3");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (EARTHQUAKE)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">EARTHQUAKE</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td id="earthquake1">0.002</td>
                </tr>
            </tbody>
        </table>`   
    }
    else if(name == "MARYCALLS"){
        // console.log("initialized")

        const cpttable = document.getElementById("cpt4");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (MARYCALLS)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">ALARM</th>
                    <th colspan="1">MARYCALLS</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td>True</td>
                    <td id="marycalls11" >0.7</td>
                </tr>
                <tr>
                <td>False</td>
                <td id="marycalls01" >0.01</td>

            </tr>
            
            </tbody>
        </table>`
    }
    else if(name == "JOHNCALLS"){
        const cpttable = document.getElementById("cpt5");
        cpttable.style.display = "block"
        // console.log("initialized")

        cpttable.innerHTML = `<b>CPT Table (JOHNCALLS)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">ALARM</th>
                    <th colspan="1">JOHNCALLS</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td>True</td>
                    <td id="johncalls11" >0.9</td>
                    
                </tr>
                <tr>
                <td>False</td>
                <td id="johncalls01" >0.05</td>

            </tr>
            
            </tbody>
        </table>`
    }
    else if (name == "ELECTRICITYFAILURE")
    {
        const cpttable = document.getElementById("cpt6");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (ELECTRICITYFAILURE)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Electricity Failure</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td id="electricityfailure1" >0.3</td>

                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "COMPUTERMALFUNCTION")
    {
        const cpttable = document.getElementById("cpt7");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (COMPUTERMALFUNCTION)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Computer Malfunction</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td id="computermalfunction1" >0.7</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "LIGHTFAILURE")
    {
        const cpttable = document.getElementById("cpt8");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (LIGHTFAILURE)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Electricity Failure</th>
                    <th colspan="1">Light Failure</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr>
                    <td>True</td>
                    <td id="lightfailure11" >0.5</td>

                </tr>
                <tr>
                    <td>False</td>
                    <td id="lightfailure01" >0.2</td>

                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "COMPUTERFAILURE")
    {
        const cpttable = document.getElementById("cpt9");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (COMPUTERFAILURE)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Electricity Failure</th>
                    <th colspan="1">Computer Malfunction</th>
                    <th colspan="1">Computer Failure</th> 
                </tr>
            </thead>
            <tbody id="table-body">
                <tr>
                    <td>True</td>
                    <td>True</td>
                    <td id="computerfailure111" >0.8</td>

                </tr>
                <tr>
                    <td>True</td>
                    <td>False</td>
                    <td id="computerfailure101" >0.9</td>

                </tr>
                <tr>
                    <td>False</td>
                    <td>True</td>
                    <td id="computerfailure011" >0.8</td>

                </tr>
                <tr>
                    <td>False</td>
                    <td>False</td>
                    <td id="computerfailure001" >0.6</td>
                </tr>
                
                
            </tbody>
        </table>` 
    }
    else if (name == "EXAMDIFFICULTY")
    {
        const cpttable = document.getElementById("cpt10");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (EXAMDIFFICULTY)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Exam Easy</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td id="examdifficulty1">0.6</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "IQ")
    {
        const cpttable = document.getElementById("cpt11");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (IQ)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">High IQ</th>
    
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td id="iq1">0.1</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "SCORE")
    {
        const cpttable = document.getElementById("cpt12");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (SCORE)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Exam</th>
                    <th colspan="1">IQ</th>
                    <th colspan="1">High Score</th>    
                </tr>
            </thead>
            <tbody id="table-body">
                <tr>
                    <td>Difficult</td>
                    <td>High</td>
                    <td id="score111">0.8</td>
                </tr>
                <tr>
                    <td>Easy</td>
                    <td>Low</td>
                    <td id="score001">0.6</td>


                </tr>
                <tr>
                    <td>Easy</td>
                    <td>High</td>
                    <td id="score011">0.4</td>

                </tr>
                <tr>
                    <td>Difficult</td>
                    <td>Low</td>
                    <td id="score101">0.2</td>
                </tr>
                
                
            </tbody>
        </table>` 
    }
    else if (name == "APTITUDESCORE")
    {
        const cpttable = document.getElementById("cpt13");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (APTITUDESCORE)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">IQ</th>
                    <th colspan="1">High Aptitude score</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr>
                    <td>Low</td>
                    <td id="aptitudescore01">0.2</td>
                </tr>
                <tr>
                    <td>High</td>
                    <td id="aptitudescore11">0.5</td>

                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "WINDY")
    {
        const cpttable = document.getElementById("cpt14");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (WINDY)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Windy</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td id="windy1">0.1</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "CLOUDY")
    {
        const cpttable = document.getElementById("cpt15");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (CLOUDY)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Cloudy</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td id="cloudy1" >0.05</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "RAIN")
    {
        const cpttable = document.getElementById("cpt16");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (RAIN)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Windy</th>
                    <th colspan="1">Cloudy</th>
                    <th colspan="1">Rain</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr>
                    <td>True</td>
                    <td>True</td>
                    <td id="rain111">0.8</td>
                </tr>
                <tr>
                    <td>True</td>
                    <td>False</td>
                    <td id="rain101">0.6</td>
                </tr>
                <tr>
                    <td>False</td>
                    <td>True</td>
                    <td id="rain011">0.75</td>
                </tr>
                <tr>
                    <td>False</td>
                    <td>False</td>
                    <td id="rain001">0.1</td>
                </tr>
                
            </tbody>
        </table>` 
    }
    else if (name == "MATCH")
    {
        const cpttable = document.getElementById("cpt17");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (MATCH)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Rain</th>
                    <th colspan="1">Match</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr>
                    <td>Yes</td>
                    <td id="match11">0.3</td>
                </tr>
                <tr>
                    <td>No</td>
                    <td id="match01">0.9</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "HARSHTACKLE")
    {
        const cpttable = document.getElementById("cpt18");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (HARSHTACKLE)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Harsh Tackle</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td id="harshtackle1">0.2</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "YELLOWCARD")
    {
        const cpttable = document.getElementById("cpt19");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (YELLOWCARD)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Yellow Card</th>
                </tr>
            </thead>
            <tbody id="table-body">
                    <tr>
                    <td id="yellowcard1">0.34</td>
                </tr>
            </tbody>
        </table>` 
    }
    else if (name == "REDCARD")
    {
        const cpttable = document.getElementById("cpt20");
        cpttable.style.display = "block"
        cpttable.innerHTML = `<b>CPT Table (REDCARD)</b>
        <table class="table is-bordered is-fullwidth">
            <thead id="table-head">
                <tr>
                    <th colspan="1">Harsh Tackle</th>
                    <th colspan="1">Yellow Card</th>
                    <th colspan="1">Red Card</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr>
                    <td>True</td>
                    <td>True</td>
                    <td id="redcard111">0.9</td>
                </tr>
                <tr>
                    <td>True</td>
                    <td>False</td>
                    <td id="redcard101">0.7</td>
                </tr>
                <tr>
                    <td>False</td>
                    <td>True</td>
                    <td id="redcard011">0.5</td>
                </tr>
                <tr>
                    <td>False</td>
                    <td>False</td>
                    <td id="redcard001">0.1</td>
                </tr>
                
            </tbody>
        </table>` 
    }
}

window.addCPT = addCPT;



export function clearResult() {
    const result = document.getElementById("result");
    result.innerHTML = "";
}

export function printErrors(message,objectId) {
    const result = document.getElementById('result');
    result.innerHTML += message;
    result.className = "failure-message";
    if(objectId !== null)
    {
        objectId.classList.add("highlight")
        setTimeout(function () {objectId.classList.remove("highlight")}, 5000);
    }
}

export function submitCircuit() {

    clearResult();
    if(window.currentTab == "Domain1")
    domainValidator1();
    else
    domainValidator1();
}
window.submitCircuit = submitCircuit;

export function deleteElement(nodeid) {
    let node = nodes[nodeid];
    clearCPT();
    jsPlumbInstance.removeAllEndpoints(document.getElementById(node.id));
    jsPlumbInstance._removeElement(document.getElementById(node.id));
    let el = `<div class= "component-button ${node.name.toLowerCase()}" onclick="addNode(event)">${node.name.toUpperCase()}</div>`;
    const toolb = document.getElementById("toolbar");
    toolb.insertAdjacentHTML("beforeend", el);
    for (let elem in nodes) {
        if (nodes[elem].parents.includes(node)) {
            nodes[elem].removeNode(node);
        }
    }
    delete nodes[nodeid];
}