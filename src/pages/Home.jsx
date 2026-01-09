import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calculator, Ruler, Download, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const features = [
    {
      icon: <Calculator className="h-8 w-8" />,
      title: 'Kalkulator Pemotong 2D',
      description: 'Hitung potongan kayu dengan presisi tinggi dan visualisasi real-time'
    },
    {
      icon: <Ruler className="h-8 w-8" />,
      title: 'Optimasi Material',
      description: 'Minimalisir waste dengan algoritma cutting yang cerdas'
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: 'Export PDF',
      description: 'Download hasil perhitungan dalam format PDF profesional'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Hasil Instan',
      description: 'Dapatkan hasil perhitungan dan visualisasi dalam hitungan detik'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>Home - Potongan Presisi Pemotong Kayu 2D</title>
        <meta name="description" content="Kalkulator pemotong kayu terbaik untuk bisnis furniture. Optimasi material, visualisasi 2D, dan export PDF. Tools pemotong profesional dari Arvilworks." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#003334]/20 to-black"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[#003334] bg-clip-text text-transparent">
              Potongan Presisi
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Solusi pemotong kayu 2D terbaik untuk bisnis furniture Anda. 
              Hitung, visualisasi, dan optimasi material dengan mudah.
            </p>
            <Link to="/project">
              <Button className="bg-[#003334] hover:bg-[#004445] text-white px-8 py-3 text-lg rounded-lg transition-all duration-300 transform hover:scale-105">
                Mulai Hitung Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-[#003334]/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Fitur Unggulan
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Tools pemotong kayu profesional dengan teknologi terdepan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#003334]/20 to-black/50 p-6 rounded-xl border border-[#003334]/30 hover:border-[#003334] transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-[#003334] mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Tentang Arvilworks
            </h2>
            <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
              Arvilworks adalah perusahaan furniture terkemuka yang menghadirkan solusi inovatif 
              untuk industri woodworking. Dengan pengalaman bertahun-tahun, kami mengembangkan 
              tools pemotong kayu yang membantu bisnis furniture mengoptimalkan material dan 
              meningkatkan efisiensi produksi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                className="w-full h-96 object-cover rounded-xl shadow-2xl" 
                alt="Arvilworks furniture workshop"
               src="https://images.unsplash.com/photo-1700831213938-835289ffbfa8" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">
                Mengapa Memilih Furniture Calculator?
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#003334] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Algoritma pemotong yang telah teruji di industri furniture</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#003334] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Interface yang user-friendly dan mobile responsive</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#003334] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Hasil perhitungan yang akurat dengan visualisasi real-time</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#003334] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Export PDF untuk dokumentasi dan presentasi</span>
                </li>
              </ul>
              
              <div className="pt-4">
                <a 
                  href="https://arvilworks.ct.ws" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#003334] hover:text-white transition-colors"
                >
                  Kunjungi Website Arvilworks
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#003334]/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Siap Mengoptimalkan Bisnis Furniture Anda?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Mulai gunakan kalkulator pemotong kayu terbaik dan tingkatkan efisiensi produksi Anda hari ini.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/project">
                <Button className="bg-[#003334] hover:bg-[#004445] text-white px-8 py-3 text-lg rounded-lg transition-all duration-300 transform hover:scale-105">
                  Mulai Sekarang
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-[#003334] text-[#003334] hover:bg-[#003334] hover:text-white px-8 py-3 text-lg rounded-lg transition-all duration-300">
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;