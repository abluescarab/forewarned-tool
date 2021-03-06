document.addEventListener("DOMContentLoaded", function(evt) {
    var banner = document.getElementById("cookie-banner");

    if(getCookie(cookieNames.cookiesAllowed) === null)
        banner.style.display = "block";
    else
        banner.style.display = "none";

    if(getCookie(cookieNames.theme) === "dark") {
        changeTheme("dark");
    }

    var sectionStates = getCookie(cookieNames.sectionStates);

    if(sectionStates === null) {
        return;
    }

    sectionStates = sectionStates.split(",");

    if(sectionStates !== undefined) {
        var toggles = [].slice.call(document.querySelectorAll("[data-toggle$='section']"));

        for(var i = 0; i < toggles.length; i++) {
            toggle(toggles[i], states[sectionStates[i]]);
        }
    }
});

document.addEventListener("click", function(evt) {
    var element = evt.target;

    if(element.classList.contains("toggle")) {
        toggle(element);
        evt.stopPropagation();

        if(getCookie(cookieNames.cookiesAllowed) === "true") {
            var toggles = [].slice.call(document.querySelectorAll("[data-toggle$='section']")).map(e => e.dataset.state);
            setCookie(cookieNames.sectionStates, toggles, 365);
        }
    }

    if(element.type && element.classList.contains("multistate")) {
        checkReward(element);
        evt.stopPropagation();
    }

    if(element.id === "reset") {
        reset();
        evt.stopPropagation();
    }

    if(element.id === "accept-cookies") {
        setCookie(cookieNames.cookiesAllowed, "true", 365);
        document.getElementById("cookie-banner").style.display = "none";
    }

    if(element.id === "decline-cookies") {
        setCookie(cookieNames.cookiesAllowed, "false", 365);
        document.getElementById("cookie-banner").style.display = "none";
    }
});

document.getElementById("change-theme").addEventListener("click", function(evt) {
    var newTheme = changeTheme();

    if(getCookie(cookieNames.cookiesAllowed) === "true") {
        setCookie(cookieNames.theme, newTheme, 365);
    }
});

for(var select of document.querySelectorAll("#objectives-section select")) {
    select.addEventListener("change", function(evt) {
        setState(getSibling(evt.target, false), states.none);
        checkObjectiveOptions();
    });
}
