const display = document.getElementById("display");
const historyEl = document.getElementById("history");
const pad = document.getElementById("pad");

let current = "0";
let previous = null;
let operator = null;
let justEvaluated = false;

function updateDisplay() {
  display.textContent = current;
}

function inputNumber(num) {
  if (justEvaluated) {
    current = num;
    justEvaluated = false;
    return;
  }
  current = current === "0" ? num : current + num;
}

function inputDecimal() {
  if (justEvaluated) {
    current = "0.";
    justEvaluated = false;
    return;
  }
  if (!current.includes(".")) current += ".";
}

function clearAll() {
  current = "0";
  previous = null;
  operator = null;
  historyEl.textContent = "";
}

function toggleSign() {
  if (current !== "0") {
    current = current.startsWith("-") ? current.slice(1) : "-" + current;
  }
}

function percent() {
  current = String(Number(current) / 100);
}

function chooseOperator(op) {
  if (operator && !justEvaluated) evaluate();

  previous = current;
  operator = op;
  current = "0";
  justEvaluated = false;

  historyEl.textContent = previous + " " + op;
}

function evaluate() {
  if (!operator || previous === null) return;

  const a = Number(previous);
  const b = Number(current);

  let result = 0;

  switch (operator) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "*": result = a * b; break;
    case "/": result = b === 0 ? "Error" : a / b; break;
  }

  current = String(result);
  previous = null;
  operator = null;
  justEvaluated = true;
  historyEl.textContent = "";
}

pad.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const value = btn.dataset.value;

  switch (action) {
    case "num": inputNumber(value); break;
    case "decimal": inputDecimal(); break;
    case "clear": clearAll(); break;
    case "plusminus": toggleSign(); break;
    case "percent": percent(); break;
    case "operator": chooseOperator(value); break;
    case "equals": evaluate(); break;
  }

  updateDisplay();
});

updateDisplay();
