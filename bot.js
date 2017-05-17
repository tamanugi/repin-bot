if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var Botkit = require('botkit');

var controller = Botkit.slackbot({
  debug: false
});

var bot = controller.spawn({
  token: process.env.token
}).startRTM();


controller.on('pin_removed', function(bot, message) {

  bot.api.pins.add({
    token: process.env.token
    , channel: message.channel_id
    , timestamp: message.item.message.ts
  })

  bot.say({
    text: '勝手にピンはずさんといてやー。しゃあないからもっかいピンしといたでー'
    , channel: message.channel_id
  })

});
