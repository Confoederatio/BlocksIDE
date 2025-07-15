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
}