import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export const metadata = {
  title: "Submission Confirmed — ResumeForge",
};

export default function SuccessPage() {
  return (
    <Suspense fallback={<div />}>
      <SuccessClient />
    </Suspense>
  );
}
