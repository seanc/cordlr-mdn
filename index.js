const search = require('scrape-mdn').search;
const pixie = require('pixie');

function mdn(bot, config) {
  const max = config.max === 'all' ? Infinity : config.max || 1;
  return function run(message, args) {
    if (!args.length) {
      return message.reply('You must specify at least one search parameter');
    }

    const query = args.join(' ');
    search(query).then(results => {
      if (!results.length) {
        return message.reply(pixie.render(config.mdn.unknown, {query}));
      }

      const reply = [];

      for (let i = 0; i < max; i++) {
        const result = results[i];
        results.query = query;
        reply.push(pixie.render(config.mdn.format, result));
      }

      if (config.mdn.code) message.channel.sendCode(null, reply.join('\n'), {split: true})
      else message.channel.sendMessage(reply.join('\n'), {split: true});
    });
  }
}

mdn.command = 'mdn';
mdn.usage = 'mdn <search>';

module.exports = mdn;