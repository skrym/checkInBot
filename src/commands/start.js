module.exports = () => async (ctx)=>{
  ctx.reply(`
Привет, этот бот сделан что бы мы познакомились с тобой и ты мог получить доступ к нашему телеграм каналу. Тебе нужно ответить всего на 3 вопроса благодаря которым мы познакомимся с тобой.

Если ты готов, нажми заполнить анкету 👇
  `, AnketButtons );
  // console.log (ctx); 
  }

  const AnketButtons = {
    reply_markup:{
        keyboard:[
            [{text:'Заполнить анкету'}],
        ], resize_keyboard: true,
        one_time_keyboard: true,
    }
}