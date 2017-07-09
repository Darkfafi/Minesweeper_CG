
function Grid(tilesX, tilesY, optionalTileClass)
{
	var tiles = [];
	var tileAmountX, tileAmountY;
	var gridClass = this;

	this.generateGrid = function(tilesX, tilesY, optionalTileClass)
	{
		tiles = [];
		tileAmountX = tilesX;
		tileAmountY = tilesY;

		if(optionalTileClass == null)
			optionalTileClass = Tile;

		for(var xRow = 0; xRow < tilesX; xRow++)
		{
			var yRowArray = [];
			tiles.push(yRowArray);
			for(var yRow = 0; yRow < tilesY; yRow++)
			{
				yRowArray.push(new optionalTileClass(xRow, yRow, gridClass));
			}
		}
	}

	this.getAllTiles = function()
	{
		var allTiles = [];
		for(var i = 0; i < tiles.length; i++)
		{
			for(var j = 0; j < tiles[i].length; j++)
			{
				allTiles.push(tiles[i][j]);
			}
		}
		return allTiles;
	}

	this.getTile = function(tileIndexX, tileIndexY)
	{
		if(tileIndexX < 0 || tileIndexX >= tiles.length || tileIndexY < 0 || tileIndexY >= tiles[tileIndexX].length)
		{ 
			console.error("Tile requested from: x="+tileIndexX+" & y="+tileIndexY+" out of bounds of: x=" + tileAmountX + " and y=" + tileAmountY); 
			return null; 
		}

		return tiles[tileIndexX][tileIndexY];
	}

	this.getTileAmountX = function()
	{
		return tileAmountX;
	}

	this.getTileAmountY = function()
	{
		return tileAmountY;
	}

	this.generateGrid(tilesX, tilesY, optionalTileClass);
}

Grid.prototype.toJsonData = function()
{
	var allTiles = this.getAllTiles();
	var tileJsons = [];

	for(var i = 0; i < allTiles.length; i++)
	{
		tileJsons.push(allTiles[i].toJsonData());
	}

	var jsonFormat = 
	{
		"name": "gridData",
		"width": this.getTileAmountX(),
		"height": this.getTileAmountY(),
		"tiles": tileJsons
	}

	return jsonFormat;
}

function Tile(gridIndexX, gridIndexY, grid)
{
	var gridXPos = gridIndexX;
	var gridYPos = gridIndexY;
	var grid = grid;

	this.getGridIndexX = function()
	{
		return gridXPos;
	}

	this.getGridIndexY = function()
	{
		return gridYPos;
	}

	this.getNeighbours = function()
	{
		var neighbours = [];
		for(var i = gridXPos - 1; i <= gridXPos + 1; i++)
		{
			if(i < 0 || i >= grid.getTileAmountX()) { continue; }
			for(var j = gridYPos - 1; j <= gridYPos + 1; j++)
			{
				if(j < 0 || j >= grid.getTileAmountY() || (i == gridXPos && j == gridYPos)) { continue; }
				neighbours.push(grid.getTile(i, j));
			}
		}

		return neighbours;
	}
}

Tile.prototype.toJsonData = function()
{
	var jsonObject = 
	{
		"xPos":gridXPos,
		"yPos":gridYPos
	}

	return jsonObject;
}