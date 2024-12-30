import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import ChatLayout from "./components/chat/ChatLayout";
import ContactsLayout from "./components/contacts/ContactsLayout";
import SettingsLayout from "./components/settings/SettingsLayout";
import BottomNav from "./components/layout/BottomNav";
import DesktopNav from "./components/layout/DesktopNav";
import { Toaster } from "@/components/ui/toaster";

function App() {
  // For development, we'll consider the user as always authenticated
  const isAuthenticated = true;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-white">
          Loading...
        </div>
      }
    >
      <div className="min-h-screen flex bg-gray-50">
        {isAuthenticated && <DesktopNav />}
        <div className="flex-1 lg:pl-20">
          <div className="h-full">
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? <Navigate to="/chat" replace /> : <Home />
                }
              />
              <Route
                path="/chat"
                element={
                  isAuthenticated ? <ChatLayout /> : <Navigate to="/" replace />
                }
              />
              <Route
                path="/contacts"
                element={
                  isAuthenticated ? (
                    <ContactsLayout />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/settings/*"
                element={
                  isAuthenticated ? (
                    <SettingsLayout />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
          </div>
        </div>
        {isAuthenticated && <BottomNav />}
        <Toaster />
      </div>
    </Suspense>
  );
}

export default App;
