"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
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

function ConfirmationModal({ course }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  const [modalHeaderMessage, setModalHeaderMessage] = useState("");
  const [modalBodyMessage, setModalBodyMessage] = useState("");
  const [confirmButtonMessage, setConfirmButtonMessage] = useState("");
  const [denyButtonMessage, setDenyButtonMessage] = useState("");
  const [desiredCourseButtonMessage, setDesiredCourseButtonMessage] = useState(
    "Get in Desire Course"
  );

  const [checkSubscribe, setCheckSubscribe] = useState(false);
  const [checkDesiredCourse, setCheckDesiredCourse] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    getUser();
  }, [status]);

  async function getUser() {
    try {
      if (status === "authenticated") {
        const { data, error } = await supabase
          .from("status_view")
          .select("*")
          .eq("user_id", session.user.userId)
          .eq("course_id", course[0].course_id);

        const { data: desiredCourseData, error: desiredCourseError } =
          await supabase
            .from("users_desired")
            .select("*")
            .eq("user_id", session.user.userId)
            .eq("course_id", course[0].course_id);

        if (desiredCourseData.length === 0) {
          setCheckDesiredCourse(false);
        } else {
          setDesiredCourseButtonMessage("Remove from Desire Course");
          setCheckDesiredCourse(true);
        }

        if (data.length === 0) {
          throw new Error("Not subscribed");
        }
        setCheckSubscribe(true);
      }
      setLoading(false);
    } catch {
      setCheckSubscribe(false);
      setLoading(false);
    }
  }

  async function handleDesiredCourse() {
    const data = {
      user_id: session?.user?.userId,
      course_id: course[0].course_id,
    };

    try {
      if (status === "authenticated" && checkDesiredCourse === false) {
        const result = await axios.post(
          "http://localhost:3000/api/desired-courses",
          data
        );

        setDesiredCourseButtonMessage("Remove from Desire Course");
        setCheckDesiredCourse(true);
      } else if (status === "authenticated" && checkDesiredCourse === true) {
        const result = await axios.put(
          "http://localhost:3000/api/desired-courses",
          data
        );

        setDesiredCourseButtonMessage("Get in Desire Course");
        setCheckDesiredCourse(false);
      } else {
        setModalHeaderMessage("Sign in required");
        setModalBodyMessage(`You have to sign in to add desired course`);
        setConfirmButtonMessage(`Sign in`);
        setDenyButtonMessage(`Not now`);
        onOpen();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function openModal() {
    if (status === "authenticated") {
      setModalHeaderMessage("Confirmation");
      setModalBodyMessage(`Do you sure to subscribe ${course[0].name} Course?`);
      setConfirmButtonMessage(`Yes, I want to subscribe`);
      setDenyButtonMessage(`No, I don’t`);
      onOpen();
    } else {
      setModalHeaderMessage("Sign in required");
      setModalBodyMessage(`You have to sign in to subscribe this course`);
      setConfirmButtonMessage(`Sign in`);
      setDenyButtonMessage(`Not now`);
      onOpen();
    }
  }

  async function handleSubmit() {
    if (status === "authenticated") {
      try {
        const data = {
          user_id: session?.user?.userId,
          course_id: course[0].course_id,
        };
        const result = await axios.post(
          "http://localhost:3000/api/subscribe",
          data
        );
        setCheckSubscribe(true);
        onClose();
      } catch (error) {
        setModalHeaderMessage("Something went wrong.");
        setModalBodyMessage(`Failed to subsribe the course, please try again.`);
        setConfirmButtonMessage(`try again`);
        setDenyButtonMessage(`cancel`);
      }
    } else {
      router.push(`/login?previous=course/${params.course_id}`);
    }
  }

  return (
    <>
      {!checkSubscribe && !loading && (
        <>
          <button
            onClick={() => {
              handleDesiredCourse();
            }}
            className=" text-base text-[#F47E20] border-2 border-[#F47E20] hover:bg-[#f1c5a1] rounded-xl mt-5 font-bold px-4 py-6 w-[310px] h-[60px] leading-3"
          >
            {desiredCourseButtonMessage}
          </button>

          <button
            onClick={() => {
              openModal();
            }}
            className="bg-[#2F5FAC] hover:bg-[#6897e4] rounded-xl text-white text-base font-bold  mt-6 px-4 py-5 w-[310px] h-[60px] text-center leading-4"
          >
            Subscribe This Course
          </button>
        </>
      )}

      {checkSubscribe && (
        <button
          onClick={() => {
            router.push(`/user/${params.course_id}/learning`);
          }}
          className="bg-[#2F5FAC] hover:bg-[#6897e4] rounded-xl text-white text-base font-bold  mt-6 px-4 py-5 w-[310px] h-[60px] text-center leading-4"
        >
          Start Learning
        </button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent my="auto" maxW="528px">
          <ModalHeader>{modalHeaderMessage}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBodyMessage}</ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              {denyButtonMessage}
            </Button>
            <Button onClick={handleSubmit} colorScheme="blue">
              {confirmButtonMessage}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
