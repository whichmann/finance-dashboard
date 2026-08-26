import Form from '@/app/ui/spendings/create-form';
import Breadcrumbs from '@/app/ui/spendings/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Spendings', href: '/dashboard/spendings' },
          {
            label: 'Create Spending',
            href: '/dashboard/spendings/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}