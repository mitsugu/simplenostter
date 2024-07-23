(() => {
	var loadTrendSettingData = () => {
		return new Promise((resolve, reject) => {
			browser.storage.sync.get("trend").then(
				(item) => {
					document.querySelector("#removetrend").checked = item.trend;
					resolve("get trend status");
				},
				(error) => {
					document.querySelector("#removetrend").checked = true;
					resolve("default set trend status");
				}
			);
		});
	}

	var loadKind67SettingData = () => {
		return new Promise((resolve, reject) => {
			browser.storage.sync.get("kind67").then(
				(item) => {
					document.querySelector("#removekind67").checked = item.kind67;
					resolve("get kind67 status");
				},
				(error) => {
					document.querySelector("#removekind67").checked = true;
					resolve("default set kind67 status");
				}
			);
		});
	}

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

	loadTrendSettingData()
		.then(result => {
			loadKind67SettingData()
				.then(result => {})
				.catch(error => {
					console.error(
						"[addon simple nostter] cannot read kind67 status",
						error
					)
				});
		})
		.catch(error => {
			console.error(
				"[addon simple nostter] cannot read trend status",
				error
			)
		});
})();
