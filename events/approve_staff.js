const client = require("../index");
const { EmbedBuilder, ButtonBuilder , ButtonStyle ,CommandInteraction , ActionRowBuilder, Client, Integration , ModalBuilder , TextInputStyle , TextInputBuilder} = require('discord.js')
const { Database } = require("st.db");
const staffdb = new Database("./json/staff-apply.json");

client.on("interactionCreate" ,async (interaction) => {
    if(interaction.customId == "staff_apply_app_id"){
        const mstaff_approve = new ModalBuilder()
        .setCustomId("modal_approve")
        .setTitle("قبول المقدمين للادارة");
      const staff_uid = new TextInputBuilder()
        .setCustomId("staff_uid")
        .setLabel("ايدي الاداري")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(`ايدي الاداري الذي تم قبوله`)
        .setRequired(true);
      const staff_row = new ActionRowBuilder().addComponents(staff_uid);
      mstaff_approve.addComponents(staff_row);
      await interaction.showModal(mstaff_approve).catch(() => {});
    }
})

client.on('interactionCreate' , (interaction) => {
    if (!interaction.isModalSubmit()) return;
    if(interaction.customId == "modal_approve"){
      interaction.update({
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: 3,
                label: `تم قبوله من قبل ${interaction.user.tag}`,
                custom_id: "appr_btn_inta",
                disabled: true,
              },
            ],
          },
        ],
      });
        let staff_uid_v = interaction.fields.getTextInputValue("staff_uid");
        const staff_member = interaction.guild.members.cache.get(staff_uid_v);
        staff_member.send(` تم قبولك من قبل الاداري <@${interaction.user.id}>`)
         const staff_role_id = staffdb.get("staff_role")
         staff_member.roles.add(staff_role_id)
        interaction.channel.send(`✅ تم قبول <@${staff_uid_v}> كاداري \n من قبل <@${interaction.user.id}>`)
        const approveembed = new EmbedBuilder()
                                  .setDescription('## ✅ تم قبولك كادارة')
                                  .setThumbnail(interaction.guild.iconURL({dynamic: true}));
        client.channels.cache.get(staffdb.get('staff_result')).send({content : `<@${staff_uid_v}>` , embeds : [approveembed]});                      
    }
})