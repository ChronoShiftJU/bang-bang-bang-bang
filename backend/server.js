import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { clerkClient, getAuth, requireAuth } from '@clerk/express';

const app = express();

// Middleware
app.use(express.json());  // Parse JSON request body
app.use(cors());          // Enable CORS

// app.use(clerkMiddleware());


// Use requireAuth() to protect this route
// If user isn't authenticated, requireAuth() will redirect back to the homepage
app.get('/protected', requireAuth({
    signInUrl: '/sign-in',
}), async (req, res) => {
    // Use `getAuth()` to get the user's `userId`
    const { userId } = getAuth(req)

    // Use Clerk's JavaScript Backend SDK to get the user's User object
    const user = await clerkClient.users.getUser(userId);

    return res.json({
        authenticated: true,
        firstName: user.firstName,
        lastName: user.lastName,
        lastSignInAt: user.lastSignInAt,
        email: user.emailAddresses[0].emailAddress,
        avatar_url: user.externalAccounts[0].imageUrl
    });
})
  

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my Express server!' });
});
app.get('/sign-in', (req, res) => {
    res.json({ message: 'Not signed in!\nYou were redirected to this page because you tried accessing an endpoint that is only for authenticated users.' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});