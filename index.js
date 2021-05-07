const { app, BrowserWindow } = require("electron");
const path = require("path");
var { Timer } = require("easytimer.js");
var timerInstance = new Timer();
const screenshot = require("screenshot-desktop");
const { log } = require("console");

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	win.loadFile("index.html");
}

app.whenReady().then(() => {
	timerInstance.start();
	timerInstance.addEventListener("secondsUpdated", function (e) {
		if (timerInstance.getTimeValues() == 5) {
			screenshot({ filename: "./demo.png" })
				.then((e) => {
					console.log("melo");
				})
				.catch((e) => {
					console.log("paila");
				});
		}
		console.log("Time:" + timerInstance.getTimeValues().toString());
	});
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
