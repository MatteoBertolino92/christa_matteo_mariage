import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/lib/languageStore';
import { getTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

export default function RSVPSection() {
  const { language } = useLanguageStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    accompanied: 'no',
    partnerName: '',
    numberOfChildren: '0',
    childrenNames: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('RSVP Submitted:', formData);
      setIsSubmitting(false);
      setFormData({
        firstName: '',
        lastName: '',
        accompanied: 'no',
        partnerName: '',
        numberOfChildren: '0',
        childrenNames: '',
      });
      alert(language === 'fr' ? 'Merci pour votre réponse!' : language === 'it' ? 'Grazie per la tua risposta!' : 'Thank you for your response!');
    }, 1000);
  };

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-background" id="rsvp">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-paragraph tracking-[0.2em] uppercase text-xs font-bold mb-6 block">
            07 // {getTranslation('rsvpTitle', language)}
          </span>
          <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-8">
            {getTranslation('rsvpTitle', language)}
          </h2>
          <p className="font-paragraph text-secondary-foreground/80 text-lg">
            {getTranslation('rsvpDescription', language)}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white border border-primary/10 p-10 md:p-16 space-y-8"
        >
          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block font-paragraph text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
                {getTranslation('firstName', language)}
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-primary/20 focus:border-primary outline-none font-paragraph text-secondary-foreground transition-colors"
                placeholder={getTranslation('firstName', language)}
              />
            </div>
            <div>
              <label className="block font-paragraph text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
                {getTranslation('lastName', language)}
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-primary/20 focus:border-primary outline-none font-paragraph text-secondary-foreground transition-colors"
                placeholder={getTranslation('lastName', language)}
              />
            </div>
          </div>

          {/* Accompanied */}
          <div>
            <label className="block font-paragraph text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
              {getTranslation('accompanied', language)}
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="accompanied"
                  value="yes"
                  checked={formData.accompanied === 'yes'}
                  onChange={handleChange}
                  className="w-4 h-4 accent-primary"
                />
                <span className="font-paragraph text-secondary-foreground">{getTranslation('yes', language)}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="accompanied"
                  value="no"
                  checked={formData.accompanied === 'no'}
                  onChange={handleChange}
                  className="w-4 h-4 accent-primary"
                />
                <span className="font-paragraph text-secondary-foreground">{getTranslation('no', language)}</span>
              </label>
            </div>
          </div>

          {/* Number of Children */}
          <div>
            <label className="block font-paragraph text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
              {getTranslation('numberOfChildren', language)}
            </label>
            <select
              name="numberOfChildren"
              value={formData.numberOfChildren}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-primary/20 focus:border-primary outline-none font-paragraph text-secondary-foreground transition-colors bg-white"
            >
              {[0, 1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num.toString()}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Partner Name - Show if accompanied */}
          {formData.accompanied === 'yes' && (
            <div>
              <label className="block font-paragraph text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
                {getTranslation('partnerName', language)}
              </label>
              <input
                type="text"
                name="partnerName"
                value={formData.partnerName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-primary/20 focus:border-primary outline-none font-paragraph text-secondary-foreground transition-colors"
                placeholder={getTranslation('partnerName', language)}
              />
            </div>
          )}

          {/* Children Names - Show if numberOfChildren >= 1 */}
          {parseInt(formData.numberOfChildren) >= 1 && (
            <div>
              <label className="block font-paragraph text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
                {getTranslation('childrenNames', language)}
              </label>
              <input
                type="text"
                name="childrenNames"
                value={formData.childrenNames}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-primary/20 focus:border-primary outline-none font-paragraph text-secondary-foreground transition-colors"
                placeholder={getTranslation('childrenNames', language)}
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground px-12 py-4 font-paragraph text-sm font-bold uppercase tracking-widest hover:bg-foreground transition-colors disabled:opacity-50"
            >
              {isSubmitting ? getTranslation('submitting', language) : getTranslation('submit', language)}
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
