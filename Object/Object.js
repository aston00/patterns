//Object creation
let obj;
obj = {};
obj = new Object();
obj = Object.create(Object.prototype);

obj.__proto__ // Object


//Key assignment
obj.key_name = 'hello';

obj[key_name] = 'hello';

Object.defineProperty(obj, key_name, {
    value: 'hello',
    enumerable: true,
    writable: true,
    configurable: true
});

Object.defineProperties(obj, {
    key_name: {
        value: 'hello',
        writable: true
    },
    key_name2: {
        value: 'hello2',
        writable: true
    }
})

