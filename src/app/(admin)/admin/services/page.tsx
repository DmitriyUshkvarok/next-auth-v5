import { getServicesList } from '@/action/servicesAction';
import AdminEditServicesList from '@/components/admin/admin-edit-services-page/admin-edit-services-list';

const ServicesOperationPage = async () => {
  const result = await getServicesList();
  return (
    <section>
      <h1 className="capitalize px-4 text-3xl mb-4">
        start updating the services page data on the application
      </h1>
      <AdminEditServicesList data={result.data ?? []} />
    </section>
  );
};

export default ServicesOperationPage;
