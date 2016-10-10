const search = require('scrape-mdn').search;
const pixie = require('pixie');

function mdn(bot, config) {
  config = config[config.name] || {};
  const max = config.max === 'all' ? Infinity : config.max || 1;
  const format = config.format || '**{{title}}**:\n{{description}}\n{{url}}';
  const unknown = config.unknown || 'Couldn\'t find anything for query `{{query}}`';
  const code = config.code || false;

  return function run(message, args) {
    if (!args.length) {
      return message.reply('You must specify at least one search parameter');
    }

    const query = args.join(' ');
    search(query).then(results => {
      if (!results.length) {
        return message.reply(pixie.render(unknown, {query}));
      }

      const reply = [];

      for (let i = 0; i < max; i++) {
        const result = results[i];
        results.query = query;
        reply.push(pixie.render(format, result));
      }

      if (code) message.channel.sendCode(null, reply.join('\n'), {split: true})
      else message.channel.sendMessage(reply.join('\n'), {split: true});
    });
  }
}

mdn.command = 'mdn';
mdn.usage = 'mdn <search>';

module.exports = mdn;
