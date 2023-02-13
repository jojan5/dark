require("dotenv").config();

const {REST} = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const {Client, Intents, Collection,GatewayIntentBits, Partials, PresenceManager } = require("discord.js");
const { Player } = require("discord-player");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const fs = require("node:fs");
const path = require("node:path");
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const client = new Client ({

   /* intents: [Intents.FLAGS.GUILDS,
              Intents.FLAGS.GUILD_MESSAGES,
              Intents.FLAGS.GUILD_VOICE_STATES]*/

              intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
		         GatewayIntentBits.GuildMembers,
                 GatewayIntentBits.GuildVoiceStates,
                 GatewayIntentBits.DirectMessages,
                 GatewayIntentBits.GuildPresences,
                 GatewayIntentBits.GuildMessageReactions,
                 GatewayIntentBits.GuildPresences,
                 3276799,

          
            ]
         //  , partials :[User,Message.GuildMember, TrheadMember],
})
//-------------------------------------------------------------------------------------------------------------
//--------------------------------------------------

const newUsers = [];

const RIR = new EmbedBuilder()

	.setFooter({
		text: "Bienvenido este es el mejor servidor del mundo disfruta tu estadia"
	})
	.setColor('	#fc9737')
	.setImage('https://cdn.discordapp.com/attachments/638450747968847928/1044862835039150110/ezgif.com-gif-maker_3.gif')



const RIR1 = new EmbedBuilder()
	.setDescription("Ha sido un placer tenerte con nosotros lamento tu partida")
	.setFooter({
		text: "adios te extrañaremos"
	})
	.setColor('	#fc9787')
	.setImage('https://media.discordapp.net/attachments/638450747968847928/1044862668860837938/ezgif.com-gif-maker_4.gif')

client.on("guildMemberRemove", (member) => {
	const guild = member.guild;
	if (!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
	newUsers[guild.id].set(member.id, member.user);
	if (member.guild.channels.cache.find(channel => channel.name === "entradas") != null) {
		if (newUsers[guild.id].size > 0) {
			const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
			member.guild.channels.cache.find(channel => channel.name === "entradas").send("Adios!\n" + userlist );

			member.guild.channels.cache.find(channel => channel.name === "entradas").send({ embeds: [RIR1] });
			newUsers[guild.id].clear();
		}
	}
});

//-------------------------------------------------------------------------------------------------------------------

client.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    if (!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
    newUsers[guild.id].set(member.id, member.user);
if (guild.channels.cache.find(channel => channel.name === "entradas") != null){
    if (newUsers[guild.id].size > 0) {
        const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
       guild.channels.cache.find(channel => channel.name === "entradas").send("Bienvenido mortal disfruta tu estadia OwO !\n" + userlist);
        guild.channels.cache.find(channel => channel.name === "entradas").send({ embeds: [RIR] });
        newUsers[guild.id].clear();
    }}
});


//-----------------------------------------------------------------------------------------------------------
const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles)

{

    const filePath = path.join(commandsPath,file);
    const command = require (filePath);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

client.on("ready", ()=>{
   
    const guild_ids = client.guilds.cache.map(guild => guild.id);

    const rest= new REST({version: "9"}).setToken(process.env.TOKEN);
    for (const guildId of guild_ids){
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),{
            body:commands
        })
        .then(() => console.log(`comando agregados a ${guildId}`))
        .catch(console.error);


    }    
    
//----------------------------------------------------------------------------


});

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;
	//await interaction.deferReply({ ephemeral: true });
    const command= client.commands.get(interaction.commandName);
    if(!command)return;

    try{
        await command.execute({client,interaction});
    }
    catch(err){
        console.error(err);
        await interaction.reply("Hubo un error al ejecutar este comando :[");

    }
});



client.login(process.env.TOKEN);
const prefix = "*";

