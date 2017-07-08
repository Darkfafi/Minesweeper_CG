
MenuScene.prototype = Object.create(Scene.prototype);
function MenuScene()
{
	Scene.call(this);

	var logoImage = PIXI.Sprite.fromImage('assets/logo.png');
	var playButton = PIXI.Sprite.fromImage('assets/button.png');

	this.onCreate = function()
	{
		this.addChild(logoImage);
		this.addChild(playButton);

		logoImage.anchor.x = logoImage.anchor.y = 0.5;
		logoImage.x = app.renderer.width * 0.5;
		logoImage.y = app.renderer.height * 0.2;
		logoImage.scale.x = logoImage.scale.y = 1.5;

		playButton.anchor.x = playButton.anchor.y = 0.5;
		playButton.x = app.renderer.width * 0.5;
		playButton.y = app.renderer.height * 0.5;
		playButton.width = 256;
		playButton.height = 128;

		var playText = new PIXI.Text("Play!");
		playText.style.fill = 0xffffff;
		playText.anchor.x = 0.5;
		playText.anchor.y = 0.7;
		playText.scale.x = playText.scale.y = 0.6;
		playText.resolution = 2;
		playButton.addChild(playText);

		playButton.on('pointerdown', onClickedPlay);
		playButton.interactive = true;
		playButton.buttonMode = true;
	}

	this.onUpdate = function(deltaTime)
	{

	}

	this.onDestroy = function()
	{

	}

	var onClickedPlay = function()
	{
		sceneManager.setScene("gameScene");
	}
}