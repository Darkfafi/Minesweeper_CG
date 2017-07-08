GameScene.prototype = Object.create(Scene.prototype);
function GameScene()
{	
	Scene.call(this);
	var grid;
	var currentInteractionState = 0;

	this.onCreate = function()
	{
		grid = new Grid(25, 18, SweepTile);
		var tiles = grid.getAllTiles();
		for(var i = 0; i < tiles.length; i++)
		{
			var sprt = tiles[i].setTileSprite('assets/tile.png', 32);
			tiles[i].setIsInteractable(true);
			tiles[i].getTileEventCenterPoint().addEventListener(SweepTile.prototype.EVENT_INTERACTION, onTilePressed);
			this.addChild(sprt);
		}
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
		}
		else
		{
			// show empty & chain react
			this.tileClearChain(tile);
		}
	}

}