"use client";
// app/providers.tsx
import { ChakraProvider } from "@chakra-ui/react";
import { LessonProvider } from "@/contexts/lessonContext";

export function Providers({ children }) {
  return (
    <ChakraProvider>
      <LessonProvider>{children}</LessonProvider>
    </ChakraProvider>
  );
}
