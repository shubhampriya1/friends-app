"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Loader2 } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
export default function UserProfileSearch() {
  const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const token = Cookies.get("authtoken");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `${backendurl}/api/users/search?searchTerm=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile Search</h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          Search
        </Button>
      </form>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((user) => (
            <Card key={user?._id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={user?.avatar}
                    alt={user?.name || "Unknown"}
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user?.name || "Unknown"}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    @{user?.username}
                  </p>
                </div>
                {user?.mutualFriends && (
                  <p>
                    {user.mutualFriends?.name?.[0]} and{" "}
                    {user.mutualFriends?.length - 1} are mutual friends
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {user?.isFriend ? (
                  <Button variant="destructive">Remove friend</Button>
                ) : (
                  <Button>Add Friend</Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No users found. Try a different search term.
        </p>
      )}
    </div>
  );
}
