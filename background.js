(() => {
	//browser.webNavigation.onCompleted.addListener((details) => {
	browser.webNavigation.onBeforeNavigate.addListener((details) => {
		console.log("onCompleted");
		browser.scripting.executeScript({
			target: {tabId: details.tabId},
			files: ["content.js"]
		});
	},
	{
		url: [{"urlEquals": "https://nostter.app/home"}]
	});
})();