client.on("messageCreate", (message) =>{
if (!message.content.startsWith(prefix)  || message.author.bot) return;

const args = message.content.slice(prefix.length).split(/ + /);

const command = args.shift().toLowerCase();

const messageArray = message.content.split(" ");
const argument = messageArray.slice(1);
client.waifu = require("./waifu.json")
  client.husbando = require("./husbando.json")
const cmd = messageArray[0];
const Target = message.mentions.users.first() || message.author;
let user = message.mentions.users.first();
let member = Target.username || message.author.username;
const mention = message.mentions.users.first();
//----------------------------------------------------------------------------------------------------------------------


const exampleEmbed = new EmbedBuilder()
.setDescription( message.author.username + ` Beso a  ${Target.username}` )
		.setFooter({
			text: "se gustan"
		})
		.setColor('	#ff0080')
.setImage('https://acegif.com/wp-content/uploads/anime-kissin-5.gif')



if (message.content.includes(prefix + "test")){

    message.channel.send({embeds: [exampleEmbed]});
}
//----------------------------------------------------------------------------
const meme1 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://pbs.twimg.com/media/FYx930NWQAAUun_?format=jpg&name=large')


	const meme2 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://img.wattpad.com/6ada50f383134c7a569f66f722474bb942064398/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f77303132466153347150537469673d3d2d35312e313636663664373331636330653564353332333236313433383535382e6a7067')


	const meme3 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://pbs.twimg.com/media/FLRVaubVUAIzmSA.jpg')


	const meme4 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://pbs.twimg.com/media/FYx9fHbX0AAQCL_.png')


	const meme5 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://img.wattpad.com/8ec7e3c944efff9684d40a838657a2a844ec7669/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f454433686a4d72464572374b4e673d3d2d35312e313636663664373166353332333333303436353239383932353536352e6a7067?s=fit&w=720&h=720')


	const meme6 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://pbs.twimg.com/media/FZXs7NTWQAAbJoh.jpg')


	const meme7 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://img.wattpad.com/420c5332d19de5dc36443cd441517e4b304372a0/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f55785132546f546f7153785f75773d3d2d38382e313462663865616531636166326566653232393530383035393132322e6a7067')


	const meme8 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('http://images3.memedroid.com/images/UPLOADED215/5f467ce353820.jpeg')


	const meme9 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('http://pm1.narvii.com/6415/5b13b0c35b55e0a8739817cf765fba7877ba9692_00.jpg')


	const meme10 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://img.wattpad.com/9b3960cb870eff773a8668c0700a03c6315043a2/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f632d4e6c43696d6e654d7a374e413d3d2d3531372e313661386334633931316531633735353638393636323831333233382e6a7067?s=fit&w=720&h=720')


	const meme11 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('http://images3.memedroid.com/images/UPLOADED248/6091ac3c158ca.jpeg')


	const meme12 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://preview.redd.it/5kqtgbc5dak81.jpg?width=539&format=pjpg&auto=webp&s=e22dc84a71141ae33824b458b0c8b1efcbf7d2bc')


	const meme13 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://i.pinimg.com/564x/7c/f0/02/7cf002e1aff12c29fb152a24bfc25568.jpg')


	const meme14 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://img.wattpad.com/9cb81c5e3a41900999cf37b45d55bea108aa4a3e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f396274575677517539506d4c52413d3d2d3934303136353638342e313632643838373238663331316564373130323137323437333732342e6a7067?s=fit&w=720&h=720');


	const meme15 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://img.wattpad.com/42a0914a865d03fc328eb73fe025a3fedc2d907b/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f3745366a6f4f33724870594a6d413d3d2d3134302e313632633238306263323439626635663830353139313535363430342e6a7067?s=fit&w=720&h=720')


	const meme16 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://img.wattpad.com/8b5f1bd8e7900a8fb9d2f8d9bcd3f744957c97e6/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5565677148635234396b72527a773d3d2d3138312e313633346264613865326366396566613635343030313736383638302e6a7067?s=fit&w=720&h=720')


	const meme17 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://i.pinimg.com/236x/d4/d0/88/d4d088e8218cb988a16c089bb257b7d0.jpg')


	const meme18 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://i.pinimg.com/736x/08/60/af/0860afb3a01924a8f7e301c4092c4640.jpg')


	const meme19 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://img.wattpad.com/5c31fa35bf00889522720bda608fefd5695ed99f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f37467a41306737737978594734413d3d2d3134322e313632653132363531363531383736373132353631343735343437342e6a7067?s=fit&w=720&h=720');


	const meme20 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://www.unionguanajuato.mx/wp-content/uploads/2020/12/memes_graciosos_del_frio.jpeg')


	const meme21 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://media1.tenor.com/images/2e157785600a39a48a1ae100578ecba3/tenor.gif?itemid=4762746')


	const meme22 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('http://images7.memedroid.com/images/UPLOADED980/6353b613ce521.jpeg')


	const meme23 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhv8aNqF1w0fsfe8gjn3jStx92iY4eSJXf7Vuqz_GOLNfde8SZta4mm8dA9zf505nT0wEwKSurbQ22GAjnkBo3wrtDym1jU9pqIZOlBYEIC-69Ky2yDawP4SByTfZMY_hrAcvALIgUWRC64dh0z8nB0vcRRAFaM8wuCe9cUid9oleV1wkqWsE-y3eRrlA/s828/1B40908D-AB29-4922-8FEC-9D2DB9CC8E80.jpeg')


	const meme24 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://www.heraldousa.com/u/fotografias/m/2021/12/21/f1280x720-23046_154721_5050.jpg');


	const meme25 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://memesmasgraciosos.com/wp-content/uploads/2021/12/meme-que-pase-lo-que-tenga-que-pasar.jpg')


	const meme26 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://memesmasgraciosos.com/wp-content/uploads/2021/11/meme-escuelas-publicas-vs-privadas.jpg')


	const meme27 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://depor.com/resizer/MnJvuwNOu44mHHs3JL62-v5Cuoc=/980x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/AJXFZ3EF65CJFJWD4AGMOUJUBI.jpg')


	const meme28 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://i.pinimg.com/564x/de/01/fd/de01fd6d03c4e9b622e2b33f88cf929e.jpg');


	const meme29 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://www.deanime.info/wp-content/uploads/2018/11/meme-canas-dragon-ball-super.png')


	const meme30 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://pbs.twimg.com/media/DcQ9KtQWsAA9m_H.jpg')


	const meme31 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmaduls7MoKAVGejBtTvaLdtGN-2mmxdUz8Q&usqp=CAU')


	const meme32 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://images7.memedroid.com/images/UPLOADED185/559e9083272bd.jpeg');


	const meme33 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2P-Js7CUPBj5pRKi6cHhxzcgRzmDHs9EKxA&usqp=CAU')


	const meme34 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://i.chzbgr.com/full/8266328832/h678FC6C3/gohan-es-un-loquillo');


	const meme35 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://i.pinimg.com/236x/cb/21/7f/cb217f4159d4e2e6bb73305e780f8dfc.jpg');


	const meme36 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://pbs.twimg.com/media/DnqyTFjWsAEr78T.jpg');


	const meme37 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://media1.tenor.com/images/2e157785600a39a48a1ae100578ecba3/tenor.gif?itemid=4762746')


	const meme38 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://images3.memedroid.com/images/UPLOADED454/6195c06e320c3.jpeg');


	const meme39 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('http://pm1.narvii.com/6654/e3447a796f1d95c3752e9019f32d6313a5109e14_00.jpg')


	const meme40 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://www.terra.com.mx/u/fotografias/m/2021/11/19/f768x1-28992_29119_82.jpg')


	const meme41 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://img.wattpad.com/428873d0fb3d1333a8ec759d83097979e2575b8f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f41393673395655657a79773972513d3d2d3236363430343634332e313435353130643063303639626661662e6a7067?s=fit&w=720&h=720');


	const meme42 = new EmbedBuilder()
		.setTitle(" jajaja no tiene sentido. ")
		.setFooter({
			text: "bueno es thor"
		})
		.setColor('#513564')
		.setImage('https://images3.memedroid.com/images/UPLOADED607/5cfb29a9b5637.jpeg')


	const meme43 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://i.pinimg.com/550x/34/9c/0a/349c0a3e0892a61e3ce4dd975d43047a.jpg')


	const meme44 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://64.media.tumblr.com/d65a6902135da522608d734998a2be59/8330f127341f3427-46/s640x960/bf23c95a9a8ff21833f2d24a84933a7138eb0159.jpg');

	const meme45 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://memesmasgraciosos.com/wp-content/uploads/2021/09/meme-revisa-tu-cuaderno-chicos-y-chicas.jpg')


	const meme46 = new EmbedBuilder()
		.setTitle(" riruka waifu por siempre ")
		.setFooter({
			text: "7u7"
		})
		.setColor('#513564')
		.setImage('https://i.pinimg.com/originals/91/d1/e8/91d1e8b3e8ec273c0d160fe258581223.png')



	const meme47 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://i.pinimg.com/736x/16/a9/0a/16a90a33758fc1389bed5af6c094ff73.jpg')


	const meme48 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://i.pinimg.com/564x/62/c2/ca/62c2ca2e6a826fd4669fd11d1da24533.jpg')


	const meme49 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://i.kym-cdn.com/photos/images/facebook/002/439/262/d67.jfif')


	const meme50 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('http://pm1.narvii.com/7547/c44d68b054f4dc915a14de7e21b6863815d502a4r1-500-500v2_uhq.jpg')


	const meme51 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://img.wattpad.com/ff92d9457d30e15985cbf5ec00822d0ac83fdb76/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f69584753656b4a5873366b6e2d413d3d2d3138372e313632663934313363646331303233653931393931363230313032352e6a7067?s=fit&w=720&h=720');


	const meme52 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://3.bp.blogspot.com/-eQ_Z_o0bVtA/V991sT6uBrI/AAAAAAAAEOU/3sQmkSX1IUMXpJ-TQPKgGHUQPH5B0h6mQCLcB/w1200-h630-p-k-no-nu/fuelamariposameme.JPG')


	const meme53 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://i.imgflip.com/2ky3lq.jpg');

	const meme54 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://www.meme-arsenal.com/memes/806ed604ab813aba9a165bf625854293.jpg')

	const meme55 = new EmbedBuilder()
		.setTitle(" Tu sigue poniendo los memes jojan tu sigue le dire  Riru  ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://pics.onsizzle.com/menciona-una-chica-de-algun-anime-mas-linda-que-rukia-9784549.png');

	const meme56 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://pics.onsizzle.com/fans-del-chihime-fans-delllchiruki-que-durante-anos-se-burlaron-47259141.png');

	const meme57 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://static.wikia.nocookie.net/c981fd36-38b6-43d9-9b43-6215108101cd/scale-to-width/755')

	const meme58 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://img.wattpad.com/682a5205184cfeeff074535a8b398120466aa661/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f4939464951753447376b494a45773d3d2d3236332e313631623264393261353433356561333131353330333339353332322e6a7067?s=fit&w=720&h=720')

	const meme59 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://pbs.twimg.com/media/EZIlk4XXQAAFmef.jpg')

	const meme60 = new EmbedBuilder()
		.setTitle(" no entiendo que es lo gracioso ")
		.setFooter({
			text: ":["
		})
		.setColor('#513564')
		.setImage('https://pm1.narvii.com/6577/1c8ac340dadca4dba1917aae59a291bf186eec2a_hq.jpg')

	//--------------------------------------------------------------------------------------------------------------------  
	if (command === "meme") {
		const number = 60;

		var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;

		switch (random) {
			case 1: message.channel.send({ embeds: [meme1] }); break;
			case 2: message.channel.send({ embeds: [meme2] }); break;
			case 3: message.channel.send({ embeds: [meme3] }); break;
			case 4: message.channel.send({ embeds: [meme4] }); break;
			case 5: message.channel.send({ embeds: [meme5] }); break;
			case 6: message.channel.send({ embeds: [meme6] }); break;
			case 7: message.channel.send({ embeds: [meme7] }); break;
			case 8: message.channel.send({ embeds: [meme8] }); break;
			case 9: message.channel.send({ embeds: [meme9] }); break;
			case 10: message.channel.send({ embeds: [meme10] }); break;
			case 11: message.channel.send({ embeds: [meme11] }); break;
			case 12: message.channel.send({ embeds: [meme12] }); break;
			case 13: message.channel.send({ embeds: [meme13] }); break;
			case 14: message.channel.send({ embeds: [meme14] }); break;
			case 15: message.channel.send({ embeds: [meme15] }); break;
			case 16: message.channel.send({ embeds: [meme16] }); break;
			case 17: message.channel.send({ embeds: [meme17] }); break;
			case 18: message.channel.send({ embeds: [meme18] }); break;
			case 19: message.channel.send({ embeds: [meme19] }); break;
			case 20: message.channel.send({ embeds: [meme20] }); break;
			case 21: message.channel.send({ embeds: [meme21] }); break;
			case 22: message.channel.send({ embeds: [meme22] }); break;
			case 23: message.channel.send({ embeds: [meme23] }); break;
			case 24: message.channel.send({ embeds: [meme24] }); break;
			case 25: message.channel.send({ embeds: [meme25] }); break;
			case 26: message.channel.send({ embeds: [meme26] }); break;
			case 27: message.channel.send({ embeds: [meme27] }); break;
			case 28: message.channel.send({ embeds: [meme28] }); break;
			case 29: message.channel.send({ embeds: [meme29] }); break;
			case 30: message.channel.send({ embeds: [meme30] }); break;
			case 31: message.channel.send({ embeds: [meme31] }); break;
			case 32: message.channel.send({ embeds: [meme32] }); break;
			case 33: message.channel.send({ embeds: [meme33] }); break;
			case 34: message.channel.send({ embeds: [meme34] }); break;
			case 35: message.channel.send({ embeds: [meme35] }); break;
			case 36: message.channel.send({ embeds: [meme36] }); break;
			case 37: message.channel.send({ embeds: [meme37] }); break;
			case 38: message.channel.send({ embeds: [meme38] }); break;
			case 39: message.channel.send({ embeds: [meme39] }); break;
			case 40: message.channel.send({ embeds: [meme40] }); break;
			case 41: message.channel.send({ embeds: [meme41] }); break;
			case 42: message.channel.send({ embeds: [meme42] }); break;
			case 43: message.channel.send({ embeds: [meme43] }); break;
			case 44: message.channel.send({ embeds: [meme44] }); break;
			case 45: message.channel.send({ embeds: [meme45] }); break;
			case 46: message.channel.send({ embeds: [meme46] }); break;
			case 47: message.channel.send({ embeds: [meme47] }); break;
			case 48: message.channel.send({ embeds: [meme48] }); break;
			case 49: message.channel.send({ embeds: [meme49] }); break;
			case 51: message.channel.send({ embeds: [meme51] }); break;
			case 52: message.channel.send({ embeds: [meme52] }); break;
			case 53: message.channel.send({ embeds: [meme53] }); break;
			case 54: message.channel.send({ embeds: [meme54] }); break;
			case 55: message.channel.send({ embeds: [meme55] }); break;
			case 56: message.channel.send({ embeds: [meme56] }); break;
			case 57: message.channel.send({ embeds: [meme57] }); break;
			case 58: message.channel.send({ embeds: [meme58] }); break;
			case 59: message.channel.send({ embeds: [meme59] }); break;
			case 50: message.channel.send({ embeds: [meme50] }); break;
			case 60: message.channel.send({ embeds: [meme60] }); break;


		}
	}
	//-----------------------------------------------------------------------------------
    const cry1 = new EmbedBuilder()
    .setTitle(" sad ")
    .setDescription(message.author.username + ' Esta llorando')
    .setFooter({
        text: ":["
    })
    .setColor('#808080')
    .setImage('https://media.tenor.com/QI1bpPc2icsAAAAC/anime-cry.gif')

const cry2 = new EmbedBuilder()
    .setTitle(" sad ")
    .setDescription(message.author.username + ' Esta llorando')
    .setFooter({
        text: ":["
    })
    .setColor('#808080')
    .setImage('https://c.tenor.com/8VbFP6DpcI8AAAAd/anime-cry.gif')

const cry3 = new EmbedBuilder()
    .setTitle(" sad ")
    .setDescription(message.author.username + ' Esta llorando')
    .setFooter({
        text: ":["
    })
    .setColor('#808080')
    .setImage('https://i.pinimg.com/originals/aa/16/f4/aa16f44fb1418be3d46a7ec05b60fd28.gif')

const cry4 = new EmbedBuilder()
    .setTitle(" sad ")
    .setDescription(message.author.username + ' Esta llorando')
    .setFooter({
        text: ":["
    })
    .setColor('#808080')
    .setImage('https://www.icegif.com/wp-content/uploads/sad-anime-icegif-1.gif')

const cry5 = new EmbedBuilder()
    .setTitle(" sad ")
    .setDescription(message.author.username + ' Esta llorando')
    .setFooter({
        text: ":["
    })
    .setColor('#808080')
    .setImage('https://aniyuki.com/wp-content/uploads/2022/01/aniyuki-anime-girl-crying-gifs-40.gif')

const cry6 = new EmbedBuilder()
    .setTitle(" sad ")
    .setDescription(message.author.username + ' Esta llorando')
    .setFooter({
        text: ":["
    })
    .setColor('#808080')
    .setImage('https://p.favim.com/orig/2018/08/31/cry-gif-anime-Favim.com-6203281.gif')

const cry7 = new EmbedBuilder()
    .setTitle(" sad ")
    .setDescription(message.author.username + ' Esta llorando')
    .setFooter({
        text: ":["
    })
    .setColor('#808080')
    .setImage('https://gifdb.com/images/thumbnail/sad-anime-hinata-hoshino-4tw4v8j3uj5bo133.gif')

const cry8 = new EmbedBuilder()
    .setTitle(" sad ")
    .setDescription(message.author.username + ' Esta llorando')
    .setFooter({
        text: ":["
    })
    .setColor('#808080')
    .setImage('https://i0.wp.com/animeeverything.online/wp-content/uploads/2022/01/violet-evergarden.gif?resize=498%2C276&ssl=1')

const cry9 = new EmbedBuilder()
    .setTitle(" sad ")
    .setDescription(message.author.username + ' Esta llorando')
    .setFooter({
        text: ":["
    })
    .setColor('#808080')
    .setImage('https://media.tenor.com/4Tn_0hj7nwgAAAAM/kitagawa-tears.gif')

//-----------------------------------------------------------------------------------
if  (command === "cry") {
    const number = 9;

    var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;

    switch (random) {
        case 1: message.channel.send({ embeds: [cry1] }); break;
        case 2: message.channel.send({ embeds: [cry2] }); break;
        case 3: message.channel.send({ embeds: [cry3] }); break;
        case 4: message.channel.send({ embeds: [cry4] }); break;
        case 5: message.channel.send({ embeds: [cry5] }); break;
        case 6: message.channel.send({ embeds: [cry6] }); break;
        case 7: message.channel.send({ embeds: [cry7] }); break;
        case 8: message.channel.send({ embeds: [cry8] }); break;
        case 9: message.channel.send({ embeds: [cry9] }); break;

    }
}

//--------------------------------------------------------------------------------------

const sad1 = new EmbedBuilder()
		.setTitle(" sad ")
		.setDescription(message.author.username + ' Esta triste')
		.setFooter({
			text: ":["
		})
		.setColor('#508080')
		.setImage('https://www.icegif.com/wp-content/uploads/sad-anime-icegif.gif')

	const sad2 = new EmbedBuilder()
		.setTitle(" sad ")
		.setDescription(message.author.username + ' Esta triste')
		.setFooter({
			text: ":["
		})
		.setColor('#508080')
		.setImage('https://www.icegif.com/wp-content/uploads/sad-anime-icegif.gifhttps://media4.giphy.com/media/P53TSsopKicrm/200w.gif?cid=6c09b952qcrkfv2kv7n7bpsi47zywrqs9il655nwsug2amax&rid=200w.gif&ct=g')

	const sad3 = new EmbedBuilder()
		.setTitle(" sad ")
		.setDescription(message.author.username + ' Esta triste')
		.setFooter({
			text: ":["
		})
		.setColor('#508080')
		.setImage('https://i.gifer.com/origin/c3/c3c088c1dbaf514d63f952ffcae35a90.gif')

	const sad4 = new EmbedBuilder()
		.setTitle(" sad ")
		.setDescription(message.author.username + ' Esta triste')
		.setFooter({
			text: ":["
		})
		.setColor('#508080')
		.setImage('https://media.tenor.com/aY2_MgFvlDUAAAAC/anime-sad.gif')

	const sad5 = new EmbedBuilder()
		.setTitle(" sad ")
		.setDescription(message.author.username + ' Esta triste')
		.setFooter({
			text: ":["
		})
		.setColor('#508080')
		.setImage('https://media.tenor.com/LEm_Bc072c8AAAAC/sad-anime.gif')

	const sad6 = new EmbedBuilder()
		.setTitle(" sad ")
		.setDescription(message.author.username + ' Esta triste')
		.setFooter({
			text: ":["
		})
		.setColor('#508080')
		.setImage('https://i.gifer.com/AjP.gif')
	//-------------------------------------------------------------------------------------------------


	if (command === "sad") {
		const number = 6;

		var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;

		switch (random) {
			case 1: message.channel.send({ embeds: [sad1] }); break;
			case 2: message.channel.send({ embeds: [sad2] }); break;
			case 3: message.channel.send({ embeds: [sad3] }); break;
			case 4: message.channel.send({ embeds: [sad4] }); break;
			case 5: message.channel.send({ embeds: [sad5] }); break;
			case 6: message.channel.send({ embeds: [sad6] }); break;

		}
	}


//----------------------------------------------------------------------------------------------------

const kiss1 = new EmbedBuilder()

		.setDescription(message.author.username + ` Beso a  ${Target.username}`)
		.setFooter({
			text: "se gustan"
		})
		.setColor('	#ff0080')
.setImage('https://acegif.com/wp-content/uploads/anime-kissin-5.gif')

const kiss2 = new EmbedBuilder()

		.setDescription(message.author.username + ` Beso a  ${Target.username}`)
		.setFooter({
			text: "se gustan"
		})
		.setColor('	#ff0080')
.setImage('https://pa1.narvii.com/6173/d3da59e3ac5fd46d87b5f818cf171f48edc7560a_hq.gif')

const kiss3 = new EmbedBuilder()

		.setDescription(message.author.username + ` Beso a  ${Target.username}`)
		.setFooter({
			text: "se gustan"
		})
		.setColor('	#ff0080')
.setImage('https://media.tenor.com/tNClex-tMZQAAAAC/kiss-beso.gif')

const kiss4 = new EmbedBuilder()

		.setDescription(message.author.username + ` Beso a  ${Target.username}`)
		.setFooter({
			text: "se gustan"
		})
		.setColor('	#ff0080')
.setImage('https://64.media.tumblr.com/dc0496ce48c1c33182f24b1535521af2/tumblr_mqku7l4x5O1sqcz4do1_500.gifv')

const kiss5 = new EmbedBuilder()

		.setDescription(message.author.username + ` Beso a  ${Target.username}`)
		.setFooter({
			text: "se gustan"
		})
		.setColor('	#ff0080')
.setImage('https://i.pinimg.com/originals/f5/3a/dd/f53add041b89b46d4bbc547f6652441d.gif')

const kiss6 = new EmbedBuilder()

		.setDescription(message.author.username + ` Beso a  ${Target.username}`)
		.setFooter({
			text: "se gustan"
		})
		.setColor('	#ff0080')
.setImage('https://pa1.narvii.com/6120/2d5a229df8e3efa93096ce438cd8477e163c475f_hq.gif')

const kiss7 = new EmbedBuilder()

		.setDescription(message.author.username + ` Beso a  ${Target.username}`)
		.setFooter({
			text: "se gustan"
		})
		.setColor('	#ff0080')
.setImage('https://i.pinimg.com/originals/84/77/59/84775946c793c41c1f873b3bc442a21a.gif')

const kiss8 = new EmbedBuilder()

		.setDescription(message.author.username + ` Beso a  ${Target.username}`)
		.setFooter({
			text: "se gustan"
		})
		.setColor('	#ff0080')
.setImage('https://media.tenor.com/Yu-sfUdLMAUAAAAC/koi-to-uso-anime.gif')
	//-------------------------------------------------------------------------------------------------------
    if (message.content.includes(prefix + "kiss")){


		const number = 8;

		var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;

		switch (random) {
			case 1: message.channel.send({ embeds: [kiss1] }); break;
        case 2: message.channel.send({ embeds: [kiss2] }); break;
        case 3: message.channel.send({ embeds: [kiss3] }); break;
        case 4: message.channel.send({ embeds: [kiss4] }); break;
        case 5: message.channel.send({ embeds: [kiss5] }); break;
        case 6: message.channel.send({ embeds: [kiss6] }); break;
        case 7: message.channel.send({ embeds: [kiss7] }); break;
        case 8: message.channel.send({ embeds: [kiss8] }); break;
        
        
        
        	}
	}
//--------------------------------------------------------------------------------------------------------------------------

const hug1 = new EmbedBuilder()

		.setDescription(message.author.username + ` Esta abrazando a    ${Target.username}` )
		.setFooter({
			text: "abacho"
		})
		.setColor('	#a36970')
.setImage('http://37.media.tumblr.com/f2a878657add13aa09a5e089378ec43d/tumblr_n5uovjOi931tp7433o1_500.gif')
   
   const hug2 = new EmbedBuilder()

		.setDescription(message.author.username + ` Esta abrazando a    ${Target.username}` )
		.setFooter({
			text: "abacho"
		})
		.setColor('	#a36970')
.setImage('https://i.pinimg.com/originals/4d/aa/87/4daa87a634e1faeee0bb78fbe0f8abca.gif')
   
   const hug3 = new EmbedBuilder()

		.setDescription(message.author.username + ` Esta abrazando a    ${Target.username}` )
		.setFooter({
			text: "abacho"
		})
		.setColor('	#a36970')
.setImage('https://media.tenor.com/iyztKN68avcAAAAM/aharen-san-aharen-san-anime.gif')
   
   const hug4 = new EmbedBuilder()

		.setDescription(message.author.username + ` Esta abrazando a    ${Target.username}` )
		.setFooter({
			text: "abacho"
		})
		.setColor('	#a36970')
.setImage('https://media.tenor.com/oSPZDjEf9vQAAAAM/anime-hug-anime-hugging.gif')
   
   const hug5 = new EmbedBuilder()

		.setDescription(message.author.username + ` Esta abrazando a    ${Target.username}` )
		.setFooter({
			text: "abacho"
		})
		.setColor('	#a36970')
.setImage('https://aniyuki.com/wp-content/uploads/2022/06/anime-hugs-aniyuki-55.gif')
   
   const hug6 = new EmbedBuilder()

		.setDescription(message.author.username + ` Esta abrazando a    ${Target.username}` )
		.setFooter({
			text: "abacho"
		})
		.setColor('	#a36970')
.setImage('https://thumbs.gfycat.com/AlienatedUnawareArcherfish-size_restricted.gif')
  
  //--------------------------------------------------------------------------------------------------------------------
  if (message.content.includes(prefix + "hug")) {


		const number = 6;

		var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;

		switch (random) {
			case 1: message.channel.send({ embeds: [hug1] }); break;
        	case 2: message.channel.send({ embeds: [hug2] }); break;
        	case 3: message.channel.send({ embeds: [hug3] }); break;
        	case 4: message.channel.send({ embeds: [hug4] }); break;
        	case 5: message.channel.send({ embeds: [hug5] }); break;
        	case 6: message.channel.send({ embeds: [hug6] }); break;
        
                       	}
	}

//------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
  
const hit1 = new EmbedBuilder()

.setDescription(message.author.username + ` Esta dandole con la silla a` + Target.username)
.setFooter({
    text: "fighto"
})
.setColor('#808000')
.setImage('https://media.tenor.com/XhdHGRof6WEAAAAC/anime-ataque-golpe-en-la-pared.gif')

const hit2 = new EmbedBuilder()

.setDescription(message.author.username + ` Esta dandole con la silla a ${Target.username}`)
.setFooter({
    text: "fighto"
})
.setColor('#808000')
.setImage('http://pa1.narvii.com/6651/514fe5d3769dc1267a5ec7bbe6f643aaa8b2f028_00.gif')


const hit3 = new EmbedBuilder()

.setDescription(message.author.username + ` Esta dandole con la silla a ${Target.username}`)
.setFooter({
    text: "fighto"
})
.setColor('#808000')
.setImage('https://i.gifer.com/Nh33.gif')


const hit4 = new EmbedBuilder()

.setDescription(message.author.username + ` Esta dandole con la silla a ${Target.username}`)
.setFooter({
    text: "fighto"
})
.setColor('#808000')
.setImage('https://thumbs.gfycat.com/AnxiousAdmirableEnglishsetter-size_restricted.gif')


const hit5 = new EmbedBuilder()

.setDescription(message.author.username + ` Esta dandole con la silla a ${Target.username}`)
.setFooter({
    text: "fighto"
})
.setColor('#808000')
.setImage('https://i.gifer.com/N32W.gif')


 const hit6 = new EmbedBuilder()

.setDescription(message.author.username + ` Esta dandole con la silla a ${Target.username}`)
.setFooter({
    text: "fighto"
})
.setColor('#808000')
.setImage('https://pa1.narvii.com/6142/b5fa64e1ce7d711958ccd7235e855132a61931fe_hq.gif')


//---------------------------------------------------------------

 if (message.content.includes(prefix + "hit")) {


const number = 6;

var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;

switch (random) {
    case 1: message.channel.send({ embeds: [hit1] }); break;
case 2: message.channel.send({ embeds: [hit2] }); break;
case 3: message.channel.send({ embeds: [hit3] }); break;
case 4: message.channel.send({ embeds: [hit4] }); break;
case 5: message.channel.send({ embeds: [hit5] }); break;
case 6: message.channel.send({ embeds: [hit6] }); break;
 
 
}}
//----------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------
const kick1 = new EmbedBuilder()

		.setDescription(message.author.username +` Pateo a  ${Target.username}`)
		.setFooter({
			text: "pelea"
		})
		.setColor('	#ff0080')
.setImage('https://media.tenor.com/HLx4m-urlBEAAAAC/kick-anime.gif')

const kick2 = new EmbedBuilder()

		.setDescription(message.author.username +` Pateo a  ${Target.username}`)
		.setFooter({
			text: "pelea"
		})
		.setColor('	#ff0080')
.setImage('https://media.tenor.com/D5OWYMGcAzAAAAAM/escondido-catedrales.gif')

const kick3 = new EmbedBuilder()

		.setDescription(message.author.username +` Pateo a  ${Target.username}`)
		.setFooter({
			text: "pelea"
		})
		.setColor('	#ff0080')
.setImage('https://media.tenor.com/kvxt9X-gXqQAAAAM/anime-clannad.gif')

const kick4 = new EmbedBuilder()

		.setDescription(message.author.username +` Pateo a  ${Target.username}`)
		.setFooter({
			text: "pelea"
		})
		.setColor('	#ff0080')
.setImage('https://media.tenor.com/WXJF2QatHA4AAAAM/anime-ouch.gif')

const kick5 = new EmbedBuilder()

		.setDescription(message.author.username +` Pateo a  ${Target.username}`)
		.setFooter({
			text: "pelea"
		})
		.setColor('	#ff0080')
.setImage('https://media.tenor.com/icV2ba3gU7MAAAAC/kick-anime.gif')

const kick6 = new EmbedBuilder()

		.setDescription(message.author.username +` Pateo a  ${Target.username}`)
		.setFooter({
			text: "pelea"
		})
		.setColor('	#ff0080')
.setImage('https://i.pinimg.com/originals/44/6f/49/446f49e675e38e1bb10d226f12519092.gif')


  
  //----------------------------------------------------------------------------------------------------
  if (message.content.includes(prefix + "help")) {

	const help= new EmbedBuilder()
		.setTitle('Comandos \nprefix = *')
		
.setDescription("La nueva version de Yuima quito varios comandos por su poco uso estos son los actuales \nKiss =dar un beso \nhug = dar un abrazo \nwaifu = dar una waifu \nsuwaifu = ver la waifu de tu amigo \nsad = triste \ncry =llorar \npelea = busca pelea con alguien \nhit = pegale a alguien\nkick = patea a alguien \nmeme = un meme random \nf = muestra tus respetos \nchat = muestra como te deja lo que lees \nmiwaifu = tu waifu")
		.setFooter({
		text: "Una curiosidad es que el comando menos usado de los viejos es el de husbando nadie quiere husbandos al parecer"
	})
.setColor("#FF0000")

		.setImage('https://cdn.discordapp.com/attachments/638450747968847928/853702593864007760/Webp.net-gifmaker_3.gif')


const help1 = new EmbedBuilder()
		.setTitle('Comandos \nprefix = *')
		
.setDescription("Husbando = le da un husbando a tu amigo \nsuhusbando= te dice el husbando de tu amigo \nmihusbando = te dice tu husbando\ncongrats = felicita a alguien\nayuda = si estas pasando por un mal momento y necesitas un coach gratuito o sientes ansiedad \nsi quieres que el bot salude al entrar y salir del server crea un canal llamado entradas\n/Play = toca una cancion no olvides usar el / ")
		.setFooter({
		text: "Una curiosidad es que la razon por la que la imagen de yuima cambie de morena a blanca es que su diseño original era morena pero al no saber yo colorear correctamente la volvi blanca pero ahora ya es posible ver sus dos versiones asi que dire que son hermanas ninja "
	})
.setColor("#FF0000")

		.setImage('https://cdn.discordapp.com/attachments/1040686328087597169/1074075395512598678/2_girlskunoichitan_twintails_ponytail_red_eyes_ninja_dark-skinned_female_s-3713014042.png')

	message.channel.send({ embeds: [help] });
message.channel.send({ embeds: [help1] });
}
//-------------------------------------------------------------------------------------
///--------------------------------------------------------------------------------------
if (message.content.includes(prefix + "ayuda")) {
  
    
       
	const row = new ActionRowBuilder()
		.addComponents(
			
			new ButtonBuilder()
			
				.setLabel('Para la drepresion o necesidad espiritual')
				.setURL("https://groundwire.echoglobal.org/chat/a_Jesus_le_importa")
				.setStyle("Link"),
		);


message.channel.send({components:[row]})

}


if (message.content.includes(prefix + "nosirvexD")) {


   
	const row1 = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
			.setCustomId('primary')
			.setLabel('Ayuda con la bebida')
	.setURL("https://www.aamexico.org.mx/contacto.php")
				.setStyle('Link'),
		);

message.channel.send({components:[row1]})

}


if (message.content.includes(prefix + "ayuda")) {

	
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					
					.setLabel('ayuda con la bebida')
					.setURL("https://www.aamexico.org.mx/contacto.php")
					.setStyle("Link"),
			);
	
	
   
/*	const row2 = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
			.setCustomId('primary')
			.setLabel('ayuda con la bebida')
	.setURL("https://www.aamexico.org.mx/contacto.php")
				.setStyle(Link),
		);
*/
message.channel.send({components:[row]})
//message.channel.send({components:[row2]})

}
//---------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
  if (message.content.includes(prefix + "kick")) {


		const number = 6;

		var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;

		switch (random) {
			case 1: message.channel.send({ embeds: [kick1] }); break;
        	case 2: message.channel.send({ embeds: [kick2] }); break;
        	case 3: message.channel.send({ embeds: [kick3] }); break;
        	case 4: message.channel.send({ embeds: [kick4] }); break;
        	case 5: message.channel.send({ embeds: [kick5] }); break;
        	case 6: message.channel.send({ embeds: [kick6] }); break;
        
             	}
	}

  //-----------------------------------------------------------------------------------------------------

  
  //----------------------------------------------------------------------------------------------------


  if (message.content.includes(prefix + "kick")) {


    const number = 6;

    var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;

    switch (random) {
        case 1: message.channel.send({ embeds: [kick1] }); break;
        case 2: message.channel.send({ embeds: [kick2] }); break;
        case 3: message.channel.send({ embeds: [kick3] }); break;
        case 4: message.channel.send({ embeds: [kick4] }); break;
        case 5: message.channel.send({ embeds: [kick5] }); break;
        case 6: message.channel.send({ embeds: [kick6] }); break;
    
             }
}

//-----------------------------------------------------------------------------------------------------
const fight1 = new EmbedBuilder()

    .setDescription(message.author.username + ` Esta peleando con  ${Target.username}`)
    .setFooter({
        text: "dale con la silla Rin"
    })
    .setColor('	#a36080')
.setImage('https://media.tenor.com/YuR7uAqxHPkAAAAd/fighting-anime.gif')

const fight2 = new EmbedBuilder()

    .setDescription(message.author.username + ` Esta peleando con  ${Target.username}`)
    .setFooter({
        text: "dale con la silla "
    })
    .setColor('	#a36080')
.setImage('https://i.pinimg.com/originals/2b/68/86/2b6886154e707d70332e57ab088a6480.gif')

const fight3 = new EmbedBuilder()

    .setDescription(message.author.username + ` Esta peleando con  ${Target.username}`)
    .setFooter({
        text: "dale con la silla "
    })
    .setColor('	#a36080')
.setImage('https://media.tenor.com/OPLehutf57sAAAAd/anime-fight.gif')

const fight4 = new EmbedBuilder()

    .setDescription(message.author.username + ` Esta peleando con  ${Target.username}`)
    .setFooter({
        text: "dale con la silla oni-sama"
    })
    .setColor('	#a36080')
.setImage('https://media.tenor.com/HfBYNiCQbfkAAAAd/anime-fight.gif')

const fight5 = new EmbedBuilder()

    .setDescription(message.author.username + ` Esta peleando con  ${Target.username}`)
    .setFooter({
        text: "dale con la silla "
    })
    .setColor('	#a36080')
.setImage('https://www.icegif.com/wp-content/uploads/anime-fight-icegif.gif')

const fight6 = new EmbedBuilder()

    .setDescription(message.author.username + ` Esta peleando con  ${Target.username}`)
    .setFooter({
        text: "dale con la silla "
    })
    .setColor('	#a36080')
.setImage('https://thumbs.gfycat.com/BlackandwhiteBadKid-max-1mb.gif')

const fight7 = new EmbedBuilder()

    .setDescription(message.author.username + ` Esta peleando con  ${Target.username}`)
    .setFooter({
        text: "pelea de invalidos con shorts "
    })
    .setColor('	#a36080')
.setImage('https://media.tenor.com/S_FzNXsiNt8AAAAC/anime-fight.gif')
//------------------------------------------------------------------------------------------------------------------

if (message.content.includes(prefix + "pelea")) {


    const number = 7;

    var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;

    switch (random) {
        case 1: message.channel.send({ embeds: [fight1] }); break;
    case 2: message.channel.send({ embeds: [fight2] }); break;
    case 3: message.channel.send({ embeds: [fight3] }); break;
    case 4: message.channel.send({ embeds: [fight4] }); break;
    case 5: message.channel.send({ embeds: [fight5] }); break;
    case 6: message.channel.send({ embeds: [fight6] }); break;
    case 7: message.channel.send({ embeds: [fight7] }); break;
    
                   }
}

    
//----------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
  	
const feli1 = new EmbedBuilder()

.setDescription(message.author.username + ` Felicidades  ${Target.username}`)
.setFooter({
    text: "felicidades "
})
.setColor('	#a36080')
.setImage('https://thumbs.gfycat.com/ScrawnyPreciousAnaconda-size_restricted.gif')

const feli2 = new EmbedBuilder()

.setDescription(message.author.username + ` Felicidades  ${Target.username}`)
.setFooter({
    text: "felicidades "
})
.setColor('	#a36080')
.setImage('https://pa1.narvii.com/6047/5e1f51fcaa719a2bc72d5f853dccc09638f8ec24_hq.gifs')

const feli3 = new EmbedBuilder()

.setDescription(message.author.username + ` Felicidades  ${Target.username}`)
.setFooter({
    text: "felicidades "
})
.setColor('	#a36080')
.setImage('https://c.tenor.com/31Bew5jern0AAAAC/congrats-anime.gif')

  const feli5 = new EmbedBuilder()

.setDescription(message.author.username + ` Felicidades  ${Target.username}`)
.setFooter({
    text: "felicidades "
})
.setColor('	#a36080')
.setImage('https://thumbs.gfycat.com/CleverHiddenBighornedsheep-max-1mb.gif')
  
    const feli4 = new EmbedBuilder()

.setDescription(message.author.username + ` Felicidades  ${Target.username}`)
.setFooter({
    text: "felicidades "
})
.setColor('	#a36080')
.setImage('https://2.bp.blogspot.com/-SZSv9PCSFk4/WMsJpuwyXOI/AAAAAAAAxLY/OElV0YfXJ4kppr53FMOZbwoTAGWxP2SUgCPcB/s1600/Omake%2BGif%2BAnime%2B-%2BOne%2BRoom%2B-%2BEpisode%2B10%2B-%2BMoka%2BCongratulations.gif')

//-------------------------------------------------------------------------------------------------------------------------------
    
    
        if (message.content.includes(prefix + "congrats")) {
const number = 5;

var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;

switch (random) {
    case 1: message.channel.send({ embeds: [feli1] }); break;
        case 2: message.channel.send({ embeds: [feli2] }); break;
        case 3: message.channel.send({ embeds: [feli3] }); break;
        case 4: message.channel.send({ embeds: [feli4] }); break;
        case 5: message.channel.send({ embeds: [feli5] }); break;
        
}}
    
//--------------------------------------------------------------------------------------------------------------

const read1 = new EmbedBuilder()
		.setTitle(" que esta pasando ")
		.setDescription(message.author.username + ' Esta leyendo el chat')
		.setFooter({
			text: "sasasasasas"
		})
		.setColor('#58043')
		.setImage('https://media.tenor.com/ITc1hNBSH_wAAAAM/coding-typing.gif')

const read2 = new EmbedBuilder()
		.setTitle(" que esta pasando ")
		.setDescription(message.author.username + ' Esta leyendo el chat')
		.setFooter({
			text: "sasasasasas"
		})
		.setColor('#58043')
		.setImage('https://anymes.files.wordpress.com/2015/01/kona-gif.gif?w=320')

const read3 = new EmbedBuilder()
		.setTitle(" que esta pasando ")
		.setDescription(message.author.username + ' Esta leyendo el chat')
		.setFooter({
			text: "sasasasasas"
		})
		.setColor('#58043')
		.setImage('https://pa1.narvii.com/6981/0e39137b9deffdfef76230a80ed200a858902499r1-540-304_hq.gif')

const read4 = new EmbedBuilder()
		.setTitle(" que esta pasando ")
		.setDescription(message.author.username + ' Esta leyendo el chat')
		.setFooter({
			text: "sasasasasas"
		})
		.setColor('#58043')
		.setImage('https://st1.uvnimg.com/dims4/default/fd8871c/2147483647/thumbnail/480x270/quality/75/format/jpg/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fassets%2Fvixes%2Fg%2Fgifit_1496249021373.gif')

const read5 = new EmbedBuilder()
		.setTitle(" que esta pasando ")
		.setDescription(message.author.username + ' Esta leyendo el chat')
		.setFooter({
			text: "sasasasasas"
		})
		.setColor('#58043')
		.setImage('https://media.giphy.com/media/4no7ul3pa571e/giphy.gif')

const read6 = new EmbedBuilder()
		.setTitle(" que esta pasando ")
		.setDescription(message.author.username + ' Esta leyendo el chat')
		.setFooter({
			text: "sasasasasas"
		})
		.setColor('#58043')
		.setImage('https://media.giphy.com/media/HteV6g0QTNxp6/giphy.gif')

  //-------------------------------------------------------------------------------------------------------
  if (message.content.includes(prefix + "chat")) {


		const number = 6;

		var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;

		switch (random) {
			case 1: message.channel.send({ embeds: [read1] }); break;
        case 2: message.channel.send({ embeds: [read2] }); break;
        case 3: message.channel.send({ embeds: [read3] }); break;
        case 4: message.channel.send({ embeds: [read4] }); break;
        case 5: message.channel.send({ embeds: [read5] }); break;
        case 6: message.channel.send({ embeds: [read6] }); break;
        
                             	}
	}

  //----------------------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------
  const f1 = new EmbedBuilder()
		.setTitle(" f ")
		.setDescription(message.author.username + ' f')
		.setFooter({
			text: "f"
		})
		.setColor('#00FF00')
		.setImage('https://media.tenor.com/2bAKt_bnAYMAAAAM/press-f-mg.gif')
  
  const f2 = new EmbedBuilder()
		.setTitle(" f ")
		.setDescription(message.author.username + ' f')
		.setFooter({
			text: "f"
		})
		.setColor('#00FF00')
		.setImage('https://i.pinimg.com/originals/38/d2/14/38d214c232f7cc550d15bb915a3af406.gif')
  
  const f3 = new EmbedBuilder()
		.setTitle(" f ")
		.setDescription(message.author.username + ' f')
		.setFooter({
			text: "f"
		})
		.setColor('#00FF00')
		.setImage('https://c.tenor.com/C6OWf1jTlDUAAAAd/sad-anime-letter-f.gif')
  
  const f4 = new EmbedBuilder()
		.setTitle(" f ")
		.setDescription(message.author.username + ' f')
		.setFooter({
			text: "f"
		})
		.setColor('#00FF00')
		.setImage('https://c.tenor.com/g_smSrfkoLcAAAAC/goku-bowing.gif')
  
  const f5 = new EmbedBuilder()
		.setTitle(" f ")
		.setDescription(message.author.username + ' f')
		.setFooter({
			text: "f"
		})
		.setColor('#00FF00')
		.setImage('https://c.tenor.com/sa8wvCGXJY8AAAAC/salute-anime.gif')
  
  const f6 = new EmbedBuilder()
		.setTitle(" f ")
		.setDescription(message.author.username + ' f')
		.setFooter({
			text: "f"
		})
		.setColor('#00FF00')
		.setImage('https://media.tenor.com/b-rNht0eLhIAAAAM/anime-girl-salute.gif')
  //-------------------------------------------------------------------------------------
     if (message.content.includes(prefix + "f")) {


		const number = 6;

		var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;

		switch (random) {
			case 1: message.channel.send({ embeds: [f1] }); break;
        case 2: message.channel.send({ embeds: [f2] }); break;
        case 3: message.channel.send({ embeds: [f3] }); break;
        case 4: message.channel.send({ embeds: [f4] }); break;
        case 5: message.channel.send({ embeds: [f5] }); break;
        case 6: message.channel.send({ embeds: [f6] }); break;
        
    }}
  //----------------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------
	
const 	waifu01 = new EmbedBuilder()
.setTitle(" Best waifu claro que si ")
.setDescription(" Esta waifu es de mi poderosisimo creador el onii-sama de oniis-samas xD y es la mejor de todas   redoble de tambores ponte en señal de respeto " + message.author.username + "Presentando al Onii-sama Jojan5")
.setFooter({
    text: "jojan5 dice que es best waifu y al que no le guste que se"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/564x/92/68/ea/9268ea18591df5ad21bd184077dbe0dd.jpg');

const  waifu1 = new EmbedBuilder()
.setTitle(" Best waifu ")
.setDescription(" esta waifu es de jojan5 lo siento  prueba otra vez " + message.author.username + " suerte pa la proxima  " + Target.username)
.setFooter({
    text: "jojan5 best waifu y al que no le guste que se"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/564x/92/68/ea/9268ea18591df5ad21bd184077dbe0dd.jpg');


const 	 waifu2 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "owo"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/564x/30/1a/7a/301a7a9a4b9bc76e9796b65394d318e6.jpg');


const 	 waifu3 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
 .setFooter({
    text: "owo"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/564x/e5/9f/fa/e59ffaef56a34d23a7b9ace8be291673.jpg');


const 	 waifu4 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
 .setFooter({
    text: "owo"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/564x/87/db/b7/87dbb710c3a55aeb12ddf18f70c2443b.jpg');


const 	 waifu5 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  esta gustar a meero " + message.author.username + " toma una waifu ahora vete me molestas   " + Target.username)
 .setFooter({
    text: "owo"
})
.setColor('#fe0340')
.setImage('https://preview.redd.it/34503l0475551.jpg?width=960&crop=smart&auto=webp&s=ff6a853137331c11029c0963dee4b1ed5df477bb');

const  waifu6 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
 .setFooter({
    text: "owo"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/564x/da/01/3b/da013b9687a31d3733c9e61e241ca9c1.jpg');

const 	 waifu7 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "GRRRRRR"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/236x/fb/65/39/fb65397c660d88e1342845ce54d0ab49.jpg');

const 	waifu8 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "GRRRRRR"
})
.setColor('#fe0340')
.setImage('https://ae01.alicdn.com/kf/H854f5bf08e1142dfadf39d767b3b9069v/Anime-Demon-Slayer-Kimetsu-no-Yaiba-Susamaru-Kimono-Uniform-Cosplay-Costume-Halloween-Suit-Custom-made-Any.jpg_Q90.jpg_.webp');

const 	waifu9 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "GRRRRRR"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/236x/f1/50/6e/f1506ea46f6fc29d2e3cd2b2fa3b5f57.jpg');

const 	waifu10 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "GRRRRRR"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/564x/43/f4/f7/43f4f77b588312b9b7a22bef1bc8c0db.jpg');

const 	waifu11 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "GRRRRRR"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/564x/d2/28/1d/d2281d4737d55411c4748a9753822e11.jpg');

const 	waifu12 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "GRRRRRR"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/236x/f7/2b/18/f72b1814d76aafc4adeb82f61bc8cfa2.jpg');

const 	waifu13 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "GRRRRRR"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/236x/a9/43/db/a943dbbb1a095fa5d39303f7b6f4a7b4.jpg');

const 	waifu14 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "GRRRRRR"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/236x/d4/c0/70/d4c0702d729629249c6a98e17addf987.jpg');


    
 const    waifu15 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "GRRRRRR"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/236x/1b/dd/82/1bdd828924078d21ea403294ef31da7b.jpg');


    
const     waifu16 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "GRRRRRR"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/236x/5b/6b/93/5b6b93446110d9472c5b30384c5de069.jpg');


    
const     waifu17 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "GRRRRRR"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/236x/09/3a/cf/093acfe6179f107603e88d31af595572.jpg');


    
const 	    waifu18 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "GRRRRRR"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/236x/21/7a/78/217a78e51836c43930d4708367a3e3a6.jpg');


    
 const    waifu19 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "GRRRRRR"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/236x/76/8d/7b/768d7b2867b29fa559563585cebf31f3.jpg');
        
    const     	    waifu20 = new EmbedBuilder()
.setTitle(" husnabdo  ")
.setDescription(" Un husbando salvaje aparecio " + message.author.username + " toma tu uke ahora vete me molestas   " + Target.username)
.setFooter({
    text: "GRRRRRR"
})
.setColor('#f5q790')
.setImage('https://i.pinimg.com/236x/0e/c2/33/0ec23373b83ee37c4c98c645262715ff.jpg');

     const     waifu21 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "Wonka dijo gozenlo "
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/564x/10/ed/90/10ed902c15299ec3489adcd18c900b6c.jpg');
    
         const     waifu22 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "Wonka dijo gozenlo "
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/236x/ee/11/4a/ee114addc11458f98d2a61e93a72af5c.jpg');

const   waifu23 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "Wonka dijo gozenlo "
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/564x/d4/80/d1/d480d186948482ec753552b5e2361bfd.jpg');


        const      waifu24 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "Wonka dijo gozenlo "
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/564x/1f/71/34/1f7134363269ec06976dbc2eaf3862f2.jpg');

const 	waifu25 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Genial premio doble de Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "Wonka dijo gozenlo "
})
.setColor('#fe0340')
.setImage('https://pbs.twimg.com/media/DLPW42xXcAAYwMh.jpg');

const  waifu26 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "Wonka dijo gozenlo "
})
.setColor('#fe0340')
.setImage('https://arc-anglerfish-arc2-prod-gruporepublica.s3.amazonaws.com/public/OVMWWAQYB5H5HCZ52ZPDHJOKOI.png');

const   waifu27 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "Es linda bob esponja"
})
.setColor('#fe0340')
.setImage(' https://i.pinimg.com/originals/98/a8/b9/98a8b91d019c9a7cd032b38768a045e4.jpg');

const    waifu28 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "Es linda bob esponja"
})
.setColor('#fe0340')
.setImage('  https://ae01.alicdn.com/kf/HTB14jhUX5MnBKNjSZFzq6A_qVXat/2017-New-Japanese-Anime-Miss-Kobayashi-s-Dragon-Maid-Kanna-Kamui-Cosplay-Costumes-Halloween-Party-Kawai.jpg');

const     waifu29 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "Es linda bob esponja"
})
.setColor('#fe0340')
.setImage('https://pbs.twimg.com/media/E0dUYVsVIAEf9eE.jpg');

