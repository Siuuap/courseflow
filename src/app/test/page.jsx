"use client";

import React from "react";
import { useRef, useState } from "react";
export default function page() {
  const [people, setPeople] = useState([
    {
      id: 1,
      name: "John Doe",
      content: "lorem ipsum",
    },
    {
      id: 2,
      name: "Jane Smith",
      content: "lorem ipsum",
    },
    {
      id: 3,
      name: "Jack Black",
      content: "lorem ipsum",
    },
    {
      id: 4,
      name: "Joey Tribbiani",
      content: "lorem ipsum",
    },
  ]);

  const dragPerson = useRef(0);
  console.log(`dragPerson.current:`, dragPerson);
  const dragOverPerson = useRef(0);
  console.log(`dragOverPerson.current:`, dragOverPerson.current);

  function handleSort() {
    const peopleClone = [...people];
    const temp = peopleClone[dragPerson.current];
    peopleClone[dragPerson.current] = peopleClone[dragOverPerson.current];
    peopleClone[dragOverPerson.current] = temp;
    setPeople(peopleClone);
  }

  return (
    <main className="flex min-h-screen flex-col items-center space-y-4">
      <h1 className="text-xl font-bold mt-4">List</h1>
      {people.map((person, index) => {
        return (
          <div
            key={index}
            className="relative flex space-x-3 border rounded p-2 bg-gray-100 cursor-grab active:hover:cursor-grabbing"
            draggable="true"
            onDragStart={() => {
              dragPerson.current = index;
            }}
            onDragEnter={() => {
              dragOverPerson.current = index;
            }}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <p>No. {index + 1}</p>
            <p>{person.name}</p>
          </div>
        );
      })}
    </main>
  );
}
