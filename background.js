chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get({
        primaryLanguage: 'zh-cn',
        switchMode: 'prompt',
        autoSwitch: false,
        manualSwitch: false,
        promptSwitch: false
    }, function (items) {
        const primaryLanguage = items.primaryLanguage;

        chrome.contextMenus.create({
            id: "switchLanguage",
            title: "切换语言到" + primaryLanguage,
            contexts: ["page"],
            documentUrlPatterns: [
                "*://docs.microsoft.com/*",
                "*://learn.microsoft.com/*"
            ]
        });
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "switchLanguage") {
        chrome.storage.sync.get({
            primaryLanguage: 'zh-cn',
            switchMode: 'prompt',
            autoSwitch: false,
            manualSwitch: false,
            promptSwitch: false
        }, function (items) {
            const primaryLanguage = items.primaryLanguage;
            const languagePattern = /\/[a-z]{2}-[a-z]{2}\//;
            const newURL = tab.url.replace(languagePattern, `/${primaryLanguage}/`);

            chrome.tabs.update(tab.id, { url: newURL });
        });
    }
});
