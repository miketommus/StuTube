// log
console.log("injecting urls");

// Gets all URLs in storage
let allUrls = browser.storage.local.get(null);

// Creates divs & iframes
allUrls.then((results) => {
    const vids = Object.values(results);
    createDivs(vids.length);
    createFrames(vids);
});

/*
This can be used to switch app between allowing/not allowing cookies.
Generally, the one with cookies seems to be compatible with more videos.
*/
// const html = "https://www.youtube.com/embed/";
const html = "https://www.youtube-nocookie.com/embed/";

// Creates all the divs we'll need
function createDivs(number) {
    for (var i = 1; i <= number; i++) {
        var div = document.createElement('div');
        div.id = 'div' + i;
        div.className = "wrap-element";
        document.getElementById("all").appendChild(div);
    }
};

// Adds iframes to divs
function createFrames(vids) {
    for (var i = 0; i < vids.length; i++) {
        var div = document.getElementById('div' + (i + 1));
        var iframe = document.createElement('iframe');
        iframe.src = html + vids[i].substring(vids[i].length - 11);
        iframe.className = "wrapped-iframe";
        iframe.setAttribute("gesture", "media");
        iframe.setAttribute("allowfullscreen", "true");
        div.appendChild(iframe);
    }
}