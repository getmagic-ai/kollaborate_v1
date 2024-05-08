import { Loader } from "lucide-react";

const CustomLoader = () => {
  return (
    <div className='py-24 flex justify-center w-full'>
      <Loader className='h-24 w-24 animate-spin text-white' />
    </div>
  );
};

export default CustomLoader;
