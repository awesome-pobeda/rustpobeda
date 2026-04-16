var models = [];
(async function main() {
	Array.prototype.random = function () {
		return this[Math.floor(Math.random() * this.length)];
	};
	var canvas = document.createElement("canvas");
	canvas.id = "madoka";
	canvas.style.display = "block";
	canvas.style.position = "fixed";
	canvas.style.top = 0;
	canvas.style.left = 0;
	canvas.style.zIndex = 999999;
	canvas.style.pointerEvents = "none";
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);

	//if (window.innerWidth < 1200) {
	if (window.innerWidth < 900) {
		return;
	}
	try {
		await loadScript(
			"https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js",
		);
		await loadScript(
			"https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js",
		);
		await loadScript(
			"https://cdn.jsdelivr.net/npm/pixi.js@6.5.2/dist/browser/pixi.min.js",
		);
		await loadScript(
			"https://cdn.jsdelivr.net/npm/pixi-live2d-display/dist/index.min.js",
		);

		const app = new PIXI.Application({
			view: canvas,
			autoStart: true,
			resizeTo: window,
			backgroundAlpha: 0,
		});
		/*
		function centerModel() {
			model2.x = app.screen.width / 2 - model2.width / 2;
			model2.y = app.screen.height / 2 - model2.height / 3;
			}*/
		function position_models() {
			var i = 0;
			for (const model of models) {
				if (i == 0) {
					model.x = app.screen.width - model.width / 1.2;
				} else {
					model.x = -model.width / 6;
				}
				i += 1;
			}
		}
		const madoka = [
			"https://раст.победапобеда.рф/model.json",
			"https://раст.победапобеда.рф/live2d_v4/210500/model.model3.json",
			"https://раст.победапобеда.рф/live2d_v4/210100/model.model3.json",
		];
		const homura = [
			"https://раст.победапобеда.рф/live2d_v4/220201/model.model3.json",
			"https://раст.победапобеда.рф/live2d_v4/230100/model.model3.json",
			"https://раст.победапобеда.рф/live2d_v4/220200/model.model3.json",
		];

		const left = [
			"https://раст.победапобеда.рф/live2d_v4/230100/model.model3.json",
			"https://раст.победапобеда.рф/live2d_v4/240200/model.model3.json",
			"https://раст.победапобеда.рф/live2d_v4/260100/model.model3.json",
		];
		const right = [
			"https://раст.победапобеда.рф/live2d_v4/210500/model.model3.json",
			"https://раст.победапобеда.рф/live2d_v4/250300/model.model3.json",
			"https://раст.победапобеда.рф/live2d_v4/270000/model.model3.json",
		];
		for (const model of [
			//"https://раст.победапобеда.рф.п/live2d_v4/230100/model.model3.json",
			//"https://раст.победапобеда.рф.п/live2d_v4/210500/model.model3.json",
			right.random(),
			left.random(),
			//homura.random(),
			//madoka.random(),
		]) {
			console.log(model);
			let model2 = await PIXI.live2d.Live2DModel.from(model);
			app.stage.addChild(model2);
			model2.scale.set(0.4);

			model2.interactive = true;

			model2.on("mouseover", () => {
				document.body.style.cursor = "pointer";
			});
			model2.on("mouseout", () => {
				document.body.style.cursor = "default";
			});

			model2.motion("motion", 0);
			model2.expression(1);

			/*
			model2.on("mousemove", () => {
				let a = i;
				model2.x =
					app.screen.width / 2 -
					event.clientX +
					model2.width / 2 +
					a * 100 * ((a % 2) - 0.5) * 2;
			});
			*/
			window.addEventListener("resize", () => {
				app.renderer.resize(window.innerWidth, window.innerHeight);
				position_models();
			});
			models.push(model2);
			position_models();
		}
		position_models();
	} catch (error) {
		console.error("Error loading resources or initializing:", error);
	}
})();

async function loadScript(url) {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = url;
		script.onload = resolve;
		script.onerror = reject;
		document.head.appendChild(script);
	});
}
