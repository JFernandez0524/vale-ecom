import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      // can be used in conjunction with a customized welcome email as well
      verificationEmailStyle: 'CODE',
      verificationEmailSubject: 'Welcome to Made by Valentina!',
      verificationEmailBody: (createCode) =>
        `Use this code to confirm your account: ${createCode()}`,
      userInvitation: {
        emailSubject: 'Welcome to Made by Valentina!',
        emailBody: (user, code) =>
          `We're happy to have you! You can now login with username ${user()} and temporary password ${code()}`,
      },
    },
  },
  userAttributes: {
    // Maps to Cognito standard attribute 'birthdate'
    birthdate: {
      mutable: true,
      required: false,
    },

    // Maps to Cognito standard attribute 'phone_number'
    phoneNumber: {
      mutable: true,
      required: false,
    },
    // Maps to Cognito standard attribute 'picture'
    profilePicture: {
      mutable: true,
      required: false,
    },
  },
});
