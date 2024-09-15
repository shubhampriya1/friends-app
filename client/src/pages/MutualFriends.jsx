import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

function MutualFriends() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
    const token = Cookies.get("authtoken");
    async function fetchMutualFriends() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${backendurl}/api/users/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        setSearchResults(data?.users || []);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    fetchMutualFriends();
  }, []);
  return (
    <div className="container mx-auto p-4">
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

export default MutualFriends;
