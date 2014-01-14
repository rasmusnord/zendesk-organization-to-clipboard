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
	
	chrome.browserAction.setTitle({ title: "Click to copy the organization button label" });

	chrome.browserAction.onClicked.addListener(function ()
	{
		chrome.tabs.getSelected(null, function(tab)
		{
			if ( ! tab.url.match(/^https\:\/\/.*\.zendesk\.com\/agent\/#\/tickets\/.*$/))
				return;
			
			chrome.tabs.executeScript(tab.id, { file: "scripts/inject.js" }, function ()
			{
				chrome.tabs.sendMessage(tab.id, "GetZendeskOrganization", function (organization)
				{
					copyToClipboard(organization);
				});
			});
		});
	});
})();
