"use client";
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

function ModalWindow({
  className,
  modalBody,
  modalHeader,
  acceptText,
  declineText,
  children,
  onClick,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <section className={`${className}`} onClick={onOpen}>
        {children}
      </section>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent my="auto" maxWidth={`528px`}>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="20px" className="text-[#646D89]">
            {modalBody}
          </ModalBody>

          <ModalFooter className="flex min-[0px]:gap-[10px] min-[768]:gap-[16px] justify-center">
            <button
              className="min-[0px]:px-[10px] min-[0px]:py-[10px] min-[768px]:py-[18px] border-[1px] rounded-xl basis-[65%] border-[#F47E20] text-[#F47E20] font-bold hover:underline"
              onClick={() => {
                onClick();
                onClose();
              }}
            >
              <p className="min-[768px]:hidden min-[0px]:text-[14px] min-[768px]:text-[16px] text-center">
                Yes, I want to delete
              </p>
              <p className="min-[0px]:hidden min-[768px]:block min-[0px]:text-[14px] min-[768px]:text-[16px] text-center">
                {acceptText}
              </p>
            </button>
            <button
              className="min-[0px]:px-[10px] min-[0px]:py-[10px] min-[768px]:py-[18px] border-[1px] rounded-xl basis-[35%]  bg-[#2F5FAC] text-white font-bold hover:underline"
              onClick={onClose}
            >
              <p className="min-[0px]:text-[14px] min-[768px]:text-[16px] text-center">
                {declineText}
              </p>
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalWindow;
