var sceneManager;
var app;

window.onload = function()
{
	main();
}

function main()
{
	app = new PIXI.Application(800, 600, {backgroundColor : 0x2299ff});
	document.getElementById("wrapper").appendChild(app.view);

	sceneManager = new SceneManager(app);

	app.ticker.add(function(dt)
	{
		sceneManager.update(app.ticker.elapsedMS / 1000);
	});

	sceneManager.addScene("gameScene", GameScene);
	sceneManager.setScene("gameScene");
}