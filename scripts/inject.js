var injected = injected || (function()
{
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse)
	{
		if (request === "GetZendeskOrganization")
		{
			var workspaces = document.querySelectorAll(".ember-view.workspace");
			var workspace;
			
			for (var i in workspaces)
			{
				workspace = workspaces[i];
		
				if (workspace.style.display !== "none")
					break;
			}
	
			if ( ! workspace)
				return;
			
			var button = workspace.querySelectorAll("header .pane.left .ember-view.btn-group .ember-view.btn")[0];
			
			if (button)
			{
				var organization = button.textContent.trim();
				
				sendResponse(organization);
			}
		}
	});
	
	return true;
})();
