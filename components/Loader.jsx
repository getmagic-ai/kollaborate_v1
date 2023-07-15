import React from "react";
import { LineWave } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className='h-screen flex items-center justify-center -mt-36'>
      <LineWave
        height='100'
        width='100'
        color='#4fa94d'
        ariaLabel='line-wave'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        firstLineColor=''
        middleLineColor=''
        lastLineColor=''
      />
    </div>
  );
};

export default Loader;
