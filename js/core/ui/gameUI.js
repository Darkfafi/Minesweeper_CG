
function GameUI(container)
{
	var gameUIEventCenterPoint = new EventCenterPoint();

	var gfx = new PIXI.Graphics();
	var parentContainer = container;
	var isInteractable = false;

	// Interaction selection
	var defuseModeButton = new PIXI.Sprite.fromImage('assets/button.png');
	var flagModeButton = new PIXI.Sprite.fromImage('assets/button.png');

	var selectionTab = new PIXI.Sprite.fromImage('assets/selectionTab.png');
	var selectionTabDefuseIcon = new PIXI.Sprite.fromImage('assets/scissors.png');
	var selectionTabFlagIcon = new PIXI.Sprite.fromImage('assets/flag.png');

	// User information
	var bombTextBackground = new PIXI.Sprite.fromImage('assets/textHolder.png');
	var timeLeftBackground = new PIXI.Sprite.fromImage('assets/textHolder.png');
	var bombAmountText = new PIXI.Text(99);
	var timeLeftText = new PIXI.Text("0:00");

	this.getEventCenterPoint = function()
	{
		return gameUIEventCenterPoint;
	}

	this.getBackgroundImage = function()
	{
		return gfx;
	}

	this.setIsInteractable = function(isInteractableBoolean)
	{
		isInteractable = isInteractableBoolean;

		defuseModeButton.interactive = isInteractable;
		defuseModeButton.buttonMode = isInteractable;

		flagModeButton.interactive = isInteractable;
		flagModeButton.buttonMode = isInteractable;
	}

	this.setBombAmountText = function(value)
	{
		bombAmountText.text = value;
	}

	this.setTimeLeftText = function(timeInSeconds)
	{
		timeLeftText.text = TimeUtils.SecondsToHumanString(timeInSeconds);
	}

	var onDefuseModeClicked = function()
	{
		selectionTabDefuseIcon.visible = true;
		selectionTabFlagIcon.visible = false;
		gameUIEventCenterPoint.dispatchEvent(GameUI.prototype.EVENT_NEW_SELECTION_TAB_ICON, GameUI.prototype.ICON_TYPE_DEFUSE);
	}

	var onFlagModeClicked = function()
	{
		selectionTabDefuseIcon.visible = false;
		selectionTabFlagIcon.visible = true;
		gameUIEventCenterPoint.dispatchEvent(GameUI.prototype.EVENT_NEW_SELECTION_TAB_ICON, GameUI.prototype.ICON_TYPE_FLAG);
	}

	var drawBackground = function()
	{
		gfx.beginFill(0x555555, 1);
		gfx.drawRect(0, 0, app.renderer.width, app.renderer.height * 0.1);
		gfx.pivot.y = gfx.height;
		gfx.y = app.renderer.height;

		parentContainer.addChild(gfx);
	}

	var drawInteractionElements = function()
	{
		gfx.addChild(defuseModeButton);
		gfx.addChild(flagModeButton);
		gfx.addChild(selectionTab);

		defuseModeButton.y = gfx.height * 0.5;
		defuseModeButton.x = gfx.width * 0.35;

		flagModeButton.y = gfx.height * 0.5;
		flagModeButton.x = gfx.width *0.65;

		selectionTab.y = gfx.height * 0.5;
		selectionTab.x = gfx.width * 0.5;

		selectionTab.anchor.x = selectionTab.anchor.y = 0.5;
		selectionTab.scale.x = selectionTab.scale.y = 1.5;
	}

	var drawInformationElements = function()
	{
		timeLeftBackground.anchor.x = timeLeftBackground.anchor.y = bombTextBackground.anchor.x = bombTextBackground.anchor.y = 0.5;
		bombAmountText.anchor.x = bombAmountText.anchor.y = timeLeftText.anchor.x = timeLeftText.anchor.y = 0.5;
		timeLeftText.scale.x = timeLeftText.scale.y = bombAmountText.scale.x = bombAmountText.scale.y = 0.8;

		gfx.addChild(bombTextBackground);
		bombTextBackground.addChild(bombAmountText);

		gfx.addChild(timeLeftBackground);
		timeLeftBackground.addChild(timeLeftText);
		bombTextBackground.scale.x = bombTextBackground.scale.y = timeLeftBackground.scale.x = timeLeftBackground.scale.y = 1.5;

		bombTextBackground.y = timeLeftBackground.y = gfx.height * 0.35;
		timeLeftBackground.x = gfx.width * 0.81;
		bombTextBackground.x = gfx.width * 0.15;
	}

	var createButtonVisualisation = function()
	{
		var scissorsImage = new PIXI.Sprite.fromImage('assets/scissors.png');
		var flagImage = new PIXI.Sprite.fromImage('assets/flag.png');

		defuseModeButton.anchor.x = defuseModeButton.anchor.y = 0.5;

		defuseModeButton.addChild(scissorsImage);

		defuseModeButton.scale.x = defuseModeButton.scale.y = 1.5;
		flagModeButton.scale.x = flagModeButton.scale.y = 1.5;

		scissorsImage.anchor.x =  0.5;
		scissorsImage.anchor.y =  0.64;
		scissorsImage.width = scissorsImage.height = 23;

		flagModeButton.addChild(flagImage);

		flagImage.anchor.x =  0.5;
		flagImage.anchor.y =  0.63;
		flagImage.width = flagImage.height = 23;

		flagModeButton.anchor.x = flagModeButton.anchor.y = 0.5;

		defuseModeButton.on('pointerdown', onDefuseModeClicked);
		flagModeButton.on('pointerdown', onFlagModeClicked);
	}

	var createSelectionTabVisualization = function()
	{
		selectionTabDefuseIcon.visible = false;
		selectionTabFlagIcon.visible = false;
		selectionTabDefuseIcon.anchor.x = selectionTabDefuseIcon.anchor.y = 0.5;
		selectionTabFlagIcon.anchor.x = 0.65;
		selectionTabFlagIcon.anchor.y = 0.5;
		selectionTabDefuseIcon.scale.x = selectionTabDefuseIcon.scale.y = selectionTabFlagIcon.scale.x = selectionTabFlagIcon.scale.y = 0.8;
		selectionTab.addChild(selectionTabDefuseIcon);
		selectionTab.addChild(selectionTabFlagIcon);
	}

	
	drawBackground();
	drawInteractionElements();
	drawInformationElements();
	createButtonVisualisation();
	createSelectionTabVisualization();
	this.setIsInteractable(true);
	onDefuseModeClicked();
}

GameUI.prototype.EVENT_NEW_SELECTION_TAB_ICON = "NewSelectionTabIconEvent";
GameUI.prototype.ICON_TYPE_DEFUSE = 0;
GameUI.prototype.ICON_TYPE_FLAG = 1;