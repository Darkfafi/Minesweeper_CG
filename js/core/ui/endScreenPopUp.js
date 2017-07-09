

function EndScreenPopUp(wonBoolean, endReasonString, container)
{
	var menuButton = PIXI.Sprite.fromImage('assets/button.png');
	var replayButton = PIXI.Sprite.fromImage('assets/button.png');

	var titleText;
	var descriptionText;

	var gfx = new PIXI.Graphics();

	var createBackground = function()
	{
		gfx.beginFill(0x555555, 0.8);
		gfx.drawRect(0, 0, app.renderer.width * 0.6, app.renderer.height * 0.1);
		gfx.beginFill(0x656565, 0.7);
		gfx.drawRect(0, 0, app.renderer.width * 0.6, app.renderer.height * 0.4);
		gfx.pivot.x = gfx.width * 0.5;
		gfx.pivot.y = gfx.height * 0.5;

		gfx.x = app.renderer.width * 0.5;
		gfx.y = app.renderer.height * 0.5;

		container.addChild(gfx);
	}

	var buttonVisualization = function()
	{
		gfx.addChild(menuButton);
		gfx.addChild(replayButton);

		menuButton.anchor.x = replayButton.anchor.x = 0.5;
		menuButton.anchor.y = replayButton.anchor.y = 1;

		menuButton.x = gfx.width * 0.2;
		replayButton.x = gfx.width * 0.75;

		menuButton.y = replayButton.y = gfx.height - 40;

		menuButton.scale.x = menuButton.scale.y = 2;
		replayButton.scale.x = replayButton.scale.y = 2;

		replayButton.interactive = menuButton.interactive = true;
		replayButton.buttonMode = menuButton.buttonMode = true;

		replayButton.on("pointerdown", onReplayPressed);
		menuButton.on("pointerdown", onMenuPressed);

		var replayBText = new PIXI.Text("Restart");
		var menuBText = new PIXI.Text("Menu");

		replayBText.anchor.x = replayBText.anchor.y = menuBText.anchor.x = menuBText.anchor.y = 0.5;
		replayBText.scale.x = replayBText.scale.y = menuBText.scale.x = menuBText.scale.y = 0.6;

		replayButton.addChild(replayBText);
		menuButton.addChild(menuBText);

		replayBText.y = -20;
		menuBText.y = -20;
	}

	var textVisualization = function(wonCondition, reasonString)
	{
		titleText = new PIXI.Text(((wonCondition) ? "Won!" : "Lost.."));
		descriptionText = new PIXI.Text(reasonString);

		titleText.anchor.y = 0.5;
		descriptionText.anchor.y = 0.5;

		gfx.addChild(titleText);
		gfx.addChild(descriptionText);

		titleText.x = gfx.width * 0.37;
		titleText.y = gfx.height * 0.11;

		titleText.style.fill = ((!wonCondition)? 0xff0000 : 0x00ff00);

		titleText.scale.x = titleText.scale.y = 1.5;

		descriptionText.x = gfx.width * 0.05;
		descriptionText.y = gfx.height * 0.4;

		descriptionText.style.fill = 0xFFFFFF;
	}

	var onReplayPressed = function()
	{
		sceneManager.setScene("gameScene");
	}

	var onMenuPressed = function()
	{
		sceneManager.setScene("menuScene");
	}

	createBackground();
	buttonVisualization();
	textVisualization(wonBoolean, endReasonString);
}