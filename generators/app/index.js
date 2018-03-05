'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const config = require('./config');

module.exports = class extends Generator {
	initializing() {
		this.globalStore = this.options.__store;
		this.choices = this.options.availableChoices || Object.keys(config).map(item => config[ item ]);
	}

	prompting() {
		const prompts = [
			{
				name: 'cssFrameworks',
				type: 'checkbox',
				message: 'Do you want to use any Sass Frameworks?',
				choices: [
					{
						name: 'Foundation',
						value: config.foundationId,
						checked: false
					},
					{
						name: 'Bourbon Neat',
						value: config.neatId,
						checked: false
					},
					{
						name: 'SASS Bootstrap',
						value: config.bootstrapId,
						checked: false
					},
					{
						name: 'Lost Grid (PostCSS)',
						value: config.lostGridId,
						checked: false
					},
					{
						name: 'Include Media',
						value: config.includeMediaId,
						checked: true
					}
				].filter(choice => this.choices.includes(choice.value)),
				default: []
			}
		];

		return this.prompt(prompts).then(props => {
			this.props = props;
		});
	}

	configuring() {
		if (this.globalStore) {
			this.globalStore.set('cssFrameworks', this.props.cssFrameworks);
		} else {
			this.config.set('cssFrameworks', this.props.cssFrameworks);
		}
	}
};
