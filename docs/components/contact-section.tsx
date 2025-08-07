"use client"

import { useState } from 'react'
import { Mail, MapPin, Phone, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="Contacto" className="min-h-screen flex items-center relative py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-3">
              <div className="text-xs text-cyan-400 tracking-widest uppercase mb-1"></div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Contactanos
              </div>
            </div>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="bg-gray-900/70 backdrop-blur-lg border border-indigo-500/20 p-6 rounded-xl shadow-xl">
                <div className="text-xl font-medium text-white mb-4">Información de Contacto</div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-cyan-400 mt-1 mr-3" />
                    <div>
                      <div className="text-sm text-gray-400">Dirección</div>
                      <div className="text-white">Av. Otamendi 1878</div>
                      <div className="text-white">Buenos Aires, Argentina</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-cyan-400 mt-1 mr-3" />
                    <div>
                      <div className="text-sm text-gray-400">Email</div>
                      <a 
                        href="mailto:signalink2025@gmail.com"
                        className="text-white hover:text-cyan-400 transition-colors"
                      >
                        signalink2025@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-cyan-400 mt-1 mr-3" />
                    <div>
                      <div className="text-sm text-gray-400">Telefono</div>
                      <a 
                        href="tel:+5491140305159"
                        className="text-white hover:text-cyan-400 transition-colors"
                      >
                        +54 9 11 4030-5159
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="text-white mb-2">Seguinos</div>
                  <div className="flex space-x-3">
                    <a 
                      href="#"
                      className="w-8 h-8 rounded-full bg-indigo-900/50 flex items-center justify-center text-white hover:bg-indigo-800 transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a 
                      href="#"
                      className="w-8 h-8 rounded-full bg-indigo-900/50 flex items-center justify-center text-white hover:bg-indigo-800 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a 
                      href="#"
                      className="w-8 h-8 rounded-full bg-indigo-900/50 flex items-center justify-center text-white hover:bg-indigo-800 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <div className="bg-gray-900/70 backdrop-blur-lg border border-indigo-500/20 p-6 rounded-xl shadow-xl">
                <div className="text-xl font-medium text-white mb-4">Enviar Mensaje</div>
                
                {status === 'success' && (
                  <div className="mb-4 p-3 bg-green-900/50 border border-green-500/50 rounded-lg text-green-300">
                    ¡Mensaje enviado exitosamente! Te responderemos pronto.
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg text-red-300">
                    Error al enviar el mensaje. Por favor, intenta nuevamente.
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm text-gray-400 mb-1">
                        Nombre
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 focus:border-cyan-500 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
                        Email
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 focus:border-cyan-500 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm text-gray-400 mb-1">
                      Subject
                    </label>
                    <input 
                      type="text" 
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 focus:border-cyan-500 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm text-gray-400 mb-1">
                      Message
                    </label>
                    <textarea 
                      id="message" 
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 focus:border-cyan-500 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors resize-none"
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600/50 to-purple-600/50 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full px-6 py-3 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 rounded-lg text-white text-base font-medium relative z-10 flex items-center justify-center gap-2 group-hover:from-indigo-800/90 group-hover:to-purple-800/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                        {status === 'loading' ? 'Enviando...' : 'Send Message'}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
