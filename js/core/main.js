var sceneManager;
var app;

window.onload = function()
{
	main();
}

function main()
{
	app = new PIXI.Application(800, 600, {backgroundColor : 0x2299ff});
	document.getElementById("wrapper").appendChild(app.view);

	sceneManager = new SceneManager(app);
	
	app.ticker.add(function()
	{
		sceneManager.update(app.ticker.elapsedMS/1000);
	});

	sceneManager.addScene("testScene", TestScene);
	sceneManager.addScene("testScene2", TestScene2);
	sceneManager.setScene("testScene");
}

TestScene.prototype = Object.create(Scene.prototype);
function TestScene()
{
	Scene.call(this);
	var t = 0;
	var c = 0;
	this.onCreate = function()
	{
		console.log("hello scene");
	}

	this.onUpdate = function(deltaTime)
	{
		t += deltaTime;
		if(t > 1)
		{
			t = 0;
			c++;
			console.log("second ticker: " + c);
			if(c == 5)
			{
				sceneManager.setScene("testScene2")
			}
		}
	}

	this.onDestroy = function()
	{
		console.log("bye scene");
	}
}

TestScene2.prototype = Object.create(Scene.prototype);
function TestScene2()
{
	Scene.call(this);
	this.onCreate = function()
	{
		console.log("hello scene2");
	}

	this.onUpdate = function(deltaTime)
	{
		
	}

	this.onDestroy = function()
	{

	}
}