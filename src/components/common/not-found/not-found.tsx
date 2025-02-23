import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
      <h1 className="text-7xl font-bold text-gray-800 dark:text-white">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <img
        src="https://illustrations.popsy.co/white/resistance-band.svg"
        alt="Not Found"
        className="w-80 mt-6"
      />

      <Button
        component={Link}
        to="/"
        variant="filled"
        color="blue"
        size="lg"
        className="mt-6"
      >
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;
