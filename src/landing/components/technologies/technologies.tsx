import {
  IconBrandReact,
  IconBrandNodejs,
  IconBrandJavascript,
  IconBrandTailwind,
  IconBrandPython,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandMongodb,
} from "@tabler/icons-react";
import TechIcon from '@common/tech-icons/tech-icons';

const technologies = [
  { name: "React", icon: IconBrandReact, color: "text-blue-500" },
  { name: "Node.js", icon: IconBrandNodejs, color: "text-green-500" },
  { name: "JavaScript", icon: IconBrandJavascript, color: "text-yellow-500" },
  { name: "Tailwind CSS", icon: IconBrandTailwind, color: "text-teal-500" },
  { name: "Python", icon: IconBrandPython, color: "text-blue-600" },
  { name: "HTML5", icon: IconBrandHtml5, color: "text-orange-600" },
  { name: "CSS3", icon: IconBrandCss3, color: "text-blue-700" },
  { name: "MongoDB", icon: IconBrandMongodb, color: "text-green-700" },
];

const Technologies = () => {
  return (
    <div id="technologies" className="mt-8">
      <h1 className="text-2xl md:text-3xl text-center font-bold">
        Cutting-Edge Tools & Technologies
      </h1>
      <div className="flex ">
        <div className="flex space-x-32  animate-technologies mt-8">
          {technologies.concat(technologies).map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <TechIcon
                key={index}
                icon={IconComponent}
                color={tech.color}
                name={tech.name}
                hoverColor={tech.color}
                size={32}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Technologies;
