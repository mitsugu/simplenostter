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

(function() {
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

	const expRepostandReaction = '//main/div/section/div/div[1]';
	var nodesRepostandReaction = evaluateXPath(document, expRepostandReaction)
	var nodeRepostandReaction;
	if (nodesRepostandReaction.length !== 1) {
		console.error("[addon simple nostter] Too many observed node")
		return;
	} else {
		nodeRepostandReaction = nodesRepostandReaction[0];
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


	if (!SettingData.flgTrend) {
		disableTrend();
	}

	if (!SettingData.flgRepostandReaction) {
		MutationObserverManager.disableRepostandReaction();
	}
})();

