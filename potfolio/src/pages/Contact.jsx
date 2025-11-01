import React from 'react'

const Contact = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER
  const message = encodeURIComponent("Hi! I'd like to get in touch.")

  return (
    <div className="section-padding bg-stone-50 min-h-screen">
      <div className="container-custom max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-light text-center mb-8">Contact Us</h1>
        <p className="text-center text-neutral-600 mb-12">
          Have questions? We'd love to hear from you. Send us a message via WhatsApp.
        </p>

        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mb-8">
            <svg className="w-20 h-20 mx-auto text-green-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <h2 className="text-2xl font-light mb-2">Let's Chat on WhatsApp</h2>
            <p className="text-neutral-600 mb-6">
              Click the button below to start a conversation with us.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Open WhatsApp
            </a>
          </div>

          <div className="border-t border-stone-200 pt-8">
            <h3 className="font-medium mb-4">Other Ways to Reach Us</h3>
            <div className="text-neutral-600 space-y-2">
              <p>📧 Email: hello@thelifeoffragrance.com</p>
              <p>📍 Handcrafted with love in India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
