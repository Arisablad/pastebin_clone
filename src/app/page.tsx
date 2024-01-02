import Advertisment from '@/components/advertisments/Advertisment';
import Paste from '@/components/containers/Paste';
import Sidebar from '@/components/navbar/Sidebar';

export default function Home() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-10 gap-4 border border-border p-2">
      <Advertisment />
      <Sidebar />
      <Paste />
    </div>
  );
}
