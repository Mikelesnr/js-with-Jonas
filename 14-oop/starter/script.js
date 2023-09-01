'use strict';

const Person = function (firstName, birthYear) {
    //instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;
};

const jonas = new Person('Jonas', 1990);
console.log(JSON);

//1. New {} is created
//2. funtion is called, this = {}
//3. {} Linked to prototype
//4. funtion automatically returns {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
// console.log(matilda,jack)

// console.log( jonas instanceof Person);

//prototypes
// console.log(Person.prototype);

Person.prototype.calcAge = function () {
    this.year = new Date().getFullYear()
    return (Number(this.year) - this.birthYear);
};


// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person));

// console.log(`${jonas.firstName} is ${jonas.calcAge()} years old`);

Person.prototype.species = "Homo Sapien";
// console.log(jonas.species,matilda.species);
// console.log(matilda.hasOwnProperty('species'));
// console.log(matilda.hasOwnProperty('firstName'))

// console.log(jonas.__proto__);
//object.prototype (top of prototype chain)
// console.log(jonas.__proto__.__proto__);
//this will be null
// console.log(jonas.__proto__.__proto__.__proto__);

// console.log(Person.prototype.constructor);
// console.dir(Person.prototype.constructor);

//array prototypes
const arr = [3, 6, 4, 5, 6, 9, 6, 4, 9, 3]; //new Array === []

// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);

// console.log(arr.__proto__.__proto__);

/* Extending the prototype of a build in object is not advisable because:
*  the next version of js may have a method with the same name which works differently
*  When working on a team it creates bugs
*/
Array.prototype.unique = function () {
    return [...new Set(this)];
}

// console.log(arr.unique());

// const h1 = document.querySelector('h1');

// console.dir(h1);


const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function (increase) {
    return this.speed + increase;
}

Car.prototype.brake = function (decrease) {
    return this.speed - decrease;
}

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

// console.log(bmw.speed," ",mercedes.speed);
// console.log(bmw.accelerate(10)," ",mercedes.brake(5));

////Es6 classes
//class expression

// const PersonCl = class{}

//class decalration
class PersonCl {
    constructor(name, birthYear) {
        this.name = name;
        this.birthYear = birthYear;
    }

    //methods will be added to the prototype though you can still do it maually
    calcAge() {
        this.year = new Date().getFullYear()
        console.log(this.age);
    }

    get age() {
        return `${this.name} is ${Number(this.year) - this.birthYear} years old`
    }

    set fullName(name) {
        if (name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name!`);
    }

    get fullName() {
        return this._fullName;
    }

    //static method
    static hey() {
        console.log('Hey there ' + this.name + ' 👋')
    }
}

PersonCl.hey();

PersonCl.prototype.greet = function () {
    console.log(`Hello ${this.name}!`)
}
const mike = new PersonCl('Michael Mwanza', 1990);
mike.calcAge();
mike.greet();
// console.log(mike.age);
mike.fullName = mike.name;
// console.log(mike.fullName);

//1. Classes are not hoisted
//2. Classes are first class citizens
//3. Classes are always executed in strict mode

//getters and setters

const account = {
    owner: 'mike',
    movements: [200, 530, 120, 300],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    },

};

// console.log(account.latest);

account.latest = 50;
// console.log(account.movements);


const PersonProto = {
    calcAge() {
        this.year = new Date().getFullYear()
        console.log(this.age);
    },

    get age() {
        return `${this.name} is ${Number(this.year) - this.birthYear} years old`
    },

    init(name, birthYear) {
        this.name = name;
        this.birthYear = birthYear;
    },
}

const steven = Object.create(PersonProto);
console.log(steven);
// steven.name = "Steven Seagal";
// steven.birthYear = "1952";
steven.init('Steven Seagal', 1952);
steven.calcAge();


//coding challenge
class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed = this.speed + 10;
        console.log(`${this.make} is traveline at ${this.speed}km/h`);
        this.speedUs = this.speed;
    }

    brake() {
        this.speed = this.speed - 5;
        console.log(`${this.make} is traveline at ${this.speed}km/h`);
        this.speedUs = this.speed;
    }

    set speedUs(speed) {
        this._speedUs = (speed / 1.6).toFixed(2);
    }

    get speedUs() {
        console.log(`${this.make} is traveline at ${this._speedUs}mi/h`)
    }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speed);
ford.accelerate();
ford.speedUs;
ford.brake();
ford.speedUs;

const Student = function (name, birthYear, course) {

    Person.call(this, name, birthYear)
    this.course = course;
}

//linking prototypes
Student.prototype = Object.create(Person.prototype);
console.dir(Student.prototype.constructor);
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);


Student.prototype.intoduce = function () {
    console.log(`My name is ${this.name} and I study ${this.course}.`)
}

const ngoni = new Student('Ngonie', 1990, 'Computer Science');

console.log(ngoni);
ngoni.intoduce();
console.log(ngoni.calcAge());

//coding challenge 3
class Ev {
    constructor(make, speed, charge) {
        Car.call(this, make, speed)
        this.batteryCharge = charge;
    }

    accelerate() {
        this.speed += 20;
        this.batteryCharge -= 1;
        console.log(`${this.make} is traveling at ${this.speed}km/h with a charge of ${this.batteryCharge}%`);
    }

    brake = function () {
        this.speed -= 10;
        this.batteryCharge += 1;
        console.log(`${this.make} is traveling at ${this.speed}km/h with a charge of ${this.batteryCharge}%`);
    }

    set chargeBattery(chargeTo) {
        this.batteryCharge = chargeTo;
    }

    get chargeBattery() {
        console.log(this.batteryCharge);
    }

}
//linking prototypes
// Ev.prototype = Object.create(Car.prototype);
// Ev.prototype.constructor = Ev;


const tesla = new Ev('Testla', 120, 23);
tesla.accelerate();
tesla.chargeBattery;
tesla.chargeBattery = 50;
tesla.chargeBattery;
tesla.brake();
console.log(tesla);