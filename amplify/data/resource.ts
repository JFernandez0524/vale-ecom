import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/

/* DEFINE YOUR SCHEMA HERE */
const schema = a.schema({
  // This defines your "Product" model
  Product: a
    .model({
      name: a.string().required(), // The product name, e.g., "Lavender Scrub"
      price: a.float().required(), // The price, e.g., 10.50
      stock: a.integer().required(), // How many are in stock, e.g., 25
      // --- ADD THESE NEW FIELDS ---
      description: a.string(), // A short description
      image: a.url(), // A URL to the product image
      avgRating: a.float(), // Average rating (e.g., 4.5)
      bestSeller: a.boolean(), // Is it a best seller?
      isNew: a.boolean(), // Is it a new product?
      // --- END NEW FIELDS ---
      // This defines the "owner" of the product, which is the user ID
      owner: a
        .string()
        .authorization((allow) => [allow.owner().to(['read', 'delete'])]),
    })
    // This sets the authorization rules
    .authorization((allow) => [
      // For a showcase page, we want *everyone* (public) to be able to *read* the products
      allow.publicApiKey().to(['read']),
      allow.owner(),
      // Only authenticated users can *create*, *update*, and *delete* products
    ]),
});

// This is the standard export for your data resource
export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // We set the default authorization mode to API Key for simple public access
    defaultAuthorizationMode: 'apiKey',
    // You'll need to add an API Key expiration date or it will default to 7 days
    apiKeyAuthorizationMode: {
      expiresInDays: 30, // Let's set this key to be valid for 30 days
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
