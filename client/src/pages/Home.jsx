import { Button } from "@/components/ui/button";
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
      <Button onClick={openModal}>Click me</Button>
    </>
  );
}

export default Home;
