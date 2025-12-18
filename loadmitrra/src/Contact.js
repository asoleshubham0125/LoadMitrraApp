import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Contact() {
  const cleanAccordionStyle = {
    backgroundColor: "white",
    color: "black",
    boxShadow: "none",
  };

  // React state to control which FAQ item is open (null = none)
  const [openIndex, setOpenIndex] = useState(null);

  // --- SUBMISSION HANDLER ---
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default page reload

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/maqwyygk", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert("Message sent successfully!");
        form.reset(); // Clear the form inputs
      } else {
        alert("Oops! There was a problem submitting your form.");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      {/* Main Content Section */}
      <div className="container py-5 my-auto">
        <div className="row g-5 align-items-center">
          {/* ================= LEFT SIDE (Info) ================= */}
          <div className="col-lg-6">
            <div className="d-inline-block bg-primary bg-opacity-10 text-primary fw-bold rounded-pill px-3 py-2 mb-3">
              <span className="d-flex align-items-center gap-2 small">
                <span className="material-symbols-outlined fs-6">
                  support_agent
                </span>
                CUSTOMER SUPPORT
              </span>
            </div>

            <h1 className="display-4 fw-bold mb-3 text-dark">
              Get in Touch with <br />
              <span className="text-primary">LoadMitrra</span>
            </h1>

            <p className="text-muted fs-5 mb-5" style={{ maxWidth: "90%" }}>
              Have questions about a load or shipment? Our team is dedicated to
              helping drivers and suppliers move forward efficiently.
            </p>

            {/* Email Card */}
            <div className="card border-0 shadow-sm mb-4 rounded-3">
              <div className="card-body p-4 d-flex align-items-start gap-3">
                <div
                  className="bg-primary bg-opacity-10 p-3 rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "50px", height: "50px" }}
                >
                  <span className="material-symbols-outlined text-primary">
                    mail
                  </span>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Email Us</h5>
                  <p className="text-muted mb-0">
                    support@loadmitrra.com <br />
                    partnerships@loadmitrra.com
                  </p>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body p-4 d-flex align-items-start gap-3">
                <div
                  className="bg-primary bg-opacity-10 p-3 rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "50px", height: "50px" }}
                >
                  <span className="material-symbols-outlined text-primary">
                    location_on
                  </span>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Headquarters</h5>
                  <p className="text-muted mb-0">
                    Office No. 402, Logistics Park, <br />
                    Andheri East, Mumbai, Maharashtra 400093
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE (Form) ================= */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-body p-5 bg-white">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-bold text-dark">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name" // Added name attribute
                      className="form-control form-control-lg bg-light border-light"
                      placeholder="e.g. Sarah Jenkins"
                      style={{ fontSize: "0.95rem" }}
                      required // Added required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-bold text-dark">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email" // Added name attribute
                        className="form-control form-control-lg bg-light border-light"
                        placeholder="name@company.com"
                        style={{ fontSize: "0.95rem" }}
                        required // Added required
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-bold text-dark">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone" // Added name attribute
                        className="form-control form-control-lg bg-light border-light"
                        placeholder="+91 98765 43210"
                        style={{ fontSize: "0.95rem" }}
                        required // Added required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold text-dark">
                      I am a
                    </label>
                    <select
                      name="role" // Added name attribute
                      className="form-select form-select-lg bg-light border-light text-muted"
                      style={{ fontSize: "0.95rem" }}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Driver or Supplier
                      </option>
                      <option value="driver">Driver</option>
                      <option value="supplier">Supplier</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold text-dark">
                      Message
                    </label>
                    <textarea
                      name="message" // Added name attribute
                      className="form-control form-control-lg bg-light border-light"
                      rows="4"
                      placeholder="Tell us more about your inquiry..."
                      style={{ fontSize: "0.95rem", resize: "none" }}
                      required // Added required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                  >
                    Send Message
                    <span className="material-symbols-outlined fs-5">
                      arrow_forward
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FAQ SECTION (MATCHING IMAGE UI) ================= */}
        <div className="row mt-5 pt-5 justify-content-center">
          {/* Constrain width to look like the image (col-lg-8 instead of full width) */}
          <div className="col-lg-8">
            <h3 className="text-center fw-bold mb-5 text-dark">
              Frequently Asked Questions
            </h3>

            <div className="accordion" id="faqAccordion">
              {/* FAQ Item 1 */}
              <div className="accordion-item border-0 shadow-sm mb-3 rounded-3 overflow-hidden">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className={`accordion-button ${
                      openIndex === 1 ? "" : "collapsed"
                    } fw-medium text-dark`}
                    type="button"
                    onClick={() => setOpenIndex(openIndex === 1 ? null : 1)}
                    aria-expanded={openIndex === 1}
                    aria-controls="collapseOne"
                    style={cleanAccordionStyle}
                  >
                    How do I register as a driver?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className={`accordion-collapse collapse ${
                    openIndex === 1 ? "show" : ""
                  }`}
                  aria-labelledby="headingOne"
                >
                  <div className="accordion-body text-muted small pt-0 pb-4 px-4 bg-white">
                    To register as a driver, simply click on the "Join as
                    Driver" button on the homepage, upload your driving license
                    and vehicle documents, and wait for verification (usually 24
                    hours).
                  </div>
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div className="accordion-item border-0 shadow-sm mb-3 rounded-3 overflow-hidden">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className={`accordion-button ${
                      openIndex === 2 ? "" : "collapsed"
                    } fw-medium text-dark`}
                    type="button"
                    onClick={() => setOpenIndex(openIndex === 2 ? null : 2)}
                    aria-expanded={openIndex === 2}
                    aria-controls="collapseTwo"
                    style={cleanAccordionStyle}
                  >
                    What are the payment terms?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className={`accordion-collapse collapse ${
                    openIndex === 2 ? "show" : ""
                  }`}
                  aria-labelledby="headingTwo"
                >
                  <div className="accordion-body text-muted small pt-0 pb-4 px-4 bg-white">
                    Payments are processed directly to your linked bank account
                    within 2-3 business days after the successful delivery of a
                    load. We offer instant settlements for premium members.
                  </div>
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div className="accordion-item border-0 shadow-sm mb-3 rounded-3 overflow-hidden">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className={`accordion-button ${
                      openIndex === 3 ? "" : "collapsed"
                    } fw-medium text-dark`}
                    type="button"
                    onClick={() => setOpenIndex(openIndex === 3 ? null : 3)}
                    aria-expanded={openIndex === 3}
                    aria-controls="collapseThree"
                    style={cleanAccordionStyle}
                  >
                    How do I track my assigned driver?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className={`accordion-collapse collapse ${
                    openIndex === 3 ? "show" : ""
                  }`}
                  aria-labelledby="headingThree"
                >
                  <div className="accordion-body text-muted small pt-0 pb-4 px-4 bg-white">
                    Once a driver is assigned, you will receive a tracking link
                    via SMS and Email. You can also view the real-time location
                    on your "My Shipments" dashboard.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
