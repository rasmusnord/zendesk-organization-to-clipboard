(function()
{
	var saveButton = document.getElementById("save-button");
	var optionElements = document.querySelectorAll("[data-option-id]");
	
	var getOptions = function (callback)
	{
		var options = {};
		
		for (var i = 0; i < optionElements.length; i++)
		{
			var id = optionElements[i].dataset.optionId;
			var value = optionElements[i].value;
			
			options[id] = value;
		}
		
		callback(options);
	};
	
	var setOptions = function (options)
	{
		for (var key in options)
		{
			if (options.hasOwnProperty(key))
				document.querySelector("[data-option-id=" + key + "]").value = options[key];
		}
	};
	
	var readOptions = function (callback)
	{
		var options = {};
		
		if (localStorage.options)
			options = JSON.parse(localStorage.options);
		
		callback(options);
	};
	
	var writeOptions = function (options)
	{
		localStorage.options = JSON.stringify(options);
	};
	
	var optionValueChangeListener = function ()
	{
		saveButton.classList.add("unsaved");
	};
	
	for (var i = 0; i < optionElements.length; i++)
	{
		optionElements[i].addEventListener("change", optionValueChangeListener);
		optionElements[i].addEventListener("keyup", optionValueChangeListener);
	}
	
	saveButton.addEventListener("click", function ()
	{
		saveButton.classList.remove("unsaved");
		
		getOptions(function (options)
		{
			writeOptions(options);
		});
	});
	
	readOptions(function (options)
	{
		setOptions(options);
	});
	
})();
