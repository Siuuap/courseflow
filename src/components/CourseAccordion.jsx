import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from "@chakra-ui/react";


function CourseAccordion({ lesson, index }) {
  return (
    <div>
      <AccordionItem className="w-[740px]">
        <h2>
          <AccordionButton className="h-[78px] ">
            <span className="font-medium text-2xl text-[#646D89] mr-3">
              {index.toString().length === 1
                ? 0 + (index + 1).toString()
                : index + 1}
            </span>
            <span className="font-medium text-2xl w-[638px] h-[30px] text-left">
              {lesson.name}
            </span>
            <AccordionIcon />
          </AccordionButton>
        </h2>

        {lesson.sub_lessons.map((sublesson, i) => (
          <AccordionPanel
            pb={4}
            key={i}
            className="text-[#646D89] ml-10 w-[740px] "
          >
            {sublesson.name}
          </AccordionPanel>
        ))}
      </AccordionItem>
    </div>
  );
}

export default CourseAccordion;
