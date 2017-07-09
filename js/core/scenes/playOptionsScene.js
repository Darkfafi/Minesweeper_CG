
PlayOptionsScene.prototype = Object.create(Scene.prototype);
function PlayOptionsScene()
{
	Scene.call(this);

	var setWidth = Globals.getMinGridWidth();
	var setHeight = Globals.getMinGridHeight();
	var setBombAmount = 10;

	var widthButton, heightButton, amountButton;

	this.onCreate = function()
	{
		var titleText = new PIXI.Text("Play Options:");
		titleText.anchor.x = titleText.anchor.y = 0.5;
		titleText.style.fill = 0xEEEEEE;
		titleText.scale.x = titleText.scale.y = 2;
		titleText.x = app.renderer.width * 0.5;
		titleText.y = app.renderer.height * 0.1;

		// Custom Game
		widthButton = new Button(AssetLocations.getButtonLocation());
		customizeButtonDesign(widthButton, "W: " + setWidth, app.renderer.width * 0.12, app.renderer.height * 0.3);
		widthButton.sprite.on('pointerdown', onWidthClicked);

		heightButton = new Button(AssetLocations.getButtonLocation());
		customizeButtonDesign(heightButton, "H: " + setHeight, app.renderer.width * 0.37, app.renderer.height * 0.3);
		heightButton.sprite.on('pointerdown', onHeightClicked);

		amountButton = new Button(AssetLocations.getButtonLocation());
		customizeButtonDesign(amountButton, "B: " + setBombAmount, app.renderer.width * 0.62, app.renderer.height * 0.3);
		amountButton.sprite.on('pointerdown', onAmountClicked);

		var playButton = new Button(AssetLocations.getButtonLocation());
		customizeButtonDesign(playButton, "Play!", app.renderer.width * 0.87, app.renderer.height * 0.3);
		playButton.textObject.style.fill = 0x00FF00;
		playButton.sprite.on('pointerdown', onPlayClicked);

		var orText = new PIXI.Text("Or");
		orText.anchor.x = orText.anchor.y = 0.5;
		orText.style.fill = 0xDDDD00;
		orText.x = app.renderer.width * 0.5;
		orText.y = app.renderer.height * 0.5;

		// Import and play
		var importAndPlayButton = new Button(AssetLocations.getButtonLocation());
		importAndPlayButton.sprite.width = importAndPlayButton.sprite.width * 2;
		importAndPlayButton.scale.x = importAndPlayButton.scale.y = 3;
		importAndPlayButton.x = (app.renderer.width * 0.5) - (importAndPlayButton.sprite.width * 0.5 * importAndPlayButton.scale.x);
		importAndPlayButton.y = app.renderer.height * 0.6;
		importAndPlayButton.textObject.scale.x = (importAndPlayButton.textObject.scale.y = 0.420) * 0.5;
		importAndPlayButton.textObject.text = "Import Level And Play!";
		importAndPlayButton.textObject.style.fill = 0xffff00;
		importAndPlayButton.sprite.on('pointerdown', onImportClicked);

		// Back button

		var backButton = new Button(AssetLocations.getButtonLocation());
		customizeButtonDesign(backButton, "Back", app.renderer.width * 0.12, app.renderer.height * 0.82);
		backButton.textObject.style.fill = 0xffffff;
		backButton.sprite.on('pointerdown', onBackClicked);

		this.addChild(widthButton);
		this.addChild(heightButton);
		this.addChild(amountButton);
		this.addChild(playButton);
		this.addChild(backButton);
		this.addChild(importAndPlayButton);
		this.addChild(orText);
		this.addChild(titleText);
	}

	this.onUpdate = function(deltaTime)
	{

	}

	this.onDestroy = function()
	{

	}

	var customizeButtonDesign = function(button, name, positionX, positionY)
	{
		button.scale.x = button.scale.y = 2;
		button.x = positionX - (button.sprite.width * 0.5 * button.scale.x);
		button.y = positionY;
		button.textObject.scale.x = button.textObject.scale.y = 0.6;
		button.textObject.text = name;
		button.textObject.style.fill = 0xFF7700;
	}

	var onWidthClicked = function()
	{
		var width = prompt("Please Enter a grid width (Number)", setWidth);
		if(!width || isNaN(width)) { return; }
		if(width < Globals.getMinGridWidth()) { width = Globals.getMinGridWidth();}
		if(width > Globals.getMaxGridWidth()) { width = Globals.getMaxGridWidth();}
		if(width != setWidth) 
		{ 
			setWidth = width;
			widthButton.textObject.text = "W: " + setWidth;
		}
	}

	var onHeightClicked = function()
	{
		var height = prompt("Please Enter a grid height (number)", setHeight);
		if(!height || isNaN(height)) { return; }
		if(height < Globals.getMinGridHeight()) { height = Globals.getMinGridHeight();}
		if(height > Globals.getMaxGridHeight()) { height = Globals.getMaxGridHeight();}
		if(height != setHeight) 
		{ 
			setHeight = height;
			heightButton.textObject.text = "H: " + setHeight;
		}
	}

	var onAmountClicked = function()
	{
		var bombAmount = prompt("Please Enter Amount of Bombs on Grid (number)", setBombAmount);
		if(!bombAmount || isNaN(bombAmount)) { return; }
		if(bombAmount < 10) { bombAmount = 10; }
		if(bombAmount >= (setWidth * setHeight)) { bombAmount = (setWidth * setHeight) - 1}
		if(bombAmount != setBombAmount) 
		{ 
			setBombAmount = bombAmount;
			amountButton.textObject.text = "B: " + setBombAmount;
		}
	}

	var onPlayClicked = function()
	{
		// Set Settings and play
		globalWidthSet = setWidth;
		globalHeightSet = setHeight;
		globalBombAmountSet = setBombAmount;
		jsonSet = null;
		sceneManager.setScene("gameScene");
	}

	var onBackClicked = function()
	{
		sceneManager.setScene("menuScene");
	}

	var onImportClicked = function()
	{
		// Import & play
		globalWidthSet = null;
		globalHeightSet = null;
		globalBombAmountSet = null;
		jsonSet = null; // <-- Json import load
		sceneManager.setScene("gameScene");
	}
}