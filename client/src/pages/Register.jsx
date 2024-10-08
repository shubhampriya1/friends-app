import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [topics, setTopics] = useState(""); // New state for topics

  async function submit() {
    const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;

    // Split the topics by comma and trim whitespace
    const topicList = topics.split(",").map((topic) => topic.trim());

    // Enforce a limit of 5 topics
    if (topicList.length > 5) {
      toast.error("You can select up to 5 topics only.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.post(`${backendurl}/api/auth/register`, {
        username: username,
        password: password,
        topics: topicList,
      });

      Cookies.set("authtoken", data.token, { expires: 7 });
      window.location.reload();
      toast.success("Successfully registered and logged in");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <Card className="md:w-96">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link to={"/login"} className="underline">
              Login
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col items-start gap-1 space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="flex flex-col items-start gap-1 space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>

              <div className="flex flex-col items-start gap-1 space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                />
              </div>

              {/* Topic input with a limit of 5 */}
              <div className="flex flex-col items-start gap-1 space-y-1.5">
                <Label htmlFor="topics">
                  Topics (up to 5, comma-separated)
                </Label>
                <Input
                  id="topics"
                  placeholder="Enter topics (e.g. coding, music)"
                  name="topics"
                  value={topics}
                  onChange={(e) => setTopics(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to={"/"}>
            <Button variant="outline">Cancel</Button>
          </Link>

          <Button onClick={submit}>Register</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
