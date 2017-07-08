var globalEventCenterPoint = new EventCenterPoint();

function EventCenterPoint()
{
	var listenerItems = [];

	this.addEventListener = function(eventName, eventCallback)
	{
		var listenerItem = getListenerItem(eventName);

		if(listenerItem == null)
		{
			listenerItem = new ListenerItem(eventName);
			listenerItems.push(listenerItem);
		}

		listenerItem.callbacks.push(eventCallback);
	}	

	this.removeEventListener = function(eventName, eventCallback)
	{
		var listenerItem = getListenerItem(eventName);

		if(listenerItem == null) { return; }

		for(var i = 0; i < listenerItem.callbacks.length; i++)
		{
			if(listenerItem.callbacks[i].eventName == eventName)
			{
				listenerItem.callbacks.splice(i, 1);
				break;
			}
		}

		if(listenerItem.callbacks.length == 0)
		{
			var listenerItemIndex = listenerItems.indexOf(listenerItem);
			listenerItems.splice(listenerItemIndex, 1);
		}
	}

	this.dispatchEvent = function(eventName, eventData)
	{
		var listenerItem = getListenerItem(eventName);
		if(listenerItem == null) { return; }

		for(var i = listenerItem.callbacks.length - 1; i >= 0; i--)
		{
			listenerItem.callbacks[i](eventData);
		}
	}

	var getListenerItem = function(eventName)
	{
		for(var i = 0; i < listenerItems.length; i++)
		{
			if(listenerItems[i].eventName == eventName)
			{
				return listenerItems[i];
			}
		}

		return null;
	}

	var ListenerItem = function(name)
	{
		this.eventName = name;
		this.callbacks = [];
	}
}