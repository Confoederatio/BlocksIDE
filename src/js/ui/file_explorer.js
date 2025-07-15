//Initialise functions
{
	function closeFileExplorerContextMenus () {
		//Declare local instance variables
		var all_file_explorer_context_menus = ["file_explorer_context_menu", "create_new_file_context_menu"];

		//Iterate over all_file_explorer_context_menus
		for (var i = 0; i < all_file_explorer_context_menus.length; i++)
			if (window[all_file_explorer_context_menus[i]])
				window[all_file_explorer_context_menus[i]].close();
	}

	function initialiseFileExplorer () {
		if (!window.main) window.main = {};
		if (!window.main.saves_folder) window.main.saves_folder = path.join(__dirname, `test`);
		if (!window.main.selected_folder) window.main.selected_folder = path.join(__dirname, `test`);

		window.file_explorer_options = {
			saves_explorer: true,
			variable_key: window.main.selected_folder,

			ondeleteclick: function (e) {

			},
			onloadclick: function (e) {
				//Declare local instance variables
				var local_file_content = fs.readFileSync(e.full_file_path, "utf-8");

				try {
					editor.openJSString(local_file_content);

					//Set window.current_file
					window.current_file = e.full_file_path;
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
		};

		//Create file explorer
		createFileExplorer(`#file-explorer`, window.main.selected_folder, window.file_explorer_options);

		document.querySelector(`#file-explorer`).onclick = function (e) {
			if (window.file_explorer_context_menu)
				closeFileExplorerContextMenus();
		}
		document.querySelector(`#file-explorer`).oncontextmenu = function (e) {
			console.log(e);
			printFileExplorerContextMenu({
				x: e.pageX,
				y: e.pageY
			})
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
		//Convert from parameters
		var options = (arg0_options) ? arg0_options : {};

		//Close previous context menu first
		if (window.file_explorer_context_menu) window.file_explorer_context_menu.close();

		//Open new context menu
		window.file_explorer_context_menu = new ve.Window({
			can_rename: false,
			headless: true,
			resizeable: false,
			x: returnSafeNumber(options.x),
			y: returnSafeNumber(options.y),

			interface: {
				create_new_file: {
					id: "create_new_file",
					name: "Create New File",
					type: "button",
					onclick: (e) => {
						var current_interface = window.file_explorer_context_menu;
						if (window.create_new_file_context_menu) window.create_new_file_context_menu.close();

						window.create_new_file_context_menu = new ve.Window({
							can_rename: false,
							name: "Create New File",
							x: returnSafeNumber(current_interface.x + current_interface.element.offsetWidth + 4),
							y: returnSafeNumber(current_interface.y),

							interface: {
								new_file_name: {
									id: "new_file_name",
									type: "text",

									attributes: {
										placeholder: "File Name"
									}
								},
								create_new_file_button: {
									id: "create_new_file_button",
									name: "Confirm",
									type: "button",

									onclick: (e) => {
										var current_folder = document.querySelector(`#file-explorer`).getAttribute("data-directory");
										var state_obj = window.create_new_file_context_menu.getState();

										if (state_obj.new_file_name && state_obj.new_file_name.length > 0) {
											fs.writeFileSync(path.join(current_folder, state_obj.new_file_name), "", "utf8");

											clearHierarchy(`file-explorer`, { hierarchy_selector: `#file-explorer` });
											populateFileExplorer(`file-explorer`, current_folder, undefined, window.file_explorer_options);
										}
									}
								}
							}
						});
					}
				}
			}
		});
	}

	function saveCurrentFile () {
		if (window.current_file) {
			editor.synchroniseEditors();
			fs.writeFileSync(window.current_file, editor.main.code, "utf8");

			console.log(`Saved currently loaded file to `, window.current_file);
		}
	}
}