const    waifu30 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "Es linda bob esponja"
})
.setColor('#fe0340')
.setImage('https://cdn.worldcosplay.net/592935/lkzlaxommbhepfytyyzvnjvdladftkvwzzblgxkx-740.jpg');

const     waifu31 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "Es linda bob esponja"
})
.setColor('#fe0340')
.setImage('http://pm1.narvii.com/6152/c50a48ea38a45a55ab61d5cfcefd1468dc9f8f87_00.jpg');

const     waifu32 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "Es linda bob esponja"
})
.setColor('#fe0340')
.setImage('https://cdn.worldcosplay.net/294979/ygbwxyzvpbpperelwhepvazradfeevljhvbglboq-740.jpg');

const      waifu33 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "Es linda bob esponja"
})
.setColor('#fe0340')
.setImage('https://pbs.twimg.com/media/ELVjXi4WsAEbcMV.jpg');

const     waifu34 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Waifus si tu amigo  " + message.author.username + " Te esta dando una waifu siii ahora vete me molestas  " + Target.username)
.setFooter({
    text: "Es linda bob esponja"
})
.setColor('#fe0340')
.setImage('https://i.pinimg.com/736x/25/4f/d7/254fd76a32709724be1708259712ebbe.jpg');

const 	  waifu35 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setFooter({
    text: "Genial premio triple "
})
.setColor('#fe0345')
.setImage('https://static.wikia.nocookie.net/cartoon-network-scoobydoo-mystery-incorporated/images/b/ba/107TheyCan.png/revision/latest?cb=20190316003210');

