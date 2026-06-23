import { Text, ThemeIcon, Title } from "@mantine/core";
import {
  IconRocket,
  IconShieldCheck,
  IconBulb,
  IconUserCheck,
} from "@tabler/icons-react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Innovative Solutions",
      description:
        "We deliver cutting-edge technology solutions tailored to your business needs.",
      icon: <IconBulb size={40} />,
    },
    {
      title: "Reliability & Security",
      description:
        "Your data and projects are secure with our top-notch security measures.",
      icon: <IconShieldCheck size={40} />,
    },
    {
      title: "Client-Centric Approach",
      description:
        "We focus on building strong, lasting relationships with our clients.",
      icon: <IconUserCheck size={40} />,
    },
    {
      title: "Rapid Delivery",
      description: "We ensure timely delivery without compromising on quality.",
      icon: <IconRocket size={40} />,
    },
  ];

  return (
    <section className="bg-gray-900 text-white py-12 mx-4 md:mx-8 px-4 rounded-lg shadow-lg">
      <h1 className="text-2xl md:text-3xl text-center font-bold mb-16">
        Why Choose Us ?
      </h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between h-full max-h-72 bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-xl"
              aria-labelledby={`feature-title-${index}`}
              aria-describedby={`feature-desc-${index}`}
            >
              <ThemeIcon
                color="white"
                variant="light"
                size="xl"
                radius="lg"
                className="mb-4"
              >
                {feature.icon}
              </ThemeIcon>
              <Title
                order={3}
                ta="center"
                className="text-lg mb-2"
                id={`feature-title-${index}`}
              >
                {feature.title}
              </Title>
              <Text ta="center" id={`feature-desc-${index}`}>
                {feature.description}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
