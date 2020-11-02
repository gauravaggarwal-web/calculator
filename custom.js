const screen = document.getElementById("screen");
const screenOps = document.getElementById("screenOps");
let numArray = [];
let opsArray = [];
let eqCheck = true;

const enterNumber = (num) => {
   eqCheck = true;
   if (screen.innerHTML == "0" || screen.dataset.reset == "true") {
      screen.innerHTML = num;
      screen.dataset.reset = false;
   } else {
      screen.insertAdjacentHTML("beforeend", num);
   }
};

const clearScreen = () => {
   screen.innerHTML = "0";
   numArray = [];
   opsArray = [];
};

const showNum = () => {
   screen.innerHTML = numArray[numArray.length - 1];
};

const submitNum = (num) => {
   screen.dataset.reset = true;
   numArray.push(parseFloat(num));
};

const submitOps = (ops) => {
   screen.dataset.reset = true;
   opsArray.push(ops);
};

const enterOps = (ops) => {
   if (!eqCheck) return;
   submitNum(screen.innerHTML);
   submitOps(ops);
   screenOps.innerHTML = ops;
   console.log("before", numArray, opsArray);
   if (numArray.length <= 1) return;
   switch (opsArray[opsArray.length - 2]) {
      case "*":
         submitNum(multiplyNum());
         showNum();
         break;
      case "-":
         submitNum(subtractNum());
         showNum();
         break;
      case "+":
         submitNum(addNum());
         showNum();
         break;
   }
   console.log("after", numArray, opsArray);
   eqCheck = false;
};

const addNum = () => {
   return numArray[numArray.length - 2] + numArray[numArray.length - 1];
};

const subtractNum = () => {
   return numArray[numArray.length - 2] - numArray[numArray.length - 1];
};

const multiplyNum = () => {
   return numArray[numArray.length - 2] * numArray[numArray.length - 1];
};

const equalsTo = () => {
   if (!eqCheck) return;
   submitNum(screen.innerHTML);
   if (numArray.length <= 1) return;
   switch (opsArray[opsArray.length - 1]) {
      case "*":
         submitNum(multiplyNum());
         showNum();
         break;
      case "-":
         submitNum(subtractNum());
         showNum();
         break;
      case "+":
         submitNum(addNum());
         showNum();
         break;
   }
   showNum();
   screenOps.innerHTML = "";
   numArray = [];
};

document.addEventListener("keyup", function (event) {
   //    numbers
   if (event.key === ".") enterNumber(".");
   if (event.key === "0") enterNumber(0);
   if (event.key === "1") enterNumber(1);
   if (event.key === "2") enterNumber(2);
   if (event.key === "3") enterNumber(3);
   if (event.key === "4") enterNumber(4);
   if (event.key === "5") enterNumber(5);
   if (event.key === "6") enterNumber(6);
   if (event.key === "7") enterNumber(7);
   if (event.key === "8") enterNumber(8);
   if (event.key === "9") enterNumber(9);
   //    ops
   if (event.key === "+") enterOps("+");
   if (event.key === "-") enterOps("-");
   if (event.key === "*") enterOps("*");
   if (event.key === "=") equalsTo();
   if (event.key === "Enter") equalsTo();
});

// 2 + (+)

// submit num  [2]
// submit ops  [+]

// 2 + 4 * (*)

// submit num  [2, 4]
// submit ops  [+, *]
// (+) 2 + 4   [2, 4, 6]
// show	    6

// 2 + 4 * 8 - (-)

// submit num  [2, 4, 6, 8]
// submit ops  [+, *, -]
// (*) 6 * 8   [2, 4, 6, 8, 48]
// show	    48
