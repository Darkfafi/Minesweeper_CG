
SweepTile.prototype = Object.create(Tile.prototype);
function SweepTile(gridIndexX, gridIndexY, grid)
{
	Tile.call(this, gridIndexX, gridIndexY, grid);

	this.tileText = new PIXI.Text();
	this.tileText.anchor.x = this.tileText.anchor.y = 0.5;
	this.tileText.visible = false;

	var isBombTile = false;
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

	var sizeEffect = -1;
	var orgScale = 0;
	var oc = null;
	var ct = 0;
	var dur = 0;
	var dir = -1337;

	app.ticker.add(function()
	{
		if(sizeEffect < 0 || tileSprite == null) { return; }
		if(orgScale == 0) { orgScale = tileSprite.scale.x; }
		if(dir == -1337) { dir = (sizeEffect - tileSprite.scale.y); } 
		ct += app.ticker.elapsedMS/1000;
		tileSprite.scale.x = tileSprite.scale.y = dir*ct/dur + orgScale;
		if((dir < 0 &&  tileSprite.scale.x <= sizeEffect) || (dir > 0 && tileSprite.scale.x >= sizeEffect))
		{
			tileSprite.scale.x = tileSprite.scale.y = sizeEffect;
			if(oc != null)
				oc();
		}
	});

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

		tileSprite.anchor.x = tileSprite.anchor.y = 0.5;

		tileSprite.width = tileSprite.height = size;
		tileSprite.x = this.getGridIndexX() * size;
		tileSprite.y = this.getGridIndexY() * size;

		tileSprite.x += tileSprite.width * 0.5;
		tileSprite.y += tileSprite.height * 0.5;

		tileSprite.addChild(discoveredSprite);

		this.tileText.visible = false;
		tileSprite.addChild(this.tileText);

		bombSprite.scale.x = bombSprite.scale.y = 0.7;
		tileSprite.addChild(bombSprite);

		tileSprite.addChild(flagSprite);
		flagSprite.scale.x = flagSprite.scale.y = 0.8;
		flagSprite.y = tileSprite.height * -0.1;

		tileSprite.on('mousedown', this.onInteraction);
		tileSprite.on('rightdown', this.onRightInteraction);
		tileSprite.on('touchstart', this.onInteraction);
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
		return isBomb;
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

		this.doScale(1.1, 0.2, function()
			{
				tileObject.doScale(0.95, 0.3, function(){ tileObject.doScale(1, 0.2, null); });
			});
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

	this.doScale = function(endScale, duration, callback)
	{
		sizeEffect = endScale;
		oc = callback;
		ct = 0;
		dir = -1337;
		dur = duration;
	}

	this.toJsonData = function()
	{
		var jsonFormat = 
		{
			"xPos":this.getGridIndexX(),
			"yPos":this.getGridIndexY(),
			"isBomb":this.getIsBombTile(),
			"isDiscovered":this.getDiscoveredState(),
			"isInteractable":this.getIsInteractable(),
			"isFlagged":this.getFlaggedState()
		}
		return jsonFormat;
	}

	this.onInteraction = function()
	{
		tileEventCenterPoint.dispatchEvent(SweepTile.prototype.EVENT_INTERACTION, tileObject);
	}

	this.onRightInteraction = function()
	{
		tileEventCenterPoint.dispatchEvent(SweepTile.prototype.EVENT_INTERACTION_RIGHT, tileObject);
	}
}

SweepTile.prototype.EVENT_INTERACTION = "InteractionEvent";
SweepTile.prototype.EVENT_INTERACTION_RIGHT = "InteractionRightEvent";

SweepTile.prototype.showNumber = function(number)
{
	this.tileText.text = number;
	this.tileText.visible = true;
}