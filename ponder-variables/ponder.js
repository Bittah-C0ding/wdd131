/*
  Programmed by: Adrian Hernandez
  Course: WDD 131
  Assignment: Ponder - JS Variables and Constants
*/

// Setup simulated console output
(function setupSimulatedConsole() {
    const outputDiv = document.getElementById('outputArea');
    if (!outputDiv) return;

    const originalConsoleLog = console.log;

    console.log = function(...args) {
        originalConsoleLog.apply(console, args);
        
        const message = args.map(arg => {
            if (typeof arg === 'object') {
                try {
                    return JSON.stringify(arg, null, 2);
                } catch (e) {
                    return String(arg);
                }
            }
            return String(arg);
        }).join(' ');
        
        const line = document.createElement('div');
        line.textContent = message;
        outputDiv.appendChild(line);
    };
})();

// Constants and Variables
const PI = 3.14;
let radius = 3;
console.log(`Area of circle: ${PI * radius * radius}`);

// Type Coercion
const one = 1;
const two = '2';
console.log(`one + two = ${one + two} (string concatenation)`);
console.log(`one * two = ${one * two} (number multiplication)`);

// Global and Block Scope
let course = "CSE131"; // global scope
if (true) {
    let student = "John";
    console.log(`Inside block - course: ${course}`);
    console.log(`Inside block - student: ${student}`);
}
console.log(`Outside block - course: ${course}`);
// The following line would cause an error, so it is commented:
// console.log(student); // ReferenceError: student is not defined

console.log("\nAll examples executed successfully. Check your browser's console (F12) for the same output.");