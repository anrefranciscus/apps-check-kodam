import { useRef, useState } from "react";
import "./App.css";
import RandomGenerator from "./service/RandomGenerator";
import BaseDialog from "./components/BaseDialog";
import BaseError from "./components/BaseError";
import BaseLoading from "./components/BaseLoading";

function App() {
  const inputRef = useRef(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequest = () => {
    const inputValue = inputRef.current.value;
    if (!inputValue || inputValue.trim() === "") {
      setError("Nama anda tidak boleh kosong");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      const generator = RandomGenerator.generateRandomKhodam();
      setLoading(false);
      setData(generator);
      setIsModalOpen(true);
    }, 3000);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      handleRequest();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setData(null);
  };

  return (
    <main className="flex flex-col min-h-[80vh] justify-center items-center">
      <h1 className="text-4xl text-indigo-500 font-bold uppercase">
        Cek Khodam
      </h1>
      {!loading && !data && (
        <form className="flex flex-col gap-4 py-4">
          <input
            type="text"
            placeholder="Ketik nama anda disini...."
            ref={inputRef}
            name="name"
            onKeyDown={handleKeyDown}
            className="py-2 px-4 text-md rounded-md"
          />
          <button
            onClick={handleRequest}
            type="button"
            className="bg-indigo-500 py-2 px-4 font-bold text-white rounded-md"
          >
            Check
          </button>
        </form>
      )}
      {error && <BaseError error={error} />}
      {loading && <BaseLoading />}
      {isModalOpen && (
        <BaseDialog
          title="Kodam Anda Adalah"
          desc={data}
          onClose={closeModal}
        />
      )}
      <footer className="mt-8 text-gray-500">
        Powered by <span className="font-semibold">Anre Franciscus</span>
      </footer>
    </main>
  );
}

export default App;
