PlayOptionsScene.prototype = Object.create(Scene.prototype);
function PlayOptionsScene()
{
	Scene.call(this);

	var setWidth = Globals.getMinGridWidth();
	var setHeight = Globals.getMinGridHeight();
	var setBombAmount = 10;
	var jsonSet;
	var botPlaying = false;
	var botMistakePercentage = 10;

	var widthButton, heightButton, amountButton;

	this.onCreate = function(sceneArgs)
	{
		var titleText = new PIXI.Text("Play Options:");
		titleText.anchor.x = titleText.anchor.y = 0.5;
		titleText.style.fill = 0xEEEEEE;
		titleText.scale.x = titleText.scale.y = 2;
		titleText.x = app.renderer.width * 0.5;
		titleText.y = app.renderer.height * 0.1;
		var firstButtonRowHeight = app.renderer.height * 0.3;

		// Custom Game
		widthButton = new Button(AssetLocations.getButtonLocation());
		customizeButtonDesign(widthButton, "W: " + setWidth, app.renderer.width * 0.12, firstButtonRowHeight);
		widthButton.sprite.on('pointerdown', onWidthClicked);

		heightButton = new Button(AssetLocations.getButtonLocation());
		customizeButtonDesign(heightButton, "H: " + setHeight, app.renderer.width * 0.37, firstButtonRowHeight);
		heightButton.sprite.on('pointerdown', onHeightClicked);

		amountButton = new Button(AssetLocations.getButtonLocation());
		customizeButtonDesign(amountButton, "B: " + setBombAmount, app.renderer.width * 0.62, firstButtonRowHeight);
		amountButton.sprite.on('pointerdown', onAmountClicked);

		var playButton = new Button(AssetLocations.getButtonLocation());
		customizeButtonDesign(playButton, "Play!", app.renderer.width * 0.87, firstButtonRowHeight - (playButton.sprite.height + 10));
		playButton.textObject.style.fill = 0x00FF00;
		playButton.sprite.on('pointerdown', onPlayClicked);

		var botPlayButton = new Button(AssetLocations.getButtonLocation());
		customizeButtonDesign(botPlayButton, "Bot Play!", app.renderer.width * 0.87, firstButtonRowHeight + (botPlayButton.sprite.height + 10));
		botPlayButton.textObject.style.fill = 0x00FFFF;
		botPlayButton.sprite.on('pointerdown', 
		function()
		{
			botMistakePercentage = prompt("Please Enter the chance the bot could make a mistake (0-100)", botMistakePercentage);
			if(!botMistakePercentage || isNaN(botMistakePercentage)) { botMistakePercentage = 10; return; }
			if(botMistakePercentage < 0) { botMistakePercentage = 0;}
			if(botMistakePercentage > 100) { botMistakePercentage = 100;}
			botPlaying = true;
			onPlayClicked(); 
		});

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
		this.addChild(botPlayButton);
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
		var width = prompt("Please Enter a grid width (number)", setWidth);
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
		sceneManager.setScene("gameScene", getGameSceneArgs());
	}

	var onBackClicked = function()
	{
		sceneManager.setScene("menuScene");
	}

	var onImportClicked = function()
	{
		// Import & Play
		var jsonFileLocation = prompt("Please copy/paste the content of the level json file here", "Tip: 'Open json file -> Ctrl A -> Ctrl C' to copy the content");
		onJsonLoaded(jsonFileLocation)
	}

	var onJsonLoaded = function(jsonData)
	{
		var success = true;
		var err = "";
		try 
		{
        	jsonSet = JSON.parse(jsonData);
        	if(!jsonSet.name || jsonSet.name != "gridData")
		    {
		    	success = false;
		    }
	    } 
	    catch (e)
	    {
	    	err = e;
	        success = false;
	    }

	    if(!success)
	    {
	    	jsonSet = null;
	    	console.error("Error: Did not receive level json file < " + err + " >");
	    	return;
	    }
	    
		sceneManager.setScene("gameScene", getGameSceneArgs());
	}

	var getGameSceneArgs = function()
	{
		return  {"width":setWidth, "height":setHeight, "bombAmount":setBombAmount, "levelJson":jsonSet, "isBotPlaying":botPlaying, "botMistakePercentage":botMistakePercentage};
	}
}