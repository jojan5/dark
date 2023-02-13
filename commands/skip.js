const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("salta la cancion actual"),
    execute: async ({client,interaction}) => {

const queue = client.player.getQueue(interaction.guild);

if (!queue){
    await interaction.reply("No hay ninguna cancion reproduciendose ");
    return;
}

const currentsong =  queue.current;

queue.skip();

await interaction.reply({
    embeds:[
        new  EmbedBuilder()
        .setDescription(`saltada **${currentSong.title}**`)
        .setThumbnail(currentsong.Thumbnail)
    ]


})
}
}