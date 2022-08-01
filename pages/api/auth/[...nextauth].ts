import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword, hashPassword } from 'utils/auth';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  secret: 'LlKq6ZtYbr+hTC868mAmAh9/h4HwMfsFo4hrfCx5mLg=',
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: 'jwt',
    maxAge: 60 * 60, // 1 hour
  },
  providers: [
    CredentialsProvider({
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        accessCode: {
          type: 'password',
        },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials || !credentials.accessCode) return null;
        try {
          // example to verify code is valid
          const plaintextCode = process.env.ACCESS_CODE;
          // that may be throw error, because the process.env.ACCESS_CODE may be '' value,
          // so to try catch it
          const hasAccessCode = await hashPassword(plaintextCode);
          const isValid = await verifyPassword(
            credentials.accessCode,
            hasAccessCode,
          );

          if (isValid && process.env.ACCESS_CODE !== '') {
            // the ACCESS_CODE is only used once, then set it as ''
            process.env.ACCESS_CODE = '';
            // Any object returned will be saved in `user` property of the JWT
            return {
              hasAccessCode,
            };
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            // return null;
            throw new Error('Access Code Error!');
          }
        } catch (error) {
          throw new Error('Access Code Error!');
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
