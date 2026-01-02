import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Send, CheckCircle2, Upload, X, Package, Leaf } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { quotes, upload as uploadApi } from '../lib/api';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  
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

  // Calculate plastic saved
  const plasticSaved = formData.quantity ? (parseInt(formData.quantity) * 0.015).toFixed(1) : '0';

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
      <main className="bg-[#F9F8EF] min-h-screen pt-20 flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-[#6B705C] flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} className="text-[#F9F8EF]" />
          </div>
          <h2 className="text-3xl font-black text-[#1A1A1A] mb-4">DEMANDE ENVOYÉE</h2>
          <p className="text-[#1A1A1A]/70 mb-4">
            Nous avons bien reçu votre demande. Notre équipe vous contactera sous 24h pour démarrer votre design.
          </p>
          {formData.estimated_price > 0 && (
            <p className="text-[#6B705C] font-bold text-2xl mb-8">
              Estimation : {formData.estimated_price.toFixed(2)} € HT
            </p>
          )}
          <Link to="/">
            <Button className="btn-primary">Retour à l'accueil</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F9F8EF] min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 bg-[#CDCEBD] border-b border-[#6B705C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#6B705C] font-bold text-sm uppercase tracking-widest">
            Contact
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-[#1A1A1A] mt-4">
            DÉMARRER<br />
            <span className="text-[#1A1A1A]/40">MON DESIGN</span>
          </h1>
          <p className="text-[#1A1A1A]/70 text-lg mt-4 max-w-2xl">
            Design validé en 30 minutes. Réponse sous 24h.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Price Summary if from configurator */}
          {priceFromUrl && (
            <div className="bg-[#6B705C]/10 border border-[#6B705C] p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Package size={24} className="text-[#6B705C]" />
                  <div>
                    <p className="text-[#1A1A1A] font-medium">Votre configuration</p>
                    <p className="text-[#1A1A1A]/60 text-sm">
                      {quantityFromUrl} pièces · {productFromUrl?.replace('_', ' ')} · {sizeFromUrl}
                    </p>
                  </div>
                </div>
                <p className="text-[#6B705C] font-black text-3xl">
                  {parseFloat(priceFromUrl).toFixed(2)} €
                </p>
              </div>
              {/* Eco message */}
              <div className="mt-4 pt-4 border-t border-[#6B705C]/20 flex items-center gap-2">
                <Leaf size={18} className="text-[#6B705C]" />
                <span className="text-[#1A1A1A]/70 text-sm">
                  En choisissant EONITE, vous évitez l'utilisation de <strong>{plasticSaved} kg</strong> de plastique.
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-[#F9F8EF] border border-[#6B705C] p-8 md:p-12 space-y-8">
            {error && (
              <div className="bg-red-100 border border-red-400 p-4 text-red-700">
                {error}
              </div>
            )}

            {/* Contact Info */}
            <div>
              <h3 className="text-[#1A1A1A] font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#6B705C] flex items-center justify-center text-[#F9F8EF] text-sm font-bold">1</span>
                Vos coordonnées
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Nom de l'entreprise *</Label>
                  <Input
                    value={formData.company_name}
                    onChange={(e) => handleChange('company_name', e.target.value)}
                    required
                    className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
                    placeholder="Restaurant Le Gourmet"
                  />
                </div>
                <div>
                  <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Votre nom *</Label>
                  <Input
                    value={formData.contact_name}
                    onChange={(e) => handleChange('contact_name', e.target.value)}
                    required
                    className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
                  />
                </div>
                <div>
                  <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Email *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
                  />
                </div>
                <div>
                  <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Téléphone</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
                  />
                </div>
              </div>
            </div>

            {/* Product Config */}
            {!priceFromUrl && (
              <div>
                <h3 className="text-[#1A1A1A] font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#6B705C] flex items-center justify-center text-[#F9F8EF] text-sm font-bold">2</span>
                  Votre besoin
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Type de produit</Label>
                    <select
                      value={formData.product_type}
                      onChange={(e) => handleChange('product_type', e.target.value)}
                      className="w-full h-12 bg-transparent border border-[#6B705C]/30 focus:border-[#6B705C] px-4 text-[#1A1A1A]"
                    >
                      <option value="sacs_kraft">Sacs Kraft</option>
                      <option value="boites">Boîtes Carton</option>
                      <option value="gobelets">Gobelets</option>
                      <option value="luxe">Luxe</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Quantité souhaitée</Label>
                    <Input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => handleChange('quantity', e.target.value)}
                      className="h-12 bg-transparent border-[#6B705C]/30 focus:border-[#6B705C]"
                      placeholder="Ex: 10000"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* File Upload */}
            <div>
              <h3 className="text-[#1A1A1A] font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#6B705C] flex items-center justify-center text-[#F9F8EF] text-sm font-bold">{priceFromUrl ? '2' : '3'}</span>
                Votre logo (optionnel)
              </h3>
              
              {uploadedFile ? (
                <div className="flex items-center justify-between bg-[#CDCEBD] border border-[#6B705C] p-4">
                  <span className="text-[#1A1A1A]">{uploadedFile.name}</span>
                  <button type="button" onClick={removeFile} className="text-[#1A1A1A]/50 hover:text-red-600">
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <label className="block">
                  <div className="border-2 border-dashed border-[#6B705C]/30 hover:border-[#6B705C] p-8 text-center cursor-pointer transition-colors">
                    <Upload size={32} className="text-[#6B705C]/50 mx-auto mb-4" />
                    <p className="text-[#1A1A1A]/70 mb-2">
                      {isUploading ? 'Upload en cours...' : 'Cliquez pour uploader votre logo'}
                    </p>
                    <p className="text-[#1A1A1A]/50 text-sm">PNG, JPG, PDF, AI (max 10MB)</p>
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
              <Label className="text-[#1A1A1A]/80 mb-2 block font-semibold">Message / Précisions</Label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="bg-transparent border-[#6B705C]/30 focus:border-[#6B705C] min-h-[120px]"
                placeholder="Décrivez vos besoins spécifiques, dimensions souhaitées, couleurs..."
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-primary py-6 text-lg"
            >
              {isSubmitting ? 'Envoi en cours...' : (
                <>
                  <Send className="mr-2" size={20} />
                  Démarrer mon design
                </>
              )}
            </Button>

            <p className="text-center text-[#1A1A1A]/50 text-sm">
              Design validé en 30 min · Réponse sous 24h · Sans engagement
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
