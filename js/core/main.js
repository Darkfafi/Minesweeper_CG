var app;

window.onload = function()
{
	main();
}

function main()
{
	app = new PIXI.Application(800, 600, {backgroundColor : 0x2299ff});
	document.body.appendChild(app.view);
	console.log("Hello World!");
}