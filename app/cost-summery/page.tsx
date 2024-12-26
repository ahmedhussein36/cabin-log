import React, { Suspense } from "react";
import CostBreakdown from "./CostBreakdown"

const page = () => {
    return (
        <div className="max-w-[860px] m-auto mt-10 min-h-screen">
            <h1 className="text-orange-900 my-2 text-center font-bold text-3xl">حساب تكلفة مساحة الكوخ</h1>
            <Suspense fallback={<p>Loading...</p>}>
                 <CostBreakdown />
            </Suspense>
          
        </div>
    );
};

export default page;
