function SceneManager(pixiApplication)
{
	this.currentScene = null;
	this.scenes = [];
	this.sceneInMaking = null;
	this.sceneMakingArgs = null;

	var pixiApplication = pixiApplication;
	var sceneSystem = this;

	this.getPixiApplication = function()
	{
		return pixiApplication;
	}
}

SceneManager.prototype.addScene = function(sceneName, scenePrototype)
{
	var sp = this.getSceneIndex(sceneName);
	if(sp != -1) { alert("Can't add scene with name: " + sceneName  +". There is already a scene with that name."); return; }
	this.scenes.push(new SceneManagerItem(sceneName, scenePrototype));
}

SceneManager.prototype.removeScene = function(sceneName)
{
	var sp = this.getSceneIndex(sceneName);
	if(sp == -1) { alert("Can't remove scene with name: " + sceneName + ". There is no scene with that name."); return; }
	this.scenes.splice(sp, 1);
}

SceneManager.prototype.setScene = function(sceneName, sceneArgs)
{
	if(this.currentScene != null)
	{
		this.getPixiApplication().stage.removeChild(this.currentScene);
		this.currentScene.onDestroy();
	}

	if(sceneArgs != SceneManager.prototype.SAME_ARGS_PARAMETER)
		this.sceneMakingArgs = sceneArgs;

	sceneInMaking = this.scenes[this.getSceneIndex(sceneName)].scenePrototype;
}

SceneManager.prototype.getSceneIndex = function(sceneName)
{
	for(var i = 0; i < this.scenes.length; i++)
	{
		if(this.scenes[i].name == sceneName)
		{
			return i;
		}
	}

	return -1;
}

SceneManager.prototype.update = function(deltaTime)
{
	if(sceneInMaking != null)
	{
		this.currentScene = new sceneInMaking;
		sceneInMaking = null;
		this.getPixiApplication().stage.addChild(this.currentScene);
		this.currentScene.onCreate(this.sceneMakingArgs);
	}

	if(this.currentScene == null) { return; }
	this.currentScene.onUpdate(deltaTime);
}

SceneManager.prototype.SAME_ARGS_PARAMETER = "SAME_ARGS_PARAMETER_SCENE_MANAGER";

function SceneManagerItem(name, prototype)
{
	this.name = name;
	this.scenePrototype = prototype;
}


Scene.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
function Scene()
{
	PIXI.DisplayObjectContainer.call(this);
}

Scene.prototype.onCreate = function(sceneArgs)
{

}

Scene.prototype.onUpdate = function(deltaTime)
{

}

Scene.prototype.onDestroy = function()
{

}