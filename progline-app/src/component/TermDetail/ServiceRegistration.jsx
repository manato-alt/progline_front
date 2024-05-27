import React, { useRef, useCallback, useEffect, useState } from "react";
import { Dropdown, Modal, Button } from "react-daisyui";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ServiceEdit from "./ServiceEdit";
import { MdAppRegistration } from "react-icons/md";
import ContentTemplate from "./contents/ContentTemplate";
import ContentCustom from "./contents/ContentCustom";
import Content from "./contents/Content";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function ServiceRegistration({
  registrationServices,
  MediaIcon,
  updateRegistrationServices,
  handleShow_detail,
}) {
  const generateUUID = () => {
    return uuidv4();
  };
  const ref = useRef(null);
  const [editingService, setEditingService] = useState(null);
  const [addService, setAddService] = useState(null);
  const [isTemplate, setIsTemplate] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [contents, setContents] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const scrollRef = useRef(null);
  const [isClickDisabled, setIsClickDisabled] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    if (registrationServices.length > 0) {
      setSelectedService(registrationServices[0]);
    }
  }, [registrationServices]);

  const handleServiceClick = (service) => {
    if (!isClickDisabled) {
      setSelectedService(service);
    }
  };

  const handleShow = useCallback((service) => {
    setAddService(null);
    setEditingService(service);
  }, []);

  const handleShowContentTemplate = useCallback((service) => {
    setEditingService(null);
    setAddService(service);
  }, []);

  useEffect(() => {
    if (addService || editingService) {
      ref.current?.showModal();
    }
  }, [addService, editingService, isTemplate]);

  const handleCloseModal = () => {
    ref.current?.close();
  };

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:3010/services/${serviceId}`);
      console.log("サービスが削除されました");
      updateRegistrationServices();
    } catch (error) {
      console.error("サービスの削除中にエラーが発生しました:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessages([error.response.data.error]);
      } else {
        setErrorMessages(["サービスの削除中にエラーが発生しました"]);
      }
    }
  };

  const handleCancelEditing = () => {
    setAddService(null);
    setEditingService(null);
  };

  const toggleTemplate = () => {
    setIsTemplate(!isTemplate);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedService) {
          const response = await axios.get("http://localhost:3010/contents", {
            params: {
              service_id: selectedService.id,
            },
          });
          setContents(response.data);
        }
      } catch (error) {
        console.error("Error fetching contents:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setErrorMessages([error.response.data.error]);
        } else {
          setErrorMessages(["コンテンツの取得中にエラーが発生しました"]);
        }
      }
    };

    fetchData();
  }, [selectedService]);

  const updateContents = async () => {
    try {
      const response = await axios.get("http://localhost:3010/contents", {
        params: {
          service_id: selectedService.id,
        },
      });
      setContents(response.data);
    } catch (error) {
      console.error("Error fetching contents:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessages([error.response.data.error]);
      } else {
        setErrorMessages(["コンテンツの取得中にエラーが発生しました"]);
      }
    }
  };

  const handleScrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const startDrag = (e) => {
    isDragging.current = true;
    startX.current = e.pageX || e.touches[0].pageX;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onDrag = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX.current) * 0.7;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
    e.preventDefault();
    setIsClickDisabled(true);
  };

  const stopDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsClickDisabled(false); // 変更：ここで即座にリセット
  };

  return (
    <div>
      {errorMessages !== null &&
        (typeof errorMessages === "string" ? (
          <p className="text-red-500 mb-4">{errorMessages}</p>
        ) : (
          errorMessages.map((message, index) => (
            <p key={index} className="text-red-500 mb-4">
              {message}
            </p>
          ))
        ))}
      <div className="max-w-[1250px] flex flex-col justify-center mx-auto">
        <div className="block min-[700px]:hidden mb-2">
          <button
            onClick={handleShow_detail}
            className="w-full bg-white border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white py-2 rounded items-center mt-1 mr-2 transition duration-300 ease-in-out"
          >
            サービスを追加
          </button>
        </div>

        <div className="flex justify-center">
          <div className="hidden min-[700px]:block">
            <button
              onClick={handleShow_detail}
              className="w-[148px] bg-white border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white py-2 rounded items-center mt-1 mr-2 transition duration-300 ease-in-out"
            >
              サービスを追加
            </button>
          </div>
          <button
            onClick={handleScrollLeft}
            className="mr-1 max-[699px]:ml-[-15px] text-2xl min-[700px]:text-4xl text-gray-400 hover:text-black"
          >
            <IoIosArrowBack />
          </button>

          <div
            className="flex overflow-hidden pb-[145px] mb-[-145px]"
            ref={scrollRef}
            onMouseDown={startDrag}
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchStart={startDrag}
            onTouchMove={onDrag}
            onTouchEnd={stopDrag}
          >
            {registrationServices.map((registrationService) => (
              <div key={generateUUID()} className="relative">
                <div
                  className={`py-3 pl-3 pr-7 mr-2 border rounded cursor-pointer hover:bg-blue-200 flex items-center justify-center ${
                    selectedService === registrationService
                      ? "bg-blue-200"
                      : "bg-slate-200"
                  }`}
                  onClick={() => handleServiceClick(registrationService)}
                >
                  {registrationService.image_url && (
                    <div className="w-5 h-5">
                      <img
                        src={registrationService.image_url}
                        alt={registrationService.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  {!registrationService.image_url && (
                    <MediaIcon name={registrationService.name} />
                  )}
                  <div>
                    <p className="text-sm text-center font-bold ml-1 overflow-hidden">
                      {registrationService.name}
                    </p>
                  </div>
                </div>
                <div className="absolute right-4 top-3 font-bold">︙</div>
                <Dropdown className="absolute right-2 top-0" id="modal">
                  <Dropdown.Toggle className="opacity-0 hover:opacity-50"></Dropdown.Toggle>
                  <Dropdown.Menu className="w-28 right-0 border z-50">
                    <Dropdown.Item
                      onClick={() =>
                        handleShowContentTemplate(registrationService)
                      }
                      className="p-1 flex justify-center"
                    >
                      <MdAppRegistration />
                      <p>登録</p>
                    </Dropdown.Item>
                    <div className="border my-2"></div>
                    <>
                      <Dropdown.Item
                        onClick={() => handleShow(registrationService)}
                        className="p-1 flex justify-center"
                      >
                        <CiEdit className="" />
                        編集
                      </Dropdown.Item>
                      <div className="border my-2"></div>
                    </>
                    <Dropdown.Item
                      onClick={() => handleDelete(registrationService.id)}
                      className="p-1 flex justify-center"
                    >
                      <RiDeleteBinLine className="" />
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
                      onClick={handleCancelEditing}
                    >
                      x
                    </Button>
                  </form>
                  <Modal.Header className="font-bold">
                    {addService ? (
                      isTemplate ? (
                        <>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                            <p className="text-sm min-[500px]:text-base">
                              テンプレート
                            </p>
                          </button>
                          <button
                            onClick={toggleTemplate}
                            className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                          >
                            <p className="text-sm min-[500px]:text-base">
                              カスタム
                            </p>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={toggleTemplate}
                            className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                          >
                            <p className="text-sm min-[500px]:text-base">
                              テンプレート
                            </p>
                          </button>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                            <p className="text-sm min-[500px]:text-base">
                              カスタム
                            </p>
                          </button>
                        </>
                      )
                    ) : (
                      <p>サービスの編集</p>
                    )}
                  </Modal.Header>
                  <Modal.Body>
                    {addService ? (
                      isTemplate ? (
                        <ContentTemplate
                          service={addService}
                          closeModal={handleCloseModal}
                          updateContents={updateContents}
                          handleCancelEditing={handleCancelEditing}
                        />
                      ) : (
                        <ContentCustom
                          service={addService}
                          closeModal={handleCloseModal}
                          updateContents={updateContents}
                          handleCancelEditing={handleCancelEditing}
                        />
                      )
                    ) : (
                      <ServiceEdit
                        closeModal={handleCloseModal}
                        updateRegistrationServices={updateRegistrationServices}
                        service={editingService}
                      />
                    )}
                  </Modal.Body>
                </Modal>
              </div>
            ))}
          </div>
          <button
            onClick={handleScrollRight}
            className="ml-1 max-[699px]:mr-[-15px] text-2xl min-[700px]:text-4xl text-gray-400 hover:text-black"
          >
            <IoIosArrowForward />
          </button>
        </div>
        <div>
          <Content contents={contents} updateContents={updateContents} />
        </div>
      </div>
    </div>
  );
}
