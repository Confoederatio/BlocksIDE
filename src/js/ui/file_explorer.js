//Initialise functions
{
	function closeFileExplorerContextMenus () {
		//Declare local instance variables
		var all_file_explorer_context_menus = ["file_explorer_context_menu", "create_new_file_context_menu", "create_new_folder_context_menu"];

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
	function printFileExplorerContextMenu (arg0_options) {
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
											var new_file_path = path.join(current_folder, state_obj.new_file_name);

											//Create new file if it doesn't already exist
											if (!fs.existsSync(new_file_path))
												fs.writeFileSync(new_file_path, "", "utf8");

											clearHierarchy(`file-explorer`, { hierarchy_selector: `#file-explorer` });
											populateFileExplorer(`file-explorer`, current_folder, undefined, window.file_explorer_options);
										}
									}
								}
							}
						});
					}
				},
				create_new_folder: {
					id: "create_new_folder",
					name: "Create New Folder",
					type: "button",

					onclick: (e) => {
						var current_interface = window.file_explorer_context_menu;

						printNewProjectContextMenu({
							is_create_new_project: false,
							name: "Create New Folder",
							x: returnSafeNumber(current_interface.x + current_interface.element.offsetWidth + 4),
							y: returnSafeNumber(current_interface.y)
						});
					}
				}
			}
		});
	}

	/**
	 * printNewProjectContextMenu() - Prints a context menu for creating a new project.
	 * @param {Object} [arg0_options]
	 *  @param {boolean} [arg0_options.is_create_new_project=true] - Whether the user is intending on creating a new project, or just a new folder.
	 *  @param {String} [arg0_options.name="Create New Project"]
	 *  @param {number} [arg0_options.x=0]
	 *  @param {number} [arg0_options.y=0]
	 *
	 * @returns {ve.Window}
	 */
	function printNewProjectContextMenu (arg0_options) {
		//Convert from parameters
		var options = (arg0_options) ? arg0_options : {};

		//Initialise options
		if (options.is_create_new_project == undefined) options.is_create_new_project = true;

		//Close create_new_folder_context_menu if it already exists
		if (window.create_new_folder_context_menu) window.create_new_folder_context_menu.close();

		//Declare local instance variables
		window.create_new_folder_context_menu = new ve.Window({
			can_rename: false,
			name: (options.name) ? options.name : "Create New Project",
			x: returnSafeNumber(options.x),
			y: returnSafeNumber(options.y),

			interface: {
				new_project_name: {
					id: "new_project_name",
					type: "text",
					attributes: {
						placeholder: "Folder Name"
					}
				},
				create_new_project_button: {
					id: "create_new_project_button",
					name: "Confirm",
					type: "button",

					onclick: (e) => {
						var current_folder = document.querySelector(`#file-explorer`).getAttribute("data-directory");
						var state_obj = window.create_new_folder_context_menu.getState();

						if (state_obj.new_project_name && state_obj.new_project_name.length > 0) {
							var new_folder_path = path.join(current_folder, state_obj.new_project_name);

							//Create new folder if it doesn't already exist
							if (!fs.existsSync(new_folder_path)) {
								fs.mkdirSync(new_folder_path);

								//Reload #file-explorer depending on its status
								if (options.is_create_new_project) {
									window.file_explorer_options.variable_key = new_folder_path;
									window.main.saves_folder = new_folder_path;
									window.main.selected_folder = new_folder_path;
								}

								clearHierarchy(`file-explorer`, { hierarchy_selector: `#file-explorer` });
								populateFileExplorer(`file-explorer`, window.main.selected_folder, undefined, window.file_explorer_options);
								document.querySelector(`#file-explorer`).setAttribute("data-directory", window.main.selected_folder);
							}
						}
					}
				}
			}
		});
	}

	/**
	 * printOpenProjectContextMenu() - Prints a menu to open a new project folder, changing window.main.saves_folder and repopulating #file-explorer
	 * @param {Object} [arg0_options]
	 */
	window.printOpenProjectContextMenu = async function (arg0_options) {
		//Convert from parameters
		var options = (arg0_options) ? arg0_options : {};

		//Try/catch block to attempt fetching the given
		try {
			var folder_path = await electron.ipcRenderer.invoke("dialog:openFolder", window.main.saves_folder);

			if (folder_path) {
				window.file_explorer_options.variable_key = folder_path;
				window.main.saves_folder = folder_path;
				window.main.selected_folder = folder_path;

				console.log(`Selected folder:`, window.main.selected_folder);
				clearHierarchy(`file-explorer`, { hierarchy_selector: `#file-explorer` });
				populateFileExplorer(`file-explorer`, window.main.selected_folder, undefined, window.file_explorer_options);
				document.querySelector(`#file-explorer`).setAttribute("data-directory", window.main.selected_folder);

				console.log('Received folder path from main process:', folder_path);
			}
		} catch (e) {
			console.error(e);
		}
	}

	function saveCurrentFile () {
		if (window.current_file) {
			editor.synchroniseEditors();
			fs.writeFileSync(window.current_file, editor.main.code, "utf8");

			console.log(`Saved currently loaded file to `, window.current_file);
		}
	}
}