"use client";
import { useRouter } from "next/navigation";
//import { useRouter } from 'next/router';
import { supabase } from "@/utils/db";
import Image from "next/image";
import deleteIcon from "@/assets/images/DeleteIcon.svg";

import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function DeleteAssignmentModal({ subLessonId, type, setCheck }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  async function handleDelete() {
    console.log(subLessonId);
    try {
      const { error } = await supabase
        .from("assignments")
        .delete()
        .eq("sub_lesson_id", subLessonId);

      if (error) throw new Error("Cannot delete this assignment");

      if (type === 1) router.push("/admin/assignment");
      if (type === 2) setCheck(1);

      onClose();
    } catch {
      console.log("Cannot delete this assignment");
    }
  }

  return (
    <>
      {type === 1 && (
        <section
          className=" flex justify-end min-[375px]:w-[350px] min-[768px]:w-[743px]  min-[1200px]:w-[1200px] min-[1440px]:w-[1120px] text-[#2F5FAC] font-bold hover:underline"
          onClick={onOpen}
        >
          Delete Assignment
        </section>
      )}

      {type === 2 && (
        <button
          className="flex justify-center items-center min-[0px]:bg-[#D6D9E4] min-[1200px]:bg-transparent min-[0px]:p-[10px] min-[1200px]:p-[0px] min-[0px]:w-[50%] gap-[10px] rounded-md"
          onClick={onOpen}
        >
          <Image
            className="min-[1200px]:w-[24px] min-[1200px]:h-[24px]"
            src={deleteIcon}
            alt="delete icon"
          />
          <p className="min-[1200px]:hidden">Delete</p>
        </button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent my="auto" maxW="600px">
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="20px">
            Are you sure you want to delete this assignment?
          </ModalBody>

          <ModalFooter>
            <button
              className="py-[18px] px-[32px] border-[1px] rounded-xl border-[#F47E20] text-[#F47E20] font-bold hover:underline"
              onClick={() => {
                handleDelete();
              }}
            >
              Yes, I want to delete the assignment
            </button>
            <button
              className="ml-[16px] py-[18px] px-[32px] border-[1px] rounded-xl  bg-[#2F5FAC] text-white font-bold hover:underline"
              onClick={onClose}
            >
              No, keep it
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteAssignmentModal;