const      waifu36 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setFooter({
    text: "Es Bellisima"
})
.setColor('#fe0345')
.setImage('https://static.wikia.nocookie.net/fairytail/images/1/18/Lucy_Apariencia_X792.png/revision/latest?cb=20181126013015&path-prefix=es');


const      waifu37 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setFooter({
    text: "Es Bellisima"
})
.setColor('#fe0345')
.setImage('https://www.seekpng.com/png/detail/948-9483743_erza-scarlet-images-erza-scarlet-hd-wallpaper-and.png');


const     waifu38 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setFooter({
    text: "Es Bellisima"
})
.setColor('#fe0345')
.setImage('https://i.pinimg.com/originals/5d/5e/db/5d5edbf1b60f7c052ac9a117fb2c91b1.jpg');

const      waifu39 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setFooter({
    text: "Es Bellisima"
})
.setColor('#fe0345')
.setImage('https://64.media.tumblr.com/3cff9433aa6aee6ad92ca468c3eef862/d4e0a273369880dd-b3/s250x400/8237d5d06314fbf45d44a18f2b116e1fbe50ca83.png');

const     waifu40 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setFooter({
    text: "Es Bellisima"
})
.setColor('#fe0345')
.setImage('https://pbs.twimg.com/profile_images/1358177931877617670/h7LWjhqW.jpg');

