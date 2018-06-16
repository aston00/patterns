//The Module pattern encapsulates "privacy", state and organization using closures.
//The pattern utilizes an immediately-invoked function expression (IIFE) -  where an object is returned.
//Within the Module pattern, variables or methods declared are only available inside the module itself thanks to closure. //Variables or methods defined within the returning object however are available to everyon
//Module pattern was originally developed by a number of people including Richard Cornford in 2003.
//it supports private data - so, in the Module pattern, public parts of our code are able to touch the private parts, however the outside world is unable to touch the class's private parts

//The disadvantages of the Module pattern are that as we access both public and private members differently, when we wish to change visibility, we actually have to make changes to each place the member was used.
//Other disadvantages include the inability to create automated unit tests for private members and additional complexity when bugs require hot fixes.
//We also can't access private members in methods that are added to the object at a later point.


//Basic
let moduleExample1 = (function(){
    //Private variable
    let justNumber = 20;
    //Private method
    let timeNow = (weather) => {
        let date = new Date();
        return `Time is ${date.getHours()}:${date.getMinutes()} and the weather is ${weather}.`;
    };

    return {
        //PUBLIC methods
        getNumber: () => justNumber,
        getTimeNow: (weather) => timeNow(weather)
    };
})();

console.log(moduleExample1);
console.log(moduleExample1.getNumber());
console.log(moduleExample1.getTimeNow('awesome'));

/****** MORE COMPLICATED EXAMPLE => 'https://github.com/aston00/task-manager' ******/

