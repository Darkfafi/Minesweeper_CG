
SweepTile.prototype = Object.create(Tile.prototype);
function SweepTile(gridIndexX, gridIndexY, grid)
{
	Tile.call(this, gridIndexX, gridIndexY, grid);

	this.tileText = new PIXI.Text();
	this.tileText.anchor.x = this.tileText.anchor.y = 0.5;
	this.tileText.visible = false;

	var isBombTile = isBombTile;
	var hasBeenDiscovered = false;
	var hasBeenFlagged = false;
	var tileSprite;
	var isInteractable = false;
	var tileEventCenterPoint = new EventCenterPoint();
	var tileObject = this;

	var bombSprite = PIXI.Sprite.fromImage('assets/mine.png');
	bombSprite.anchor.x = bombSprite.anchor.y = 0.5;
	bombSprite.visible = false;

	var discoveredSprite = PIXI.Sprite.fromImage('assets/discoveredTile.png');
	discoveredSprite.anchor.x = discoveredSprite.anchor.y = 0.5;
	discoveredSprite.visible = false;

	var flagSprite = PIXI.Sprite.fromImage('assets/flag.png');
	flagSprite.anchor.x = flagSprite.anchor.y = 0.5;
	flagSprite.visible = false;

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

		tileSprite.width = tileSprite.height = size;
		tileSprite.x = this.getGridIndexX() * size;
		tileSprite.y = this.getGridIndexY() * size;

		tileSprite.addChild(discoveredSprite);
		discoveredSprite.x = tileSprite.width * 0.5;
		discoveredSprite.y = tileSprite.height * 0.5;

		this.tileText.x = tileSprite.width * 0.5;
		this.tileText.y = tileSprite.height * 0.5;
		this.tileText.visible = false;
		tileSprite.addChild(this.tileText);

		bombSprite.scale.x = bombSprite.scale.y = 0.7;
		tileSprite.addChild(bombSprite);
		bombSprite.x = tileSprite.width * 0.5;
		bombSprite.y = tileSprite.height * 0.5;

		tileSprite.addChild(flagSprite);
		flagSprite.scale.x = flagSprite.scale.y = 0.8;
		flagSprite.x = tileSprite.width * 0.5;
		flagSprite.y = tileSprite.height * 0.4;

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
		flagSprite.visible = hasBeenFlagged;
	}

	this.getTileSprite = function()
	{
		return tileSprite;
	}

	this.setIsBombTile = function(isBomb)
	{
		isBombTile = isBomb;
		bombSprite.visible = isBombTile && this.getDiscoveredState();
	}

	this.getIsBombTile = function()
	{
		return isBombTile;
	}

	this.setDiscoveredState = function(discoveredState)
	{
		hasBeenDiscovered = discoveredState;
		
		discoveredSprite.visible = hasBeenDiscovered;

		if(this.getIsBombTile())
		{
			bombSprite.visible = hasBeenDiscovered;
		}
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
	this.tileText.text = number;
	this.tileText.visible = true;
}