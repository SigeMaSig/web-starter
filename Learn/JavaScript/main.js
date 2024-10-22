// String , number , boolean , array , object
// 1. String - ตัวอักษร
// let fristname = 'kie'
// const idcard = '1234'

// console.log('My name is',fristname)

// // 2. Number - ตัวเลข
// let age = 27
// let height = 1.70

// // 3. Boolean
// let isThai = true

// fristname = 'OwO'

// console.log('My name is ',fristname , 'and my age is ', age)
// console.log()


/*
+ บวก (srting)
- ลบ
* คูณ
/ หาร
% หารเหลือเศษ (mod)

*/

// let number1 = 'test'
// let number2 = 'num'

// let number3 = number1 + number2
// console.log('New number is ',number3)


/* 
== เท่ากับ
!= ไม่เท่ากับ
> น้อยกว่า
< มากกว่า
>= น้อยกว่าหรือเท่ากับ
<= มากกว่าหรือเท่ากับ
*/
 
// let number1 = 5
// let number2 = 5

// // let condition1 = number1 >= number2 // boolean (true , false)
// // console.log('result of condition1 is ',condition1)

// //if - else condition
// if (number1 != number2) {
//     console.log('this is if')
// } 
//     else if(number1 == number2) {
//     console.log('this is else if')
//     } 
//         else {
//     console.log('this is else')
//         }



/* 
Grade 
>= 80 A
>= 70 B
>= 60 C
>= 50 D
< 50 F
*/

// let score = prompt('ใส่คะแนนของคุณ')
// console.log('you score is ',score)

// // if - else condition
// if (score>=80){
//     console.log('You are A')
// } else if (score>=70){
//     console.log('You are B')
// } else if (score>=60){
//     console.log('You are C')
// } else if (score>=50){
//     console.log('You are D')
// } else {
//     console.log('You are F')
// }


/*
&& และ
|| หรือ
! ไม่
*/
// let number1 = 5
// let number2 = 8

// let condition1 = number1 >= 3 || number2 >= 10
// console.log ('result of condition1 is ',condition1)

// let number = 20
// if (!(number %2 == 0)){
//     console.log('number is even')
// }


/* 
while
for
*/

// let counter = 0
// while (counter <= 10) {
//     console.log('Hello word')
//     counter++
// }

// for (let counter = 0 ; counter<10; counter++) {
//     console.log('Hello word')
// }

/* 
array
*/
// let age1 = 30
// let age2 = 40
// let age3 = 50

// console.log('age',age1,age2,age3)

// let ages = [30,40,50,45] // array 3 item
// console.log('new age',ages[1])
// console.log('age list',ages)

// // 1.แทนที่
// ages = [40,50]
// console.log('age list',ages)

// // 2.ต่อ Array
// ages.push(60)
// console.log('age list',ages)

// ages.pop()
// console.log('age list',ages)

// if(ages.includes(40)){
//     console.log('You have 40 in list')
// }

// ages.sort()
// console.log('age list',ages)

// let name_list = ['mike','john','jane']
// name_list.push('peter')


// console.log('name list',name_list.length)

// for (let index=0 ; index < name_list.length; index++) {
//     console.log(name_list[index])
// }


/*
Object + array
*/
// let student = [{
//     age:30,
//     name:'kie',
//     grade: 'A'
// },{
//     age:40,
//     name:'jane',
//     grade: 'C'
// }
// ]

// student.pop()

// for(let index = 0; index < student.length; index++) {
//     console.log('Student Number',(index+1))
//     console.log('name',student[index].age)
//     console.log('age',student[index].name)
//     console.log('grade',student[index].grade)
// }

// let score1 = 50
// let score2 = 80
// let grade = ''

// // กระกาศ Function , arrow function
// แบบ Function
// function calculateGrade(score) {
//     if (score >= 80) {
//         grade = 'A'
//     } else if (score >= 70) {
//         grade = 'B'
//     } else if (score >= 60) {
//         grade = 'C'
//     } else if (score >= 50) {
//         grade = 'D'
//     } else {
//         grade = 'F'
//     }
//     return grade
// }
// แบบ arrow function
// let calculate_Grade = (score) => {
//     if (score >= 80) {
//         grade = 'A'
//     } else if (score >= 70) {
//         grade = 'B'
//     } else if (score >= 60) {
//         grade = 'C'
//     } else if (score >= 50) {
//         grade = 'D'
//     } else {
//         grade = 'F'
//     }
//     return grade
// }

// //ใช้ Function
// let grade1 = calculateGrade(score1)
// let grade2 = calculateGrade(score2)

// console.log('grade',grade1,grade2)


/*
Array
*/

// let score = [10,20,30]

// for (let index = 0; index < score.length; index++) {
//     console.log('score',score[index])
// }

// score = score.map((s)=> {
//     return s * 2
// }
// )

// for (let index = 0; index < score.length; index++) {
//     console.log('score',score[index])
//     // if (score[index] >= 30) {
//     //     newScore.push(score[index])
//     // }
// }

// let newScore = score.filter((s)=>{
//         return s >= 30
// })

// newScore.forEach((ns)=>{
//     console.log('new score',ns)
// })



// score.forEach((s)=> {
//     console.log('score',s)
// })

// Map , fillter


let studens = [{
    age:30,
    name:'kie',
    score: 50,
    grade: 'A'
},{
    age:40,
    name:'jane',
    score: 80,
    grade: 'C'
},{
    age:50,
    name:'peter',
    score: 60,
    grade: 'B'
}
]

let student = studens.find((s)=> {
    if (s.name == 'peter') {
        return true
    }
})

// let doublescore_student = studens.map((s)=> {
//     s.score = s.score*2
//     return s
// })

let heightScore_student = studens.filter((s)=> {
    if (s.score >= 60) {
        return true
    }
})

console.log('student',student)

// console.log('doublescore_student',doublescore_student)

console.log('heightScore_student',heightScore_student)
