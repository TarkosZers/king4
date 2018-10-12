const Discord = require('discord.js');
const bot = new Discord.Client();
const { stripIndents } = require('common-tags');


token = "NDk1NjczODQ1OTQ5Mzk5MDUw.DqJcPg.sYNMHn-8YEfCw88inlWUvNryy5A;"

let prefix = "+";

bot.on('ready', () => {

console.log('Im ready! \nName:' + bot.user.tag + "\nWith:" + bot.users.size + " members\nServers:" + bot.guilds.size);

const asciify = require('asciify');
asciify('Ready', {font: 'larry3d'}, function(err, res) { console.log(res)});

const validStatus = ["idle","dnd","online"];
setInterval(() => { bot.user.setStatus(`${validStatus[Math.floor(Math.random() * validStatus.length)]}`)}, 3000);

const humeur = [ bot.users.size + " Users",":')","+help"];
setInterval(() => { bot.user.setGame(`${humeur[Math.floor(Math.random() * humeur.length)]}`)}, 3000);
});
//events//
bot.on("guildCreate", guild => {
  
  console.log('Je viens de rejoindre un server '+guild.name+' - '+guild.id);
  let embed = new Discord.RichEmbed()

   const invite =  guild.channels.find("name", "general","bonjour","général").createInvite().then(invite => 
    bot.users.get('317733390256308224').send("Je viens de rejoindre un server :  \n\nNom: "+guild.name+"\nId: `"+guild.id+"`\nLien: **"+ invite.url+"**"));
});

