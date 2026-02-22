import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'
import contact_img from '../assets/contact_img.png'

const Contact = () => {
  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm(
      'service_60n9job',     
      'template_2ck3w7n',    
      form.current,
      'yR_0GQFybRXx8LyrM'      
    )
    .then(
      () => {
        alert("Message Sent Successfully ")
        form.current.reset()
      },
      (error) => {
        console.log(error.text)
        alert("Failed to send message ")
      }
    )
  }

  return (
    <div className='contact-page'>
      <div className="contact-hero text-center">
        <h1 className='contact-title'>Contact Us</h1>
        <p className='contact-subtitle'>
          We’d love to hear from you. Our team is always ready to help.
        </p>
      </div>

      <div className='container contact-container'>
        <div className='row align-items-center g-4'>
          
          <div className='col-12 col-lg-6 text-center'>
            <img src={contact_img} className='img-fluid contact-img' alt="contact" />
          </div>

          <div className='col-12 col-lg-6'>
            <h3 className='section-head'>Our Store</h3>
            <p className='contact-text'>
              547 Old Trafford <br />
              Manchester, England
            </p>

            <h3 className='section-head mt-4'>Contact Info</h3>
            <p className='contact-text'>
              📞 +91 8668017837 <br />
              ✉️ admin@trends.com
            </p>
          </div>
        </div>

        <div className="contact-form-section mt-5">
          <h2 className='text-center mb-4'>Send us a Message</h2>

          <form ref={form} onSubmit={sendEmail} className="row g-3 justify-content-center">
            
            <div className="col-md-5 col-12">
              <input
                type="text"
                name="user_name"   
                placeholder="Your Name"
                className="form-control contact-input"
                required
              />
            </div>

            <div className="col-md-5 col-12">
              <input
                type="email"
                name="user_email"  
                placeholder="Your Email"
                className="form-control contact-input"
                required
              />
            </div>

            <div className="col-10">
              <input
                type="text"
                name="subject"     
                placeholder="Subject"
                className="form-control contact-input"
                required
              />
            </div>

            <div className="col-10">
              <textarea
                rows="5"
                name="message"     
                placeholder="Your Message"
                className="form-control contact-input"
                required
              ></textarea>
            </div>

            <div className="col-10 text-center">
              <button type="submit" className="btn contact-btn px-5 py-2">
                Send Message
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact