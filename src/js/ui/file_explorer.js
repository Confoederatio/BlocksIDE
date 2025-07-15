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
				//Declare local instance variables
				var old_file_path = e.full_file_path;
				var new_file_path = path.join(path.dirname(e.full_file_path), e.target.value);

				//Rename file
				fs.renameSync(old_file_path, new_file_path);
			}
		});
		document.querySelector(`#file-explorer`).oncontextmenu = function (e) {
			console.log(e);
		};
	}

	/**
	 * printFileExplorerContextMenu() - Prints a headless file explorer context menu at the given location, bound to a specific ID.
	 * @param {Object} [arg0_options]
	 *  @param {String} [arg0_options.hierarchy_id="file-explorer"]
	 *  @param {String} [arg0_options.hierarchy_selector="#file-explorer"]
	 *  @param {number} [arg0_options.x=0]
	 *  @param {number} [arg0_options.y=0]
	 *
	 * @returns {ve.Window}
	 */
	function printFileExplorerContextMenu (arg0_options) { //[WIP] - Finish function body

	}
}