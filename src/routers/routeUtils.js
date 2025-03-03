import Loader from "@/components/UI/atoms/Loader";
import { Suspense } from "react";

export const withSuspense = (Component) => {
    return (props) => (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );
};