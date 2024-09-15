import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModal } from "@/hooks/use-modal";

function Home() {
  const { setContent } = useModal();

  const openModal = () => {
    setContent(
      "Important Notice",
      "<p>This is <strong>bold</strong> and <em>italic</em> text.</p><p>Here's a <a href='#'>link</a>.</p>"
    );
  };
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
        <Button onClick={openModal}>Open Modal</Button>
      </Tabs>
    </>
  );
}

export default Home;
