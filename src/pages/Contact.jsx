import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Phone, Mail, Instagram, Globe, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const bmTechContacts = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: 'WhatsApp',
      value: '088211699073',
      link: 'https://wa.me/6288211699073',
      color: 'text-green-400'
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      value: 'brightmindtech.id@gmail.com',
      link: 'mailto:brightmindtech.id@gmail.com',
      color: 'text-blue-400'
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      label: 'Instagram',
      value: '@bmtech.idn',
      link: 'https://www.instagram.com/bmtech.idn?igsh=b2dyMHViMXQwOXFl',
      color: 'text-pink-400'
    },
    {
      icon: <Globe className="h-5 w-5" />,
      label: 'TikTok',
      value: '@bmtech.idn',
      link: 'https://www.tiktok.com/@bmtech.idn?_t=ZS-9074S3YyFzk&_r=1',
      color: 'text-purple-400'
    },
    {
      icon: <Globe className="h-5 w-5" />,
      label: 'Website',
      value: 'arvilworks.ct.ws',
      link: 'https://arvilworks.ct.ws',
      color: 'text-[#003334]'
    }
  ];

  const arvilworksContacts = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: 'WhatsApp',
      value: '088211699073',
      link: 'https://wa.me/6288211699073',
      color: 'text-green-400'
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      value: 'arvilworks@gmail.com',
      link: 'mailto:arvilworks@gmail.com',
      color: 'text-blue-400'
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      label: 'Instagram',
      value: '@arvilworksfurniture',
      link: 'https://www.instagram.com/arvilworksfurniture?igsh=MXByZGVnMTJlYnd0',
      color: 'text-pink-400'
    },
    {
      icon: <Globe className="h-5 w-5" />,
      label: 'TikTok',
      value: '@arvilworksfurniture',
      link: 'https://www.tiktok.com/@arvilworksfurniture?_t=ZS-90743gOGoFc&_r=1',
      color: 'text-purple-400'
    },
    {
      icon: <Globe className="h-5 w-5" />,
      label: 'Website',
      value: 'arvilworks.ct.ws',
      link: 'https://arvilworks.ct.ws',
      color: 'text-[#003334]'
    }
  ];

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <Helmet>
        <title>Hubungi Kami - BM Tech & Arvilworks Furniture</title>
        <meta name="description" content="Hubungi BM Tech dan Arvilworks Furniture untuk konsultasi pemotong kayu, furniture custom, dan solusi woodworking profesional." />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Hubungi Kami
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Siap membantu kebutuhan furniture dan teknologi woodworking Anda
          </p>
        </motion.div>

        {/* BM Tech Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-[#003334]/20 to-black/50 p-8 rounded-xl border border-[#003334]/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  BM Tech
                </h2>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  BM Tech adalah perusahaan teknologi yang mengkhususkan diri dalam pengembangan 
                  solusi digital untuk industri furniture dan woodworking. Kami menghadirkan 
                  tools inovatif seperti kalkulator pemotong kayu 2D yang membantu bisnis 
                  mengoptimalkan material dan meningkatkan efisiensi produksi.
                </p>
                
                <div className="space-y-4">
                  {bmTechContacts.map((contact, index) => (
                    <motion.a
                      key={index}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-black/30 rounded-lg border border-[#003334]/20 hover:border-[#003334] transition-all duration-300 group"
                    >
                      <div className={`${contact.color} group-hover:scale-110 transition-transform`}>
                        {contact.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{contact.label}</p>
                        <p className="text-white font-medium">{contact.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <img 
                  className="w-full h-80 object-cover rounded-xl shadow-2xl" 
                  alt="BM Tech office and technology workspace"
                 src="https://images.unsplash.com/photo-1587637721784-024d2b51e1dd" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Arvilworks Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-br from-[#003334]/20 to-black/50 p-8 rounded-xl border border-[#003334]/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  className="w-full h-80 object-cover rounded-xl shadow-2xl" 
                  alt="Arvilworks furniture showroom and workshop"
                 src="https://images.unsplash.com/photo-1608062326349-42beaf01e920" />
              </div>
              
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  Arvilworks Furniture
                </h2>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  Arvilworks Furniture adalah perusahaan furniture premium yang menghadirkan 
                  desain custom berkualitas tinggi. Dengan pengalaman bertahun-tahun dalam 
                  industri woodworking, kami menciptakan furniture yang menggabungkan 
                  keindahan desain dengan kualitas craftsmanship terbaik.
                </p>
                
                <div className="space-y-4">
                  {arvilworksContacts.map((contact, index) => (
                    <motion.a
                      key={index}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-black/30 rounded-lg border border-[#003334]/20 hover:border-[#003334] transition-all duration-300 group"
                    >
                      <div className={`${contact.color} group-hover:scale-110 transition-transform`}>
                        {contact.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{contact.label}</p>
                        <p className="text-white font-medium">{contact.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#003334]/20 to-black/50 p-8 rounded-xl border border-[#003334]/30">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Siap Berkolaborasi?
            </h3>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Hubungi kami untuk konsultasi gratis tentang kebutuhan furniture custom 
              atau solusi teknologi woodworking untuk bisnis Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/6288211699073" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#003334] hover:bg-[#004445] text-white px-8 py-3 text-lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat WhatsApp
                </Button>
              </a>
              <a href="mailto:brightmindtech.id@gmail.com">
                <Button variant="outline" className="border-[#003334] text-[#003334] hover:bg-[#003334] hover:text-white px-8 py-3 text-lg">
                  <Mail className="mr-2 h-5 w-5" />
                  Kirim Email
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;