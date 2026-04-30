import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import BootLoaderText from './components/BootLoaderText.tsx'
import './index.css'

document.documentElement.classList.remove("light");
document.documentElement.classList.add("dark");

const bootLoaderTextRoot = document.getElementById("boot-loader-text");

if (bootLoaderTextRoot) {
  createRoot(bootLoaderTextRoot).render(<BootLoaderText />);
}

createRoot(document.getElementById("root")!).render(<App />);
