const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const logger = require('../logger/logger');
const { fetch } = require("undici");
const jp = require("jsonpath");

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const storeSelector = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId('selectStore')
            .setPlaceholder('Select a Store')
            .addOptions(
                {
                    label: 'Steam',
                    description: 'Find deals for games on Steam',
                    value: '1',
                },
                {
                    label: 'GOG',
                    description: 'Find deals for games on GOG',
                    value: '7',
                },
                {
                    label: 'Humble Bundle',
                    description: 'Find deals for games on Humble Bundle',
                    value: '11',
                },
            ),
);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cheapshark')
		.setDescription('Find deals for games')
        .addIntegerOption((option) =>
        option.setName('maxprice')
            .setDescription('The max original price')
            .setMinValue(1)
            .setRequired(true))
        .addIntegerOption((option) =>
        option.setName('gamenumber')
            .setDescription('figure it out idk')
            .setMinValue(1)
            .setRequired(false)
        ),
	async execute(interaction) {
        let maxPrice = interaction.options.getInteger('maxprice');

        let gameNumber = interaction.options.getInteger('gamenumber');
        let storeID = 1;

        logger.debug(`game number: ${gameNumber}`);

        //if (!gameNumber) { gameNumber = 1; }

        //const response = await fetch(`${process.env.CHEAPSHARK_API}?storeID=${storeID}&upperPrice=${maxPrice}`, requestOptions);
        const cheapAPI = await fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=${storeID}&upperPrice=${maxPrice}`, requestOptions);
        const cheapResponse = await cheapAPI.json();

        const gameJSON = jp.parse(cheapResponse, `$..1`);

        console.log(gameJSON);

        const gameName = jp.parse(cheapResponse, `$..${gameNumber}.title`);
        const steamGameID = jp.parse(cheapResponse, `$..${gameNumber}.steamAppID`);

        const usdNormalPrice = jp.parse(cheapResponse, `$..${gameNumber}.normalPrice`);
        const usdSalePrice = jp.parse(cheapResponse, `$..${gameNumber}.salePrice`);
        
        const steamAPI = await fetch(`https://store.steampowered.com/api/appdetails?appids=${steamGameID}`);
        const steamResponse = await steamAPI.json();

        const gameDescription = jp.parse(steamResponse, `$.${steamGameID}.data.short_description`);
        const gameDiscount = jp.parse(steamResponse, `$.${steamGameID}.data.price_overview.discount_percent`);

        const gbpNormalPrice = jp.parse(steamResponse, `$.${steamGameID}.data.price_overview.initial_formatted`);
        const gbpSalePrice = jp.parse(steamResponse, `$.${steamGameID}.data.price_overview.final_formatted`);

        const gameHeader = jp.parse(steamResponse, `$.${steamGameID}.data.header_image`);

        //console.log(`game name: ${gameName}\nsteam ID: ${steamGameID}\n`)

        const cheapsharkSteamEmbed = {
            color: 0x2F3136,
            title: `[Steam] ${gameName}`,
            description: "\u200b",
            url: `https://store.steampowered.com/app/${steamGameID}/`,
            fields: [
                {
                  name: "Game",
                  value: `[Syberia](https://store.steampowered.com/app/${steamGameID}/)`,
                  inline: true
                },
                {
                  name: "Store",
                  value: "[Steam](https://store.steampowered.com/)",
                  inline: true
                },
                {
                  name: "Description",
                  value: `${gameDescription}`,
                  inline: false
                },
                {
                  name: "Normal Price",
                  value: `${gbpNormalPrice} ($${usdNormalPrice})`,
                  inline: true
                },
                {
                  name: "Price on sale",
                  value: `${gbpSalePrice} ($${usdSalePrice})`,
                  inline: true
                },
                {
                  name: "Discount",
                  value: `${gameDiscount}%`,
                  inline: true
                },
                {
                  name: "\u200b",
                  value: "**Available for platforms**"
                },
                {
                  name: "<:windows:1027207581837565993>",
                  value: "Yes",
                  inline: true
                },
                {
                  name: "<:mac:1027209078780469386>",
                  value: "Yes",
                  inline: true
                },
                {
                  name: "<:linux:1027209555807059988>",
                  value: "No",
                  inline: true
                }
            ],
            timestamp: new Date(),
            image: {
                url: `${gameHeader}`
            },
            footer: {
                text: `Information requested by ${interaction.user.username}`,
                icon_url: `${interaction.user.avatarURL()}`,
            },
        };
        
		await interaction.reply({ embeds: [cheapsharkSteamEmbed]/*, components: [storeSelector]*/ });
    },
};