const     waifu41 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
.addFields({ name: 'instagram', value: '@Glossyincosplay', inline: true })
.setFooter({
    text: "La llevare a casa con mama"
})
.setColor('#fe0345')

        .setImage('https://preview.redd.it/7qbtem327nt91.jpg?width=640&crop=smart&auto=webp&s=8ee645322454d3687511488bcae43a9e27da4d83');
        
        
         const     waifu42 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
.addFields({ name: 'instagram', value: '@@大冰丘丘', inline: true })
.setFooter({
    text: "La llevare a casa con mama"
})
.setColor('#fe0345')
.setImage('https://64.media.tumblr.com/50c9caf4314f7cb4ca2771143503ace4/ce340748aac2d6e0-bf/s1280x1920/2bc3c80bd946d7ce2d3494549e49dd3f74a57d24.jpg');
        


         const     waifu43 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
.addFields({ name: 'instagram', value: '@@大冰丘丘', inline: true })
.setFooter({
    text: "La llevare a casa con mama"
})
.setColor('#fe0345')
.setImage('https://64.media.tumblr.com/69416c7394b7e3cc22154af1f05d45c1/bed96021cd4ec3e1-c6/s2048x3072/27a3086757071f2f300564b421be7de18cd92c03.jpg');


//----------------------------------

