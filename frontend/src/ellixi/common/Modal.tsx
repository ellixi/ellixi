import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

export default function Modal({
  children,
  showModal,
  setShowModal,
  bgColor = "bg-black",
  closeWithX,
}: {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  bgColor?: string;
  closeWithX?: boolean;
}) {
  const router = useRouter();
  const { key } = router.query;
  const [shouldShowModal, setShouldShowModal] = useState(showModal);
  const mobileModalRef = useRef(null);
  const desktopModalRef = useRef(null);

  const closeModal = useCallback(
    (closeWithX?: boolean) => {
      if (closeWithX) {
        return;
      } else if (key) {
        router.push("/");
      } else {
        setShowModal(false);
      }
    },
    [key, router, setShowModal]
  );

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && !closeWithX) {
      setShowModal(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const controls = useAnimation();
  const transitionProps = { type: "spring", stiffness: 300, damping: 10 };
  useEffect(() => {
    controls.start({
      y: 0,
      transition: transitionProps,
    });
  }, []);

  return (
    <AnimatePresence>
      {shouldShowModal && (
        <div className="absolute">
          <motion.div
            ref={mobileModalRef}
            key="mobile-modal"
            className="fixed inset-x-0 bottom-0 z-40 w-screen group sm:hidden cursor-grab active:cursor-grabbing"
            initial={{ y: "100%" }}
            animate={controls}
            exit={{ y: "100%" }}
            transition={transitionProps}
            drag="y"
            dragDirectionLock
            // onDragEnd={handleDragEnd}
            dragElastic={{ top: 0, bottom: 1 }}
            dragConstraints={{ top: 0, bottom: 0 }}
          >
            <div
              className={`h-7 ${bgColor} w-full flex items-center justify-center rounded-t-4xl border-t border-gray-200 -mb-1`}
            >
              <div className="w-6 h-1 -mr-1 transition-all bg-gray-800 rounded-full group-active:rotate-12" />
              <div className="w-6 h-1 transition-all bg-gray-800 rounded-full group-active:-rotate-12" />
            </div>
            {children}
          </motion.div>
          <motion.div
            ref={desktopModalRef}
            key="desktop-modal"
            className="fixed inset-0 z-40 items-center justify-center hidden min-h-screen sm:flex"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onMouseDown={(e) => {
              if (desktopModalRef.current === e.target) {
                closeModal(closeWithX);
              }
            }}
          >
            {children}
          </motion.div>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-30 bg-gray-900 bg-opacity-10 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closeModal(closeWithX)}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
