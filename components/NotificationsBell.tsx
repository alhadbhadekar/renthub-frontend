"use client";

import { useState, useEffect, useRef } from "react"; // 🔑 Import useRef
import { HiBell, HiOutlineBell } from "react-icons/hi2"; 
import Link from "next/link";

// --- Type Definitions ---
type Notification = {
  id: number;
  message: string;
  link: string;
  read: boolean;
};

// Key for local storage
const NOTIFICATIONS_STORAGE_KEY = "renthub_notifications";

export default function NotificationsBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  // 🔑 1. Create a ref for the component's root div
  const bellRef = useRef<HTMLDivElement>(null); 

  // --- Load Notifications from LocalStorage ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (stored) {
        setNotifications(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load notifications:", error);
      localStorage.removeItem(NOTIFICATIONS_STORAGE_KEY);
      setNotifications([]);
    }
    
    // 🔑 2. Add global click listener when the component mounts
    function handleClickOutside(event: MouseEvent) {
      // Check if the click occurred outside the referenced element
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    // Attach the listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // 🔑 3. Clean up the listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []); // Run only once

  // Calculate unread count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Function to mark all as read (example logic)
  const markAllAsRead = () => {
    const updatedNotifs = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updatedNotifs);
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifs));
  };

  return (
    // 🔑 4. Attach the ref to the root div
    <div className="relative inline-block text-left" ref={bellRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-gray-300 transition relative p-1"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="sr-only">View notifications</span>
        {unreadCount > 0 ? (
          <HiBell className="w-6 h-6" />
        ) : (
          <HiOutlineBell className="w-6 h-6" />
        )}
        
        {/* Unread Count Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown Panel */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl ring-1 ring-black/10 overflow-hidden z-50 text-black"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead} 
                className="text-sm text-blue-600 hover:text-blue-800 transition"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-gray-500 text-sm">You're all caught up! No new notifications.</p>
            ) : (
              notifications.slice(0, 5).map((notif) => (
                notif.link && typeof notif.link === 'string' && notif.link.length > 0 ? (
                    <Link
                      key={notif.id}
                      href={notif.link} 
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className={`block px-4 py-3 text-sm hover:bg-gray-100 transition ${notif.read ? 'text-gray-600' : 'font-medium text-gray-900 bg-blue-50'}`}
                      role="menuitem"
                    >
                      {notif.message}
                    </Link>
                ) : (
                    <div
                      key={notif.id}
                      className={`block px-4 py-3 text-sm cursor-default ${notif.read ? 'text-gray-600' : 'font-medium text-gray-900 bg-blue-50'}`}
                    >
                      {notif.message}
                    </div>
                )
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}