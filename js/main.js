/* jshint esversion:6 */
const state = {
    exp: [],
    opInUse: true,
    decimal: false,
    result: null
  }
  const numBtns = document
    .querySelectorAll('.pad [data-type="num"]')
    .forEach(btn => btn.addEventListener("click", insertNum));
  const operationBtns = document
    .querySelectorAll('.pad [data-type="op"]')
    .forEach(btn => btn.addEventListener("click", insertOp));
  const clear = document
    .querySelectorAll(".pad .clear")
    .forEach(btn => btn.addEventListener("click", clearExp));
  const equal = document
    .getElementById("equal")
    .addEventListener("click", evalute);
  const visor = document.querySelector(".visor");
  
  function display() {
    visor.innerHTML = `${state.exp.join("")}`;
  }
  
  function insertNum() {
    if (state.exp.length > 11) {
        return;
    }
    if (state.result) {
      state.result = 0;
    }  
    if (this.innerHTML === '0' && (state.exp[0] === '0' || !state.exp[0]) || (this.innerHTML === '.' && state.decimal)) {
      return;
    }
    if(this.innerHTML === '.' && !state.exp[0]) {
      state.exp[0] = '0';
    }
    if (this.innerHTML === '.' && !state.decimal){
      state.decimal = true;
    }
    state.exp.push(this.innerHTML);
    display();
    state.opInUse = false;  
  }
  
  function insertOp() {
    if (state.result) {
      state.exp.push(state.result);
      display();
    }
    if (state.opInUse) {
      state.exp.pop();
    }
    state.exp.push(this.innerHTML);
    display();
    state.opInUse = true;
    state.decimal = false;
  }
  
  function evalute() {
    if (/[0-9]/.test(state.exp[state.exp.length - 1])) {
      state.result = (eval(state.exp.join("")));
      document.querySelector(".visor").innerHTML = state.result;
      state.exp = [];
      state.decimal = false;
    }
  }
  
  function clearExp() {
    if (this.dataset.type === "exp") {
      while (/[0-9]/.test(state.exp[state.exp.length - 1])) {
        state.exp.pop();
      }
      display();
    } else if (this.dataset.type === "all") {
      state.exp = [];
      state.result = null;
      state.opInUse = true;
      state.decimal = false;
      visor.innerHTML = "0";
    }
  }
  