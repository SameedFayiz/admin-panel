"use client";
import React, { useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Image from "next/image";
import StudentTab from "@/components/student";
import AttendanceTab from "@/components/attendance";
import { userSignOut } from "@/utils/firebase";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/utils/authContext";

const DashBoard = () => {
  const [user, setUser] = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [router, user]);

  const [tab, setTab] = useState("0");
  return (
    <main className="flex min-h-screen">
      <div className="flex flex-col w-[20%] h-screen bg-white gap-y-4 px-6">
        <div className="flex w-full h-[25%] justify-center align-middle overflow-hidden relative my-8">
          <Image src={"/app-logo.png"} alt="Logo" fill={true} />
        </div>
        <div
          className={`flex w-full justify-center place-items-center py-5 border-2 border-gray-400 text-lg font-semibold gap-2 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-blue-500 hover:text-white duration-300 ${
            tab === "0" ? "border-white bg-blue-700 text-white" : "bg-slate-200"
          }`}
          onClick={() => {
            setTab("0");
          }}
        >
          <PeopleIcon />
          <p>Students</p>
        </div>
        <div
          className={`flex w-full justify-center place-items-center py-5 border-2 border-gray-400 text-lg font-semibold gap-2 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-blue-500 hover:text-white duration-300 ${
            tab === "1" ? "border-white bg-blue-700 text-white" : "bg-slate-200"
          }`}
          onClick={() => {
            setTab("1");
          }}
        >
          <ContentPasteIcon />
          <p>Attendance</p>
        </div>
        <div
          className={`flex w-full justify-center place-items-center py-5 border-2 border-gray-400 text-lg font-semibold gap-2 rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 bg-red-500 hover:bg-red-700 text-white duration-300 `}
          onClick={() => {
            userSignOut();
          }}
        >
          <p>Logout</p>
        </div>
      </div>
      <div className="w-[80%] h-screen bg-slate-50">
        {tab === "0" ? (
          <StudentTab></StudentTab>
        ) : tab === "1" ? (
          <AttendanceTab></AttendanceTab>
        ) : (
          "None"
        )}
      </div>
    </main>
  );
};

export default DashBoard;
