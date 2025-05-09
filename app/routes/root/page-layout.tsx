import React, { useEffect } from 'react';
import { logoutUser, storeUserData, getExistingUser } from "~/appwrite/auth";
import { account } from "~/appwrite/client";
import { Link, useNavigate } from "react-router";

const PageLayout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate('/sign-in');
    };

    useEffect(() => {
        const checkAndStoreUser = async () => {
            try {
                const user = await account.get();
                if (!user) return;

                const existing = await getExistingUser(user.$id);
                if (!existing) {
                    console.log("Storing new user to database...");
                    await storeUserData();
                } else {
                    console.log("User already exists in database.");
                }
            } catch (err) {
                console.error("User not authenticated or error occurred:", err);
                // Optionally navigate to sign-in if you want to enforce auth
                // navigate('/sign-in');
            }
        };

        checkAndStoreUser();
    }, []);

    return (
        <main className="travel-hero min-h-screen">
            <section className="flex px-30 py-4 min-h-screen">
                <Link to=''>
                    <img
                        src="/assets/icons/logo.svg"
                        alt='Logo'
                        className='size-[30px]'
                    />
                </Link>
                <h1 className='p-28-semibold text-dark-100 mt-1 mr-200 ml-2'>Tourvisto</h1>

                <button onClick={() => navigate('/dashboard')}
                        className="cursor-pointer mb-200 text-white mt-1/2">
                    Admin Panel
                </button>

                <button
                    onClick={handleLogout}
                    className="cursor-pointer"
                >
                    <img src="/assets/icons/logout.svg" alt="logout" className="size-6 mb-200 ml-2" />
                </button>
            </section>
        </main>
    );
};

export default PageLayout;
