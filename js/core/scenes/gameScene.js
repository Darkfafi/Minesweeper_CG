GameScene.prototype = Object.create(Scene.prototype);
function GameScene()
{	
	Scene.call(this);
	this.isRunning = false;
	this.lockedChainTiles = [];

	var grid;
	var gridContainer = new PIXI.Container();
	var currentInteractionState = 0;
	var gameUI = new GameUI(this);;
	var time = -1337;

	this.onCreate = function()
	{
		this.createGameWHP(20, 15, 0.152); 
		time = this.getTimeForGrid(20, 15);
		isRunning = true;
		gameUI.getEventCenterPoint().addEventListener(GameUI.prototype.EVENT_NEW_SELECTION_TAB_ICON, onNewTabIcon);
	}

	this.onUpdate = function(deltaTime)
	{
		if(time < 0 || !isRunning) { return; }
		time -= deltaTime;
		if(time <= 0)
		{
			time = 0;
			this.endGame(false, "Out of Time!");
		}
		gameUI.setTimeLeftText(time);
	}

	this.onDestroy = function()
	{

	}

	this.getCurrentInteractionState = function()
	{
		return currentInteractionState;
	}

	this.createGameWHP = function(width, height, percentage)
	{
		if(grid != null) { return; }

		grid = new Grid(width, height, SweepTile);
		var tiles = grid.getAllTiles();
		for(var i = 0; i < tiles.length; i++)
		{
			var sprt = tiles[i].setTileSprite('assets/tile.png', 32);
			tiles[i].setIsInteractable(true);
			tiles[i].getTileEventCenterPoint().addEventListener(SweepTile.prototype.EVENT_INTERACTION, onTilePressed);
			tiles[i].getTileEventCenterPoint().addEventListener(SweepTile.prototype.EVENT_INTERACTION_RIGHT, onTilePressedRight);
			gridContainer.addChild(sprt);
		}

		this.addChild(gridContainer);

		gridContainer.x = app.renderer.width * 0.5;
		gridContainer.y = (app.renderer.height * 0.5) - (app.renderer.height * 0.05);
		gridContainer.pivot.x = gridContainer.width / 2;
		gridContainer.pivot.y = gridContainer.height / 2;

		assignBombs(percentage);
	}

	this.getGrid = function()
	{
		return grid;
	}

	this.getTimeForGrid = function(xTiles, yTiles)
	{
		var timeReturn = Math.floor((xTiles * yTiles) / 100) * 120;
		return timeReturn;
	}

	var assignBombs = function(percentage)
	{
		if(percentage <= 0) { return; }
		if(percentage > 1) { percentage = 1; }
		var allTiles = grid.getAllTiles();
		var amountOfBombs = allTiles.length * percentage;
		var bombAmount = 0;
		var currentIndex = 0;
		while(amountOfBombs > 0 && allTiles.length > 0)
		{
			currentIndex = Math.floor(Math.random() * allTiles.length);
			allTiles[currentIndex].setIsBombTile(true);
			allTiles.splice(currentIndex, 1);
			amountOfBombs--;
			bombAmount++;
		}

		gameUI.setBombAmountText(bombAmount);
	}

	var onTilePressed = function(tile)
	{
		switch(this.getCurrentInteractionState())
		{
			case 0:
				if(tile.getFlaggedState()) { return; }
				this.tryTile(tile);
			break;
			case 1:
				tile.setFlaggedState(!tile.getFlaggedState());
			break;
		}
	}.bind(this);

	var onTilePressedRight = function(tile)
	{
		switch(this.getCurrentInteractionState())
		{
			case 0:
				tile.setFlaggedState(!tile.getFlaggedState());
			break;
			case 1:
				if(tile.getFlaggedState()) { return; }
				this.tryTile(tile);
			break;
		}
	}.bind(this);

	var onNewTabIcon = function(iconType)
	{
		currentInteractionState = iconType;
	}
}

GameScene.prototype.tileClearChain = function(tile)
{
	var neighbours = tile.getNeighbours();
	for(var i = neighbours.length - 1; i >= 0; i--)
	{
		if(!neighbours[i].getIsBombTile() && !neighbours[i].getDiscoveredState())
		{
			if(this.lockedChainTiles.indexOf(neighbours[i]) != -1) { continue; }
			this.lockedChainTiles.push(neighbours[i]);
			this.tryTileDelayed(neighbours[i], 77);
		}
	}
}

GameScene.prototype.tryTileDelayed = function(tile, delayTime)
{
	tile.setIsInteractable(false);
	setTimeout(function ()
	{  
		this.tryTile(tile); 
		var indexLockChain = this.lockedChainTiles.indexOf(tile);
		if(indexLockChain != -1)
		{
			this.lockedChainTiles.splice(indexLockChain, 1);
		}

	}.bind(this), delayTime);
	
}

GameScene.prototype.tryTile = function(tile)
{
	tile.setIsInteractable(false);
	tile.setDiscoveredState(true);
	tile.setFlaggedState(false);

	if(tile.getIsBombTile())
	{
		console.log("BOOM!!");
		this.endGame(false, "Detonated Bomb");
	}
	else
	{
		var bombNeighbours = tile.getBombNeighbours();
		if(bombNeighbours.length > 0)
		{
			// Show number
			tile.showNumber(bombNeighbours.length);
		}
		else
		{
			// Show empty & Chain React
			this.tileClearChain(tile);
		}

		if(this.checkWinCondition())
		{
			this.endGame(true, "Discovered All Non-Bomb Tiles");
		}
	}
}


GameScene.prototype.endGame = function(wonGameBoolean, reasonString)
{
	if(!isRunning) { return; }
	var tiles = this.getGrid().getAllTiles();
	for(var i = 0; i < tiles.length; i++)
	{
		tiles[i].setDiscoveredState(true);
		tiles[i].setIsInteractable(false);
	}
	isRunning = false;

	var esp = new EndScreenPopUp(wonGameBoolean, reasonString, this);
}

GameScene.prototype.checkWinCondition = function()
{
	var tiles = this.getGrid().getAllTiles();
	for(var i = 0; i < tiles.length; i++)
	{
		if(!tiles[i].getDiscoveredState() && !tiles[i].getIsBombTile()) // If there is an undiscovered non bomb tile, win condition == false
		{
			return false; 
		}
	}

	return true; // If all non bomb tiles are discovered, win condition == true
}