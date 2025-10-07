import React, { useState, useRef, useEffect } from 'react';
import { userDummmy } from '../../global/images';
import NewsFeed from '../MainPages/NewsFeed/NewsFeed';
import People from '../MainPages/Peoples/People';
import ClubsPage from '../MainPages/Clubs/ClubsPage';
import TeamsPage from '../MainPages/Teams/TeamsPage';
import EventsPage from '../MainPages/Events/EventsPage';

const MainTopBar: React.FC = () => {
    const [activeTab, setActiveTab] = useState('NewsFeed');

    const tabs = [
        { name: 'NewsFeed', icon: 'fa-  ', component: <NewsFeed /> },
        { name: 'People', icon: 'fa-user', component: <People /> },
        { name: 'Clubs', icon: 'fa-flag', component: <ClubsPage /> },
        { name: 'Teams', icon: 'fa-users', component: <TeamsPage /> },
        { name: 'Events', icon: 'fa-calendar', component: <EventsPage /> },
    ];

    const currentComponent = tabs.find(tab => tab.name === activeTab)?.component;

    const handleLogout = () => {
        try { localStorage.removeItem('token'); } catch { }
        window.location.href = '/';
    };

    // local dropdown state
    const [openProfile, setOpenProfile] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(e.target as Node)) setOpenProfile(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    const menuItems = [
        {
            key: 'profile',
            label: 'Profile',
            onClick: () => {
                setOpenProfile(false);
                window.location.href = '/Profile';
            },
            className: ''
        },
        {
            key: 'settings',
            label: 'Settings',
            onClick: () => {
                setOpenProfile(false);
                window.location.href = '#';
            },
            className: ''
        },
        {
            key: 'logout',
            label: 'Logout',
            onClick: handleLogout,
            className: 'text-red-600 hover:bg-red-50'
        }
    ];

    return (
        <header className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
            {/* Top Navigation Bar */}
            <div className="w-full bg-white shadow-md px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="bg-red-500 text-white h-12 w-12 rounded-full flex justify-center items-center text-xl font-bold">
                        S
                    </div>
                </div>

                {/* Tabs Navigation with Icons */}
                <nav className="flex space-x-4">
                    {tabs.map(tab => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 
                                ${activeTab === tab.name
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-100 hover:bg-blue-100'
                                }`}
                        >
                            <i className={`fas ${tab.icon}`}></i>
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </nav>

                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setOpenProfile(prev => !prev)}
                        className="flex items-center gap-3 p-1 rounded cursor-pointer"
                        aria-haspopup="true"
                        aria-expanded={openProfile}
                    >
                        <img className="w-14 h-14 rounded-full object-cover border" src={userDummmy} alt="user" />
                    </button>

                    {openProfile && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                            <div className="px-4 py-3 border-b">
                                <p className="font-semibold">User Name</p>
                                <p className="text-xs text-gray-500">user@example.com</p>
                            </div>
                            {/* Mapped menu items */}
                            <div className="py-1">
                                {menuItems.map(item => (
                                    <button
                                        key={item.key}
                                        onClick={item.onClick}
                                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${item.className}`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Active Tab Content */}
            <main className="flex-1 px-6 py-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    {currentComponent}
                </div>
            </main>
        </header>
    );
};

export default MainTopBar;
