GameScene.prototype = Object.create(Scene.prototype);
function GameScene()
{	
	Scene.call(this);
	var grid;
	var gridContainer = new PIXI.Container();
	var currentInteractionState = 0;

	this.onCreate = function()
	{
		this.createGameWHP(10, 10, 0.25);
	}

	this.onUpdate = function(deltaTime)
	{

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
			gridContainer.addChild(sprt);
		}

		this.addChild(gridContainer);

		gridContainer.x = app.renderer.width * 0.5;
		gridContainer.y = app.renderer.height * 0.5;
		gridContainer.pivot.x = gridContainer.width / 2;
		gridContainer.pivot.y = gridContainer.height / 2;

		assignBombs(percentage);
	}

	var assignBombs = function(percentage)
	{
		if(percentage <= 0) { return; }
		if(percentage > 1) { percentage = 1; }
		var allTiles = grid.getAllTiles();
		var amountOfBombs = allTiles.length * percentage;
		var currentIndex = 0;
		while(amountOfBombs > 0 && allTiles.length > 0)
		{
			currentIndex = Math.floor(Math.random() * allTiles.length);
			allTiles[currentIndex].setIsBombTile(true);
			allTiles.splice(currentIndex, 1);
			amountOfBombs--;
		}
	}

	var onTilePressed = function(tile)
	{
		switch(this.getCurrentInteractionState())
		{
			case 0:
				this.tryTile(tile);
			break;
			case 1:
				tile.setFlaggedState(!tile.getFlaggedState());
				console.log(tile.getFlaggedState());
			break;
		}
	}.bind(this);
}

GameScene.prototype.tileClearChain = function(tile)
{
	var neighbours = tile.getNeighbours();
	for(var i = neighbours.length - 1; i >= 0; i--)
	{
		if(!neighbours[i].getIsBombTile() && !neighbours[i].getDiscoveredState())
		{
			this.tryTile(neighbours[i]);
		}
	}
}

GameScene.prototype.tryTile = function(tile)
{
	tile.setDiscoveredState(true);
	tile.setIsInteractable(false);
	if(tile.getIsBombTile())
	{
		console.log("BOOM!!");
	}
	else
	{
		var bombNeighbours = tile.getBombNeighbours();
		if(bombNeighbours.length > 0)
		{
			// show number
			console.log(bombNeighbours.length + " Bombs Around!");
			tile.showNumber(bombNeighbours.length);
		}
		else
		{
			// show empty & chain react
			this.tileClearChain(tile);
		}
	}

}