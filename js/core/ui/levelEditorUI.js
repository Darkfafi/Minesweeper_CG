
function LevelEditorUI(container)
{
	var editorUIEventCenterPoint = new EventCenterPoint();
	var backButton;
	var widthButton;
	var heightButton;
	var exportButton;
	var parentContainer = container;

	this.getEventCenterPoint = function()
	{
		return editorUIEventCenterPoint;
	}

	var setupButtons = function()
	{
		backButton = new Button(AssetLocations.getButtonLocation());
		widthButton = new Button(AssetLocations.getButtonLocation());
		heightButton = new Button(AssetLocations.getButtonLocation());
		exportButton = new Button(AssetLocations.getButtonLocation());

		backButton.textObject.text = "Back";
		widthButton.textObject.text = "Width";
		heightButton.textObject.text = "Height";
		exportButton.textObject.text = "Export";

		backButton.scale.x = backButton.scale.y = 2;
		widthButton.scale.x = widthButton.scale.y = 2;
		heightButton.scale.x = heightButton.scale.y = 2;
		exportButton.scale.x = exportButton.scale.y = 2;

		parentContainer.addChild(backButton);
		parentContainer.addChild(widthButton);
		parentContainer.addChild(heightButton);
		parentContainer.addChild(exportButton);

		backButton.x = app.renderer.width * 0.125;
		widthButton.x = app.renderer.width * 0.315;
		heightButton.x = app.renderer.width * 0.515;
		exportButton.x = app.renderer.width * 0.715;

		backButton.y = widthButton.y = heightButton.y = exportButton.y = app.renderer.height * 0.87;

		backButton.sprite.on('pointerdown', onBackPressed);
		widthButton.sprite.on('pointerdown', onWidthPressed);
		heightButton.sprite.on('pointerdown', onHeightPressed);
		exportButton.sprite.on('pointerdown', onExportPressed);
	}

	var onBackPressed = function()
	{
		editorUIEventCenterPoint.dispatchEvent(LevelEditorUI.prototype.EVENT_ON_BUTTON_PRESSED, LevelEditorUI.prototype.TYPE_BUTTON_BACK);
	}

	var onWidthPressed = function()
	{
		editorUIEventCenterPoint.dispatchEvent(LevelEditorUI.prototype.EVENT_ON_BUTTON_PRESSED, LevelEditorUI.prototype.TYPE_BUTTON_WIDTH);
	}

	var onHeightPressed = function()
	{
		editorUIEventCenterPoint.dispatchEvent(LevelEditorUI.prototype.EVENT_ON_BUTTON_PRESSED, LevelEditorUI.prototype.TYPE_BUTTON_HEIGHT);
	}

	var onExportPressed = function()
	{
		editorUIEventCenterPoint.dispatchEvent(LevelEditorUI.prototype.EVENT_ON_BUTTON_PRESSED, LevelEditorUI.prototype.TYPE_BUTTON_EXPORT);
	}

	setupButtons();
}

LevelEditorUI.prototype.EVENT_ON_BUTTON_PRESSED = "OnLevelEditorUIButtonPressed";
LevelEditorUI.prototype.TYPE_BUTTON_BACK = 0;
LevelEditorUI.prototype.TYPE_BUTTON_WIDTH = 1;
LevelEditorUI.prototype.TYPE_BUTTON_HEIGHT = 2;
LevelEditorUI.prototype.TYPE_BUTTON_EXPORT = 3;