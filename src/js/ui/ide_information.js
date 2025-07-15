{
	function initialiseUpdateInformation () {
		//Declare local instance variables
		window.information_ui_loop = setInterval(function(){
			var file_explorer_el = document.querySelector(`#file-explorer`);
			var file_information_el = document.querySelector(`#file-information`);

			var current_file = (window.current_file) ? window.current_file : "(none)";
			var current_folder = path.dirname(path.join(file_explorer_el.getAttribute("data-directory"), "dummy.txt"));

			//Iterate over all elements in split current_file; process current_file name
			current_file = current_file.replace(current_folder, "")
				.split("\\");
			for (var i = current_file.length - 1; i >= 0; i--)
				if (current_file[i] == "")
					current_file.splice(i, 1);

			//Set file_information_el
			file_information_el.innerHTML = current_file.join("/");
		}, 1000);
	}

	function printInformationPanel () {
		//Close UI if it already exists
		if (window.information_ui) window.information_ui.close();

		window.information_ui = new ve.Window({
			can_rename: false,
			id: "information-ui",
			name: "Information",
			x: 100,
			y: 200,

			interface: {
				display_info: {
					id: "display_info",
					innerHTML: "Loading ..",
					type: "html",
					onload: (e) => {
						window.information_ui_info_loop = setInterval(function(){
							//Clear interval and break if UI doesn't exist
							if (!document.querySelector(`#information-ui`)) {
								clearInterval(window.information_ui_info_loop);
							} else {
								var display_string = [];

								//Format display_string
								display_string.push(`<b>Project Folder:</b> ${path.join(window.main.saves_folder)}`);
								display_string.push("");
								display_string.push(`<b>Current File:</b> ${path.join((window.current_file) ? window.current_file : "(none)")}`)

								e.innerHTML = display_string.join("<br>");
							}
						}, 500);
					}
				}
			}
		});
	}
}