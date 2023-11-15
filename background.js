// Clear list on reload
clearAll();

// Adds listener for extension button click
browser.browserAction.onClicked.addListener(openStuTube);

// Opens StuTube in new tab
function openStuTube() {
    // Open new tab
    browser.tabs.create({
        "url": "/StuTube.html"
    });
    browser.tabs.executeScript({
        file: "frame-gen.js",
    });
};

// Adds listeners for menu clicks

browser.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "collect-url") {
        storeUrl(info.linkUrl);
    }
    if (info.menuItemId === "clear-url") {
        clearAll();
    }
});

// Adds a context menu action to add URLs to list
browser.contextMenus.create(
    {
    id: "collect-url",
    title: "Add to StuTube List",
    contexts: ["link"],
    }
);

// Adds a context menu action to clear URLs from list
browser.contextMenus.create(
    {
    id: "clear-url",
    title: "Clear StuTube List",
    contexts: ["browser_action"]
    }
);

//url counter
var key = 1;

// Stores a new URL in local storage
function storeUrl(url) {
    if (checkUrl(url)) {
        browser.storage.local.set({ ['url' + key] : url });
        key++;
    } else {
        // do nothing.
        //add functionality to throw an error?
    };
}

// Check URL is from YouTube
function checkUrl(url) {
    if (url.startsWith("https://www.youtube.com/watch?v=")) {
        return true;
    } else {
        return false;
    };
}

// Clears all URLs from storage
function clearAll() {
    browser.storage.local.clear();
    key = 1;
  }
  