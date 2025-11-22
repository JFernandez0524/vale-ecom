// utils/amplify-utils.ts
import { cookies } from 'next/headers';
import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { getUrl } from 'aws-amplify/storage/server';

import { type Schema } from '@/amplify/data/resource';
import outputs from '@/amplify_outputs.json';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

export const cookiesClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
});

export async function AuthGetCurrentUserServer() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
    return currentUser;
  } catch (error: any) {
    console.error(
      `User is not authenticated, this is normal for public pages: ${error.message}`
    );
    return null;
  }
}

export async function getStorageFileLinkServerSide() {
  // Your image key
  const imageKey = 'products/69c1cbf26fe43644bfc4899d55f7aa3c657d43aa-14.jpg';
  const BUCKET_RESOURCE_NAME = 'valePublicAssets'; // Your defined name

  const linkToStorageFile = await runWithAmplifyServerContext({
    nextServerContext: { cookies }, // Assuming 'cookies' is imported/available
    operation: async (context) => {
      try {
        const { url } = await getUrl(context, {
          path: imageKey,
          // Pass the resource name, which the server context can now look up
          options: {
            bucket: BUCKET_RESOURCE_NAME,
            expiresIn: 60000,
          },
        });
        return url.toString();
      } catch (error) {
        console.error('Error fetching image link on server:', error);
        // Return a placeholder or undefined if the link fails
        return undefined;
      }
    },
  });
}
