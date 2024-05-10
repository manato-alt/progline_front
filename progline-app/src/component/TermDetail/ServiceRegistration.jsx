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

export default function ServiceRegistration({
  registrationServices,
  MediaIcon,
  updateRegistrationServices,
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

  useEffect(() => {
    if (registrationServices.length > 0) {
      setSelectedService(registrationServices[0]);
    }
  }, [registrationServices]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
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
      // カテゴリーを削除するリクエストを送信
      await axios.delete(`http://localhost:3010/services/${serviceId}`);
      console.log("サービスが削除されました");
      updateRegistrationServices();
      // 成功した場合の処理をここに記述
    } catch (error) {
      console.error("サービスの削除中にエラーが発生しました:", error);
      // エラー時の処理をここに記述
    }
  };

  const handleCancelEditing = () => {
    setAddService(null);
    setEditingService(null); // 編集サービスをリセット
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
      // 取得したコンテンツをセットする
      setContents(response.data);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mx-32">
        {registrationServices.map((registrationService) => (
          <div key={generateUUID()} className="relative">
            <div
              className={`p-6 cursor-pointer hover:bg-blue-200 flex items-center justify-center ${
                selectedService === registrationService
                  ? "bg-blue-200"
                  : "bg-slate-100"
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
              <p className="text-sm text-center font-bold ml-2">
                {registrationService.name}
              </p>
            </div>
            <div className="absolute right-3 top-5 font-bold">︙</div>
            <Dropdown className="absolute right-0 top-2">
              <Dropdown.Toggle className="opacity-0 hover:opacity-50"></Dropdown.Toggle>
              <Dropdown.Menu className="w-40 right-0 border z-50">
                <Dropdown.Item
                  onClick={() => handleShowContentTemplate(registrationService)}
                >
                  <MdAppRegistration className="mr-1" />
                  登録
                </Dropdown.Item>
                <div className="border my-2"></div>

                <>
                  <Dropdown.Item
                    onClick={() => handleShow(registrationService)}
                  >
                    <CiEdit className="mr-1" />
                    編集
                  </Dropdown.Item>
                  <div className="border my-2"></div>
                </>
                <Dropdown.Item
                  onClick={() => handleDelete(registrationService.id)}
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
                        テンプレート
                      </button>
                      <button
                        onClick={toggleTemplate}
                        className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                      >
                        カスタム
                      </button>
                    </>
                  ) : (
                    /* カスタムの内容 */
                    <>
                      <button
                        onClick={toggleTemplate}
                        className="bg-blue-200 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                      >
                        テンプレート
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                        カスタム
                      </button>
                    </>
                  )
                ) : (
                  <p>aaa</p>
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
      <div className="border my-3 mx-3"></div>
      <Content contents={contents} updateContents={updateContents} />
    </div>
  );
}
