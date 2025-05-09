import React, { useEffect, useState } from 'react';
import { logoutUser, storeUserData, getExistingUser } from '~/appwrite/auth';
import { account } from '~/appwrite/client';
import { Link, useNavigate } from 'react-router';

const PageLayout = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ name: string; imageUrl?: string } | null>(null);

    const handleLogout = async () => {
        await logoutUser();
        navigate('/sign-in');
    };

    useEffect(() => {
        const checkAndStoreUser = async () => {
            try {
                const currentUser = await account.get();
                if (!currentUser) return;

                const existing = await getExistingUser(currentUser.$id);

                if (!existing) {
                    console.log("Storing new user to database...");
                    await storeUserData();
                } else {
                    console.log("User already exists in database.");
                    setUser({
                        name: existing.name,
                        imageUrl: existing.imageUrl || '/assets/images/david.webp',
                    });
                }
            } catch (err) {
                console.error("User not authenticated or error occurred:", err);
                // Optional: navigate('/sign-in');
            }
        };

        checkAndStoreUser();
    }, []);

    return (
        <main className="travel-hero relative bg-cover bg-center">
            {/* Navbar */}
            <nav className="root-nav px-8 py-6 absolute -top-8 left-0 w-full z-10">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/assets/icons/logo.svg" alt="Logo" className="size-8" />
                    <h1 className="text-xl md:text-2xl font-bold text-dark-100">Tourvisto</h1>
                </Link>

                <aside className="flex items-center gap-4">
                    <span className="text-white hidden sm:block cursor-pointer">Admin Panel</span>
                    <img
                        src={user?.imageUrl || '/assets/images/david.webp'}
                        alt={user?.name || 'User'}
                        className="size-9 rounded-full aspect-square object-cover"
                        referrerPolicy="no-referrer"
                    />
                    <button onClick={handleLogout} className="p-2 rounded-full bg-white/30 hover:bg-white/20 cursor-pointer">
                        <img src="/assets/icons/logout.svg" alt="logout" className="size-5" />
                    </button>
                </aside>
            </nav>

            {/* Hero content */}
            <div className="flex flex-col justify-center h-full px-8 md:px-16">
                <section className="flex flex-col gap-6 py-48 max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-dark-100">
                        Plan Your
                    </h1>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-dark-100">
                        Trip with Ease
                    </h1>
                    <article className="flex flex-col gap-4">
                        <p className="text-lg text-dark-400">
                            Customize your travel itinerary in minutes—pick your destination,
                            set your preferences, and explore with confidence.
                        </p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="mt-4 w-fit px-6 py-3 text-white button-class"
                        >
                            Get Started
                        </button>
                    </article>
                </section>
            </div>
        </main>
    );
};

export default PageLayout;
