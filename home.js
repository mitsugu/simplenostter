(function() {
	var flgInit = false;
	console.log("[addon simple nostter] Start")
	const expRepostandReaction = '//main/div/section/div/div[1]';
	var nodesRepostandReaction;
	var nodeRepostandReaction;

	function evaluateXPath(aNode, aExpr) {
		var xpe = new XPathEvaluator();
		var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ?
			aNode.documentElement : aNode.ownerDocument.documentElement);
		var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
		var found = [];
		var res;
		while (res = result.iterateNext())
			found.push(res);
		return found;
	}

	var SettingData = {
		strRegexp: "",
		flgTrend: false,
		flgRepostandReaction: false,
		loadSettingData: function() {
			strRegexp = "";
			flgTrend = false;
			flgRepostandReaction = false;
		}
	}

	function disableTrend() {
		const styleElement = document.createElement('style');
		styleElement.textContent = `
			li.svelte-1vtdyfj:nth-child(2) {
				display:none!important;
			}
		`;
		const elmHead = document.getElementsByTagName('head')[0];
		elmHead.appendChild(styleElement);
	}

	const expArticle = './div/article';
	class MutationObserverManager {
		static configRepostandReaction = {
			childList: true
		};
		static observer = null;

		static callbackRepostandReaction(mutationsList, observer) {
			for (const mutation of mutationsList) {
				if (mutation.type === "childList") {
					mutation.addedNodes.forEach(node => {
						if (node.nodeName === "DIV" && node.className === "virtual-scroll-item") {
							let pcnodes = evaluateXPath(node, expArticle);
							if (1 < pcnodes.length) {
								node.setAttribute("style", "display:none;");
							}
						}
					});
				}
			}
		};
		static disableRepostandReaction() {
			if (this.observer === null) {
				this.observer = new MutationObserver(
					this.callbackRepostandReaction
				);
				this.observer.observe(
					nodeRepostandReaction,
					this.configRepostandReaction
				);
			}
		}
	}

	function buildingObservedTarget() {
		nodesRepostandReaction = evaluateXPath(document, expRepostandReaction)
		if (nodesRepostandReaction.length < 1) {
			return false;
		} else {
			nodeRepostandReaction = nodesRepostandReaction[0];
		}
		return true;
	}

	function init() {
		console.log("[addon simple nostter] run init")
		if (!buildingObservedTarget()) {
			console.error("[addon simple nostter] Nothing observed nodes")
			return false;
		}

		SettingData.loadSettingData();

		if (!SettingData.flgTrend) {
			disableTrend();
		}

		if (!SettingData.flgRepostandReaction) {
			MutationObserverManager.disableRepostandReaction();
		}
		return true;
	}
	function repeatUntilTrue(callback) {
	    function check() {
	        if (!callback()) {
	            setTimeout(check, 1000);
	        } else {
				return;
	        }
	    }
	    check();
	}

	if (!flgInit) {
console.log("[addon simple nostter] flgInit : ", flgInit)
		repeatUntilTrue(init);
		flgInit = true;
	}

	/*
	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
console.log("[addon simple nostter] recieve message : ", message.type)
		if (message.type === 'customEvent') {
			console.log(
				"[addon simple nostter] Received custom event : ",
				message.data.someData
			);
			init();
			flgInit = true;
		}
	});
	*/
})();