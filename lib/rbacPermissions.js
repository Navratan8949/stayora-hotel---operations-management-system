// Stayora Luxury Hotel PMS - Role-Based Access Control (RBAC) System

export const STAYORA_ROLE_PERMISSIONS = {
  "Owner / Super Admin": {
    label: "Owner / Super Admin",
    description: "Complete sovereign authority across all multi-property modules, financial audits, master rates, and system configurations.",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
    avatar: "👑",
    allowedRoutes: ["*"], // Full unrestricted access to all 18 pages
  },

  "Hotel Manager": {
    label: "Hotel Manager (General Manager)",
    description: "Full day-to-day operational governance over Front Office, Rooms, F&B, Housekeeping, Team Duty Rosters, and Revenue Analytics.",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    avatar: "🏨",
    allowedRoutes: [
      "/app",
      "/app/reservations",
      "/app/calendar",
      "/app/in-house",
      "/app/walk-in",
      "/app/guests",
      "/app/rooms",
      "/app/rates",
      "/app/housekeeping",
      "/app/maintenance",
      "/app/guest-services",
      "/app/restaurant",
      "/app/folios",
      "/app/payments",
      "/app/inventory",
      "/app/purchasing",
      "/app/staff",
      "/app/reports",
      "/app/settings"
    ],
  },

  "Front Desk / Receptionist": {
    label: "Front Desk / Receptionist",
    description: "Guest arrivals, departures, room allocation, registration cards, walk-in check-in, guest folios & concierge requests.",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    avatar: "🛎️",
    allowedRoutes: [
      "/app",
      "/app/reservations",
      "/app/calendar",
      "/app/in-house",
      "/app/walk-in",
      "/app/guests",
      "/app/rooms",
      "/app/guest-services",
      "/app/folios"
    ],
  },

  "Housekeeping Supervisor": {
    label: "Housekeeping Supervisor",
    description: "Floor cleaning assignments, room inspection status (Clean/Dirty/Inspected), linen supply, and minibar restock.",
    badgeColor: "bg-teal-100 text-teal-900 border-teal-300",
    avatar: "🧹",
    allowedRoutes: [
      "/app",
      "/app/housekeeping",
      "/app/rooms",
      "/app/maintenance",
      "/app/guest-services",
      "/app/inventory"
    ],
  },

  "Restaurant Manager": {
    label: "Restaurant / F&B Manager",
    description: "Live kitchen tickets (KOT), restaurant table POS, in-house room service billing, and food & beverage stock control.",
    badgeColor: "bg-orange-100 text-orange-900 border-orange-300",
    avatar: "🍽️",
    allowedRoutes: [
      "/app",
      "/app/restaurant",
      "/app/in-house",
      "/app/inventory",
      "/app/purchasing"
    ],
  },

  "Accountant / Cashier": {
    label: "Finance & Night Auditor",
    description: "Guest folios, payment vouchers, daily revenue closing, purchase orders, advance security deposits & RevPAR analytics.",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
    avatar: "💳",
    allowedRoutes: [
      "/app",
      "/app/folios",
      "/app/payments",
      "/app/reservations",
      "/app/purchasing",
      "/app/reports"
    ],
  },

  "Maintenance Staff": {
    label: "Chief Maintenance Engineer",
    description: "Engineering work orders, HVAC & electrical repairs, room out-of-order blocks, and maintenance spare parts inventory.",
    badgeColor: "bg-stone-100 text-stone-800 border-stone-300",
    avatar: "🔧",
    allowedRoutes: [
      "/app",
      "/app/maintenance",
      "/app/rooms",
      "/app/guest-services",
      "/app/inventory"
    ],
  }
};

/**
 * Check whether a given role has permission to access a specific route
 */
export function canRoleAccessPath(role, pathname) {
  if (!role) return true;
  const config = STAYORA_ROLE_PERMISSIONS[role];
  if (!config) return true;
  if (config.allowedRoutes.includes("*")) return true;

  // Clean trailing slashes
  const target = pathname.replace(/\/$/, "");
  return config.allowedRoutes.some((route) => {
    const cleanRoute = route.replace(/\/$/, "");
    return target === cleanRoute;
  });
}
