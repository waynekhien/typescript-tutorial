//Bai 1
// Tạo class 'Animal' với:
// - private property 'name'
// - constructor khởi tạo name
// - method 'speak()' in ra tên
class Animal {
    private name : string;
    constructor(name:string){
        this.name = name;
    }
    speak() {
        console.log(`Animal name is: ${this.name}`);
    }
}
const animal = new Animal("Cat");
animal.speak();

//Bai 2
// Tạo class 'Cat' kế thừa 'Animal', override method 'speak()' để in "Meow"
class Cat extends Animal {
    speak() {
        console.log(`Cat speak: Meow`);
    }
}
const cat = new Cat("Kitty");
cat.speak();


//Bai 3
// Tạo abstract class 'Shape' với abstract method 'area()', sau đó triển khai cho class
abstract class Shape {
    abstract area(): number;
}
class Square extends Shape {
    private side: number;
    constructor(side: number) {
        super();
        this.side = side;
    }
    area(): number {
        return this.side * this.side;
    }
}
const mySquare = new Square(5);
console.log(`Area of square: ${mySquare.area()}`);





//Bai 4
// Sử dụng getter/setter để validate giá trị age (0 < age < 120) trong class 'Person'
class Person {
    private _age: number = 0;
    constructor(age: number) {
        this.age = age;
    }
    get age(): number {
        return this._age;
    }
    set age(value: number) {
        if (value <= 0 || value >= 120) {
            throw new Error("Age must be between 0 and 120");
        }
        this._age = value;
    }
}
const person = new Person(25);
console.log(`Person age: ${person.age}`);

person.age = 30; 
console.log(`Updated person age: ${person.age}`);
