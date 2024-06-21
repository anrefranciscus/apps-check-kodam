import { useEffect, useState } from "react";

const BaseDialog = ({ title, name, desc, onClose }) => {
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {   
    const synth = window.speechSynthesis
    const voice = new SpeechSynthesisUtterance(`${name} kodam anda adalah ${desc}`)
    voice.lang = 'id-ID'
    synth.speak(voice) 

    const timeout = setTimeout(() => {
      setShowDesc(true);
    }, 500);

    return () => clearTimeout(timeout);
  },[name,desc])
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="absolute inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm blur-sm"></div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-1/2 relative z-10">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="p-4">
        <p className={`text-lg font-serif font-bold ${showDesc ? 'animate-explode text-red-600' : 'opacity-0 translate-y-10'}`}>
            {desc}
          </p>          
        </div>
        <div className="p-4 border-t flex justify-end">
        <button
            onClick={onClose}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseDialog;
