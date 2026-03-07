'use server';

import type { ConversationMessage } from '@/lib/types';
import { getConversation } from '@/data/queries/actions';

export async function fetchConversationPreview(actionId: string): Promise<ConversationMessage[]> {
  return getConversation(actionId);
}
