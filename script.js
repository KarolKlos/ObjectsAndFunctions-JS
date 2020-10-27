//////////////////////////////////////////////////////////////
// Lecture: FUNCTION CONSTRUCTOR

// let john = {
//     name: 'John',
//     yearOfBirth: 1990,
//     job: 'teacher'
// };

let Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

//Inheritance in practice
//protorype property of "Person" Constructor, attached method to the Construtor function
Person.prototype.calculateAge = function() {
    console.log(2020 - this.yearOfBirth);
};

Person.prototype.lastName = 'Smith';

const john = new Person('John', 1990, 'teacher');
const jane = new Person('Jane', 1969, 'designer');
const mark = new Person('Mark', 1948, 'retired');

// john.calculateAge();
// jane.calculateAge();
// mark.calculateAge();

// console.log(john.lastName);
// console.log(jane.lastName);
// console.log(mark.lastName);



// OBJECT.CREATE

let personProto = {
    calculateAge: function () {
        console.log(2020 - this.yearOfBirth);
    }
};

const jake = Object.create(personProto); //The object is empty, now I need to fill it with a data

// Old way
jake.name = 'Jake';
jake.yearOfBirth = 1990;
jake.job = 'teacher';

// Proper way
const scott = Object.create(personProto,
{
    name: { value: 'Jane' },
    yearOfBirth: { value: 1969 },
    job: { value: 'designer' }
});



//////////////////////////////////////////////////////////////
// Lecture: PRIMITIVES VS OBJECTS

// Primitives
let a = 23;
let b = a;
a = 46;
//console.log(a);
//console.log(b);

// Objects
let obj1 = {
    name: 'Carlos',
    age: 26
};

let obj2 = obj1;
obj1.age = 30; //object mutation
//console.log(obj1.age);
//console.log(obj2.age);

// Functions
let age = 27;
let obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a, b) {
    a = 30; //variable
    b.city = 'San Francisco'; //object
}

change(age, obj);
//console.log(age);
//console.log(obj.city);



/////////////////////////////////////////////////////////////
// Lecture: PASSING FUNCTIONS AS ARGUMENTS

let years = [1986, 1965, 1939, 2010, 2000];

// I created a generic function which loops over an input array and then I gave it a function as input which is used to calculate something based on each element of the array...

// Generic function
function arrayCalc(arr, fn) {
    let arrRes = []; // array result
    for (let i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

//... and I have created a bunch of different callback functions for this. This is way better then having ONE BIG FUNCTION calculating all of the stuff at the same time because it creates more MODULAR and READABLE CODE

function calculateAge(el) {
    return 2020 - el;
}

function isFullAge(el) {
    return el >= 18;
}

function maxHeartRate(el) {
    if (el >= 18 && el <=81) {
        return Math.round(206.9 - (0.67 * el));
    } else {
        return -1;
    }
}

// Each of these tree functions has a simple and singel task. GOOD PRACTICE

let ages = arrayCalc(years, calculateAge);
let fullAges = arrayCalc(ages, isFullAge);
let rates = arrayCalc(ages, maxHeartRate);

//console.log(ages);
//console.log(fullAges);
//console.log(rates);



///////////////////////////////////////////////////////////////
// Lecture: FUNCTIONS RETURNING FUNCTIONS

function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ' can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

let designerQuestion = interviewQuestion('designer');
let teacherQuestion = interviewQuestion('teacher');

// I can use it as many times as I want
// designerQuestion('Elizabeth');
// teacherQuestion('Jeff');
// teacherQuestion('Mark');
// teacherQuestion('Steve');
// teacherQuestion('Bill');

// Calling a function without storing it in a variable
//interviewQuestion('designer')('Ren Zhengfei');



///////////////////////////////////////////////////////////////
// Lecture: IMMEDIATELY INVOKED FUNCTION'S EXPRESSIONS (IIFE)

// Small and silly game for example. I win the game when a random score from 0 to 9 is greater or equal to 5 and loose if it's smaller
function game() {
    let score = Math.random() * 10;
    console.log(score >= 5);
}
game();

//Somethign like this without the name but also witout parenteses then the JS Parser would think that this is a function declaration but since I don't have any name for the function declaration then it will throw an error. So I basically need to trick The Parser and make it believe that what I have here is an EXPRESION, not a declaration...
/* 
function () {

}
*/
//... and the solution is to wrap the entire think in to parenteses because in JS what inside parenteses can not be a statement and like this JS will know tha should treat this as an expresion, not as a declaration. And then after that I only have to invoke the function because if I didn't do this it will never be called and never do anything and since I don't attached this to a variable then nothing would never happened. 

//I can no longer access score variable from outside. I create dana privacy here

// IIFE example
(function () {
    let score = Math.random() * 10;
    console.log(score >= 5);
})(); //"();" invoking this anonimous function

//console.log(score); score var is not defined, I can't see score value

// Passing arguments in to the IIFE - the more goodluck I add to the game then the higher chance to win the game
(function (goodLuck) {
    let score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(5);

// All I want here is to create a new scope that is hidden from the outside scope so where I can safely put variables and with this I obtain data privacy and also don't interfere with other variables in my GLOBAL execution context



///////////////////////////////////////////////////////////////
// Lecture: CLOSURES

// CLOSURE SUMMARY - An inner function has always access to the variables and parameters of its outer function  even after the outer function has returned
function retirement(retirementAge) {
    let a = ' years left until retirement.';
    return function (yearOfBirth) {
        let age = 2020 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}


let retirementUS = retirement(66);
let retirementGermany = retirement(65);
let retirementIceland = retirement(67);

retirementUS(1990);
retirementGermany(1990);
retirementIceland(1990);

//retirement(65)(1990);

//interviewQuestion CLOSURE version, cleaner code
function interviewQuestion2(job) {
    return function(name) {
        if (job === 'designer') {
            console.log(name + ' can you please explain what UX design is?');
        } else if (job === 'teacher') {
            console.log('What subject do you teach, ' + name + '?');
        } else {
            console.log('Hello ' + name + '. What do you do?');
        }
    }
}

interviewQuestion2('teacher')('Simon');
interviewQuestion2()('Lily');

//let desiQuestion = interviewQuestion2('designer');
//let teachQuestion = interviewQuestion2('teacher');

//designerQuestion2('Elizabeth');
//teacherQuestion2('Jeff');



///////////////////////////////////////////////////////////////
// Lecture: BIND, CALL AND APPLY METHODS

let bill = {
    name: 'Bill',
    age: 26,
    job: 'teacher',
    presentation: function (style, )
}