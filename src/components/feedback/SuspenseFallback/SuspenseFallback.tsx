import { Suspense } from "react";
import { LottieHandler } from "@components/feedback/LottieHandler/LottieHandler";

export const SuspenseFallback = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense
            fallback={
                <LottieHandler type="loading" message="loading please wait.." />
            }
        >
            {children}
        </Suspense>
    );
};
