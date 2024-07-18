import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useNotifications from "../hooks/useNotifications";
import NotificationsList from "./NotificationsList";

const Notifications = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { notifications, loading, hasMore, loadMoreNotifications } = useNotifications();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        section={"bookmarks"}
      />
      <div className="flex-1 flex flex-col lg:ml-64">
        <main className="flex-1 overflow-y-auto">
          <Header />
          <div className="p-4">
            <NotificationsList
              notifications={notifications}
              loading={loading}
              hasMore={hasMore}
              loadMoreNotifications={loadMoreNotifications}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
