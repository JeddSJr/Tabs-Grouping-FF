document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('groupTabsButton');
    const searchTerm = document.getElementById('searchTerm');

    button.addEventListener('click', () => {
        const searchTermValue = searchTerm.value;

        if (searchTermValue) {
            //console.log(`Searching for: ${searchTermValue}`);
            matchingTabs = [];
            chrome.tabs.query({}).then((tabs) => {
                if (tabs.length !== 0) {
                    tabs.forEach((tab) => {
                        if (tab.url.includes(searchTermValue) || tab.title.includes(searchTermValue)) {
                            console.log(`Tab ID: ${tab.id}, Tab URL: ${tab.url}, Tab Title: ${tab.title}`);
                            matchingTabs.push(tab);
                        }
                    })
                    groupTabs(matchingTabs);
                }
            })
        }
    })
})

function groupTabs(tabsArray) {
    tabsIDs = tabsArray.map((tab) => tab.id);
    //chrome.windows.create({ tabId: tabsIDs[0], focused: true })
    browser.tabs.move(tabsIDs, { windowId: browser.windows.WINDOW_ID_CURRENT, index: 0 });
}