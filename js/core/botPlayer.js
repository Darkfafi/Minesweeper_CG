
function BotPlayer(mistakeChance, gridToInteractWith)
{
	var chanceForMistakes = mistakeChance;
	var grid = gridToInteractWith;
	var isRunning = false;
	var minThinkTime = 1000;
	var maxThinkTime = 1000;
	var lastX = -1;
	var lastY = -1;

	this.start = function()
	{
		isRunning = true;
		this.makeChoice();
	}.bind(this);

	this.stop = function()
	{
		isRunning = false;
	}.bind(this);

	this.makeChoice = function()
	{
		if(!isRunning) { return; }
		var makeMistake = Math.floor(Math.random() * 100);
		console.log(makeMistake);
		makeMistake = (makeMistake < chanceForMistakes) ? true : false;
		var tileToClick = null;
		var randrom = (lastX == -1 && lastY == -1);

		if(randrom)
		{
			tileToClick = getRandomTile(makeMistake);
		}
		else
		{
			tileToClick = getRandomTileNeighbouring(lastX, lastY,makeMistake);

			if(tileToClick == null)
			{
				tileToClick = getRandomTile(makeMistake);
			}
		}
		
		if(tileToClick != null)
		{
			tileToClick.onInteraction();
			lastX = tileToClick.getGridIndexX();
			lastY = tileToClick.getGridIndexY();
		}
		else
		{
			console.log("Bot done.");
			this.stop();
		}

		setTimeout(this.makeChoice, minThinkTime + (Math.random() * maxThinkTime));
	}.bind(this);

	var getRandomTile = function(withBombBoolean)
	{		
		var tilesWithBombs = grid.getAllTiles();
		for(var i = tilesWithBombs.length - 1; i >= 0; i--)
		{
			if(tilesWithBombs[i].getDiscoveredState() || tilesWithBombs[i].getIsBombTile() != withBombBoolean)
			{
				tilesWithBombs.splice(i, 1);
			}
		}

		if(tilesWithBombs.length > 0)
		{
			return tilesWithBombs[Math.floor(Math.random() * tilesWithBombs.length)];
		}

		return null;
	}

	var getRandomTileNeighbouring = function(x, y, withBombBoolean)
	{
		var target = grid.getTile(x, y);
		var neighbours = target.getNeighbours();

		for(var i = neighbours.length - 1; i >= 0; i--)
		{
			if(neighbours[i].getDiscoveredState() || neighbours[i].getIsBombTile() != withBombBoolean)
			{
				neighbours.splice(i, 1);
			}
		}

		if(neighbours.length > 0)
		{
			return neighbours[Math.floor(Math.random() * neighbours.length)];
		}

		return null;
	}
}