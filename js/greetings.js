const form = document.querySelector(".js-form"), 
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser"

function saveName(text){
    localStorage.setItem(USER_LS, text);
}    

function paintingGreeting(name) {    
    greeting.style.display = `${name === "" ? "none" : "block"}`;
    greeting.innerText = `Hello, ${name}`;
}

function handleSubmit(e) {
    e.preventDefault();
    const currentValue = input.value;
    paintingGreeting(currentValue);
    saveName(currentValue);
    input.value = ""
}

function askForName(){
    //form.classList.add(SHOWING_CN)
    //form.addEventListener("submit", handleSubmit);
    //greeting.style.display = "none"
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);    
    form.addEventListener("submit", handleSubmit);
    if (currentUser === null || currentUser === "") {
        askForName();
    } else {
        paintingGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();
