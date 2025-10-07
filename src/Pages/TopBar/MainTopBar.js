import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { userDummmy } from '../../global/images';
import NewsFeed from '../MainPages/NewsFeed/NewsFeed';
import People from '../MainPages/Peoples/People';
import ClubsPage from '../MainPages/Clubs/ClubsPage';
import TeamsPage from '../MainPages/Teams/TeamsPage';
import EventsPage from '../MainPages/Events/EventsPage';
const MainTopBar = () => {
    var _a;
    const [activeTab, setActiveTab] = useState('NewsFeed');
    const tabs = [
        { name: 'NewsFeed', icon: 'fa-  ', component: _jsx(NewsFeed, {}) },
        { name: 'People', icon: 'fa-user', component: _jsx(People, {}) },
        { name: 'Clubs', icon: 'fa-flag', component: _jsx(ClubsPage, {}) },
        { name: 'Teams', icon: 'fa-users', component: _jsx(TeamsPage, {}) },
        { name: 'Events', icon: 'fa-calendar', component: _jsx(EventsPage, {}) },
    ];
    const currentComponent = (_a = tabs.find(tab => tab.name === activeTab)) === null || _a === void 0 ? void 0 : _a.component;
    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
        }
        catch (_a) { }
        window.location.href = '/';
    };
    // local dropdown state
    const [openProfile, setOpenProfile] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        const onDocClick = (e) => {
            if (!menuRef.current)
                return;
            if (!menuRef.current.contains(e.target))
                setOpenProfile(false);
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
    return (_jsxs("header", { className: "flex flex-col min-h-screen bg-gray-50 text-gray-800", children: [_jsxs("div", { className: "w-full bg-white shadow-md px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4", children: [_jsx("div", { className: "flex items-center space-x-2", children: _jsx("div", { className: "bg-red-500 text-white h-12 w-12 rounded-full flex justify-center items-center text-xl font-bold", children: "S" }) }), _jsx("nav", { className: "flex space-x-4", children: tabs.map(tab => (_jsxs("button", { onClick: () => setActiveTab(tab.name), className: `flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 
                                ${activeTab === tab.name
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-100 hover:bg-blue-100'}`, children: [_jsx("i", { className: `fas ${tab.icon}` }), _jsx("span", { children: tab.name })] }, tab.name))) }), _jsxs("div", { className: "relative", ref: menuRef, children: [_jsx("button", { onClick: () => setOpenProfile(prev => !prev), className: "flex items-center gap-3 p-1 rounded cursor-pointer", "aria-haspopup": "true", "aria-expanded": openProfile, children: _jsx("img", { className: "w-14 h-14 rounded-full object-cover border", src: userDummmy, alt: "user" }) }), openProfile && (_jsxs("div", { className: "absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50", children: [_jsxs("div", { className: "px-4 py-3 border-b", children: [_jsx("p", { className: "font-semibold", children: "User Name" }), _jsx("p", { className: "text-xs text-gray-500", children: "user@example.com" })] }), _jsx("div", { className: "py-1", children: menuItems.map(item => (_jsx("button", { onClick: item.onClick, className: `w-full text-left px-4 py-2 hover:bg-gray-100 ${item.className}`, children: item.label }, item.key))) })] }))] })] }), _jsx("main", { className: "flex-1 px-6 py-8", children: _jsx("div", { className: "bg-white rounded-lg shadow-md p-6", children: currentComponent }) })] }));
};
export default MainTopBar;
