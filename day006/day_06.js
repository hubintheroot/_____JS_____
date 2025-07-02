console.log('--- 기초 ---');
// 기초 1.
(() => {
  const person = { name: 'Ghost', age: 20 };
  console.log(person.name);
})();

// 기초 2.
(() => {
  const person = { name: 'Ghost', age: 20 };
  console.log(person.age);
})();

// 기초 3.
(() => {
  const person = { name: 'Ghost', age: 20 };
  delete person.age;
})();

// 기초 4.
(() => {
  const person = { name: 'Ghost', age: 20 };
  console.log(Object.keys(person));
})();

// 기초 5.
(() => {
  const person = { name: 'Ghost', age: 20 };
  console.log(Object.values(person));
})();

// 기초 6.
(() => {
  const person = { name: 'Ghost', age: 20 };
  for (const k in person) {
    console.log(k, person[k]);
  }
})();

// 기초 7.
(() => {
  const person = { name: 'Ghost', age: 20 };
  console.log(Object.hasOwn('age'));
})();

// 기초 8.
(() => {
  const person = { name: 'Ghost', age: 20 };
  Object.entries(person).map(([key, value]) => console.log(key + ':' + value));
})();

// 기초 9.
(() => {
  const person = {};
  person.name = 'Ghost';
  person.age = 20;
  console.log(person);
})();

// 기초 10.
(() => {
  const person = { name: 'Ghost', age: 20 };
  console.log(Object.keys(person).length);
})();

//------------------------------------//
// 실전 1.
console.log('--- 실전 ---');

(() => {
  const users = [
    { name: 'Ghost', age: 20 },
    { name: 'Irangi', age: 22 },
    { name: 'Camel', age: 19 },
  ];
  console.log(users.map((obj) => obj.name));
})();

// 실전 2.
(() => {
  const user = { name: 'Ghost', age: 20 };
  const user2 = { ...user };
  user2.age = 30;
  console.log(user2);
})();

// 실전 3.
(() => {
  const person = { name: 'Ghost' };
  person.hobby = 'soccer';
  console.log(person);
})();

// 실전 4.
(() => {
  const obj1 = { a: 1 };
  const obj2 = { b: 2 };
  const combineObj = { ...obj1, ...obj2 };
  console.log(combineObj);
})();

// 실전 5.
(() => {
  const person = { name: 'Ghost', age: 20 };
  const arr = Object.entries(person).map(([k, v]) => k + ':' + v);
  console.log(arr);
})();

// 실전 6.
(() => {
  const users = [
    { name: 'Ghost', age: 20 },
    { name: 'Camel', age: 19 },
    { name: 'Irangi', age: 22 },
  ];
  const arr = users.filter((obj) => obj.age >= 20);
  console.log(arr);
})();

// 실전 7.
(() => {
  const person = { name: 'Ghost', hobby: 'soccer' };
  const obj = Object.keys(person).reduce((a, k) => {
    a[k.toUpperCase()] = person[k].toUpperCase();
    return a;
  }, {});
  console.log(obj);
})();

// 실전 8.
(() => {
  const person = { name: 'Ghost', info: { email: 'ghost@email.com' } };
  console.log(person.info.email);
})();

// 실전 9.
(() => {
  const obj = { a: 1, b: 2, c: 3 };
  console.log(Object.keys(obj).every((k) => typeof obj[k] === 'number'));
})();

// 실전 10.
(() => {
  const users = [
    { name: 'Ghost', age: 20 },
    { name: 'Camel', age: 19 },
    { name: 'Irangi', age: 22 },
  ];
  const old = [...users].sort((a, b) => b.age - a.age)[0];
  console.log(old.name);
})();
