/****** BASIC EXAMPLE OF CONSTRUCTOR ******/
function Folder(type, storage, shared) {
    this.type = type;
    this.storage = storage;
    this.shared = shared;
    this.created = new Date();

    this.getInfo = () => {
        return `This is ${this.type} folder, it's size is ${this.storage}GB and it was created at ${this.created} and it is ${this.shared ? 'shared' :'not shared'}`;
    };
};

let folder1 = new Folder('games', 20, false);
let folder2 = new Folder('work', 10, true);

console.log('Basic - ', folder1.getInfo());
console.log('Basic - ', folder2.getInfo());
folder1.__proto__.__proto__ //Object
folder1.__proto__ //Folder constructor



/****** EXAMPLE OF CONSTRUCTOR WITH PROTOTYPES ******/
function Worker(name, position, salary) {
    this.name = name;
    this.position = position;
    this.salary = salary;
};
//Applying function to constructor's prototype attaches a SINGLE instance of this method to all of the Worker objects. Don't use arrow fn - context will be lost
Worker.prototype.getInfo = function () {
    return `${this.name} is working as a ${this.position} and earns ${this.salary} thousand dollars per year`;
};

let worker1 = new Worker('Jeremy', 'front-end developer', '10');
let worker2 = new Worker('Iryna', 'Manager', '100');
console.log('Basic prototype - ', worker1.getInfo());
console.log('Basic prototype - ', worker2.getInfo());



/****** EXAMPLE OF DEEP PROTOTYPAL INHERITANCE ******/
function Person(first, last, age, hobby, interests) {
    this.name = {
        first,
        last
    };
    this.age = age;
    this.hobby = hobby;
    this.interests = interests;
};
Person.prototype.personsInfo = function () {
    return `My name is ${this.name.first} ${this.name.last}. I am  ${this.age} years old. My hobby is ${this.hobby}. I am interested in ${this.interests}.`;
};

function Developer(first, last, age, hobby, interests, domain) {
    Person.call(this, first, last, age, hobby, interests);
    this.domain = domain;
};
Developer.prototype = Object.create(Person.prototype);
Developer.prototype.constructor = Developer;
Developer.prototype.greeting = function () {
    return `I am ${this.name.first}. I'm ${this.domain}developer.`;
};

let dev1 = new Developer('Anatolii', 'Yatsenko', '26', 'studying', 'coding', 'Javascript');
console.log('Nested inheritance 1lvl - ', dev1);
console.log('Nested inheritance 1lvl - ', dev1.greeting());
console.log('Nested inheritance 1lvl - ', dev1.personsInfo());

function Level(first, last, age, hobby, interests, domain, level) {
    Developer.call(this, first, last, age, hobby, interests, domain);
    this.level = level;
};
Level.prototype = Object.create(Developer.prototype);
Level.prototype.constructor = Level;
Level.prototype.getLevel = function () {
    return `${this.name.first} interests in ${this.interests} and is ${this.level} ${this.domain} Developer.`;
};

var level1 = new Level('Anatolii', 'Yatsenko', 25, 'reading', 'development', 'Javascript', 'Junior');
console.log('Nested inheritance 2lvl - ', level1.getLevel());
console.log('Nested inheritance 2lvl - ', level1.personsInfo());
console.log('Nested inheritance 2lvl - ', level1.greeting());
