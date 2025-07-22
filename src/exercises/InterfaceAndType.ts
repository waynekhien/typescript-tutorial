//Bai 1
// Định nghĩa interface 'Car' với các thuộc tính:
// - brand (string, readonly)
// - speed (number)
// - start() (method)
interface Car {
    readonly brand: string;
    speed: number;
    start(): void;
}

const myCar: Car = {
    brand: "Toyota",
    speed: 60,
    start() {
        console.log(`${this.brand} is running at ${this.speed} km/h`);
    }
};
console.log(myCar);
myCar.start();


//Bai 2
// Tạo type 'Person' và 'Employee' kế thừa Person, thêm thuộc tính 'employeeId'
type Person = { name: string };
type Employee = Person & { employeeId: number };
const employee: Employee = {
    name: 'Nguyen Gia Khien',
    employeeId: 123
};
console.log(employee);


//Bai 3
// Sử dụng index signature để định nghĩa type 'Dictionary' cho object có key là string
type Dictionary = {
    [key: string]: string | number;
};
const myDictionary: Dictionary = {
    name: "Khien",
    age: 22,
    city: "Nam Dinh",
};
console.log(myDictionary);
console.log(myDictionary['name']);



//Bai 4
// Viết utility type 'OptionalFields<T>' để biến tất cả thuộc tính của T thành optional
type OptionalFields<T> = {
    [K in keyof T]?: T[K];
};

type User = {
    name: string;
    age: number;
    email: string;
};
type OptionalUser = OptionalFields<User>;
const user: OptionalUser = {
    name: "Nguyen Gia Khien",

};
console.log(user);



