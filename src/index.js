require('dotenv').config();

const {BOT_TOKEN} = process.env;

const Telegraf = require("telegraf");
const session = require("telegraf/session");
const Extra = require ("telegraf/extra");
const Markup = require ("telegraf/markup");

//commands
const startCommand = require("./commands/start");
const AnketaStage = require("./stage/anketa");
const { callbackButton } = require('telegraf/markup');

const init = async (bot, config) => {

    // middleware
    bot.use(session())
    bot.use(AnketaStage.middleware())

    // commands
    bot.start(startCommand());

    bot.hears('Заполнить анкету',  (ctx)  =>  ctx.scene.enter('fio'));
    
    // Actions

    bot.action(/Confirm/, ({ telegram, chat, callbackQuery, inlineMessageId, match }) => {
        const { message } = callbackQuery

        // Ответ заявочнику
        const chatId = match.input.split('_')[1]
        telegram.sendMessage(chatId, "Ваша заявка принята, скоро наш аминистратор добавит Вас в группу");

        // Редактирование сообщения админа
        const newText = `${message.text}\n\nЗаявка Принята`
        telegram.editMessageText(chat.id, message.message_id, inlineMessageId, newText, Extra.markup())
    });

    bot.action(/Reject/, ({ telegram, chat, callbackQuery, inlineMessageId, match }) => {
        const { message } = callbackQuery

        // Ответ заявочнику
        const chatId = match.input.split('_')[1]
        telegram.sendMessage(chatId, "Ваша заявка отклонена");

        // Редактирование сообщения админа
        const newText = `${message.text}\n\nЗаявка Отклонена`
        telegram.editMessageText(chat.id, message.message_id, inlineMessageId, newText, Extra.markup())
    });

    return bot;
};

init(new Telegraf(BOT_TOKEN), process.env).then(async (bot) => {
    await bot.launch();
    console.log(`Start`);
});

module.exports = init;