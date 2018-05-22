/* jshint esversion:6 */
let exp = [];
let opInUse = true;
let result;
const numBtns = document.querySelectorAll('.pad [data-type="num"]').forEach(btn => btn.addEventListener('click', insertNum));
const operationBtns = document.querySelectorAll('.pad [data-type="op"]').forEach(btn => btn.addEventListener('click', insertOp));
const clear = document.querySelectorAll('.pad .clear').forEach(btn => btn.addEventListener('click', clearExp));
const equal = document.getElementById('equal').addEventListener('click', evalute);

function insertNum() {
    if(result){
        result = 0;
    }
    exp.push(this.innerHTML);
    document.querySelector('.visor').innerHTML = `${exp.join('')}`;
    opInUse = false;
}

function insertOp(){
    if(result){
        exp.push(result);
        document.querySelector('.visor').innerHTML = `${exp.join('')}`;
    }
    if(!opInUse){
        exp.push(this.innerHTML);
        document.querySelector('.visor').innerHTML = `${exp.join('')}`;
    }
    opInUse = true;
}

function evalute() {
    if(/[0-9]/.test(exp[exp.length - 1])){        
        result = eval(exp.join(''));
        document.querySelector('.visor').innerHTML = result;
        exp = [];        
    }        
}

function clearExp(){
    if(this.dataset.type === 'exp'){
        while(/[0-9]/.test(exp[exp.length - 1])){
            exp.pop();
        }
        document.querySelector('.visor').innerHTML = `${exp.join('')}`;
    }else if(this.dataset.type === 'all'){
        exp = [];
        result = 0;
        document.querySelector('.visor').innerHTML = '0';
    }
    
    
}