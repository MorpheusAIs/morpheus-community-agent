import { Chat, ConsoleLogger } from 'chat';
import type { Thread, Message } from 'chat';
import { createSlackAdapter } from '@chat-adapter/slack';
import { createRedisState } from '@chat-adapter/state-redis';
import { workflowAgent } from '@/workflows/agent-workflow';
import { start } from 'workflow/api';

const logger = new ConsoleLogger('info');

export const chat = new Chat({
  userName: 'agent',
  adapters: {
    slack: createSlackAdapter({
      botToken: process.env.SLACK_BOT_TOKEN!,
      signingSecret: process.env.SLACK_SIGNING_SECRET!,
      logger: logger.child('slack'),
    }),
  },
  state: createRedisState({ url: process.env.REDIS_URL!, logger }),
  logger,
});

function parseThreadId(threadId: string): { channelId: string; threadTs: string } | null {
  const parts = threadId.split(':');
  if (parts.length >= 3 && parts[0] === 'slack') {
    return { channelId: parts[1], threadTs: parts[2] };
  }
  return null;
}

async function handleMessage(thread: Thread, message?: Message): Promise<void> {
  await thread.startTyping();

  const threadInfo = parseThreadId(thread.id);
  if (!threadInfo) {
    await thread.post('Could not parse thread information.');
    return;
  }

  if (!message?.text) {
    await thread.post('Please provide a message for me to process.');
    return;
  }

  const history: Array<{ role: 'user' | 'assistant'; content: string }> = [];
  try {
    for await (const msg of thread.allMessages) {
      if (msg.text.trim()) {
        history.push({
          role: msg.author.isMe ? 'assistant' : 'user',
          content: msg.text,
        });
      }
    }
    history.pop();
  } catch (error) {
    logger.error('Failed to fetch thread history', { error: String(error) });
  }

  start(workflowAgent, [
    {
      prompt: message.text,
      history,
      slack: {
        channelId: threadInfo.channelId,
        threadTs: threadInfo.threadTs,
        botToken: process.env.SLACK_BOT_TOKEN!,
      },
    },
  ]).catch((err) => {
    logger.error('Workflow failed to start', { error: String(err) });
    thread.post('Sorry, something went wrong processing your message.').catch(() => {});
  });
}

chat.onNewMention(async (thread, message) => {
  await thread.subscribe();
  await handleMessage(thread, message);
});

chat.onSubscribedMessage(handleMessage);
