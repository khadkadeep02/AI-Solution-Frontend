import DashboardHeader from "../components/dashboard/DashboardHeader";
import KPIGrid from "../components/dashboard/KPIGrid";
import AnalyticsSection from "../components/dashboard/AnalyticsSection";
import InquiryTable from "../components/dashboard/InquiryTable";

export default function Dashboard() {
  return (
    <div className="flex-1 p-6 lg:p-8">
      <DashboardHeader />
      <KPIGrid />
      <AnalyticsSection />
      <InquiryTable />
    </div>
  );
}