import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que todos los campos estén llenos
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t('contact.form.error') || 'Error', {
        description: 'Por favor completa todos los campos',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Sending contact form...', { name: formData.name, email: formData.email });
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-012a3b25/send-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log('Server response:', data);

      if (!response.ok) {
        console.error('Server error:', data);
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      // Limpiar el formulario
      setFormData({ name: '', email: '', message: '' });
      
      // Mostrar mensaje de éxito
      if (data.emailSent) {
        toast.success(t('contact.form.success'), {
          description: t('contact.form.successDesc'),
        });
      } else {
        console.warn('Email not sent:', data);
        toast.success('Mensaje guardado', {
          description: data.message || 'El mensaje fue guardado pero el email no se envió',
        });
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t('contact.form.error') || 'Error', {
        description: error instanceof Error ? error.message : 'Error al enviar el mensaje',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-white/80">
          {t('contact.form.name')}
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={t('contact.form.namePlaceholder') || 'Tu nombre'}
          className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/30"
        />
      </div>
      
      <div>
        <Label htmlFor="email" className="text-white/80">
          {t('contact.form.email')}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={t('contact.form.emailPlaceholder') || 'tu@email.com'}
          className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/30"
        />
      </div>
      
      <div>
        <Label htmlFor="message" className="text-white/80">
          {t('contact.form.message')}
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder={t('contact.form.messagePlaceholder') || 'Escribe tu mensaje...'}
          className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/30 resize-none"
        />
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-black hover:bg-white/90 gap-2 disabled:opacity-50"
      >
        <span className="mix-blend-normal">
          {isSubmitting ? 'Enviando...' : t('contact.form.submit')}
        </span>
        <Send className="w-4 h-4 mix-blend-normal" />
      </Button>
    </form>
  );
}