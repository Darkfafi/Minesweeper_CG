var app;

window.onload = function()
{
	main();
}

function main()
{
	app = new PIXI.Application(800, 600, {backgroundColor : 0x2299ff});
	document.getElementById("wrapper").appendChild(app.view);
	
	var testGrid = new Grid(10, 10);
	console.log(testGrid.getAllTiles());
}