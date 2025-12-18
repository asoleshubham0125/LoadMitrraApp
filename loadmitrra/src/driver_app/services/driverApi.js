import api from "../../api/axios";

/* DRIVER → GET AVAILABLE LOADS */
export const getAvailableLoads = () => api.get("/load/available");

/* DRIVER → ACCEPT LOAD */
export const acceptLoad = (loadId, acceptedPickupTime) =>
  api.put(`/load/accept/${loadId}`, { acceptedPickupTime });

/* DRIVER → PICKUP LOAD */
export const pickupLoad = (loadId) => api.put(`/load/pickup/${loadId}`);

/* DRIVER → REACHED DESTINATION */
export const reachedDestination = (loadId) =>
  api.put(`/load/reached/${loadId}`);

/* DRIVER → COMPLETE LOAD */
export const completeLoad = (loadId) => api.put(`/load/complete/${loadId}`);

/* DRIVER → ACTIVE LOADS */
export const getMyLoads = (driverId) => api.get(`/load/driver/${driverId}`);

/* DRIVER → LOAD HISTORY */
export const getLoadHistory = (driverId) =>
  api.get(`/load/driver/${driverId}/history`);

/* DRIVER → EARNINGS SUMMARY */
export const getEarningsSummary = (driverId) =>
  api.get(`/driver/${driverId}/earnings/summary`);

/* DRIVER → EARNINGS TRANSACTIONS */
export const getTransactions = (driverId) =>
  api.get(`/driver/${driverId}/earnings/transactions`);
