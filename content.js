chrome.storage.sync.get({
    primaryLanguage: 'zh-cn',
    switchMode: 'prompt'
}, function (items) {
    const primaryLanguage = items.primaryLanguage;

    const currentURL = window.location.href;
    const languagePattern = /\/[a-z]{2}-[a-z]{2}\//;
    const currentLanguage = currentURL.match(languagePattern);

    if (currentLanguage && currentLanguage[0] !== `/${primaryLanguage}/`) {
        if (items.switchMode === 'auto') {
            const newURL = currentURL.replace(languagePattern, `/${primaryLanguage}/`);
            window.location.href = newURL;
        } else if (items.switchMode === 'prompt') {
            const shouldSwitch = window.confirm("该页面不是你的主要语言，是否转换？");
            if (shouldSwitch) {
                const newURL = currentURL.replace(languagePattern, `/${primaryLanguage}/`);
                window.location.href = newURL;
            }
        }
    }
});
