"use client";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/db";

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

function DeleteAssignmentModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const params = useParams();

  async function handleDelete() {
    try {
      const { error } = await supabase
        .from("assignments")
        .delete()
        .eq("sub_lesson_id", params.sub_lesson_id);

      if (error) throw new Error("Cannot delete this assignment");

      router.push("/admin/assignment");
    } catch {
      console.log("error");
    }
  }

  return (
    <>
      <section
        className=" flex justify-end min-[375px]:w-[350px] min-[768px]:w-[743px]  min-[1200px]:w-[1200px] min-[1440px]:w-[1120px] text-[#2F5FAC] font-bold hover:underline"
        onClick={onOpen}
      >
        Delete Assignment
      </section>

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
