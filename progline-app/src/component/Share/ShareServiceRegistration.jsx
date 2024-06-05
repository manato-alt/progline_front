import React, { useRef, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ShareContent from "./ShareContent";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { axiosInstance } from "../../utils/axios";

export default function ShareServiceRegistration({ services, MediaIcon }) {
  const generateUUID = () => {
    return uuidv4();
  };
  const [selectedService, setSelectedService] = useState(null);
  const [contents, setContents] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);

  const scrollRef = useRef(null);
  const [isClickDisabled, setIsClickDisabled] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    if (services.length > 0) {
      setSelectedService(services[0]);
    }
  }, [services]);

  const handleServiceClick = (service) => {
    if (!isClickDisabled) {
      setSelectedService(service);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedService) {
          const response = await axiosInstance.get("/contents", {
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
        // errorMessages が文字列か配列かで処理を分岐
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
        <div className="flex justify-center">
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
            {services.map((service) => (
              <div key={generateUUID()}>
                <div
                  className={`py-3 pl-3 pr-3 mr-2 border rounded cursor-pointer hover:bg-blue-200 flex items-center justify-center ${
                    selectedService === service ? "bg-blue-200" : "bg-slate-200"
                  }`}
                  onClick={() => handleServiceClick(service)}
                >
                  {service.image.url && (
                    <div className="w-5 h-5">
                      <img
                        src={service.image.url}
                        alt={service.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  {!service.image.url && <MediaIcon name={service.name} />}
                  <p className="text-sm text-center font-bold ml-1 overflow-hidden">
                    {service.name}
                  </p>
                </div>
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
          <ShareContent contents={contents} />
        </div>
      </div>
    </div>
  );
}
