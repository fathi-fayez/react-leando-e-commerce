import Lottie from "lottie-react";
import notFound from "@assets/lottieFiles/404NotFound.json";
import empty from "@assets/lottieFiles/ShoppingBag-error.json";
import loading from "@assets/lottieFiles/ShoppingBag-error (1).json";
import error from "@assets/lottieFiles/ERRORAnimation.json";

const lottieFilesMap = {
    notFound,
    empty,
    loading,
    error,
};

type LottieHandlerProps = {
    type: keyof typeof lottieFilesMap;
    message?: string;
    className?: string;
};

export const LottieHandler = ({ type, message, className }: LottieHandlerProps) => {
    const lottie = lottieFilesMap[type];
    const messageStyle =
        type === "error"
            ? { fontSize: "19px", color: "red" }
            : { fontSize: "19px", marginTop: "30px" };

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <Lottie animationData={lottie} style={{ width: "600px" }} />
            {message && <h3 style={messageStyle}>{message}</h3>}
        </div>
    );
};
