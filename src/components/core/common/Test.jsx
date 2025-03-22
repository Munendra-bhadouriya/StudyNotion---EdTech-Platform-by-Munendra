import { useState, useRef, useEffect } from "react";

const AccordionItem = ({ title, contents, isOpen, onClick }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]); // Recalculate height whenever isOpen changes

  return (
    <div className="border-b border-gray-300">
      {/* Accordion Header */}
      <button
        className="w-full text-left p-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200"
        onClick={onClick}
      >
        <span className="text-lg font-semibold">{title}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Accordion Content with Dynamic Height */}
      <div
        ref={contentRef}
        style={{ height: `${height}px` }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        {contents.map((content, idx) => (
          <p key={idx} className="p-4 text-gray-700">{content}</p>
        ))}
      </div>
    </div>
  );
};

const Accordion = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleAccordion = (index) => {
    setOpenIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index) // Close if already open
        : [...prevIndexes, index] // Open if closed
    );
  };

  const items = [
    { title: "Item 1", contents: ["Content 1A", "Content 1B"] },
    { title: "Item 2", contents: ["Content 2A", "Content 2B", "Content 2C"] },
    { title: "Item 3", contents: ["Content 3A", "Content 3B"] },
  ];

  return (
    <div className="max-w-lg mx-auto mt-10 text-white">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          contents={item.contents}
          isOpen={openIndexes.includes(index)}
          onClick={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
