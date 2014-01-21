(function()
{
	var copyToClipboard = function (text)
	{
		var copyDiv = document.createElement("div");
	
		copyDiv.contentEditable = true;
	
		document.body.appendChild(copyDiv);
	
		copyDiv.innerHTML = text;
		copyDiv.unselectable = "off";
		copyDiv.focus();
	
		document.execCommand("SelectAll");
		document.execCommand("Copy", false, null);
	
		document.body.removeChild(copyDiv);
	};
	
	var getOption = function (id)
	{
		var options = JSON.parse(localStorage.options);
		
		return options[id];
	}
	
	var getOrganization = function (callback)
	{
		chrome.tabs.getSelected(null, function(tab)
		{
			if ( ! tab.url.match(/^https\:\/\/.*\.zendesk\.com\/agent\/#\/tickets\/.*$/))
				return;
			
			chrome.tabs.executeScript(tab.id, { file: "scripts/inject.js" }, function ()
			{
				chrome.tabs.sendMessage(tab.id, "GetZendeskOrganization", callback);
			});
		});
	};
	
	chrome.browserAction.setTitle({ title: "Click to copy the organization button label" });

	chrome.browserAction.onClicked.addListener(function ()
	{
		getOrganization(function (organization)
		{
			copyToClipboard(organization);
		});
	});
	
	chrome.commands.onCommand.addListener(function (command)
	{
		if (command.match(/^search_url_.*/))
		{
			getOrganization(function (organization)
			{
				var searchUrl = getOption(command);
				
				if (searchUrl)
					chrome.tabs.create({ url: searchUrl.replace(/{organization}/g, organization) });
			});
		}
	});
	
})();
