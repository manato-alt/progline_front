import React from "react";

export default function TermRegistration({ registrationCategories }) {
  return (
    <div>
      <div className="grid grid-cols-9 gap-4">
        {registrationCategories.map((registrationCategory) => (
          <div
            key={registrationCategory.id}
            className="bg-slate-100 rounded-md p-4 cursor-pointer hover:bg-blue-200  w-28 h-28 flex flex-col justify-center"
          >
            <div className="w-8 h-8 mx-auto">
              <img
                src={registrationCategory.image_url}
                alt={registrationCategory.name}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm text-center mt-2">
              {registrationCategory.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
