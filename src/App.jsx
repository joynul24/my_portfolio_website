
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// const queryClient = new QueryClient();

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Router>
//         <div className="font-sans min-h-screen text-white selection:bg-cyan-500 selection:text-white relative z-0">
//           <AnimatedBackground />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/admin" element={<AdminDashboard />} />
//           </Routes>
//           <BackToTop />
//           <Toaster position="top-right"
//             toastOptions={{
//               className: 'bg-slate-800 text-white',
//               style: { background: '#1e293b', color: '#fff' }
//             }}
//           />
//         </div>
//       </Router>
//     </QueryClientProvider>
//   );
// }


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import { Toaster } from 'react-hot-toast';
import BackToTop from './components/BackToTop';
import AnimatedBackground from './components/AnimatedBackground';



export default function App() {
  return (
    <Router>
      <div className="font-sans min-h-screen text-white relative">
        <AnimatedBackground />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        <BackToTop />

        <Toaster
          position="top-right"
          toastOptions={{
            className: 'bg-slate-800 text-white',
            style: { background: '#1e293b', color: '#fff' }
          }}
        />
      </div>
    </Router>
  );
}