//The Observer is a design pattern where an object (known as a subject) maintains a list of objects depending on it (observers), automatically notifying them of any changes to state.
//When a subject needs to notify observers about something interesting happening, it broadcasts a notification to the observers (which can include specific data related to the topic of the notification).
//When we no longer wish for a particular observer to be notified of changes by the subject they are registered with, the subject can remove them from the list of observers.
//For example, when an object needs to be able to notify other objects without making assumptions regarding those objects.
//Dynamic relationships can exist between observers and subjects when using either pattern. This provides a great deal of flexibility which may not be as easy to implement when disparate parts of our application are tightly coupled.

//Consequently, some of the issues with these patterns actually stem from their main benefits. In Publish/Subscribe, by decoupling publishers from subscribers, it can sometimes become difficult to obtain guarantees that particular parts of our applications are functioning as we may expect.
//Another draw-back of the pattern is that subscribers are quite ignorant to the existence of each other and are blind to the cost of switching publishers. Due to the dynamic relationship between subscribers and publishers, the update dependency can be difficult to track.

function ObserverList() {
    this.observerList = [];
}


// The Observer
function Observer() {
    this.update = function () {
        // ...
    };
}

ObserverList.prototype.add = function (obj) {
    return this.observerList.push(obj);
};

ObserverList.prototype.count = function () {
    return this.observerList.length;
};

ObserverList.prototype.get = function (index) {
    if (index > -1 && index < this.observerList.length) 
        return this.observerList[index];
    
};

ObserverList.prototype.indexOf = function (obj, startIndex) {
    let i = startIndex;

    while (i < this.observerList.length) {
        if (this.observerList[i] === obj) 
            return i;
        i++;
    }
    return -1;
};


ObserverList.prototype.removeAt = function (index) {
    this.observerList.splice(index, 1);
};



function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.addObserver = function (observer) {
    this.observers.add(observer);
};

Subject.prototype.removeObserver = function (observer) {
    this.observers.removeAt(this.observers.indexOf(observer, 0));
};

Subject.prototype.notify = function (context) {
    let observerCount = this.observers.count();
    for (let i = 0; i < observerCount; i++) {
        this.observers.get(i).update(context);
    }
};

// Extend an object with an extension
function extend(obj, extension) {
    for (let key in extension) {
        obj[key] = extension[key];
    }
}


// References to our DOM elements

let controlCheckbox = document.querySelector("#mainCheckbox"),
    addBtn = document.querySelector("#addNewObserver"),
    container = document.querySelector("#observersContainer");


// Concrete Subject

// Extend the controlling checkbox with the Subject class
extend(controlCheckbox, new Subject());

// Clicking the checkbox will trigger notifications to its observers
controlCheckbox.onclick = function () {
    controlCheckbox.notify(controlCheckbox.checked);
};

addBtn.onclick = addNewObserver;

// Concrete Observer

function addNewObserver() {

    // Create a new checkbox to be added
    let check = document.createElement("input");
    check.type = "checkbox";

    // Extend the checkbox with the Observer class
    extend(check, new Observer());

    // Override with custom update behaviour
    check.update = function (value) {
        this.checked = value;
    };

    // Add the new observer to our list of observers
    // for our main subject
    controlCheckbox.addObserver(check);

    // Append the item to the container
    container.appendChild(check);
}
