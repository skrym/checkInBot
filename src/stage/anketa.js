const Stage = require("telegraf/stage");
const Scene = require("telegraf/scenes/base");
const Markup = require ("telegraf/markup");
const Extra = require ("telegraf/extra");

const FIO = new Scene('fio')
FIO.enter((ctx) => ctx.reply('Введите Ваше Фамилия Имя Отчество', Extra.markup(Markup.removeKeyboard(true))))
FIO.on('text', (ctx) => {
    ctx.session.name = ctx.message.text
    ctx.session.user = ctx.message.chat.username
    ctx.session.id = ctx.message.chat.id
    ctx.scene.enter('phone')
})

const Phone = new Scene('phone')
Phone.enter((ctx) => ctx.reply('Поделитесь с нами Вашим номером телефона', PhoneButtons))
Phone.on('contact', (ctx) => {
    ctx.session.tel = ctx.message.contact.phone_number

    ctx.telegram.sendMessage(816382988, `Фио: ${ctx.session.name}, UserName: @${ctx.session.user}, номер телефона: ${ctx.session.tel}, Instagram:`, AdminButtons(ctx.session.id));
    ctx.reply('Спасибо за заявку, ожидайте ответа администратора', Extra.markup(Markup.removeKeyboard(true)));
})

const PhoneButtons = {
    reply_markup:{
        keyboard:[
            [{text:'Поделиться номером', request_contact: true}],
        ], resize_keyboard: true
    }
}
const AdminButtons = (id)  => ({
    reply_markup:{
        inline_keyboard:[
            [{text: 'Подтвердить', callback_data: `Confirm_${id}`}],
            [{text: 'Отклонить', callback_data: `Reject_${id}`}],
        ], resize_keyboard: true, 
    }
});


const AnketaStage = new Stage([FIO, Phone])


module.exports = AnketaStage