import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'valePublicAssets',
  access: (allow) => ({
    'videos/{entity_id}/*': [
      allow.guest.to(['read']),
      allow.entity('identity').to(['read', 'write', 'delete']),
    ],
    'pictures/{entity_id}/*': [
      allow.guest.to(['read']),
      allow.entity('identity').to(['read', 'write', 'delete']),
    ],
    'products/*': [allow.guest.to(['read', 'write'])],
  }),
});
