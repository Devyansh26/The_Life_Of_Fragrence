import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "I absolutely love my candle! Thank you so much. The jar and label is very stylish and the scent is just beautiful. I love how the aroma lingers for a long time even after I blow the candle out. Well done!",
      author: "Priya S.",
    },
    {
      id: 2,
      text: "The perfumes are divine! Long-lasting and natural fragrances that I can't get enough of. Highly recommend!",
      author: "Rahul M.",
    },
    {
      id: 3,
      text: "Beautiful packaging and eco-friendly products. So happy to support a sustainable brand!",
      author: "Ananya K.",
    },
  ]

  return (
    <div className="bg-stone-50 section-padding">
      <div className="container-custom">
        <h2 className="text-3xl sm:text-4xl font-light text-center mb-12">Customer Love</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4">
                <svg className="w-8 h-8 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <p className="text-neutral-600 mb-4 text-sm italic">{testimonial.text}</p>
              <p className="font-medium text-neutral-800">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
