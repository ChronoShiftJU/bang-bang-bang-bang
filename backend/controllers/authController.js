import { clerkClient, getAuth } from '@clerk/express';
import User from '../models/User.js';

export const getProtectedData = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const clerkUser = await clerkClient.users.getUser(userId);

        // Check if user exists in DB, if not create one
        let user = await User.findOne({ clerkId: userId });
        if (!user) {
            user = new User({
                clerkId: userId,
                firstName: clerkUser.firstName,
                lastName: clerkUser.lastName,
                email: clerkUser.emailAddresses[0].emailAddress,
                avatarUrl: clerkUser.external,
                avatarUrl: clerkUser.externalAccounts[0]?.imageUrl || '',
                lastSignInAt: clerkUser.lastSignInAt
            });

            await user.save();
        }

        return res.json({
            authenticated: true,
            firstName: user.firstName,
            lastName: user.lastName,
            lastSignInAt: user.lastSignInAt,
            email: user.email,
            avatarUrl: user.avatarUrl
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

