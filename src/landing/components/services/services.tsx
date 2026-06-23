import {
  IconCode,
  IconCloud,
  IconDatabase,
  IconChartBar,
  IconDeviceLaptop,
  IconShieldCheck,
} from "@tabler/icons-react";
import { Text, Group } from "@mantine/core";

const services = [
  {
    title: "Custom Software Development",
    description:
      "Tailor-made software solutions that align with your business needs, ensuring seamless operations and a competitive edge.",
    icon: <IconCode size="4rem" />,
  },
  {
    title: "Cloud Integration",
    description:
      "Transform your IT infrastructure with our cloud integration services, ensuring scalability, flexibility, and security.",
    icon: <IconCloud size="4rem" />,
  },
  {
    title: "Database Management",
    description:
      "Efficient and secure database management solutions to streamline your data operations and enhance accessibility.",
    icon: <IconDatabase size="4rem" />,
  },
  {
    title: "Business Analytics",
    description:
      "Leverage advanced analytics to make data-driven decisions that boost productivity and profitability.",
    icon: <IconChartBar size="4rem" />,
  },
  {
    title: "IT Consultation",
    description:
      "Expert IT consultation services to help you navigate the digital landscape and implement cutting-edge technology.",
    icon: <IconDeviceLaptop size="4rem" />,
  },
  {
    title: "Security Solutions",
    description:
      "Comprehensive cyber security strategies to protect your digital assets and ensure business continuity.",
    icon: <IconShieldCheck size="4rem" />,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16">
      <div className="container mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl text-center font-bold">
            Our Services
          </h2>
          <p className="text-xl mt-4">
            Empowering Business with Innovative Solutions
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between h-full max-h-72 shadow-sm rounded-lg p-6 hover:shadow-purple-500 hover:shadow-lg transition-shadow duration-300"
            >
              <Group className="mb-4">{service.icon}</Group>
              <Text className="text-xl font-semibold text-center mb-4">
                {service.title}
              </Text>
              <Text className="text-sm text-center">{service.description}</Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
