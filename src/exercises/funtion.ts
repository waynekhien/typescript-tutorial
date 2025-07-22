//Bai 1
// Viết hàm 'sum' nhận vào 2 số, trả về tổng, với tham số thứ hai có default value = 10
function sum(a: number, b : number = 10){
    return a + b;
}
console.log(sum(9));

//Bai 2
// Sử dụng rest parameter để viết hàm 'mergeStrings' nhận nhiều chuỗi, trả về chuỗi đã
function mergeStrings(...string: string[]){
    return string.join('');
}
console.log(mergeStrings('Nguyen', 'Gia', 'Khien', '!'));

//Bai 3
// Overload hàm 'getValue' để xử lý 2 trường hợp:
// - Nếu đầu vào là string, trả về string uppercase
// - Nếu đầu vào là number, trả về số * 2
function getValue(value: string): string;
function getValue(value: number): number;

function getValue(value : string | number) {
    if(typeof value === 'string') {
        return value.toUpperCase();
    }
    else if(typeof value === 'number') {
        return value * 2;
    }
}
console.log(getValue('khien nguyen'));
console.log(getValue(5));



//Bai 4
// Tim hieu ve generic va ung dung
// Sử dụng generic để viết hàm 'filterArray' lọc các phần tử theo điều kiện
function filterArray<T>(arr: T[], condition: (item: T) => boolean): T[] {
    // Triển khai logic
    let result: T[] = [];
    for(let i = 0; i < arr.length; i++) {
        if(condition(arr[i])) {
            result.push(arr[i]);
        }
    }
    return result;
}
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = filterArray(numbers, (num) => num % 2 === 0);
console.log(evenNumbers);