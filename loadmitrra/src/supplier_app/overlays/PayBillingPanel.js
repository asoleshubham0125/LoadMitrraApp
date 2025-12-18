import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import SupplierPanelWrapper from "./PanelWrapper";
import { useSupplierAuth } from "../context/SupplierAuthContext";

export default function PayBillingPanel() {
  const { supplierId, loadId } = useParams();
  const navigate = useNavigate();
  const { supplier, token } = useSupplierAuth();

  const handleConfirmPayment = async () => {
    try {
      await api.put(`/load/pay/${loadId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate(`/supplier/${supplierId}/billing`);
    } catch (err) {
      console.error("Payment failed", err);
    }
  };

  if (!supplier) return null;

  return (
    <SupplierPanelWrapper title="Complete Payment">
      <div className="p-4">
        <p className="fw-semibold">This is a demo payment screen.</p>

        <p className="text-muted">
          Payment gateway integration will be added later.
        </p>

        <button
          className="btn btn-success w-100 mt-3"
          onClick={handleConfirmPayment}
        >
          Mark as Paid
        </button>
      </div>
    </SupplierPanelWrapper>
  );
}
