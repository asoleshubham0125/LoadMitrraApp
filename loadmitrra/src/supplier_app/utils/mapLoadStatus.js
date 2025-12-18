export function mapLoadStatus(load) {
  switch (load.status) {
    case "posted":
      return "Finding Driver";

    case "assigned":
      return "Scheduled";

    case "in_transit":
      return "In Transit";

    case "completed":
      return "In Transit"; // or hide from Active panel

    default:
      return "Finding Driver";
  }
}
