import { Suspense } from "react";
import DashboardContent from "./components/DashboardContent";
import LoadingSpinner from "@/components/Loaders/LoadingSpinner";
import PageHeader from "../shared/PageHeader";
const Page = async () => {
  return (
    <>
      <PageHeader title="Dashboard" />
      <Suspense fallback={<LoadingSpinner />}>
        <DashboardContent />
      </Suspense>
    </>
  );
};

export default Page;