const     waifu44 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
.addFields({ name: 'instagram', value: '@@大冰丘丘', inline: true })
.setFooter({
    text: "La llevare a casa con mama"
})
.setColor('#fe0345')
.setImage('https://64.media.tumblr.com/2ea6f5f6ebd4d451cfb9f36b370ecf96/fb747ea914b6ef70-f1/s400x600/51a54899f51e82e4d54b0a82f885f48364496faf.jpg');
        

        
        const     waifu45 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
.addFields({ name: 'instagram', value: '@Kei_takasugi_', inline: true })
.setFooter({
    text: "La llevare a casa con mama"
})
.setColor('#fe0345')
.setImage('https://preview.redd.it/2x68f2bk6ty91.jpg?width=640&crop=smart&auto=webp&s=e26a3cdba40344ff7e89c38d768d1f0e6d1dc556');

const     waifu46 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
.addFields({ name: 'instagram', value: '@Kei_takasugi_', inline: true })
.setFooter({
    text: "La llevare a casa con mama"
})
.setColor('#fe0345')
.setImage('https://preview.redd.it/chfojv2udtg81.jpg?width=640&crop=smart&auto=webp&s=eadcb8bbb4fd1262bbb7fc6f11e971999e203f0a');

const     waifu47 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
.addFields({ name: 'instagram', value: '@luce_cosplay', inline: true })
.setFooter({
    text: "La llevare a casa con mama"
})
.setColor('#fe0345')
.setImage('https://preview.redd.it/ygtadbu0ctz91.jpg?width=640&crop=smart&auto=webp&s=6478984e8245920acb61886307cabc80f5cfb648');

const     waifu48 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
.addFields({ name: 'instagram', value: '@luce_cosplay', inline: true })
.setFooter({
    text: "La llevare a casa con mama"
})
.setColor('#fe0345')
.setImage('https://preview.redd.it/ilpat9lyvzz71.jpg?width=640&crop=smart&auto=webp&s=d26ec09a87a7af2c09fff946052c7c19dcef4b7b');

const     waifu49 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
.addFields({ name: 'instagram', value: '@luce_cosplay', inline: true })
.setFooter({
    text: "La llevare a casa con mama"
})
.setColor('#fe0345')
.setImage('https://preview.redd.it/o7kgaysdmap71.jpg?width=640&crop=smart&auto=webp&s=7b59ab76db6083a6800a1c670d47e127417b5d3c');


const     waifu50 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
.addFields({ name: 'instagram', value: '@@大冰丘丘', inline: true })
.setFooter({
    text: "La llevare a casa con mama"
})
.setColor('#fe0345')
.setImage('https://64.media.tumblr.com/d45df26b5496c3103143ae02a689beb8/0fd45421731345b9-5e/s2048x3072/ace11fb802ffc692b40fb34ad98004e9d9d7bcb0.jpg');
        


