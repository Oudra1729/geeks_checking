// ================== #1 ==================
function funcOne() {
    let a = 5;
    if (a > 1) {
        a = 3; // reassign works with let
    }
    alert(`inside the funcOne function ${a}`);
}
funcOne(); // Output: inside the funcOne function 3

// If you use const instead of let → ERROR: Assignment to constant variable



// ================== #2 ==================
let a = 0;
function funcTwo() {
    a = 5; // reassigning the outer variable
}
function funcThree() {
    alert(`inside the funcThree function ${a}`);
}

funcThree(); // Output: inside the funcThree function 0
funcTwo();
funcThree(); // Output: inside the funcThree function 5

// If you use const instead of let for the outer variable → ERROR: Assignment to constant variable



// ================== #3 ==================
function funcFour() {
    window.a = "hello"; //global variable
}
function funcFive() {
    alert(`inside the funcFive function ${a}`);
}

funcFour();
funcFive(); // Output: inside the funcFive function hello

// Using let/const inside funcFour is different → only window.a works globally



// ================== #4 ==================
let b = 1;
function funcSix() {
    let b = "test"; // local shadowing
    alert(`inside the funcSix function ${b}`);
}
funcSix(); // Output: inside the funcSix function test

// If you use const instead of let → same result (const also block-scoped)



// ================== #5 ==================
let c = 2;
if (true) {
    let c = 5; // new block-scoped variable
    alert(`in the if block ${c}`);
}
alert(`outside of the if block ${c}`);

// Output:
// in the if block 5
// outside of the if block 2

// If you use const instead of let → same result (const also block-scoped)