bot.on("guildDelete", guild => {
  
  console.log('Je me suis fais kick ou ban du server : '+guild.name+' - '+guild.id);
});
 bot.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', 'welcome-leave');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | name : ', `${member}`)
        .addField(':microphone2: | Welcome!', `Welcome to the server, ${member}`)
        .addField(':id: | User :', "**[" + `${member.id}` + "]**")
        .addField(':family_mwgb: | Your are the member', `${member.guild.memberCount}`)
        .addField("Name", `<@` + `${member.id}` + `>`, true)
        .addField('Server', `${member.guild.name}`, true )
        .setFooter(`**${member.guild.name}**`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

bot.on('guildMemberAdd', member => {

    console.log(`${member}`, "has joined" + `${member.guild.name}`)

});

bot.on('guildMemberRemove', member => {
    let channel = member.guild.channels.find('name', 'welcome-leave');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField('Name:', `${member}`)
        .addField('Has Let the Server', ';(')
        .addField('Bye Bye :(', 'We will all miss you!')
        .addField('The server now as', `${member.guild.memberCount}` + " members")
        .setFooter(`**${member.guild.name}`)
        .setTimestamp()

        channel.sendEmbed(embed);
});


 
bot.on("message", (message) => {
    var author = message.author.id;
    var args = message.content.split(' ').slice(1);



    if (message.content.startsWith(prefix + "ping")) {
        message.reply("Pong :ping_pong:").then(msg => {
            msg.react("👌")
        });
    } else if (message.content.startsWith(prefix + "info")) {

        let embed = new Discord.RichEmbed()

        .setTitle("Information about " + bot.user.tag)
            .setDescription(":robot:")
            .setColor("RANDOM")
            .addField("Name", bot.user.username, true)
            .addField("Discriminator", "#" + bot.user.discriminator, true)
            .addField("Users", bot.users.size, true)
            .addField("Bots", bot.users.filter(user => user.bot).size, true)
            .addField("Channels", bot.channels.size, true)
            .addField("Servers", bot.guilds.size, true)
            .addField("UpTime", (Math.round(bot.uptime / (1000 * 60 * 60))) + " hours, " + (Math.round(bot.uptime / (1000 * 60)) % 60) + " minutes, and " + (Math.round(bot.uptime / 1000) % 60) + " seconds.", false)
            .setThumbnail(bot.user.avatarURL)
            .setTimestamp()
            .setFooter("Information-bot")
        message.channel.send({ embed })
    }
 
 
    //----------Rainbow function----------------//

    if (message.content.startsWith(prefix + "disco")) {
        const config = require('./config.json')
        const roles = config.roleToDisco;
        const allowedRoles = config.allowedRoles;
        const allowedUsers = config.allowedUsers;

        function Rainbow() {
            let random = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
            roles.forEach((role) => {
                let theRole = message.guild.roles.find("name", role);
                theRole.edit({ color: random }).catch(e => {
                    return console.log(":x: **Error:** The role you specified in the `config.json` is either not a role on this server, or his a role higher than the highest role that I have.");
                });
            });
        }
        if (allowedUsers.includes(message.author.id)) {
            setInterval(() => { Rainbow(); }, 500);
            message.channel.send("```css\nDisco-ON...```");  
        } else {
            message.reply(`You do not have permission to use this command.`);
        }
    }

    if (message.content.startsWith(prefix + "stop disco")) {
        const allowedUsers = config.allowedUsers;
        if (allowedUsers.includes(message.author.id)) {
            message.channel.send("```css\nDisco-OFF...```");
            setTimeout(() => { console.log(process.exit(0)); }, 3000);
        } else {
            message.reply(`You do not have permission to use this command.`);
        }
    }


    if(message.content.startsWith(prefix+"ban") || message.content.startsWith(prefix+"Ban") || message.content.startsWith(prefix+"BAN")) { 
        var moment = require("moment"); 
        var banMember = message.guild.member(message.mentions.users.first()); 
        var lapersonnee = message.guild.member(message.mentions.users.first());  
             if(lapersonnee === null){
               return message.channel.send("", {embed: {     
                title: "Error: ",     
                color: 0xff0000,     
                description: ":warning:  Please precise a person for ban :warning: ",  
                timestamp: new Date(),   footer: {   text: 'Ban Command'   },           
                thumbnail: {       
                    url: "https://cdn.pixabay.com/photo/2013/07/12/13/16/alert-146730_960_720.png"         
                },                    
            }});   
           }     
           if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {        
            return message.channel.send("", {embed: {     
             title: "Error: ",     color: 0xff0000,    
             description: ":warning:  I dont have permission BAN_MEMBERS can you check my permission? :warning: ",  
             timestamp: new Date(),   
             footer: {   
                text: 'Ban Command'
},
          thumbnail: {
      url: "https://cdn.pixabay.com/photo/2013/07/12/13/16/alert-146730_960_720.png"
        },

        }});
      }
      if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS") && message.author.id != "317733390256308224"){
        return message.channel.send("", {embed: {
    title: "Error: ",
    color: 0xff0000,
    description: ":warning:  You dont have permission BAN_MEMBERS RIP.. :warning: ",
 timestamp: new Date(),
  footer: {
  text: 'Ban Command'
  },
          thumbnail: {
      url: "https://cdn.pixabay.com/photo/2013/07/12/13/16/alert-146730_960_720.png"
        },

        }});
      }
      if(banMember.highestRole.position >= message.member.highestRole.position){
        return message.channel.send("", {embed: {
          title: "Error:",
          color: 0xff0000,
          description: "You cannot ban a member who is higher or has the same role as you :zap:",
           timestamp: new Date(),
  footer: {
  text: 'Ban Command'
  },
        }}).catch(console.error);
      }
       const data = bot.channels.get(message.channel.id);
         var temps = moment(data.created).format("LLLL");
         var banMember = message.guild.member(message.mentions.users.first());
         banMember.ban().then(member => {
        return message.channel.send("", {embed: {
    title: "Success: ",
    color: 0x00FF00,
    description: ""+banMember.user.username+" was successfully baned by "+message.author.username,
 timestamp: new Date(),
  footer: {
  text: 'Ban Command'
  },
          image: {
                    url: "http://i.imgur.com/O3DHIA5.gif"
                },

        }});
});
     }

if(message.content.startsWith(prefix+"kick") || message.content.startsWith(prefix+"Kick") || message.content.startsWith(prefix+"KICK")) { 
        var moment = require("moment"); 
        var kickMember = message.guild.member(message.mentions.users.first()); 

             if(kickMember === null){
               return message.channel.send("", {embed: {     
                title: "Error: ",     
                color: 0xff0000,     
                description: ":warning:  Please precise a person for kick :warning: ",  
                timestamp: new Date(),   
                footer: {   
                    text: 'kick Command'   },           
                thumbnail: {       
                    url: "https://cdn.pixabay.com/photo/2013/07/12/13/16/alert-146730_960_720.png"         
                },                    
            }});   
           }     
      if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS") && message.author.id != "317733390256308224"){
            return message.channel.send("", {embed: {     
             title: "Error: ",     color: 0xff0000,    
             description: ":warning:  I dont have permission KICK_MEMBERS can you check my permission? :warning: ",  
             timestamp: new Date(),   
             footer: {   
                text: 'Kick Command'
},
          thumbnail: {
      url: "https://cdn.pixabay.com/photo/2013/07/12/13/16/alert-146730_960_720.png"
        },

        }});
      }
      if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS") && message.author.id != "317733390256308224"){
        return message.channel.send("", {embed: {
    title: "Error: ",
    color: 0xff0000,
    description: ":warning:  You dont have permission KICK_MEMBERS RIP.. :warning: ",
 timestamp: new Date(),
  footer: {
  text: 'Kick Command'
  },
          thumbnail: {
      url: "https://cdn.pixabay.com/photo/2013/07/12/13/16/alert-146730_960_720.png"
        },

        }});
      }
      if(kickMember.highestRole.position >= message.member.highestRole.position){
        return message.channel.send("", {embed: {
          title: "Error:",
          color: 0xff0000,
          description: "You cannot kick a member who is higher or has the same role as you :zap:",
           timestamp: new Date(),
  footer: {
  text: 'Kick Command'
  },
        }}).catch(console.error);
      }
       const data = bot.channels.get(message.channel.id);
         var temps = moment(data.created).format("LLLL");
         kickMember.kick().then(member => {
        return message.channel.send("", {embed: {
    title: "Success: ",
    color: 0x00FF00,
    description: ""+kickMember.user.username+" was successfully kicked by "+message.author.username,
 timestamp: new Date(),
  footer: {
  text: 'Kick Command'
  },
          image: {
                    url: "http://i.imgur.com/O3DHIA5.gif"
                },

        }});
});
     }

    if(message.content.startsWith(prefix+"invite")){
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription("**:robot:There is the link if you want to add me in your server: [Click here](https://discordapp.com/oauth2/authorize?client_id=381143813483134976&scope=bot&permissions=8)**\n\n**Join My Discord if you need to help :zap:\n===================================================\n\n:smile:-Best Support \n:crossed_swords:- Good staff's\n\n===================================================\n\n- :link: Invitation Link :link: -\nhttps://discord.gg/WgdY3HR**")
    .setImage("https://cdn.discordapp.com/attachments/380782470536232960/380793575224639507/yolloo.png")
    .setThumbnail(bot.user.avatarURL)
    message.author.send({embed})
    message.reply("**Check your private message :mailbox_with_mail: **");
}
if(message.content.startsWith(prefix+"help")){
    let embed = new Discord.RichEmbed()
    .setTitle("Help:")
    .setColor("RANDOM")
    .setDescription("**["+prefix+"Info]():** See informtaions about** "+bot.user.username+"\n["+prefix+"disco](): Run rainbow colors\n["+prefix+"stop disco](): Stop rainbow\n["+prefix+"invite](): To add a bot in your server\n["+prefix+"bc](): Clear messages sent by bot\n["+prefix+"3D](): Send 3D text\n["+prefix+"ban](): Ban members\n["+prefix+"kick](): kick members**")
    .setThumbnail(bot.user.avatarURL)
    .setTimestamp()
    .setFooter('@'+message.author.username)
    message.author.send({embed})
    message.reply("**Check your private message :mailbox_with_mail: **");
}

