import React, { useRef, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ShareContent from "./ShareContent";

export default function ShareServiceRegistration({ services, MediaIcon }) {
  const generateUUID = () => {
    return uuidv4();
  };
  const [selectedService, setSelectedService] = useState(null);
  const [contents, setContents] = useState(null);

  useEffect(() => {
    if (services.length > 0) {
      setSelectedService(services[0]);
    }
  }, [services]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
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

  return (
    <div>
      <div className="grid grid-cols-1 min-[350px]:grid-cols-2 min-[820px]:grid-cols-3 min-[1200px]:grid-cols-4 min-[1450px]:grid-cols-5 min-[1880px]:grid-cols-6 gap-4 mx-4 min-[550px]:mx-14 min-[970px]:mx-32">
        {services.map((service) => (
          <div
            key={generateUUID()}
            className="relative min-[600px]:w-[14rem] min-[1650px]:w-[16.5rem]"
          >
            <div
              className={` min-[600px]:w-[14rem] min-[1650px]:w-[16.5rem] p-5 cursor-pointer hover:bg-blue-200 flex items-center justify-center ${
                selectedService === service ? "bg-blue-200" : "bg-slate-100"
              }`}
              onClick={() => handleServiceClick(service)}
            >
              {service.image_url && (
                <div className="w-5 h-5">
                  <img
                    src={service.image_url}
                    alt={service.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              {!service.image_url && <MediaIcon name={service.name} />}
              <p className="text-sm text-center font-bold ml-2  overflow-hidden">
                {service.name}
              </p>
            </div>
            <div className="absolute right-3 top-5 font-bold">︙</div>
          </div>
        ))}
      </div>
      <div className="border my-3 mx-3"></div>
      <ShareContent contents={contents} />
    </div>
  );
}
