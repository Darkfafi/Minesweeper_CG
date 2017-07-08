
SweepTile.prototype = Object.create(Tile.prototype);
function SweepTile(gridIndexX, gridIndexY, grid)
{
	Tile.call(this, gridIndexX, gridIndexY, grid);

	var isBombTile = isBombTile;
	var hasBeenDiscovered = false;
	var hasBeenFlagged = false;
	var tileSprite;
	var isInteractable = false;
	var tileEventCenterPoint = new EventCenterPoint();
	var tileObject = this;

	this.getTileEventCenterPoint = function()
	{
		return tileEventCenterPoint;
	}

	this.setIsInteractable = function(isInteractableValue)
	{
		if(tileSprite == null) 
		{ 
			console.error("Can't set this tile's interactable state because it has no sprite to make affect. Call the 'setTileSprite' method to give this tile a sprite"); 
			return; 
		}

		isInteractable = isInteractableValue;

		tileSprite.interactive = isInteractable;
		tileSprite.buttonMode = isInteractable;
	}

	this.getIsInteractable = function()
	{
		return isInteractable;
	}

	this.setTileSprite = function(spriteLocation, size)
	{
		tileSprite = PIXI.Sprite.fromImage(spriteLocation);

		tileSprite.x = this.getGridIndexX() * size;
		tileSprite.y = this.getGridIndexY() * size;

		tileSprite.on('pointerdown', onInteraction);

		return tileSprite;
	}

	this.getFlaggedState = function()
	{
		return hasBeenFlagged;
	}

	this.setFlaggedState = function(flaggedState)
	{
		hasBeenFlagged = flaggedState;
	}

	this.getTileSprite = function()
	{
		return tileSprite;
	}

	this.setIsBombTile = function(isBomb)
	{
		isBombTile = isBomb;
	}

	this.getIsBombTile = function()
	{
		return isBombTile;
	}

	this.setDiscoveredState = function(discoveredState)
	{
		hasBeenDiscovered = discoveredState;
	}

	this.getDiscoveredState = function()
	{
		return hasBeenDiscovered;
	}

	this.getBombNeighbours = function()
	{
		var n = this.getNeighbours();
		for(var i = n.length - 1; i >= 0; i--)
		{
			if(!n[i].getIsBombTile())
				n.splice(i, 1);
		}

		return n;
	}

	var onInteraction = function()
	{
		if(!isInteractable) { return; }
		tileEventCenterPoint.dispatchEvent(SweepTile.prototype.EVENT_INTERACTION, tileObject);
	}
}

SweepTile.prototype.EVENT_INTERACTION = "InteractionEvent";

SweepTile.prototype.showNumber = function(number)
{
	var text = new PIXI.Text(number);
}