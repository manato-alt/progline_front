import React, { useRef, useCallback } from "react";
import { Dropdown, Modal, Button } from "react-daisyui";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { auth } from "../../contexts/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ServiceEdit from "./ServiceEdit";

export default function ServiceRegistration({
  registrationServices,
  MediaIcon,
}) {
  const [user] = useAuthState(auth);
  const generateUUID = () => {
    return uuidv4();
  };
  const ref = useRef(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  const handleCloseModal = () => {
    ref.current?.close();
  };
  return (
    <div className="grid grid-cols-4 gap-4">
      {registrationServices.map((registrationService) => (
        <div key={generateUUID()} className="relative">
          <div className="bg-slate-100 p-6 cursor-pointer hover:bg-blue-200 flex items-center justify-center">
            {registrationService.image_url && (
              <div className="w-10 h-10 mx-auto">
                <img
                  src={registrationService.image_url}
                  alt={registrationService.name}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            {!registrationService.is_original && (
              <MediaIcon name={registrationService.name} />
            )}
            <p className="text-sm text-center font-bold ml-2">
              {registrationService.name}
            </p>
          </div>
          <div className="absolute right-3 top-5 font-bold">︙</div>
          <Dropdown className="absolute right-0 top-2">
            <Dropdown.Toggle className="opacity-0 hover:opacity-50"></Dropdown.Toggle>
            <Dropdown.Menu className="w-40 right-0 border z-50">
              {registrationService.is_original && (
                <>
                  <Dropdown.Item onClick={handleShow}>
                    <CiEdit className="mr-1" />
                    編集
                  </Dropdown.Item>
                  <div className="border my-2"></div>
                </>
              )}
              <Dropdown.Item
              // onClick={() => handleDelete(user.uid, registrationService.id)}
              >
                <RiDeleteBinLine className="mr-1" />
                削除
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Modal ref={ref}>
            <form method="dialog">
              <Button
                size="sm"
                color="ghost"
                shape="circle"
                className="absolute right-2 top-2"
              >
                x
              </Button>
            </form>
            <Modal.Header className="font-bold">あああ</Modal.Header>
            <Modal.Body>
              <ServiceEdit
                closeModal={handleCloseModal}
                // updateRegistrationServices={updateRegistrationServices}
                category={registrationService}
              />
            </Modal.Body>
          </Modal>
        </div>
      ))}
    </div>
  );
}
