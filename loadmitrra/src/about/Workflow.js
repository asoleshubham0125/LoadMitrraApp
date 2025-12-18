import React from "react";
import "./Workflow.css";

function Workflow() {
  return (
    <section className="py-5">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-2">Your Journey in 4 Simple Steps</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            From registration to final delivery, we've streamlined the process
            to keep your business moving efficiently.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline">
          {/* Step 1 */}
          <TimelineItem
            side="left"
            active
            icon="person_add"
            title="Register & Verify"
            desc="Create your account in minutes. Upload necessary documents for quick verification to ensure a trusted network."
          />

          {/* Step 2 */}
          <TimelineItem
            side="right"
            icon="description"
            title="Post or Find a Load"
            desc="Suppliers post load details. Drivers browse available loads nearby with our smart filtering system."
          />

          {/* Step 3 */}
          <TimelineItem
            side="left"
            icon="local_shipping"
            title="Track & Transport"
            desc="Real-time GPS tracking keeps everyone updated. Enjoy a seamless journey from pickup point to destination."
          />

          {/* Step 4 */}
          <TimelineItem
            side="right"
            icon="account_balance_wallet"
            title="Secure Payment"
            desc="Upon successful delivery, payments are released instantly. No more chasing invoices or delayed payments."
          />
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ side, icon, title, desc, active }) {
  return (
    <div className={`timeline-item ${side}`}>
      <div className={`content-box ${side}`}>
        <h6 className="fw-bold mb-1">{title}</h6>
        <p className="text-muted mb-0">{desc}</p>
        <span className={`arrow ${side}`} />
      </div>

      <div className={`icon ${active ? "active" : ""}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
    </div>
  );
}

export default Workflow;
