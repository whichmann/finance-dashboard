import Form from "@/app/ui/spendings/edit-form";
import Breadcrumbs from "@/app/ui/spendings/breadcrumbs";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Spendings", href: "/dashboard/spendings" },
          {
            label: "Edit Spending",
            href: `/dashboard/spendings/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form customers={customers} invoice={invoice} />
    </main>
  );
}
