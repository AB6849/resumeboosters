import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export const metadata = {
  title: "Submission Confirmed — ResumeBoosters",
};

export default function SuccessPage() {
  return (
    <Suspense fallback={<div />}>
      <SuccessClient />
    </Suspense>
  );
}
