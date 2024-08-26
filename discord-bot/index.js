import "dotenv/config";
import { REST } from "@discordjs/rest";
import { ChannelsAPI } from "@discordjs/core";

const message = process.argv[2];

const chanAPI = new ChannelsAPI(new REST().setToken(process.env.BOT_TOKEN));

chanAPI
  .createMessage(process.env.CHANNEL_ID, { content: message })
  .then(() =>
    console.log(
      `notification sent to discord channel #${process.env.CHANNEL_ID}`
    )
  );
