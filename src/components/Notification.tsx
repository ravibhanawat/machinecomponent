import React from 'react';
import "./notification.css";
export enum NotifyType{
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info'
}    

export interface INotification{
    id:number,
    type:NotifyType,
    message:string,
    duration?:number, //in mili seconds
    onClose:Function
}

const icons={}
const Notification = ({id, type = NotifyType.INFO, message = "", onClose = () => { } }: INotification) => {
  return (
    <div className={`notification ${type}`}>
{/* icon  */}
        icon
        {/* message */}
        {message}
        {/* close Button */}
          <span className='close-btn'  onClick={()=>onClose()} >close</span>
    </div>
  )
}

export default Notification