if(message.content.startsWith(prefix+"bc")){
let embed = new Discord.RichEmbed()
    if(!message.member.hasPermission("MANAGE_MESSAGES") && message.author.id != "132962262410461184"){
embed.setColor('RANDOM')
embed.setDescription(":bookmark_tabs: You dont have **MANAGE_MESSAGES** permission to use this command")
return message.channel.send({embed});
}
if(args.length < 1) {
  let embed = new Discord.RichEmbed()
embed.setColor('RANDOM')
embed.setDescription("please precise number for message to clean\n**Ex: "+prefix+"clean 10**")
return message.channel.send({embed});
}
if(isNaN(args)) {
  let embed = new Discord.RichEmbed()
embed.setColor('RANDOM')
embed.setDescription("please precise number for message to clean\n**Ex: "+prefix+"clean 10**")
return message.channel.send({embed});
}
if(Number(args) > 99) {
  let embed = new Discord.RichEmbed()
embed.setColor('RANDOM')
embed.setDescription("limit message to clean is 99")
return message.channel.send({embed});
}
    message.channel.fetchMessages({
      limit: args.join(' ')
    }).then(messages => {
      messages.filter(e => e.author.equals(bot.user)).forEach(message => {
        message.reply("**Succesfully cleaned up messages sent by bot :robot:.**")
        return message.delete();
      });
    });
}
if(message.content.startsWith(prefix+"3D")){
    if(args.length < 1){
        return message.reply('Please enter value');
    }

    const asciify = require('asciify');
asciify(args, {font: 'larry3d'}, function(err, res) {
message.channel.send("```css\n"+res+"```")
});
}
});
bot.login(token);
