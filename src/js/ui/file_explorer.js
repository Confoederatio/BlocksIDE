//Initialise functions
{
	function initialiseFileExplorer () {
		if (!window.main) window.main = {};
		if (!window.main.saves_folder) window.main.saves_folder = path.join(__dirname, `test`);
		if (!window.main.selected_folder) window.main.selected_folder = path.join(__dirname, `test`);

		createFileExplorer(`#file-explorer`, window.main.selected_folder, {
			saves_explorer: true,
			variable_key: window.main.selected_folder,

			ondeleteclick: function (e) {

			},
			onloadclick: function (e) {
				//Declare local instance variables
				var local_file_content = fs.readFileSync(e.full_file_path, "utf-8");

				try {
					editor.openJSString(local_file_content);
				} catch (e) {
					console.error(e);
				}
				//console.log(e.full_file_path, e.file_path);
			},
			onrename: function (e) {
				console.log(e.full_file_path, e.file_path, e.target.value);
			}
		});
	}
}