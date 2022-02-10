function checkData() {
    var buttons = [].slice.call(document.querySelectorAll("#evidence .multistate"));
    var elements = [].slice.call(document.getElementsByClassName("mejai"));

    var included = buttons.filter(b => b.dataset.state === states.yes.data).map(b => b.id);
    var excluded = buttons.filter(b => b.dataset.state === states.no.data).map(b => b.id);

    for(var element of elements) {
        var key = element.getElementsByTagName("button")[0].id;
        var isExcluded = false;

        if(included.length > 0 && !included.every(g => mejai[key].includes(g))) {
            isExcluded = true;
        }

        if(!isExcluded && mejai[key].some(e => excluded.indexOf(e) >= 0)) {
            isExcluded = true;
        }

        if(isExcluded) {
            element.style.display = "none";
        }
        else {
            element.style.display = "flex";
        }
    }

    var spans = document.querySelectorAll(".evidence span");

    spans.forEach(function(span) {
        if([].some.call(span.classList, c => included.indexOf(c) >= 0)) {
            span.classList.add("strike");
        }
        else {
            span.classList.remove("strike");
        }
    });
}

function checkObjectiveOptions(reset = false) {
    var query = "[id^=objective-] option:not(:first-child)";
    var all = document.querySelectorAll(query);
    var selected = [].slice.call(document.querySelectorAll(query + ":checked"));
    var selectedNames = selected.map(o => o.classList[0]);

    for(var option of all) {
        if(!reset && selectedNames.includes(option.classList[0]) && !selected.includes(option)) {
            option.style.display = "none";
        }
        else {
            option.style.display = "block";
        }
    }
}

function toggle(element, newState = null) {
    var toggledState = (newState ? newState : getNewState(element));
    setElementState(element, toggledState);

    if(typeof element.dataset.toggle !== "undefined") {
        toggleElements(element.dataset.toggle, toggledState, "block");
    }
}

function getNewState(element) {
    return element.dataset.state === states.yes.data ? states.no : states.yes;
}

function setElementState(element, newState) {
    var substrings = element.textContent.split(/ (.+)/);

    element.dataset.state = newState.data;

    if(substrings[0] === "show" || substrings[0] === "hide") {
        element.textContent = (newState.data === states.yes.data ? "hide" : "show") + " " + substrings[1];
    }
}

function toggleElements(selectors, state, shownDisplayValue) {
    for(var selector of selectors.split(" ")) {
        var elements = document.querySelectorAll(selector);

        for(var element of elements) {
            element.style.display = (state === states.yes ? shownDisplayValue : "none");
        }
    }
}

function reset() {
    var buttons = document.getElementsByClassName("multistate");
    var options = document.getElementsByTagName("select");
    var numberBoxes = document.querySelectorAll("input[type=number]");

    for(var button of buttons) {
        setState(button, states.none);
    }

    for(var select of options) {
        select.selectedIndex = 0;
    }

    for(var numberBox of numberBoxes) {
        numberBox.value = "";
    }

    checkObjectiveOptions(true);
}

function getSibling(element, next = true) {
    var sibling = (next ? element.nextSibling : element.previousSibling);

    while(sibling && sibling.nodeType !== 1) {
        sibling = (next ? sibling.nextSibling : sibling.previousSibling);
    }

    return sibling;
}

function changeTheme(theme = "") {
    var body = document.getElementsByTagName("body")[0];
    var oldTheme = "light";
    var newTheme = "dark";

    if(theme !== "") {
        oldTheme = (theme === "light" ? "dark" : "light");
        newTheme = (theme === "light" ? "light" : "dark");
    }
    else if(body.classList.contains(newTheme + "-theme")) {
        oldTheme = "dark";
        newTheme = "light";
    }

    body.classList.remove(oldTheme + "-theme");
    body.classList.add(newTheme + "-theme");

    return newTheme;
}

// modified from https://stackoverflow.com/a/25490531
function getCookie(name) {
    var result = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]*)');

    if(result === null) {
        return null;
    }

    return result.pop();
}

// copied from https://stackoverflow.com/a/24103596
function setCookie(name, value, days) {
    var expires = "";

    if(days) {
        var date = new Date();
        date.setDate(date.getDate() + days);
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
