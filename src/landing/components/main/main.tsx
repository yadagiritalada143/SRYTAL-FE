import { HashLink as Link } from "react-router-hash-link";
const Main = () => {
  return (
    <main className="relative h-[130dvh] flex flex-col justify-center items-center px-4">
      <h1 className="text-2xl sm:text-4xl md:max-w-6xl md:text-5xl lg:text-6xl font-extrabold tracking-wide mb-4 md:mb-6 text-center animate-slideInTop">
        Empowering Business with Innovative Technology Solutions
      </h1>

      <p className="text-base md:text-lg text-white text-center max-w-full md:max-w-3xl px-4 md:px-0 leading-relaxed animate-slideInBottom">
        At Srytal Systems, we are dedicated to driving digital transformation by
        providing cutting-edge software solutions tailored to meet the unique
        needs of businesses across industries. Our expertise spans custom
        software development, web and mobile app creation, cloud solutions, and
        IT consulting. With a focus on innovation, quality, and client
        satisfaction, we leverage the latest technologies to deliver scalable
        and efficient solutions that empower our clients to thrive in the
        digital age. Whether you're a startup or an established enterprise,
        Srytal Systems is your trusted partner in achieving technological
        excellence.
      </p>

      <Link
        smooth={true}
        className="p-2 mt-4 bg-transparent text-white hover:shadow-lg hover:shadow-purple-400 shadow-sm shadow-purple-400 rounded-md animate-slideInLeft"
        to="#about"
      >
        Get Started
      </Link>
    </main>
  );
};

export default Main;
