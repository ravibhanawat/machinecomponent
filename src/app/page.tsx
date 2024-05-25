"use client"
import { NotifyType } from "@/components/Notification";
import useNotification from "@/components/hooks/useNotificationn";
import Image from "next/image";

export default function Home() {

  const {notificationComponent,
    triggerNotification } = useNotification("bottom-left")
  return (
    <div>hello i am user
      {notificationComponent}
      <button onClick={()=>triggerNotification({
        type:NotifyType.SUCCESS,
        message:"File Sent SucessFully",
        duration:3000,
        onClose:()=>{}
      })}>
        Success
      </button>
    </div>
  );
}
