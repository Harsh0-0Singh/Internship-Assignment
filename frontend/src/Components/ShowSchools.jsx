import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get("https://internshipassignment-eight.vercel.app/api/schools")
      .then(res => setSchools(res.data));
  }, []);

  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {schools.map((school) => (
       <ProfileCard school= {school} key={school.id}/>
      ))}
    </div>
  );
}

export default ShowSchools;

const ProfileCard = ({ school }) => {
    console.log(school)
  return (
    <div className="relative w-full max-w-[300px] mx-auto h-[350px] rounded-3xl overflow-hidden ">
      <img src={`https://internshipassignment-eight.vercel.app/${school.image}`} alt={school.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute bottom-0 w-full h-[45%] z-10 rounded-t-[60px] pointer-events-none"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: "linear-gradient(to top, black 60%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black 60%, transparent)",
        }}
      ></div>
      <div className="absolute bottom-0 w-full px-5 py-6 z-10 text-white">
        <div className="mb-1 flex items-center gap-1">
          <h2 className="font-semibold text-lg flex">{school.name}</h2>
        </div>

        <div className="text-sm text-white/80 mb-3">
         {school.address}
        </div>
      </div>
    </div>
  );
};
