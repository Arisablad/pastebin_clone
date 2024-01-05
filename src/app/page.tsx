import Advertisment from '@/components/advertisments/Advertisment';
import Paste from '@/components/containers/Paste';
import Sidebar from '@/components/navbar/Sidebar';

const getPublicPastes = async () => {};

const Home = async () => {
  const publicPastes = await getPublicPastes();
  return (
    <div className="grid grid-cols-1 xl:grid-cols-10 gap-4 border border-border p-2">
      <Advertisment />
      <Sidebar />
      <Paste
        label="New paste"
        showSettings={true}
        disabled={false}
        language="js"
      />
    </div>
  );
};

export default Home;
