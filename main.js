/* jshint esversion:6 */
let exp = [];
let opInUse = true;
let result;
const numBtns = document.querySelectorAll('.pad [data-type="num"]').forEach(btn => btn.addEventListener('click', insertNum));
const operationBtns = document.querySelectorAll('.pad [data-type="op"]').forEach(btn => btn.addEventListener('click', insertOp));
const clear = document.querySelectorAll('.pad .clear').forEach(btn => btn.addEventListener('click', clearExp));
const equal = document.getElementById('equal').addEventListener('click', evalute);

function insertNum() {
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
    if(exp[exp.length - 1] !== '+' && exp[exp.length - 1] !== '-' && exp[exp.length - 1] !== '*' && exp[exp.length - 1] !== '/'){        
        result = eval(exp.join(''));
        document.querySelector('.visor').innerHTML = result;
        exp = [];        
    }        
}

function clearExp(){
    if(this.dataset.type === 'exp'){
        while(exp[exp.length - 1] !== '+' && exp[exp.length - 1] !== '-' && exp[exp.length - 1] !== '*' && exp[exp.length - 1] !== '/'){
            exp.pop();
        }
        document.querySelector('.visor').innerHTML = `${exp.join('')}`;
    }else if(this.dataset.type === 'all'){
        exp = [];
        document.querySelector('.visor').innerHTML = '0';
    }
    
    
}