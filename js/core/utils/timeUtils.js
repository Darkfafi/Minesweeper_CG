
var TimeUtils = {
	SecondsToHumanString: function(timeInSeconds)
	{
		var minutes = Math.floor(timeInSeconds/60);
		var seconds = Math.round(timeInSeconds%60);
		var stringToReturn;

		if(minutes > 9)
		{
			stringToReturn = minutes 
		}
		else
		{
			stringToReturn = "0" + minutes;
		}

		stringToReturn += ":";

		if(seconds > 9)
		{
			stringToReturn += seconds;
		}
		else
		{
			stringToReturn += "0" + seconds;
		}

		return stringToReturn;
	}
}