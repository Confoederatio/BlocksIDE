//Initialise functions
{
	function openSettingsWindow () {
		if (document.querySelector(`[data-window-id="settings-ui"]`)) return; //Internal guard clause for settings-ui

		//Declare local instance variables
		var codemirror_themes = {
			"3024-day": "3024-day",
			"3024-night": "3024-night",
			"abbott": "Abbott",
			"abcdef": "abcdef",
			"ambiance-mobile": "Ambiance Mobile",
			"ambiance": "Ambiance",
			"ayu-dark": "Ayu Dark",
			"ayu-mirage": "Ayu Mirage",
			"base16-dark": "base16-dark",
			"base16-light": "base16-light",
			"bespin": "Bespin",
			"blackboard": "Blackboard",
			"cobalt": "Cobalt",
			"colorforth": "Colourforth",
			"darcula": "Darcula",
			"default": "Default",
			"dracula": "Dracula",
			"duotone-dark": "Duotone Dark",
			"duotone-light": "Duotone Light",
			"eclipse": "Eclipse",
			"elegant": "Elegant",
			"erlang-dark": "Erlang-dark",
			"gruvbox-dark": "Gruvbox-dark",
			"hopscotch": "Hopscotch",
			"icecoder": "Icecoder",
			"idea": "Idea",
			"isotope": "Isotope",
			"juejin": "Juejin",
			"lesser-dark": "Lesser-dark",
			"liquibyte": "Liquibyte",
			"lucario": "Lucario",
			"material-darker": "Material Darker",
			"material-ocean": "Material Ocean",
			"material-palenight": "Material Palenight",
			"material": "Material",
			"mbo": "mbo",
			"mdn-like": "mdn-like",
			"midnight": "Midnight",
			"monokai": "Monokai",
			"moxer": "Moxer",
			"neat": "Neat",
			"neo": "Neo",
			"night": "Night",
			"nord": "Nord",
			"oceanic-next": "Oceanic Next",
			"panda-syntax": "Panda Syntax",
			"paraiso-dark": "Paraiso Dark",
			"paraiso-light": "Paraiso Light",
			"pastel-on-dark": "Pastel on Dark",
			"railscasts": "Railscasts",
			"rubyblue": "Rubyblue",
			"seti": "SETI",
			"shadowfox": "Shadowfox",
			"solarized": "Solarised",
			"ssms": "SSMS",
			"the-matrix": "The Matrix",
			"tomorrow-night-bright": "Tomorrow Night Bright",
			"tomorrow-night-eighties": "Tomorrow Night 80s",
			"ttcn": "TTCN",
			"twilight": "Twilight",
			"vibrant-ink": "Vibrant Ink",
			"xq-dark": "XQ Dark",
			"xq-light": "XQ Light",
			"yeti": "Yeti",
			"yonce": "Yonce",
			"zenburn": "Zenburn"
		};

		window.settings_ui = new ve.Window({
			can_rename: false,
			id: "settings-ui",
			name: "Settings",
			x: 100,
			y: 200,

			page_menu: {
				pages: {
					file: {
						name: "File"
					},
					settings: {
						name: "Settings",

						load_settings: {
							id: "load_settings",
							name: "Load Settings",
							type: "button"
						},
						save_settings: {
							id: "save_settings",
							name: "Save Settings",
							type: "button"
						}
					},
					view: {
						name: "View",

						split_screen: {
							id: "split_screen",
							name: "Split Screen",
							type: "button",

							onclick: (e) => {
								window.editor.toggleSplitScreen();
							}
						},
						codemirror_theme: {
							id: "codemirror_theme",
							name: "Codemirror Theme:",
							type: "select",

							options: {
								...codemirror_themes
							},
							onclick: (e) => {
								console.log(e.target.value, window.editor.setTheme);
								window.editor.setTheme(e.target.value);
							},
							onload: function (e) {
								//Declare local instance variables
								var select_el = e.querySelector(`.select-menu`);

								//Set placeholder
								if (window.editor.main.theme) {
									select_el.value = window.editor.main.theme;
								} else {
									select_el.value = "tomorrow-night-eighties";
								}
							}
						},
						general_theme: {
							id: "general_theme",
							name: "Theme (General):",
							type: "select",

							options: {
								"dark": "Dark",
								"light": "Light"
							},
							onload: function (e) {
								//Declare local instance variables
								var select_el = e.querySelector(`.select-menu`);

								//Set placeholder
								if (window.editor.main.general_theme) {
									select_el.value = window.editor.main.general_theme;
								} else {
									select_el.value = "dark";
								}
							}
						}
					},
					run: {
						name: "Run",

						run_project: {
							id: "button",
							name: "Run Current Project",
							type: "button"
						},
						disable_run: {
							id: "disable_run",
							type: "checkbox",

							options: {
								"disable_run": "Disable Run Button"
							}
						}
					}
				}
			}
		});
	}
}