(() => {
	document.addEventListener("DOMContentLoaded", () => {
		document.querySelector("#removetrend").addEventListener(
			"click",
			(e) => {
				browser.storage.sync.set({"trend":e.target.checked}).then(
					() => {},
					(error) => {
						console.error("cannot write trend statuds :", error);
					}
				);
			}
		);

		document.querySelector("#removekind67").addEventListener(
			"click",
			(e) => {
				browser.storage.sync.set({"kind67":e.target.checked}).then(
					() => {},
					(error) => {
						console.error("cannot write kind67 statuds :", error);
					}
				);
			}
		);
	});
})();
