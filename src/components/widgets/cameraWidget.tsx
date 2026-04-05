import { useRef } from "react";
import Webcam from "react-webcam";
import { cn, LOG_PREFIX } from "../../lib/utils";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const SMART_TV_ID = import.meta.env.VITE_SMART_TV_ID;

export function CameraWidget({ className }: { className?: string }) {
  const ref = useRef<Webcam>(null);
  const onUserMedia = (stream: MediaStream) => {
    console.info(`${LOG_PREFIX} video stream track id:`, stream.id, `for device [${SMART_TV_ID}]`);
  }

  return (
    <div className={cn(className, "w-full h-full")}>
      <Webcam
        ref={ref}
        className="w-full h-full object-cover"
        audio={false}
        disablePictureInPicture
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
      />
    </div>
  )
}
