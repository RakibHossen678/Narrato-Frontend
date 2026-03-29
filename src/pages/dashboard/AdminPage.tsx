import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { apiClient } from "../../lib/apiClient";
import { Card } from "../../components/ui/Card";
import { Spinner } from "../../components/ui/Spinner";
import { Table } from "../../components/ui/Table";

interface AnalyticsResponse {
  totals: {
    users: number;
    blogs: number;
    reportsOpen: number;
    reportedContent: number;
  };
  redisStats: string;
}

export const AdminPage = () => {
  const analytics = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const { data } = await apiClient.get<{ data: AnalyticsResponse }>(
        "/admin/analytics",
      );
      return data.data;
    },
  });

  if (analytics.isLoading) {
    return <Spinner />;
  }

  if (!analytics.data) {
    return <p>Failed to load analytics.</p>;
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Admin | Narrato</title>
      </Helmet>
      <h1 className="text-3xl font-black">System Analytics</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <Card>Users: {analytics.data.totals.users}</Card>
        <Card>Blogs: {analytics.data.totals.blogs}</Card>
        <Card>Open Reports: {analytics.data.totals.reportsOpen}</Card>
        <Card>Reported Content: {analytics.data.totals.reportedContent}</Card>
      </div>
      <Table>
        <thead>
          <tr className="border-b border-slate-800 light:border-slate-200">
            <th className="p-3">Service</th>
            <th className="p-3">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3">Redis metrics</td>
            <td className="p-3 whitespace-pre-wrap text-xs">
              {analytics.data.redisStats}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
