import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

function Home() {
  return (
    <>
      <Navbar />

      <Tabs defaultValue="account" className="w-full h-12">
        <TabsList className="w-full flex items-center justify-around h-full">
          <TabsTrigger value="account" className="w-full">
            Account
          </TabsTrigger>
          <TabsTrigger value="password" className="w-full">
            Password
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="w-full">
            Suggestions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
        <TabsContent value="suggestions">
          Change your password here.
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Home;
