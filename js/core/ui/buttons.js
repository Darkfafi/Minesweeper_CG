
Button.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
function Button(imageLocation)
{
	PIXI.DisplayObjectContainer.call(this);

	this.textObject;
	this.sprite;

	this.setInteractable = function(isInteractable)
	{
		this.sprite.interactive = isInteractable;
		this.sprite.buttonMode = isInteractable;
	}

	this.getInteractable = function()
	{
		return this.interactive;
	}

	var setTextPart = function()
	{
		this.textObject = new PIXI.Text("");
		this.sprite  = new PIXI.Sprite.fromImage(imageLocation);
		this.sprite.width = 64;
		this.sprite.height = 32;
		this.textObject.anchor.x = this.textObject.anchor.y = 0.5;
		this.sprite.addChild(this.textObject);
		this.addChild(this.sprite);
		this.textObject.scale.x = this.textObject.scale.y = 0.8;
		this.textObject.x = this.sprite.width * 0.5;
		this.textObject.y = this.sprite.height * 0.42;
	}.bind(this);

	setTextPart();
	this.setInteractable(true);
}