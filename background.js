(() => {
	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log("receive message");
		if (message.type === 'customEvent') {
			chrome.tabs.query({
				url: "https://nostter.app/home"
			}, function(tabs) {
				tabs.forEach(tab => {
					chrome.tabs.sendMessage(tab.id, message);
					return;
				});
			});
		}
	});
})();
