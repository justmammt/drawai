const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const url = require('./config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('draw')
		.setDescription('Generate an image'),
	async execute(interaction) {
        fetch(`${url}/sdapi/v1/txt2img`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify()
		})

		const embed = new EmbedBuilder()
			

		await interaction.reply({ embeds: [embed] });
	},
};