const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("pausa la cancion actual"),
    execute: async ({client,interaction}) => {

const queue = client.player.getQueue(interaction.guild);

if (!queue){
    await interaction.reply("No hay ninguna cancion reproduciendose ");
    return;
}

const currentsong =  queue.current;

queue.setPaused(true);

await interaction.reply("La cancion actual ha sido pausada");
}
}