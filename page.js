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

	const nodeXPath = "";

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
	const configRepostandReaction = {
		childList: true,
		subtree: true
	};
	const callbackRepostandReaction = function(mutationsList, observer) {
		for (const mutation of mutationsList) {
			if (mutation.type === "childList") {
				mutation.addedNodes.forEach(node => {
					pNode = node.parentNode;
					if ( pNode.nodeName === "DIV" && pNode.getAttribute("class") === "virtual-scroll-item" ) {
						let pcnodes = evaluateXPath(pNode, expArticle);
						if ( 1 < pcnodes.length ) {
							pNode.setAttribute("style", "display:none;");
						}
					}
				});
			}
		}
	};
	const observer = new MutationObserver(callbackRepostandReaction);

	function disableRepostandReaction() {
		observer.observe(nodeRepostandReaction, configRepostandReaction);
	}

	if (!SettingData.flgTrend) disableTrend();
	if (!SettingData.flgRepostandReaction) {
		disableRepostandReaction();
		SettingData.flgRepostandReaction = true;
	}
})();
