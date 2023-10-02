chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "switchLanguage",
        title: "切换到主要语言",
        contexts: ["page"],
        documentUrlPatterns: [
            "*://docs.microsoft.com/*",
            "*://learn.microsoft.com/*"
        ]
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

            if (items.switchMode === 'auto' && items.autoSwitch) {
                chrome.tabs.update(tab.id, { url: newURL });
            } else if (items.switchMode === 'manual' && items.manualSwitch) {
                chrome.tabs.update(tab.id, { url: newURL });
            } else if (items.switchMode === 'prompt' && items.promptSwitch) {
                const shouldSwitch = window.confirm("该页面不是你的主要语言，是否转换？");
                if (shouldSwitch) {
                    chrome.tabs.update(tab.id, { url: newURL });
                }
            }
        });
    }
});
