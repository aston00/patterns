//Singleton pattern is thus known because it restricts instantiation of a class to a single object. 
//Singleton pattern can be implemented by creating a class with a method that creates a new instance of the class if one doesn't exist.
//Singletons differ from static classes (or objects) as we can delay their initialization, generally because they require some information that may not be available during initialization time. 
//Singleton creates a single copy of a function and prevents creating more same copies if the one already exists.
//It is important to note the difference between a static instance of a class (object) and a Singleton: whilst a Singleton can be implemented as a static instance, it can also be constructed lazily, without the need for resources nor memory until this is actually needed.
//So the idea is to put a function inside IIFE .That function has pub/priv methods and return the result of that inner function as a result of the IIFE, at the same time checking whether that singleton already exists in the return part of IIFE(we need a private variable in IIFE for that which will show if it's not undefined that instance has already been created and will prevent us from creating new instances). As soon as we create the first singleton, instance variable will not be empty anymore what will prevent us from creating new instances of the same function



/****** PROPER SINGLETON ******/
let properSingleton = (() => {
    // Instance variable to store a reference to the Singleton and which shows whether to create new instance or the one already exists
    let instance;

    // Singleton
    function init() {
        // Private methods and variables
        function privateMethod() {
            return "I am private";
        }
        let privateVariable = "Im also private";
        let privateRandomNumber = Math.random();

        return {
            // Public methods and variables
            publicMethod: () => privateMethod(),
            publicProperty: "I am also public",
            getRandomNumber: () => privateRandomNumber
        };
    };
    return {
        // Get the Singleton instance if one exists or create one if it doesn't
        getInstance: () => {
            if (!instance)
                instance = init();
            return instance;
        }
    };
})();



/****** BAD SINGLETON ******/
//Bad singleton as we do not check if the instance of this function already exists, so we create new instance each time
let myBadSingleton = (() => {
    // Instance stores a reference to the Singleton
    let instance;

    function init() {
        // Singleton
        let privateRandomNumber = Math.random();
        return {
            getRandomNumber: () => privateRandomNumber
        };
    };
    return {
        // Always create a new Singleton instance
        getInstance: () => {
            instance = init();
            return instance;
        }
    };
})();

// Usage:
let singleA = properSingleton.getInstance();
let singleB = properSingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber()); // true
console.log(singleA);
console.log(singleA.publicMethod())
console.log(singleA.publicProperty);
console.log(singleB.getRandomNumber());

let badSingleA = myBadSingleton.getInstance();
let badSingleB = myBadSingleton.getInstance();
console.log(badSingleA.getRandomNumber() !== badSingleB.getRandomNumber()); // true
console.log(badSingleA);
console.log(badSingleA.getRandomNumber());
console.log(badSingleB);
console.log(badSingleB.getRandomNumber());



/****** Aka Factory method ******/
//Here, getInstance becomes a little like a Factory method and we don't need to update each point in our code accessing it. FooSingleton above would be a subclass of BasicSingleton and implement the same interface.
properSingleton.getInstance = () => {
    if (this._instance == null) {
        if (isFoo())
            this._instance = new FooSingleton();
        else
            this._instance = new BasicSingleton();
    }
    return this._instance;
};



/****** SINGLETON EXAMPLE ******/
//In practice, the Singleton pattern is useful when exactly one object is needed to coordinate others across a system.
let SingletonTester = (() => {
    // our instance holder
    let instance;
    // options: an object containing configuration options for the singleton
    // e.g let options = { name: "test", pointX: 5};
    function Singleton(options) {
        // set options to the options supplied
        // or an empty object if none are provided
        options = options || {};
        // set some properties for our singleton
        this.name = "SingletonTester";
        this.pointX = options.pointX || 6;
        this.pointY = options.pointY || 10;
    }

    // an emulation of static variables and methods
    let _static = {
        name: "SingletonTester",
        // Method for getting an instance. It returns
        // a singleton instance of a singleton object
        getInstance: (options) => {
            if (instance === undefined)
                instance = new Singleton(options);
            return instance;
        }
    };
    return _static;
})();
let singletonTest = SingletonTester.getInstance({
    pointX: 5
});
// Log the output of pointX just to verify it is correct
console.log(singletonTest.pointX); // Outputs: 5