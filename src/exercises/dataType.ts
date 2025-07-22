//Bai 1
// Fix lỗi type và giải thích
let age: number = 25;
let isActive: boolean = true;
let data: any = { x: 10 };
data = "hello";


//Bai 2
// Định nghĩa biến 'user' với các type sau bằng type annotation:
// - name (string, bắt buộc)
// - age (number, optional)
// - roles: tuple gồm 2 thanh phan string va number
type User = {
    name : string;
    age ?: number;
    roles : [string, number];
};

//Bai 3
// Sử dụng type assertion để fix lỗi
const input = document.getElementById("input") as HTMLInputElement;
const value = Number(input.value);

//Bai 4
// Khi nào dùng 'unknown' thay cho 'any'? Viết ví dụ minh họa.
// 'unknown' được sử dụng khi không biết chắc chắn kiểu dữ liệu của biến,
let unknownValue: unknown;
unknownValue = "Hello, world!";
if (typeof unknownValue === "string") {
    console.log(unknownValue.toUpperCase()); 
}