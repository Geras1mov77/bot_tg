const TelegramApi = require('node-telegram-bot-api')

const token = '6910473184:AAHORNkavh0b6WGDzd15bZX-nnzhh3aAJFM'

const bot = new TelegramApi(token, { polling: true })

const chats = {}

const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: '1', callback_data: '1' }, { text: '2', callback_data: '2' }, { text: '3', callback_data: '3' }],
      [{ text: '4', callback_data: '4' }, { text: '5', callback_data: '5' }, { text: '6', callback_data: '6' }],
      [{ text: '7', callback_data: '7' }, { text: '8', callback_data: '8' }, { text: '9', callback_data: '9' }],
      [{ text: '0', callback_data: '0' }],
    ]
  })
}

const againOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Начать заново', callback_data: '/again' }],
    ]
  })
}

const startGame = async (chatId) => {

    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать`);
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, `Отгадывай`, gameOptions);
}
const start = () => {
  
  bot.setMyCommands([
    { command: '/start', description: 'Начало работы' },
    { command: '/info', description: 'Получить информацию о пользователе' },
    { command: '/game', description: 'Игра угадай цифру' },
  ])
  
  bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    console.log(msg);
  
    if (text === '/start') {
      // await bot.sendSticker(chatId, 'https://kudo.https://t.me/addstickers/Kudo_64ru/wp-content/uploads/2022/07/fb085e83-d792-4f40-aa68-27072c224849.jpg')
      return bot.sendMessage(chatId, `Добро пожаловать в телеграмм бот клуба ILIN TEAM`);
    }
    if (text === '/info') {
      return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`);
    }
    if (text === '/game') {
      return startGame(chatId);
    }
    return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй еще раз!)`);
  
  })

  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === '/again') {
      return startGame(chatId);
    }
    if (data == chats[chatId]) {
      return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions);
    } else {
      return bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions);
    }
  })
}

start()