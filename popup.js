document.addEventListener('DOMContentLoaded', function() {
    const switchModeSelect = document.getElementById('switchMode');

    // 加载用户的设置
    chrome.storage.sync.get({
        switchMode: 'prompt'
    }, function(items) {
        switchModeSelect.value = items.switchMode;
    });

    // 当用户更改选项时保存设置
    switchModeSelect.addEventListener('change', function() {
        const switchModeValue = switchModeSelect.value;
        chrome.storage.sync.set({
            switchMode: switchModeValue
        }, function() {
            const status = document.getElementById('status');
            status.textContent = `切换方式已设置为: ${switchModeValue}`;
        });
    });
});
