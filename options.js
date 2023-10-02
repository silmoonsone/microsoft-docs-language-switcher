document.getElementById('saveOptions').addEventListener('click', function () {
    const primaryLanguage = document.getElementById('primaryLanguage').value;
    const switchMode = document.getElementById('switchMode').value;

    chrome.storage.sync.set({
        primaryLanguage: primaryLanguage,
        switchMode: switchMode
    }, function () {
        alert('设置已保存');
    });
});

// 加载用户的设置
function restoreOptions() {
    chrome.storage.sync.get({
        primaryLanguage: 'zh-cn',
        switchMode: 'prompt'
    }, function (items) {
        document.getElementById('primaryLanguage').value = items.primaryLanguage;
        document.getElementById('switchMode').value = items.switchMode;
    });
}


document.addEventListener('DOMContentLoaded', restoreOptions);