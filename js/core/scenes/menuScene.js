
MenuScene.prototype = Object.create(Scene.prototype);
function MenuScene()
{
	Scene.call(this);

	var logoImage = PIXI.Sprite.fromImage('assets/logo.png');

	this.onCreate = function()
	{
		logoImage.anchor.x = logoImage.anchor.y = 0.5;
		logoImage.x = app.renderer.width * 0.5;
		logoImage.y = app.renderer.height * 0.2;
		logoImage.scale.x = logoImage.scale.y = 1.5;

		var playButton = new Button(AssetLocations.getButtonLocation());
		playButton.scale.x = playButton.scale.y = 3;
		playButton.x = (app.renderer.width * 0.5) - (playButton.sprite.width * 0.5 * playButton.scale.x);
		playButton.y = app.renderer.height * 0.38;
		playButton.textObject.scale.x = playButton.textObject.scale.y = 0.6;
		playButton.textObject.text = "Play!";
		playButton.textObject.style.fill = 0xffffff;
		playButton.sprite.on('pointerdown', onClickedPlay);

		var levelEditorButton = new Button(AssetLocations.getButtonLocation());
		levelEditorButton.scale.x = levelEditorButton.scale.y = 3;
		levelEditorButton.x = (app.renderer.width * 0.5) - (levelEditorButton.sprite.width * 0.5 * levelEditorButton.scale.x);
		levelEditorButton.y = app.renderer.height * 0.6;
		levelEditorButton.textObject.scale.x = levelEditorButton.textObject.scale.y = 0.420;
		levelEditorButton.textObject.text = "Level Editor";
		levelEditorButton.textObject.style.fill = 0xffffff;
		levelEditorButton.sprite.on('pointerdown', onClickedLevelEditor);

		this.addChild(logoImage);
		this.addChild(playButton);
		this.addChild(levelEditorButton);
	}

	this.onUpdate = function(deltaTime)
	{

	}

	this.onDestroy = function()
	{

	}

	var onClickedPlay = function()
	{
		sceneManager.setScene("playOptionsScene");
	}

	var onClickedLevelEditor = function()
	{
		sceneManager.setScene("levelEditorScene");
	}
}