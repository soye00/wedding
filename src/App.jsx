import React from 'react';
import { motion } from 'framer-motion';
import Introduction from './components/Introduction';
import ScheduleMap from './components/ScheduleMap';
import Gallery from './components/Gallery';
import AccountInfo from './components/AccountInfo';
import Contact from "./components/Contact.jsx";
import './index.css';


function App() {

  return (
      <div>
        <main className="container">
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="header"
            >
                <h1>05.27</h1>
                <img src="/main.webp" alt="Main image" loading="eager" />
                <h2>홍길동</h2>
                <p>and</p>
                <h2>홍길순</h2>
                <h3>2029년 05월 27일, 일요일 낮 12시
                    <br/>수성스퀘어 3F 피오니홀</h3>

            </motion.header>

            <div className="line">
                <img src="/line.png" alt="line"/>
            </div>
          <Introduction />

            <div className="line">
                <img src="/line.png" alt="line"/>
            </div>
          <Contact/>

            <div className="line">
                <img src="/line.png" alt="line"/>
            </div>
          <ScheduleMap />

            <div className="line">
                <img src="/line.png" alt="line"/>
            </div>
          <Gallery />

            <div className="line">
                <img src="/line.png" alt="line"/>
            </div>
          <AccountInfo />
        </main>
      </div>
  );
}

export default App;