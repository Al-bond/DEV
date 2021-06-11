
//1
let ob = {"name": "Вася", "email": "vasya@example.com", "age": 20};

function cloneDeep(ob){
    let ob1 = {};
    return Object.assign(ob1, ob);
}
let ob2 = cloneDeep(ob);


//2
var arays = [[1, 2, 3], [4, 5], [6]];

let arr = [].concat(...arrays);


//3
function MultiplicatorUnitFailure() {}
function primitiveMultiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}
function reliableMultiply(a, b) {
  let result = primitiveMultiply;
  try {
    return result(a, b);
  }catch(e){
    return reliableMultiply(a, b); 
  }
}
console.log(reliableMultiply(8, 8))


//4
Array.prototype.append = function(a){
  let array= new Array(a, ...this);

  for(let i=0; array.length>i; i++){
    this[i]=array[i]
  }
}
var arr = [1, 2, 3];
arr.append(0);


//5
var arr = ['Solnce', 'vishlo', 'iz', 'za', 'tuchi']; 
function recuseLog(arr, i=0) {
  if(arr.length>i){
    recuseLog(arr, ++i);
  }
} 
recuseLog(arr);

//6
var a = function(one, two) {
  return one + two
}
var b = function() {
  return false;
}

function paralell([[a,[one, two]], [b]], d){
 
  let results = a(one, two);
  let res = b();
  if(results??res){
    d([results, res])
  };
}
paralell([[a, [1, 2]], [b]], function(results) {
            console.log(results); // [3, false]
          }
        );


//7!!!

Синтаксис: array_find(arr: array, search: string|regex): string|number[]|null
Пример: 


let testData = [1, 2, 1990, 85, 24, "Vasya", "colya@example.com", 
                    "Rafshan", "ashan@example.com", true, false];

function array_find(arr, any){
  
  if(any.indexOf('/')===0){
    let a = any.split('/');

    reg = new RegExp(a[1], 'i');
    return arr.find(item=> {
      if(String(item).match(reg)){
        return item
      }
    })
  }
  return arr.find(item=> String(item).includes(any))
   
}

let result = array_find(testData, '/^raf.*/i') // ["Rafshan"] не смог извлечь регулярное выражение из строки
let result2 = array_find(testData, "Rafshan") // ["Rafshan"]


//8 Синтаксис: array_skip_until(arr: array, value: any): any[]
let testData = [1, 2, 1990, 85, 24, "Vasya", "colya@example.com", 
                    "Rafshan", "ashan@example.com", true, false];


function array_skip_until(arr, any){
  let array = [...arr];//ну ж но ли сохронять входящий масив? на всяк  
  return array.indexOf(any)!==-1?array.splice(array.indexOf(any)):[]
}
 
let result = array_skip_until(testData, 2) // [2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false]
let result2 = array_skip_until(testData, "Rafshan") // ["Rafshan", "ashan@example.com", true, false]
let result3 = array_skip_until(testData, []) // []

//9!!!


//10

let testData = [1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false];
let testData2 = [1, 2, 1990, 85, 24, 5, 7, 8.1];


function array_unique(arr){
  let set = new Set(arr);
  let array = [];
  for(let value of set){
    array.push(value);
  }
  return array;
}
let result = array_unique(testData.concat(testData2))
 // [1, 2, 1990, 85, 24, 5, 7, 8.1, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false]


 //11

let testData3 = [{"name":"Vasya","email":"vasya@example.com","age":20,"skills":{"php":0,"js":-1,"madness":10,"rage":10}},
                  {"name":"Dima","email":"dima@example.com","age":34,"skills":{"php":5,"js":7,"madness":3,"rage":2}},
                  {"name":"Colya","email":"colya@example.com","age":46,"skills":{"php":8,"js":-2,"madness":1,"rage":4}},
                  {"name":"Misha","email":"misha@example.com","age":16,"skills":{"php":6,"js":6,"madness":5,"rage":2}},
                  {"name":"Ashan","email":"ashan@example.com","age":99,"skills":{"php":0,"js":10,"madness":10,"rage":1}},
                  {"name":"Rafshan","email":"rafshan@example.com","age":11,"skills":{"php":0,"js":0,"madness":0,"rage":10}}]

function array_pluck(arr, any){
    any = any.split('.');    //разбил ключ на значения по "."
    let array = [];
    
  function foo(arr, any){

    array=[];
    let map = arr.map(item=>new Map(Object.entries(item)));//перевел обьекты в Мар, до вложеного обькта
  
    for(let i of map){
      array.push(i.get(any[0]))       //поиск по первому ключу. сохранение результатов
    }

    any.splice(0, 1);                 //удаление ключа по которому прошол поиск
 
    if(any.length>0){                //проверка. если присутствует ключ на дальнейший поиск запускает функцию foo 
      foo(array, any)                //уже с следующим ключом и сохранеными вложеными обьктами из предыдущего поиска
    }                                 //по идее должно работать с большими вложениями :)
  }

  foo(arr, any);
  return array;
}

  let result = array_pluck(testData3, 'name') // ["Vasya", "Dima", "Colya", "Misha", "Ashan", "Rafshan"]
  let result2 = array_pluck(testData3, 'skills.php') // [0, 5, 8, 6, 0, 0]


//12
let testData = [1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false];
let testData2 = [1, 2, 1990, 85, 24, 5, 7, 8.1];
 

function array_combine(test, test2){
  
  let result = {};
  test.forEach((item, i) => result[item] = test2[i]);
  return result;
}

let result = array_combine(testData, testData2) // {1: 1, 2: 2, 1990: 1990, 85: 85, 24: 24, "Vasya": 5, "colya@example.com": 7, "Rafshan": 8.1, "ashan@example.com": undefined}



//12
let testData = [1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false];
let testData2 = [1, 2, 1990, 85, 24, 5, 7, 8.1];

function array_combine(test, test2) {
  var result = {};
  for (var i = 0; i < test.length; i++) {
    function foo(tes){                    // проверить все ключи
      if(tes===true||tes===false){
        test.splice(i, 1);                //удаляем не подходящий ключ
        foo(test[i])                      //запускаем проверку следующего ключа
      }
    }
    foo(test[i]);
    if(test[i]===undefined){              //если крайний ключ не подходит и удаляеться. проскакивает undefined 
      return result;
    }
      result[test[i]] = test2[i];
  }
  return result;
};
let result = array_combine(testData, testData2)




