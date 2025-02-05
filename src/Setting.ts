import LocalFileInterfacePlugin from 'main';
import { App, PluginSettingTab, Setting } from 'obsidian';
import { FolderSuggest } from 'suggesters/FolderSuggester';

export class LocalFileInterfacePluginSettingTab extends PluginSettingTab {
	plugin: LocalFileInterfacePlugin;

	constructor(app: App, plugin: LocalFileInterfacePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Default location for imported items')
			.addSearch((component) => {
				new FolderSuggest(this.app, component.inputEl);
				component
					.setPlaceholder('Example: folder1/folder2')
					.setValue(this.plugin.settings.folder)
					.onChange((newFolder) => {
						this.plugin.settings.folder = newFolder;
						this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName('Default export folder')
			.setDesc('Specify the default export folder for exported items.')
			.addText((text) =>
				text
					.setPlaceholder('Example: folder1/folder2')
					.setValue(this.plugin.settings.exportFolder)
					.onChange((value) => {
						this.plugin.settings.exportFolder = value;
						this.plugin.saveSettings();
					})
			);
	}
}
