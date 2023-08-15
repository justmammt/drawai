const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const uA = interaction.user.avatarURL()
		const userAvatar = uA.toString()
		console.log(userAvatar)
		const embed = new EmbedBuilder()
			.setAuthor({
				name: `${interaction.member.displayName}`,
				iconURL: userAvatar,
			})
			.setTitle("Bot Latency")
			.setDescription(`Current bot latency is \`${Date.now() - interaction.createdTimestamp}ms\``)
			.setColor("#00ff1e");

		await interaction.reply({ embeds: [embed] });
	},
};