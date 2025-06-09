document.addEventListener('DOMContentLoaded', () => {
    //const button = document.getElementById('groupTabsButton');
    const form = document.getElementById('formGroup')
    const searchTerm = document.getElementById('searchTerm');

    form.addEventListener("submit", (event) => {

        const searchTermValue = searchTerm.value.toLowerCase().trim()

        if (searchTermValue) {
            console.log(`Searching for: ${searchTermValue}`);
            matchingTabs = [];
            chrome.tabs.query({}).then((tabs) => {
                if (tabs.length !== 0) {
                    tabs.forEach((tab) => {
                        //console.log(tab)
                        if (typeof tab.url === 'string' && tab.url.toLowerCase().includes(searchTermValue)) {
                            matchingTabs.push(tab)
                            //console.log(`Tab ID: ${tab.id}, Tab URL: ${tab.url}`);
                        }
                        else if (typeof tab.title == 'string' && tab.title.toLowerCase().includes(searchTermValue)) {
                            matchingTabs.push(tab)
                            //console.log(`Tab ID: ${tab.id}, Tab Title: ${tab.title}`);
                        }
                    })
                    groupTabs(matchingTabs)
                }
            })
        }
        event.preventDefault()
    })
})

async function groupTabs(tabsArray) {
    tabsIDs = tabsArray.map((tab) => tab.id);
    browser.tabs.move(tabsIDs, { windowId: browser.windows.WINDOW_ID_CURRENT, index: -1 });
    //await chrome.windows.create({ focused: true }, function (win) { console.log("idslop") })
}