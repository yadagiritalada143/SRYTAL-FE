import { useRef } from "react";

const About = () => {
  const flipRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    if (flipRef.current) {
      flipRef.current.classList.toggle("is-flipped");
    }
  };

  return (
    <section id="about" className="py-12">
      <div className="px-4 md:px-12 flex flex-wrap items-stretch">
        <div className="w-full md:w-2/3 md:pr-8 mb-8 md:mb-0 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            <u>About Us</u>
          </h1>
          <div className="text-base md:text-lg leading-relaxed">
            We are a forward-thinking software company committed to transforming
            businesses through innovative technology solutions. Our team of
            experienced developers, designers, and strategists works closely
            with clients to understand their unique challenges and deliver
            customized software that drives growth and efficiency. With a
            passion for excellence, we specialize in creating cutting-edge
            applications, responsive websites, and robust cloud solutions that
            empower businesses to stay ahead in a competitive market. Our
            approach is centered around client collaboration, quality, and
            continuous improvement. We leverage the latest technologies and best
            practices to ensure that our solutions are not only powerful but
            also scalable and secure. By focusing on long-term partnerships, we
            aim to provide ongoing support and enhancements that keep our
            clients at the forefront of their industries. Whether it's
            developing a custom software solution or optimizing existing
            systems, we are dedicated to helping businesses achieve their goals
            through technology.
          </div>
        </div>

        <div
          ref={flipRef}
          className="w-full md:w-1/3 flex-initial rounded-3xl overflow-hidden transform transition-transform duration-1000 relative"
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          style={{ minHeight: "16rem" }}
        >
          <div className="flip-inner w-full h-full relative">
            <div
              className="flip-front absolute w-full h-full backface-hidden"
              style={{
                transform: "rotateY(0deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <img
                className="w-full h-full object-cover rounded-3xl"
                src="/public/img-2.jpg"
                alt="Front"
              />
            </div>
            <div
              className="flip-back absolute w-full h-full backface-hidden"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <img
                className="w-full h-full object-cover rounded-3xl"
                src="/public/img-4.jpg"
                alt="Back"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
