import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Send, CheckCircle2, Upload, X, Calendar, FileText, Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { quotes, upload as uploadApi } from '../lib/api';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  
  // Pre-fill from URL params (from configurator)
  const productFromUrl = searchParams.get('product');
  const quantityFromUrl = searchParams.get('quantity');
  const priceFromUrl = searchParams.get('price');
  const sizeFromUrl = searchParams.get('size');
  const printFromUrl = searchParams.get('print');

  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    product_type: productFromUrl || 'sacs_kraft',
    size: sizeFromUrl || 'medium',
    quantity: quantityFromUrl || '',
    print_type: printFromUrl || '1_color',
    estimated_price: parseFloat(priceFromUrl) || 0,
    message: '',
    design_file_url: ''
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const result = await uploadApi.file(file);
      setUploadedFile({ name: file.name, url: result.url });
      setFormData(prev => ({ ...prev, design_file_url: result.url }));
    } catch (err) {
      setError('Erreur lors de l\'upload du fichier');
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFormData(prev => ({ ...prev, design_file_url: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await quotes.create({
        ...formData,
        quantity: parseInt(formData.quantity) || 5000,
        estimated_price: parseFloat(formData.estimated_price) || 0
      });
      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <main className="bg-[#0A0A0A] min-h-screen pt-20 flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-[#FF6B00] flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} className="text-black" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4">DEMANDE ENVOYÉE</h2>
          <p className="text-white/60 mb-4">
            Nous avons bien reçu votre demande de devis. Notre équipe vous contactera sous 24h.
          </p>
          {formData.estimated_price > 0 && (
            <p className="text-[#FF6B00] font-bold text-2xl mb-8">
              Estimation : {formData.estimated_price.toFixed(2)} € HT
            </p>
          )}
          <Link to="/">
            <Button className="btn-brutal">Retour à l'accueil</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-black border-b border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#FF6B00] font-bold text-sm uppercase tracking-widest">
            Contact
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mt-4">
            DEMANDEZ<br />
            <span className="text-white/40">VOTRE DEVIS</span>
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Réponse sous 24h. Devis gratuit et sans engagement.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Price Summary if from configurator */}
          {priceFromUrl && (
            <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/30 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Package size={24} className="text-[#FF6B00]" />
                  <div>
                    <p className="text-white font-medium">Votre configuration</p>
                    <p className="text-white/60 text-sm">
                      {quantityFromUrl} pièces · {productFromUrl} · {sizeFromUrl}
                    </p>
                  </div>
                </div>
                <p className="text-[#FF6B00] font-black text-3xl">
                  {parseFloat(priceFromUrl).toFixed(2)} €
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-black border border-white/10 p-8 md:p-12 space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 text-red-500">
                {error}
              </div>
            )}

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#FF6B00] flex items-center justify-center text-black text-sm font-bold">1</span>
                Vos coordonnées
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white/80 mb-2 block">Nom de l'entreprise *</Label>
                  <Input
                    value={formData.company_name}
                    onChange={(e) => handleChange('company_name', e.target.value)}
                    required
                    className="h-12 bg-white/5 border-white/10 text-white"
                    placeholder="Restaurant Le Gourmet"
                  />
                </div>
                <div>
                  <Label className="text-white/80 mb-2 block">Votre nom *</Label>
                  <Input
                    value={formData.contact_name}
                    onChange={(e) => handleChange('contact_name', e.target.value)}
                    required
                    className="h-12 bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/80 mb-2 block">Email *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    className="h-12 bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/80 mb-2 block">Téléphone</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="h-12 bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Product Config */}
            {!priceFromUrl && (
              <div>
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#FF6B00] flex items-center justify-center text-black text-sm font-bold">2</span>
                  Votre besoin
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white/80 mb-2 block">Type de produit</Label>
                    <select
                      value={formData.product_type}
                      onChange={(e) => handleChange('product_type', e.target.value)}
                      className="w-full h-12 bg-white/5 border border-white/10 text-white px-4"
                    >
                      <option value="sacs_kraft">Sacs Kraft</option>
                      <option value="boites">Boîtes Carton</option>
                      <option value="gobelets">Gobelets</option>
                      <option value="luxe">Luxe</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-white/80 mb-2 block">Quantité souhaitée</Label>
                    <Input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => handleChange('quantity', e.target.value)}
                      className="h-12 bg-white/5 border-white/10 text-white"
                      placeholder="Ex: 10000"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* File Upload */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#FF6B00] flex items-center justify-center text-black text-sm font-bold">{priceFromUrl ? '2' : '3'}</span>
                Votre logo (optionnel)
              </h3>
              
              {uploadedFile ? (
                <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <FileText size={24} className="text-[#FF6B00]" />
                    <span className="text-white">{uploadedFile.name}</span>
                  </div>
                  <button type="button" onClick={removeFile} className="text-white/50 hover:text-red-500">
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <label className="block">
                  <div className="border-2 border-dashed border-white/20 hover:border-[#FF6B00]/50 p-8 text-center cursor-pointer transition-colors">
                    <Upload size={32} className="text-white/40 mx-auto mb-4" />
                    <p className="text-white/60 mb-2">
                      {isUploading ? 'Upload en cours...' : 'Cliquez pour uploader votre logo'}
                    </p>
                    <p className="text-white/40 text-sm">PNG, JPG, PDF, AI (max 10MB)</p>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".png,.jpg,.jpeg,.pdf,.ai,.svg"
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              )}
            </div>

            {/* Message */}
            <div>
              <Label className="text-white/80 mb-2 block">Message / Précisions</Label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="bg-white/5 border-white/10 text-white min-h-[120px]"
                placeholder="Décrivez vos besoins spécifiques, dimensions souhaitées, couleurs..."
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-brutal py-6 text-lg"
            >
              {isSubmitting ? 'Envoi en cours...' : (
                <>
                  <Send className="mr-2" size={20} />
                  Envoyer ma demande de devis
                </>
              )}
            </Button>

            <p className="text-center text-white/40 text-sm">
              Réponse sous 24h · Devis gratuit · Sans engagement
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