const     waifu51 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
.addFields({ name: 'instagram', value: '@bellatrixaiden', inline: true })
.setFooter({
    text: "Que femenina"
})
.setColor('#fe0345')
.setImage('https://external-preview.redd.it/8_PPwAAsV-7dKUMEwxSDj4OOC4P1tF2sMHVDTgDLtdM.jpg?width=640&crop=smart&auto=webp&s=751ecf0e057e0428e4510f7c496680a091a31d8f');
        


const     waifu52 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
.addFields({ name: 'instagram', value: '@bellatrixaiden', inline: true })
.setFooter({
    text: "Que femenina"
})
.setColor('#fe0345')
.setImage('https://external-preview.redd.it/Zrfx1lxeCi0-4apc9tZshFxrYKntaFZC6l8FyQOvTzs.jpg?width=640&crop=smart&auto=webp&s=8c99a47d872b99c9ce9192c2f4082124dcb9d054');
        

const     waifu53 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
.addFields({ name: 'instagram', value: '@bellatrixaiden', inline: true })
.setFooter({
    text: "Que femenina"
})
.setColor('#fe0345')
.setImage('https://external-preview.redd.it/11neln8xL9cY0GpICNlp4uOZc69VUKyX2IukURCKlqU.jpg?width=640&crop=smart&auto=webp&s=b4b71cd86e1b51a9ab9a2243ff37a1d700fb42c5');
        
        


const     waifu54 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
.addFields({ name: 'instagram', value: '@izanamitan', inline: true })
.setFooter({
    text: "Que femenina"
})
.setColor('#fe0345')
.setImage('https://preview.redd.it/g1a8o5732c1a1.jpg?width=640&crop=smart&auto=webp&s=1dc6e0f1d64f79602eef59336a730f7215fee4a0');
        

const     waifu55 = new EmbedBuilder()
.setTitle(" Waifus ")
.setDescription(" Tu compa el " + message.author.username + " te da esta waifu toma  " + Target.username)
.setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
.addFields({ name: 'instagram', value: '@izanamitan', inline: true })
.setFooter({
    text: "Que femenina"
})
.setColor('#fe0345')
.setImage('https://preview.redd.it/xymnjfw6w50a1.jpg?width=640&crop=smart&auto=webp&s=c39e3bcb524c0f3fc8a80a3e78ab03f228bf6fe8');
        




//-------------------------------------------------------------------------------------------------------------------------			    
        

if (message.content.includes(prefix +"miwaifu") && client.waifu[ message.author.username]  != null )
{
   let _message = client.waifu[message.author.username].message;
   message.channel.send ("Tu waifu " + message.author.username + " es : " + _message);

}

if (message.content.includes(prefix +"miwaifu") && client.waifu[message.author.username] == null )
{
   
   message.channel.send("Tu no tienes waifu "+ message.author.username + " pidele a alguien que te de una ");
}
//--------------------------------------------------------------------------------------------------------------------------
if (message.content.includes(prefix + "suwaifu") && mention == null) {
message.channel.send("Tienes que mencionar a alguien onii-chan :[");

}
//-------------------------------------------------------------------------------------------------------------------
if (message.content.includes(prefix +"suwaifu") &&  (Target.username) 
&& client.waifu[Target.username] != null   )
{
    
   let _message = client.waifu[Target.username].message;
   message.channel.send ("Su waiffu " + Target.username + " es : " + _message);

}
//-------------------------------------------------------------------------------------------------------------------------
if (message.content.includes(prefix +"suwaifu") && (Target.username)  
&&  client.waifu[Target.username] == null  )
{
    
 message.channel.send("Tu no tienes waifu "+ Target.username + " pidele a alguien que te de una ");

}

//----------------------------------------------------------------------------------------------------------------------







//---------------------------------------------------------------------------------------------------
if(message.content.includes(prefix + "waifu") && (Target.username)&& Target.username == "jojan5"){
message.channel.send({ embeds: [waifu01] });
return;
}    


