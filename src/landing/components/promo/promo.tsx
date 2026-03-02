import { Button } from "@mantine/core";
import { IconRocket } from "@tabler/icons-react";
import { HashLink as Link } from "react-router-hash-link";

const PromoBanner = () => {
  return (
    <div className="bg-gradient-to-r mx-8 md:mx-16 from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold">
        Ready to elevate your business strategy?
      </h2>
      <p className="mt-4 text-lg px-4 md:px-16">
        Discover innovative solutions that streamline operations and drive
        growth. Join the leaders in your industry and unlock new potential with
        our expertise.
      </p>
      <Button
        className="mt-6 bg-black text-white hover:bg-gray-800"
        size="md"
        radius="md"
        leftSection={<IconRocket />}
      >
        <Link to="#contact">Contact our experts</Link>
      </Button>
    </div>
  );
};

export default PromoBanner;
