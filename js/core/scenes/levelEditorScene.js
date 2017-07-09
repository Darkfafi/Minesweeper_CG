LevelEditorScene.prototype = Object.create(Scene.prototype);
function LevelEditorScene()
{	
	Scene.call(this);

	var grid;
	var gridContainer;
	var levelEditorUI;

	this.onCreate = function(sceneArgs)
	{
		this.createVisualGrid(9, 9);
		levelEditorUI = new LevelEditorUI(this);
		levelEditorUI.getEventCenterPoint().addEventListener(LevelEditorUI.prototype.EVENT_ON_BUTTON_PRESSED, onUIButtonPressed);
	}

	this.onUpdate = function(deltaTime)
	{
		
	}

	this.onDestroy = function()
	{
		this.destroyGrid();
	}

	this.getCurrentInteractionState = function()
	{
		return currentInteractionState;
	}

	this.createVisualGrid = function(width, height)
	{
		this.destroyGrid();
		gridContainer = new PIXI.Container();
		grid = new Grid(width, height, SweepTile);
		var tiles = grid.getAllTiles();
		for(var i = 0; i < tiles.length; i++)
		{
			var sprt = tiles[i].setTileSprite('assets/tile.png', 32);
			tiles[i].getTileEventCenterPoint().addEventListener(SweepTile.prototype.EVENT_INTERACTION, onTilePressed);
			gridContainer.addChild(sprt);
		}

		this.addChild(gridContainer);

		gridContainer.x = app.renderer.width * 0.5;
		gridContainer.y = (app.renderer.height * 0.5) - (app.renderer.height * 0.05);
		gridContainer.pivot.x = gridContainer.width / 2;
		gridContainer.pivot.y = gridContainer.height / 2;

		setTimeout(this.activateGrid, 500);
	}

	this.destroyGrid = function()
	{
		if(gridContainer != null)
		{
			this.removeChild(gridContainer);
			var tiles = grid.getAllTiles();
			for(var i = 0; i < tiles.length; i++)
			{
				tiles[i].getTileEventCenterPoint().removeEventListener(SweepTile.prototype.EVENT_INTERACTION, onTilePressed);
			}
			gridContainer = null;
		}
	}

	this.activateGrid = function()
	{
		var tiles = grid.getAllTiles();
		for(var i = 0; i < tiles.length; i++)
		{
			tiles[i].setIsInteractable(true);
			tiles[i].setDiscoveredState(true);
		}
	}

	this.getGrid = function()
	{
		return grid;
	}
	var onTilePressed = function(tile)
	{
		tile.setIsBombTile(!tile.getIsBombTile());

	}.bind(this);

	var onUIButtonPressed = function(buttonType)
	{
		switch(buttonType)
		{
			case LevelEditorUI.prototype.TYPE_BUTTON_BACK:
				sceneManager.setScene("menuScene");
			break;
			case LevelEditorUI.prototype.TYPE_BUTTON_WIDTH:
				var width = prompt("Please Enter a grid width (number)", grid.getTileAmountX());
				if(isNaN(width)) { return; }
				if(!width) {width = grid.getTileAmountX();}
				if(width < Globals.getMinGridWidth()) { width = Globals.getMinGridWidth();}
				if(width > Globals.getMaxGridWidth()) { width = Globals.getMaxGridWidth();}
				if(width != grid.getTileAmountX()) 
				{ 
					this.createVisualGrid(width, grid.getTileAmountY());
					console.log("Set new Width to: " + width);
				}
			break;
			case LevelEditorUI.prototype.TYPE_BUTTON_HEIGHT:
				var height = prompt("Please Enter a grid height (number)", grid.getTileAmountY());
				if(isNaN(height)) { return; }
				if(!height) {height = grid.getTileAmountY();}
				if(height < Globals.getMinGridHeight()) { height = Globals.getMinGridHeight();}
				if(height > Globals.getMaxGridHeight()) { height = Globals.getMaxGridHeight();}
				if(height != grid.getTileAmountY()) 
				{ 
					this.createVisualGrid(grid.getTileAmountX(), height);
					console.log("Set new Height to: " + height);
				}
			break;
			case LevelEditorUI.prototype.TYPE_BUTTON_EXPORT:
				var fileName = prompt("Please Enter a file name for your level export", "myOwnLevel");
				if(fileName) 
				{ 
					console.log(grid);
					var jsonData = grid.toJsonData();
					var json = JSON.stringify(jsonData);
					var blob = new Blob([json], {type: "application/json"});
					saveAs(blob, fileName + ".json");
					console.log("Saved file with filename: " + fileName + ".json");
				}
			break;
		}
	}.bind(this);
}