if (message.content.includes(prefix + "waifu") && (Target.username)&& Target.username.username != "jojan5") {

 /* if(message.author.username *= "jojan5"){
        message.channel.send(waifu01);
    }
    if( Target.username *= "jojan5"){
        message.channel.send(waifu01);
    }
    else{*/
      /*  if(message.author.user !== "jojan5"){
            message.channel.send(waifu01); 
            return false;
        }*/
        /*if( Target.username == "jojan5"){
            message.channel.send(waifu01);
            return;
        }*/
       // else{

if (message.author.username == Target.username){
    message.channel.send("no puedes darte una auto waifu eso es trampa onii-san :{");
    return;
}

const   number = 55;

var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;

switch (random) {
    
    case 1:message.channel.send({ embeds: [waifu1] });
    {
        editmessage = ("Sorry patito es del jojan :[")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    case 2:message.channel.send({ embeds: [waifu2] });{
        editmessage = ("Nezuco")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    case 3:message.channel.send({ embeds: [waifu3] });
    {
        editmessage = ("Mitsuri Kanroji")
        client.waifu [user.username]= {
            message: editmessage
         }
    }
    
     break;
    case 4:message.channel.send({ embeds: [waifu4] });
    {
        editmessage = ("Ahri")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
case 5:message.channel.send({ embeds: [waifu5] });
{
    editmessage = ("Neeko")
    client.waifu [user.username]= {
        message: editmessage
     }
}  break;
case 6: message.channel.send({ embeds: [waifu6] });
{
    editmessage = ("Saber, Arthuria")
    client.waifu [user.username]= {
        message: editmessage
     }
} break;
case 7: message.channel.send({ embeds: [waifu7] });
{
    editmessage = ("Yuroichi")
    client.waifu [Target.username.username]= {
        message: editmessage
     }
} break;
case 8:message.channel.send({ embeds: [waifu8] });
{
    editmessage = ("Susamaru")
    client.waifu [user.username]= {
        message: editmessage
     }
} break;
    case 9:message.channel.send({ embeds: [waifu9] });
    {
        editmessage = ("Boohu")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    case 10:message.channel.send({ embeds: [waifu10] });
    {
        editmessage = ("Maid sama")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    case 11: message.channel.send(waifu11);
    {
        editmessage = ("Toshaka Rin")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
case 12:message.channel.send({ embeds: [waifu12] });
{
    editmessage = ("Xayah")
    client.waifu [user.username]= {
        message: editmessage
     }
} break;
case 13:message.channel.send({ embeds: [waifu13] });
{
    editmessage = ("Yumeko")
    client.waifu [user.username]= {
        message: editmessage
     }
} break;
case 14: message.channel.send({ embeds: [waifu14] });
{
    editmessage = ("Tifa")
    client.waifu [user.username]= {
        message: editmessage
     }
} break;
case 15:message.channel.send({ embeds: [waifu15] });
{
    editmessage = ("Orihime Inove")
    client.waifu [user.username]= {
        message: editmessage
     }
} break;
    case 16: message.channel.send({ embeds: [waifu16] });
    {
        editmessage = ("Sonic")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
case 17: message.channel.send({ embeds: [waifu17] });
{
    editmessage = ("Dark Saber")
    client.waifu [user.username]= {
        message: editmessage
     }
} break;
case 18: message.channel.send({ embeds: [waifu18] });
{
    editmessage = ("Dark Saber")
    client.waifu [user.username]= {
        message: editmessage
     }
} break;
case 19: message.channel.send({ embeds: [waifu19] });
{
    editmessage = ("Shiro")
    client.waifu [user.username]= {
        message: editmessage
     }
} break;
    case 20:  message.channel.send({ embeds: [waifu20] });
    {
        editmessage = ("Ace D")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    case 21: message.channel.send({ embeds: [waifu21] });
    {
        editmessage = ("hellscythe")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    case 22: message.channel.send({ embeds: [waifu22] });
    {
        editmessage = ("Noel")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    case 23: message.channel.send({ embeds: [waifu23] });
    {
        editmessage = ("Ty Lee")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    case 24: message.channel.send({ embeds: [waifu24] });
    {
        editmessage = ("Videl")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    case 25: message.channel.send({ embeds: [waifu25] });
    {
        editmessage = ("Kale y Caulifa")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    case 26: message.channel.send({ embeds: [waifu26] });
    {
        editmessage = ("Androide 21")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    case 27: message.channel.send({ embeds: [waifu27] });
    {
        editmessage = ("Miku Nakano")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;

    case 28: message.channel.send({ embeds: [waifu28] });
    {
        editmessage = ("Kana")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;

    case 29: message.channel.send({ embeds: [waifu29] });
    {
        editmessage = ("Airi Gotou")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;

    case 30: message.channel.send({ embeds: [waifu30] });
    {
        editmessage = ("Shiba Miyuki")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;

    case 31: message.channel.send({ embeds: [waifu31] });
    {
        editmessage = ("Hestia")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;

    case 32: message.channel.send({ embeds: [waifu32] });
    {
        editmessage = ("Ais Wallenstein")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;

    case 33: message.channel.send({ embeds: [waifu33] });
    {
        editmessage = ("Nami chuan")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;

    case 34: message.channel.send({ embeds: [waifu34] });
    {
        editmessage = ("Zelda")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
     case 35: message.channel.send({ embeds: [waifu35] });
    {
        editmessage = ("Las hex girls")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;

    case 36: message.channel.send({ embeds: [waifu36] });
    {
        editmessage = ("Lucy heartfilia")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;

    case 37: message.channel.send({ embeds: [waifu37] });
    {
        editmessage = ("Erza Scarlet")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;

    case 38: message.channel.send({ embeds: [waifu38] });
    {
        editmessage = ("Kana")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;

    case 39: message.channel.send({ embeds: [waifu39] });
    {
        editmessage = ("Daphne Blake")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;

    case 40: message.channel.send({ embeds: [waifu40] });
    {
        editmessage = ("Asami Sato")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    
     case 41: message.channel.send({ embeds: [waifu41] });
    {
        editmessage = ("Nazuna Nanakusa")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    
       case 42: message.channel.send({ embeds: [waifu42] });
    {
        editmessage = ("Hu tao")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
   
    
       case 43: message.channel.send({ embeds: [waifu43] });
    {
        editmessage = ("Signora")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    
         case 44: message.channel.send({ embeds: [waifu44] });
    {
        editmessage = ("Yae Miko")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    
         case 45: message.channel.send({ embeds: [waifu45] });
    {
        editmessage = ("Marin")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    
         case 46: message.channel.send({ embeds: [waifu46] });
    {
        editmessage = ("Mikasa y tiene vestido de boda")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    
          case 47: message.channel.send({ embeds: [waifu47] });
    {
        editmessage = ("Lisa")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    
    
         case 48: message.channel.send({ embeds: [waifu48] });
    {
        editmessage = ("Yennefer")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    
          case 49: message.channel.send({ embeds: [waifu49] });
    {
        editmessage = ("Miss fortune")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    
        case 50: message.channel.send({ embeds: [waifu50] });
    {
        editmessage = ("Kurumi")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    
       
        case 51: message.channel.send({ embeds: [waifu51] });
    {
        editmessage = ("ningguang")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    
    
        case 52: message.channel.send({ embeds: [waifu52] });
    {
        editmessage = ("Boa Hanckoc")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    
    
        case 53: message.channel.send({ embeds: [waifu53] });
    {
        editmessage = ("Violet Evergarden")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    
     case 54: message.channel.send({ embeds: [waifu54] });
    {
        editmessage = ("Ganyu")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
    
     case 55: message.channel.send({ embeds: [waifu55] });
    {
        editmessage = ("Himeno")
        client.waifu [user.username]= {
            message: editmessage
         }
    } break;
   
   
   
   


}


}
if (message.content.includes(prefix + "waifu") && mention == null) {
message.channel.send("no puedes darte una auto waifu eso es trampa onii-san :{ menciona a alguien porfavor");

}

//----------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------
  
  
  
  //----------------------------------------------------------------------------------------------------------------------------------------------
  const     husbando1 = new EmbedBuilder()
  .setTitle(" UFF ")
.setDescription("Tu amigo " + message.author.username + " te esta dando este Husbando ahora vete me molestas")
   .setFooter({
		  text: "debo admitir que me calienta mas que el son en verano"
	  })
  .setColor('#0000ff')
  .setImage('https://i.pinimg.com/originals/75/04/d1/7504d1f6014f009d76293b5178c40fa5.png');

const   husbando2 = new EmbedBuilder()
  .setTitle(" UFF ")
  .setDescription("Tu amigo " + message.author.username + " te esta dando este Husbando ahora vete me molestas")
   .setFooter({
		  text: "debo admitir que me calienta mas que el son en verano"
	  })
  .setColor('#0000ff')
  .setImage('https://pbs.twimg.com/media/EtAdfX0XAAE7iva.jpg');

const   husbando3 = new EmbedBuilder()
  .setTitle(" UFF ")
  .setDescription("Tu amigo " + message.author.username + " te esta dando este Husbando ahora vete me molestas")
   .setFooter({
		  text: "debo admitir que me calienta mas que el son en verano"
	  })
  .setColor('#0000ff')
  .setImage('https://neoverso.com/wp-content/uploads/2011/02/grayson_by_bluebird0020-d2ygw0p.jpg');

const  husbando4 = new EmbedBuilder()
  .setTitle(" UFF ")
  .setDescription("Tu amigo " + message.author.username + " te esta dando este Husbando ahora vete me molestas")
   .setFooter({
		  text: "debo admitir que me calienta mas que el son en verano"
	  })
  .setColor('#0000ff')
  .setImage('https://data.whicdn.com/images/333386362/original.jpg');

const   husbando5 = new EmbedBuilder()
  .setTitle(" UFF ")
  .setDescription("Tu amigo " + message.author.username + " te esta dando este Husbando ahora vete me molestas")
   .setFooter({
		  text: "debo admitir que me calienta mas que el son en verano"
	  })
  .setColor('#0000ff')
  .setImage('http://pm1.narvii.com/6268/272bbd43d65648947474e9ec70bb29ee67a44fb2_00.jpg');

const    husbando6 = new EmbedBuilder()
  .setTitle(" UFF ")
  .setDescription("Tu amigo " + message.author.username + " te esta dando este Husbando ahora vete me molestas")
   .setFooter({
		  text: "debo admitir que me calienta mas que el son en verano"
	  })
  .setColor('#0000ff')
  .setImage('https://cdn.worldcosplay.net/574271/mokqipxddpeshckswogxdokaivjstnxjsdmpgxua-740.jpg');

const   husbando7 = new EmbedBuilder()
  .setTitle(" UFF ")
  .setDescription("Tu amigo " + message.author.username + " te esta dando este Husbando ahora vete me molestas")
   .setFooter({
		  text: "debo admitir que me calienta mas que el son en verano"
	  })
  .setColor('#0000ff')
  .setImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCak_YafOz3PrwsrifoWkActSnK5e4rcU2PtOPG2H1BRD8xumtHweRwYTjO2Nf9OdHpdk&usqp=CAU');

const    husbando8 = new EmbedBuilder()
  .setTitle(" UFF ")
  .setDescription("Tu amigo " + message.author.username + " te esta dando este Husbando ahora vete me molestas")
   .setFooter({
		  text: "debo admitir que me calienta mas que el son en verano"
	  })
  .setColor('#0000ff')
  .setImage('https://cl.buscafs.com/www.tomatazos.com/public/uploads/images/326347/326347_1140x516.jpg');

const    husbando9 = new EmbedBuilder()
  .setTitle(" UFF ")
  .setDescription("Tu amigo " + message.author.username + " te esta dando este Husbando ahora vete me molestas")
   .setFooter({
		  text: "debo admitir que me calienta mas que el son en verano"
	  })
  .setColor('#0000ff')
  .setImage('https://preview.redd.it/52sj34y4qdz91.jpg?width=640&crop=smart&auto=webp&s=3d1bbe8facfe39cdd9db42340473c7b9bc29ed75');

//-----------------------------------------------------------------------------------------------------------------------


 const     husbando10 = new EmbedBuilder()
	  .setTitle(" Husbandos ")
  .setDescription(" Tu amigo " + message.author.username + " te da este husbando " + Target.username)
 .setThumbnail('https://neozink.com/resources/blog/Instagram-IG-Logo.jpg')
 .addFields({ name: 'instagram', value: '@jibberjabbar', inline: true })
 .addFields({ name: 'TikTok', value: '@jibberjabbar_', inline: true })
	  .setFooter({
		  text: "Que hombre"
	  })
	  .setColor('#0000ff')
	  .setImage('https://preview.redd.it/yqxv28e3b73a1.jpg?width=640&crop=smart&auto=webp&s=a3d7b233bf9d3faf1cd0c110b233308fd633b692');
			  

//-----------------------------------------------------------------------------------------------------------------------

  if (message.content.includes(prefix +"mihusbando") && client.husbando[message.author.username]  != null  )
  {
	 let _message = client.husbando[message.author.username];
	 message.channel.send ("Tu husbando " + message.author.username + " es : " + _message);
  
  }

  if (message.content.includes(prefix +"mihusbando") && client.husbando[message.author.username] == null )
  {
	 
	 message.channel.send("Tu no tienes husbando "+ message.author.username + " pidele a alguien que te de uno ");
  
  }

//--------------------------------------------------------------------------------------------------------------------------
if (message.content.includes(prefix + "suhusbando") && mention == null) {
  message.channel.send("Tienes que mencionar a alguien one-san:[");

}
//-------------------------------------------------------------------------------------------------------------------
	if (message.content.includes(prefix +"suhusbando") &&  (Target.username) 
	&& client.husbando[message.mentions.users.first().username] != null   )
	{
		
	   let _message = client.husbando[message.mentions.users.first().username].message;
	   message.channel.send ("Su husbando " + Target.username + " es : " + _message);
	
	}

/* 
		 let _message = client.waifu[Target.username.username].message;
		 message.channel.send ("Su waiffu " + Target.username + " es : " + _message);*/
	//-------------------------------------------------------------------------------------------------------------------------
	if (message.content.includes(prefix +"suhusbando") && (Target.username)  
	&&  client.husbando[Target.username] == null  )
	{
		
	 message.channel.send("Tu no tienes husbando "+ Target.username + " pidele a alguien que te de uno ");
	
	}

//----------------------------------------------------------------------------------------------------------------------



 
  if (message.content.includes(prefix + "husbando") && (Target.username)&& Target.username == "jojan5"){
	 message.channel.send({ embeds: [waifu01] });
	editmessage = ("No es husbando es Riruka Dokugamine")
	 client.husbando [message.mentions.users.first().username]= {
			  message: editmessage
		   }
	  return;
  }    
		  if (message.content.includes(prefix + "husbando") && (Target.username)&& Target.username.username != "jojan5") {
  number = 10;
	 
  var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;

  switch (random) {
	  
	  case 1:message.channel.send({ embeds: [husbando1] });
	  {
		  editmessage = ("Ace D")
		  client.husbando [message.mentions.users.first().username]= {
			  message: editmessage
		   }
	  } break;

		 case 2:message.channel.send({ embeds: [husbando2] });
	  {
		  editmessage = ("Tadashi hamada")
		  client.husbando [message.mentions.users.first().username]= {
			  message: editmessage
		   }
	  } break;

	 message.channel.send({ embeds: [husbando3] });
	  {
		  editmessage = ("Nightwing")
		  client.husbando [message.mentions.users.first().username]= {
			  message: editmessage
		   }
	  } break;

	 message.channel.send({ embeds: [husbando4] });
	  {
		  editmessage = ("Usui")
		  client.husbando [message.mentions.users.first().username]= {
			  message: editmessage
		   }
	  } break;

	case 5:message.channel.send({ embeds: [husbando5] });
	  {
		  editmessage = ("Felix")
		  client.husbando [message.mentions.users.first().username]= {
			  message: editmessage
		   }
	  } break;

	  case 6: message.channel.send({ embeds: [husbando6] });
	  {
		  editmessage = ("Fred jones")
		  client.husbando [message.mentions.users.first().username]= {
			  message: editmessage
		   }
	  } break;

	  case 7: message.channel.send({ embeds: [husbando7] });
	  {
		  editmessage = ("Superman")
		  client.husbando [Target.username.username]= {
			  message: editmessage
		   }
	  } break;

	  case 8: message.channel.send({ embeds: [husbando8] });
	  {
		  editmessage = ("zuko")
		  client.husbando [message.mentions.users.first().username]= {
			  message: editmessage
		   }
	  } break;
	  
	  
	   case 9: message.channel.send({ embeds: [husbando9] });
	  {
		  editmessage = ("Venti")
		  client.husbando [message.mentions.users.first().username]= {
			  message: editmessage
		   }
	  } break;
	  
	  
		  case 10: message.channel.send({ embeds: [husbando10] });
	  {
		  editmessage = ("Kaeya")
		  client.husbando [message.mentions.users.first().username]= {
			  message: editmessage
		   }
	  } break;
	  
	  
  } }


  if (message.content.includes(prefix + "husbando") && mention == null) {
	  message.channel.send("no puedes darte un auto husbando eso es trampa onii-san :{ menciona a alguien porfavor");
	  
  }
  if  (message.content.startsWith(prefix +"nuevohusbando")){
	  editmessage = message.content.slice (14);
	  
  
	  client.husbando [message.author.username]= {
		 message: editmessage
	  }
	  fs.writeFile ("./husbando.json", JSON.stringify (client.husbando, null, 4),err =>
	  {
		  if (err) throw err;
		  message.channel.send ("Husbando agregado!");
	  });
  } 





//------------------------------------------------------------------------------------------------------------------

})


