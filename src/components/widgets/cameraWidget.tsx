import { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { cn, LOG_PREFIX } from "../../lib/utils";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const SMART_TV_ID = import.meta.env.VITE_SMART_TV_ID ?? crypto.randomUUID();

export function CameraWidget({ className }: { className?: string }) {
  const ref = useRef<Webcam>(null);

  useEffect(() => {
    let removeListener: (() => void) | undefined;

    const queryCameraPermission = async () => {
      if (!navigator.permissions?.query) {
        return;
      }

      try {
        const permissionStatus = await navigator.permissions.query({ name: "camera" as PermissionName });
        console.info(`${LOG_PREFIX} camera permission state for device [${SMART_TV_ID}]:`, permissionStatus.state);

        const onChange = () => {
          console.info(`${LOG_PREFIX} camera permission changed for device [${SMART_TV_ID}]:`, permissionStatus.state);
        };

        permissionStatus.addEventListener?.("change", onChange);
        removeListener = () => permissionStatus.removeEventListener?.("change", onChange);
      } catch (error) {
        console.warn(`${LOG_PREFIX} failed to query camera permission for device [${SMART_TV_ID}]:`, error);
      }
    };

    queryCameraPermission();

    return () => {
      removeListener?.();
    };
  }, []);

  const onUserMedia = (stream: MediaStream) => {
    console.info(`${LOG_PREFIX} video stream track id:`, stream.id, `for device [${SMART_TV_ID}]`);
  };
  const onUserMediaError = (error: string | DOMException) => {
    console.error(`${LOG_PREFIX} error accessing webcam for device [${SMART_TV_ID}]:`, error);
  }

  return (
    <div className={cn(className, "w-full h-full absolute -z-10")}>
      <Webcam
        ref={ref}
        className="w-full h-full object-cover"
        audio={false}
        disablePictureInPicture
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
        onUserMediaError={onUserMediaError}
      />
    </div>
  )
}
