import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import SignOutButton from '@/app/components/SignOutButton'

import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

const URL = '192.168.61.49';
// const URL = '192.168.29.250';

export default function Page() {
    const { user } = useUser();

    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { getToken, isSignedIn } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken();
                // console.log(token);

                // https://jsonplaceholder.typicode.com/posts/1
                const response = await fetch(`http://${URL}:5000/api/auth/protected/`, {
                    headers: { Authorization: `Bearer ${token}` }, // Include the session token as a Bearer token in the Authorization header
                });
                const json = await response.json();

                if (json.message) {
                    setData(json.message);
                }
                else {
                    setData('Response: ' + JSON.stringify(json, null, 2));
                    console.log(JSON.stringify(json, null, 2));
                }

                // setData(json);

            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [isSignedIn]);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <View>
            <SignedIn>
                <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
                <SignOutButton />
            </SignedIn>
            <SignedOut>
                <Link href="/(auth)/sign-in">
                    <Text>Sign in</Text>
                </Link>
                <Link href="/(auth)/sign-up">
                    <Text>Sign up</Text>
                </Link>
            </SignedOut>
            <View>
                <Text style={{
                    backgroundColor: 'lightblue',
                    padding: 8,
                    borderRadius: 8,
                    margin: 8,
                }}>{data}</Text>
            </View>
        </View>
    )
}



