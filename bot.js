if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var Botkit = require('botkit');

var controller = Botkit.slackbot({
  debug: false
});

var bot = controller.spawn({
  token: process.env.token,
  retry: true
}).startRTM(function(error){
  if(error){
    throw new Error(error);
  }
});


controller.on('pin_removed', function(bot, message) {

  bot.api.users.info({
    user: message.user
  }, function(error, result){
    if(error) console.log(error);

    let userName = result.user.name;

    bot.api.pins.add({
      channel: message.channel_id,
      timestamp: message.item.message.ts
    });

    bot.say({
      text: `ちょっと @${userName} はん。 勝手にピンはずさんといてやー。\nしゃあないからもっかいピンしといたでー`,
      link_names: true,
      channel: message.channel_id
    });
  });



});
