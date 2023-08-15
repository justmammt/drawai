const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const url = require('./config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('draw')
		.setDescription('Generate an image'),
	async execute(interaction) {

		const request = {
			"enable_hr": false,
			"denoising_strength": 0,
			"firstphase_width": 0,
			"firstphase_height": 0,
			"hr_scale": 2,
			"hr_upscaler": "string",
			"hr_second_pass_steps": 0,
			"hr_resize_x": 0,
			"hr_resize_y": 0,
			"hr_sampler_name": "string",
			"hr_prompt": "",
			"hr_negative_prompt": "",
			"prompt": "",
			"styles": [
			  "string"
			],
			"seed": -1,
			"subseed": -1,
			"subseed_strength": 0,
			"seed_resize_from_h": -1,
			"seed_resize_from_w": -1,
			"sampler_name": "string",
			"batch_size": 1,
			"n_iter": 1,
			"steps": 20,
			"cfg_scale": 7,
			"width": 512,
			"height": 512,
			"restore_faces": false,
			"tiling": false,
			"do_not_save_samples": false,
			"do_not_save_grid": false,
			"negative_prompt": "string",
			"eta": 0,
			"s_min_uncond": 0,
			"s_churn": 0,
			"s_tmax": 0,
			"s_tmin": 0,
			"s_noise": 1,
			"override_settings": {},
			"override_settings_restore_afterwards": true,
			"script_args": [],
			"sampler_index": "Euler",
			"script_name": "string",
			"send_images": true,
			"save_images": false,
			"alwayson_scripts": {}
		  }
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