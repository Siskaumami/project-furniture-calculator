import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Trash2, Download, Calculator, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ProjectCalculator = () => {
  const [material, setMaterial] = useState({ length: '2440', width: '1220' });
  const [cuts, setCuts] = useState([
    { id: 1, length: '1200', width: '900', quantity: '1', kerf: '3' },
    { id: Date.now() + 1, length: '1200', width: '500', quantity: '1', kerf: '3' },
    { id: Date.now() + 2, length: '500', width: '900', quantity: '2', kerf: '3' },
  ]);
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const pdfRef = useRef();

  const addCut = () => {
    const newCut = { id: Date.now(), length: '', width: '', quantity: '', kerf: '' };
    setCuts([...cuts, newCut]);
  };

  const removeCut = (id) => {
    if (cuts.length > 1) {
      setCuts(cuts.filter(cut => cut.id !== id));
    }
  };

  const updateCut = (id, field, value) => {
    setCuts(cuts.map(cut => (cut.id === id ? { ...cut, [field]: value } : cut)));
  };

  const packCuts = (materialWidth, materialHeight, allCuts) => {
    let panels = [{ id: 1, cuts: [], remainingWidth: materialWidth, remainingHeight: materialHeight, nodes: [{ x: 0, y: 0, w: materialWidth, h: materialHeight }] }];
    
    for (const cut of allCuts) {
        let placed = false;
        for (let panel of panels) {
            for (let i = 0; i < panel.nodes.length; i++) {
                let node = panel.nodes[i];
                if (cut.w <= node.w && cut.h <= node.h) {
                    panel.cuts.push({ ...cut, x: node.x, y: node.y });
                    panel.nodes.splice(i, 1);
                    if (node.w - cut.w > 0) {
                        panel.nodes.push({ x: node.x + cut.w, y: node.y, w: node.w - cut.w, h: cut.h });
                    }
                    if (node.h - cut.h > 0) {
                        panel.nodes.push({ x: node.x, y: node.y + cut.h, w: node.w, h: node.h - cut.h });
                    }
                    placed = true;
                    break;
                }
            }
            if (placed) break;
        }

        if (!placed) {
            let newPanel = { id: panels.length + 1, cuts: [], remainingWidth: materialWidth, remainingHeight: materialHeight, nodes: [{ x: 0, y: 0, w: materialWidth, h: materialHeight }] };
            let node = newPanel.nodes[0];
             if (cut.w <= node.w && cut.h <= node.h) {
                newPanel.cuts.push({ ...cut, x: node.x, y: node.y });
                newPanel.nodes.splice(0, 1);
                if (node.w - cut.w > 0) {
                    newPanel.nodes.push({ x: node.x + cut.w, y: node.y, w: node.w - cut.w, h: cut.h });
                }
                if (node.h - cut.h > 0) {
                    newPanel.nodes.push({ x: node.x, y: node.y + cut.h, w: node.w, h: node.h - cut.h });
                }
                panels.push(newPanel);
             } else {
                return { error: `Potongan ${cut.w}x${cut.h} terlalu besar untuk panel.` };
             }
        }
    }
    return { panels };
  };

  const calculateCuts = () => {
    setIsCalculating(true);
    if (!material.length || !material.width) {
      toast({ title: "Error", description: "Mohon isi ukuran material.", variant: "destructive" });
      setIsCalculating(false);
      return;
    }

    const validCuts = cuts.filter(c => c.length && c.width && c.quantity && c.kerf);
    if (validCuts.length === 0) {
      toast({ title: "Error", description: "Mohon isi minimal satu potongan valid.", variant: "destructive" });
      setIsCalculating(false);
      return;
    }

    const materialW = parseFloat(material.width);
    const materialH = parseFloat(material.length);
    const materialArea = materialW * materialH;

    let allCutsToPlace = [];
    let totalCutArea = 0;
    let totalPieces = 0;
    let totalCutLength = 0;

    for (const cut of validCuts) {
      const w = parseFloat(cut.width) + parseFloat(cut.kerf);
      const h = parseFloat(cut.length) + parseFloat(cut.kerf);
      const qty = parseInt(cut.quantity);
      
      if (w > materialW || h > materialH) {
          toast({ title: "Error", description: `Potongan ${cut.length}x${cut.width} terlalu besar untuk panel.`, variant: "destructive" });
          setIsCalculating(false);
          return;
      }

      for (let i = 0; i < qty; i++) {
        allCutsToPlace.push({ w, h, originalW: cut.width, originalH: cut.length, kerf: cut.kerf });
      }
      totalCutArea += w * h * qty;
      totalPieces += qty;
      totalCutLength += (2 * w + 2 * h) * qty;
    }
    
    allCutsToPlace.sort((a, b) => b.h - a.h || b.w - a.w);

    const { panels, error } = packCuts(materialW, materialH, allCutsToPlace);
    if (error) {
        toast({ title: "Error", description: error, variant: "destructive" });
        setIsCalculating(false);
        return;
    }

    const totalPanels = panels.length;
    const totalMaterialArea = materialArea * totalPanels;
    const utilization = Math.min((totalCutArea / totalMaterialArea) * 100, 100);
    const wastedArea = totalMaterialArea - totalCutArea;

    const panelDetails = panels.map(p => {
        const panelUsedArea = p.cuts.reduce((sum, c) => sum + (c.w * c.h), 0);
        return {
            ...p,
            usedArea: panelUsedArea,
            wastedArea: materialArea - panelUsedArea,
            utilization: (panelUsedArea / materialArea) * 100
        };
    });

    setResults({
      panel: `${material.length} x ${material.width} mm`,
      jumlahPanel: totalPanels,
      utilisasi: utilization.toFixed(1),
      totalPotongan: totalPieces,
      totalCutArea: totalCutArea.toFixed(2),
      wastedArea: wastedArea.toFixed(2),
      totalCutLength: totalCutLength.toFixed(2),
      cutDetails: validCuts,
      layouts: panelDetails,
      material: { w: materialW, h: materialH }
    });

    toast({
      title: "Perhitungan Selesai!",
      description: `${totalPanels} panel dibutuhkan dengan utilisasi ${utilization.toFixed(1)}%`
    });
    setIsCalculating(false);
  };

  const exportToPDF = async () => {
    if (!results) {
      toast({ title: "Info", description: "Lakukan perhitungan terlebih dahulu." });
      return;
    }
    setIsExporting(true);
    const pdfContent = pdfRef.current;
    if (!pdfContent) {
        setIsExporting(false);
        return;
    }

    const canvas = await html2canvas(pdfContent, { scale: 2, backgroundColor: '#000000' });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`hasil-potongan-${Date.now()}.pdf`);
    setIsExporting(false);
    toast({ title: "Sukses!", description: "PDF berhasil di-download." });
  };

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <Helmet>
        <title>Project Calculator - Pemotong Kayu 2D Professional</title>
        <meta name="description" content="Kalkulator pemotong kayu 2D dengan visualisasi real-time. Hitung optimasi material, utilisasi panel, dan export hasil ke PDF." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Project Calculator</h1>
          <p className="text-gray-300 text-lg">Hitung potongan kayu dengan visualisasi dan optimasi material</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="bg-gradient-to-br from-[#003334]/20 to-black/50 p-6 rounded-xl border border-[#003334]/30">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center"><Calculator className="mr-2 h-6 w-6 text-[#003334]" />Input Data</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-white">Ukuran Material</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Panjang (mm)</label>
                  <input type="number" value={material.length} onChange={(e) => setMaterial({ ...material, length: e.target.value })} className="w-full px-3 py-2 bg-black/50 border border-[#003334]/50 rounded-lg text-white focus:border-[#003334] focus:outline-none" placeholder="2440" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Lebar (mm)</label>
                  <input type="number" value={material.width} onChange={(e) => setMaterial({ ...material, width: e.target.value })} className="w-full px-3 py-2 bg-black/50 border border-[#003334]/50 rounded-lg text-white focus:border-[#003334] focus:outline-none" placeholder="1220" />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-white">Potongan</h3>
                <Button onClick={addCut} className="bg-[#003334] hover:bg-[#004445] text-white px-3 py-1 text-sm"><Plus className="h-4 w-4 mr-1" />Tambah</Button>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {cuts.map((cut, index) => (
                  <div key={cut.id} className="bg-black/30 p-4 rounded-lg border border-[#003334]/20">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-medium">Potongan {index + 1}</span>
                      {cuts.length > 1 && (<Button onClick={() => removeCut(cut.id)} variant="ghost" className="text-red-400 hover:text-red-300 p-1"><Trash2 className="h-4 w-4" /></Button>)}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="block text-xs text-gray-400 mb-1">Panjang (mm)</label><input type="number" value={cut.length} onChange={(e) => updateCut(cut.id, 'length', e.target.value)} className="w-full px-2 py-1 bg-black/50 border border-[#003334]/30 rounded text-white text-sm focus:border-[#003334] focus:outline-none" placeholder="600" /></div>
                      <div><label className="block text-xs text-gray-400 mb-1">Lebar (mm)</label><input type="number" value={cut.width} onChange={(e) => updateCut(cut.id, 'width', e.target.value)} className="w-full px-2 py-1 bg-black/50 border border-[#003334]/30 rounded text-white text-sm focus:border-[#003334] focus:outline-none" placeholder="400" /></div>
                      <div><label className="block text-xs text-gray-400 mb-1">Jumlah</label><input type="number" value={cut.quantity} onChange={(e) => updateCut(cut.id, 'quantity', e.target.value)} className="w-full px-2 py-1 bg-black/50 border border-[#003334]/30 rounded text-white text-sm focus:border-[#003334] focus:outline-none" placeholder="2" /></div>
                      <div><label className="block text-xs text-gray-400 mb-1">Kerf (mm)</label><input type="number" value={cut.kerf} onChange={(e) => updateCut(cut.id, 'kerf', e.target.value)} className="w-full px-2 py-1 bg-black/50 border border-[#003334]/30 rounded text-white text-sm focus:border-[#003334] focus:outline-none" placeholder="3" /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={calculateCuts} disabled={isCalculating} className="w-full bg-[#003334] hover:bg-[#004445] text-white py-3 text-lg font-semibold">
              {isCalculating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menghitung...</> : 'Hitung Potongan'}
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="bg-gradient-to-br from-[#003334]/20 to-black/50 p-6 rounded-xl border border-[#003334]/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Hasil Perhitungan</h2>
              {results && (
                <Button onClick={exportToPDF} disabled={isExporting} className="bg-[#003334] hover:bg-[#004445] text-white px-4 py-2">
                  {isExporting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Exporting...</> : <><Download className="h-4 w-4 mr-2" />Export PDF</>}
                </Button>
              )}
            </div>
            {results ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 p-4 rounded-lg border border-[#003334]/20"><h3 className="text-sm text-gray-400 mb-1">Panel</h3><p className="text-lg font-semibold text-white">{results.panel}</p></div>
                  <div className="bg-black/30 p-4 rounded-lg border border-[#003334]/20"><h3 className="text-sm text-gray-400 mb-1">Jumlah Panel</h3><p className="text-lg font-semibold text-[#003334]">{results.jumlahPanel}</p></div>
                  <div className="bg-black/30 p-4 rounded-lg border border-[#003334]/20"><h3 className="text-sm text-gray-400 mb-1">Utilisasi Total</h3><p className="text-lg font-semibold text-[#003334]">{results.utilisasi}%</p></div>
                  <div className="bg-black/30 p-4 rounded-lg border border-[#003334]/20"><h3 className="text-sm text-gray-400 mb-1">Total Potongan</h3><p className="text-lg font-semibold text-white">{results.totalPotongan}</p></div>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-[#003334]/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Visualisasi Layout</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {results.layouts.map((layout, index) => (
                      <div key={index}>
                        <h4 className="text-md font-semibold text-white mb-2">Layout Panel {index + 1}</h4>
                        <div className="bg-gray-800 p-2 rounded-lg relative" style={{ aspectRatio: `${results.material.w} / ${results.material.h}` }}>
                          <div className="relative w-full h-full">
                            {layout.cuts.map((cut, cutIndex) => (
                              <div key={cutIndex} className="absolute bg-[#003334]/60 border border-[#003334] rounded flex items-center justify-center" style={{
                                left: `${(cut.x / results.material.w) * 100}%`,
                                top: `${(cut.y / results.material.h) * 100}%`,
                                width: `${(cut.w / results.material.w) * 100}%`,
                                height: `${(cut.h / results.material.h) * 100}%`,
                              }}>
                                <span className="text-xs text-white p-1">{`${cut.originalH}x${cut.originalW}`}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400"><div className="text-center"><Calculator className="h-16 w-16 mx-auto mb-4 opacity-50" /><p>Masukkan data untuk melihat hasil</p></div></div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Hidden div for PDF generation */}
      <div className="absolute -left-[9999px] top-0">
        {results && (
          <div ref={pdfRef} className="p-10 bg-black text-white" style={{ width: '800px' }}>
            <h1 className="text-3xl font-bold mb-2 text-[#003334]">Laporan Hasil Potongan</h1>
            <p className="text-gray-400 mb-8">Tanggal: {new Date().toLocaleDateString('id-ID')}</p>
            
            <h2 className="text-xl font-bold mb-4 border-b border-[#003334] pb-2">Ringkasan Umum</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div><p className="text-gray-400">Total Panel Terpakai:</p><p className="text-lg font-semibold">{results.jumlahPanel}</p></div>
              <div><p className="text-gray-400">Total Potongan:</p><p className="text-lg font-semibold">{results.totalPotongan}</p></div>
              <div><p className="text-gray-400">Total Area Terpakai:</p><p className="text-lg font-semibold">{results.totalCutArea} mm² ({results.utilisasi}%)</p></div>
              <div><p className="text-gray-400">Total Area Terbuang:</p><p className="text-lg font-semibold">{results.wastedArea} mm²</p></div>
              <div><p className="text-gray-400">Total Panjang Potongan:</p><p className="text-lg font-semibold">{results.totalCutLength} mm</p></div>
            </div>

            <h2 className="text-xl font-bold mb-4 border-b border-[#003334] pb-2">Layout Potongan</h2>
            <div className="space-y-6 mb-8">
              {results.layouts.map((layout, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold mb-2">Panel {index + 1}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div><p className="text-gray-400">Area Terpakai:</p><p>{layout.usedArea.toFixed(2)} mm² ({layout.utilization.toFixed(1)}%)</p></div>
                    <div><p className="text-gray-400">Area Terbuang:</p><p>{layout.wastedArea.toFixed(2)} mm²</p></div>
                  </div>
                  <div className="bg-gray-800 p-2 rounded-lg relative border-2 border-[#003334]" style={{ width: '100%', aspectRatio: `${results.material.w} / ${results.material.h}` }}>
                    <div className="relative w-full h-full">
                      {layout.cuts.map((cut, cutIndex) => (
                        <div key={cutIndex} className="absolute bg-[#003334]/80 border border-white/50 rounded flex items-center justify-center" style={{
                          left: `${(cut.x / results.material.w) * 100}%`,
                          top: `${(cut.y / results.material.h) * 100}%`,
                          width: `${(cut.w / results.material.w) * 100}%`,
                          height: `${(cut.h / results.material.h) * 100}%`,
                        }}>
                          <span className="text-xs text-white p-1 font-mono">{`${cut.originalH}x${cut.originalW}`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold mb-4 border-b border-[#003334] pb-2">Daftar Potongan</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#003334]">
                  <th className="p-2">Panjang (mm)</th>
                  <th className="p-2">Lebar (mm)</th>
                  <th className="p-2">Jumlah</th>
                  <th className="p-2">Kerf (mm)</th>
                </tr>
              </thead>
              <tbody>
                {results.cutDetails.map((cut, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-2">{cut.length}</td>
                    <td className="p-2">{cut.width}</td>
                    <td className="p-2">{cut.quantity}</td>
                    <td className="p-2">{cut.kerf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCalculator;