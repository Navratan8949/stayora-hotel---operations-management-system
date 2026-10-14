"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import {
  INITIAL_PROPERTIES,
  INITIAL_ROOM_TYPES,
  INITIAL_ROOMS,
  INITIAL_RATE_PLANS,
  INITIAL_OFFERS,
  INITIAL_ADDONS,
  INITIAL_GUESTS,
  INITIAL_RESERVATIONS,
  INITIAL_FOLIOS,
  INITIAL_HOUSEKEEPING_TASKS,
  INITIAL_MAINTENANCE_REQUESTS,
  INITIAL_GUEST_REQUESTS,
  INITIAL_MENU_ITEMS,
  INITIAL_TABLES,
  INITIAL_RESTAURANT_ORDERS,
  INITIAL_INVENTORY_ITEMS,
  INITIAL_SUPPLIERS,
  INITIAL_PURCHASE_ORDERS,
  INITIAL_STAFF,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVITY_LOGS
} from "../data/initialData";
import { STAYORA_DEMO_STAFF, DEFAULT_DEMO_PASSWORD } from "../components/auth/stayoraDemoStaff";

const STORAGE_KEY = "stayora_hotel_demo_v1";

const StayoraContext = createContext(null);

function getStoredOrInitial(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed && parsed[key] !== undefined ? parsed[key] : fallback;
  } catch (e) {
    return fallback;
  }
}

function getDefaultDates() {
  const today = new Date();
  const checkIn = today.toISOString().split("T")[0];
  const nextDay = new Date(today);
  nextDay.setDate(nextDay.getDate() + 2);
  const checkOut = nextDay.toISOString().split("T")[0];
  return { checkIn, checkOut };
}

export function StayoraProvider({ children }) {
  // --- Persistent States initialized safely ---
  const [properties, setProperties] = useState(() => getStoredOrInitial("properties", INITIAL_PROPERTIES));
  const [selectedPropertyId, setSelectedPropertyId] = useState(() => getStoredOrInitial("selectedPropertyId", "prop_jaipur"));
  const [roomTypes, setRoomTypes] = useState(() => getStoredOrInitial("roomTypes", INITIAL_ROOM_TYPES));
  const [rooms, setRooms] = useState(() => getStoredOrInitial("rooms", INITIAL_ROOMS));
  const [ratePlans, setRatePlans] = useState(() => getStoredOrInitial("ratePlans", INITIAL_RATE_PLANS));
  const [offers, setOffers] = useState(() => getStoredOrInitial("offers", INITIAL_OFFERS));
  const [addons, setAddons] = useState(() => getStoredOrInitial("addons", INITIAL_ADDONS));
  const [guests, setGuests] = useState(() => getStoredOrInitial("guests", INITIAL_GUESTS));
  const [reservations, setReservations] = useState(() => getStoredOrInitial("reservations", INITIAL_RESERVATIONS));
  const [folios, setFolios] = useState(() => getStoredOrInitial("folios", INITIAL_FOLIOS));
  const [housekeepingTasks, setHousekeepingTasks] = useState(() => getStoredOrInitial("housekeepingTasks", INITIAL_HOUSEKEEPING_TASKS));
  const [maintenanceRequests, setMaintenanceRequests] = useState(() => getStoredOrInitial("maintenanceRequests", INITIAL_MAINTENANCE_REQUESTS));
  const [guestRequests, setGuestRequests] = useState(() => getStoredOrInitial("guestRequests", INITIAL_GUEST_REQUESTS));
  const [menuItems, setMenuItems] = useState(() => getStoredOrInitial("menuItems", INITIAL_MENU_ITEMS));
  const [tables, setTables] = useState(() => getStoredOrInitial("tables", INITIAL_TABLES));
  const [restaurantOrders, setRestaurantOrders] = useState(() => getStoredOrInitial("restaurantOrders", INITIAL_RESTAURANT_ORDERS));
  const [inventoryItems, setInventoryItems] = useState(() => getStoredOrInitial("inventoryItems", INITIAL_INVENTORY_ITEMS));
  const [suppliers, setSuppliers] = useState(() => getStoredOrInitial("suppliers", INITIAL_SUPPLIERS));
  const [purchaseOrders, setPurchaseOrders] = useState(() => getStoredOrInitial("purchaseOrders", INITIAL_PURCHASE_ORDERS));
  const [staff, setStaff] = useState(() => getStoredOrInitial("staff", INITIAL_STAFF));
  const [notifications, setNotifications] = useState(() => getStoredOrInitial("notifications", INITIAL_NOTIFICATIONS));
  const [activityLogs, setActivityLogs] = useState(() => getStoredOrInitial("activityLogs", INITIAL_ACTIVITY_LOGS));

  // --- UI and Session States ---
  const [currentRole, setCurrentRole] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("stayora_current_role");
      if (stored) return stored;
    }
    return "Hotel Manager";
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("stayora_authenticated");
      return stored !== null ? stored === "true" : true;
    }
    return true;
  });
  const [toasts, setToasts] = useState([]);
  const [activePrintDoc, setActivePrintDoc] = useState(null);
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);

  // Initial Booking Search Query
  const [bookingQuery, setBookingQuery] = useState(() => {
    const dates = getDefaultDates();
    return {
      propertyId: "prop_jaipur",
      checkIn: dates.checkIn,
      checkOut: dates.checkOut,
      adults: 2,
      children: 0,
      roomsCount: 1,
      selectedRoomTypeId: null,
      selectedRatePlanId: "rp_standard_flex"
    };
  });

  // Save to localStorage whenever core operational state changes
  useEffect(() => {
    try {
      const payload = {
        properties,
        selectedPropertyId,
        roomTypes,
        rooms,
        ratePlans,
        offers,
        addons,
        guests,
        reservations,
        folios,
        housekeepingTasks,
        maintenanceRequests,
        guestRequests,
        menuItems,
        tables,
        restaurantOrders,
        inventoryItems,
        suppliers,
        purchaseOrders,
        staff,
        notifications,
        activityLogs
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn("Could not write Stayora state to localStorage:", e);
    }
  }, [
    properties,
    selectedPropertyId,
    roomTypes,
    rooms,
    ratePlans,
    offers,
    addons,
    guests,
    reservations,
    folios,
    housekeepingTasks,
    maintenanceRequests,
    guestRequests,
    menuItems,
    tables,
    restaurantOrders,
    inventoryItems,
    suppliers,
    purchaseOrders,
    staff,
    notifications,
    activityLogs
  ]);

  // Toast notification system
  const addToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // --- Authenticated Persona & Staff Management ---
  const currentUser = useMemo(() => {
    const matched = STAYORA_DEMO_STAFF.find((s) => s.role === currentRole);
    if (matched) return matched;
    return STAYORA_DEMO_STAFF[0];
  }, [currentRole]);

  const login = useCallback((emailOrRole, password) => {
    const term = (emailOrRole || "").trim().toLowerCase();
    const persona = STAYORA_DEMO_STAFF.find(
      (s) => s.email.toLowerCase() === term || s.role.toLowerCase() === term
    ) || STAYORA_DEMO_STAFF[0];

    setCurrentRole(persona.role);
    setIsAuthenticated(true);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("stayora_authenticated", "true");
        localStorage.setItem("stayora_current_role", persona.role);
      } catch {}
    }
    addToast(`Welcome back, ${persona.name} (${persona.role})!`, "success");
    return persona;
  }, [addToast]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("stayora_authenticated", "false");
      } catch {}
    }
    addToast("Logged out of Stayora PMS successfully.", "info");
  }, [addToast]);

  const switchDemoUser = useCallback((staffIdOrRole) => {
    const persona = STAYORA_DEMO_STAFF.find(
      (s) => s.id === staffIdOrRole || s.role === staffIdOrRole || s.email === staffIdOrRole
    );
    if (persona) {
      setCurrentRole(persona.role);
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("stayora_authenticated", "true");
          localStorage.setItem("stayora_current_role", persona.role);
        } catch {}
      }
      addToast(`Switched perspective to ${persona.name} (${persona.role}).`, "info");
    }
  }, [addToast]);

  // Current selected property object
  const currentProperty = useMemo(() => {
    return properties.find((p) => p.id === selectedPropertyId) || properties[0];
  }, [properties, selectedPropertyId]);

  // --- AVAILABILITY LOGIC ---
  const checkRoomAvailability = useCallback((propertyId, checkIn, checkOut, roomTypeId = null) => {
    if (!checkIn || !checkOut || checkIn >= checkOut) {
      return { availableRooms: [], totalAvailable: 0 };
    }

    const propertyRooms = rooms.filter((r) => {
      if (r.propertyId !== propertyId) return false;
      if (roomTypeId && r.roomTypeId !== roomTypeId) return false;
      if (r.operationalStatus === "Out of Service" || r.maintenanceStatus === "Under Repair") return false;
      return true;
    });

    const occupiedRoomIds = new Set();

    reservations.forEach((res) => {
      if (res.propertyId !== propertyId) return;
      if (res.status === "Cancelled" || res.status === "Checked Out" || res.status === "No Show") return;
      
      const overlap = res.checkIn < checkOut && res.checkOut > checkIn;
      if (overlap && res.assignedRoomId) {
        occupiedRoomIds.add(res.assignedRoomId);
      }
    });

    const availableRooms = propertyRooms.filter((r) => !occupiedRoomIds.has(r.id));
    return {
      availableRooms,
      totalAvailable: availableRooms.length
    };
  }, [rooms, reservations]);

  const getRoomTypeAvailability = useCallback((propertyId, checkIn, checkOut) => {
    const counts = {};
    roomTypes.forEach((rt) => {
      if (rt.propertyId === propertyId) {
        const { totalAvailable } = checkRoomAvailability(propertyId, checkIn, checkOut, rt.id);
        counts[rt.id] = totalAvailable;
      }
    });
    return counts;
  }, [roomTypes, checkRoomAvailability]);

  // --- BOOKING CREATION ---
  const createBooking = useCallback((bookingData) => {
    const {
      propertyId,
      roomTypeId,
      ratePlanId,
      checkIn,
      checkOut,
      adults,
      children,
      roomsCount = 1,
      guestName,
      guestEmail,
      guestPhone,
      guestCity = "Jaipur",
      guestCountry = "India",
      specialRequests = "",
      selectedAddons = [],
      promoCode = "",
      paymentMethod = "Simulated Card",
      depositAmountPaid = 0
    } = bookingData;

    const { availableRooms, totalAvailable } = checkRoomAvailability(propertyId, checkIn, checkOut, roomTypeId);
    if (totalAvailable < roomsCount) {
      addToast("Sorry, no rooms are available for the selected dates and room type.", "error");
      return null;
    }

    const assignedRoom = availableRooms[0] || null;
    const roomType = roomTypes.find((rt) => rt.id === roomTypeId);
    const ratePlan = ratePlans.find((rp) => rp.id === ratePlanId) || ratePlans[0];
    const property = properties.find((p) => p.id === propertyId) || properties[0];

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const nights = Math.max(1, Math.round((outDate - inDate) / (1000 * 60 * 60 * 24)));

    const baseNightly = (roomType ? roomType.basePrice : 8500) * (ratePlan ? ratePlan.priceMultiplier : 1);
    const roomSubtotal = baseNightly * nights * roomsCount;

    let addonsTotal = 0;
    const resolvedAddons = selectedAddons.map((addonId) => {
      const ad = addons.find((a) => a.id === addonId);
      if (!ad) return null;
      let cost = 0;
      if (ad.pricePerStay) cost = ad.pricePerStay;
      else if (ad.pricePerPersonNight) cost = ad.pricePerPersonNight * (adults + children) * nights;
      else if (ad.pricePerPerson) cost = ad.pricePerPerson * (adults + children);
      else if (ad.pricePerNight) cost = ad.pricePerNight * nights;
      addonsTotal += cost;
      return { id: ad.id, name: ad.name, price: cost };
    }).filter(Boolean);

    let discountAmount = 0;
    if (promoCode) {
      const offer = offers.find((o) => o.code.toUpperCase() === promoCode.toUpperCase() && o.active);
      if (offer) {
        discountAmount = Math.round((roomSubtotal * offer.discountPercent) / 100);
      }
    }

    const netTaxable = roomSubtotal + addonsTotal - discountAmount;
    const taxAmount = Math.round((netTaxable * (property.taxRate || 12)) / 100);
    const totalAmount = netTaxable + taxAmount;
    const amountPaid = depositAmountPaid > 0 ? depositAmountPaid : (ratePlan.depositRequiredPercent ? Math.round((totalAmount * ratePlan.depositRequiredPercent) / 100) : totalAmount);
    const balanceDue = totalAmount - amountPaid;

    const bookingRef = `STY-${property.city.slice(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newResId = `res_${Date.now()}`;
    const newFolioId = `fol_${Date.now()}`;
    const newGuestId = `gst_${Date.now()}`;

    let existingGuest = guests.find((g) => g.email.toLowerCase() === guestEmail.toLowerCase());
    if (!existingGuest) {
      existingGuest = {
        id: newGuestId,
        name: guestName,
        email: guestEmail,
        phone: guestPhone,
        city: guestCity,
        country: guestCountry,
        vip: false,
        totalStays: 1,
        totalSpend: totalAmount,
        preferences: specialRequests || "Standard room preferences",
        idType: "Government Photo ID",
        idNumber: "VERIFIED-DEMO"
      };
      setGuests((prev) => [existingGuest, ...prev]);
    } else {
      setGuests((prev) =>
        prev.map((g) =>
          g.id === existingGuest.id
            ? { ...g, totalStays: g.totalStays + 1, totalSpend: g.totalSpend + totalAmount }
            : g
        )
      );
    }

    const newReservation = {
      id: newResId,
      bookingReference: bookingRef,
      propertyId,
      guestId: existingGuest.id,
      guestName,
      guestEmail,
      guestPhone,
      roomTypeId,
      roomTypeName: roomType?.name || "Deluxe Room",
      assignedRoomId: assignedRoom ? assignedRoom.id : null,
      roomNumber: assignedRoom ? assignedRoom.number : "TBA",
      checkIn,
      checkOut,
      adults,
      children,
      roomsCount,
      ratePlanId,
      ratePlanName: ratePlan.name,
      nightlyRate: Math.round(baseNightly),
      nights,
      roomSubtotal,
      addonsTotal,
      addons: resolvedAddons,
      discountAmount,
      taxAmount,
      totalAmount,
      depositAmount: amountPaid,
      amountPaid,
      balanceDue,
      status: "Confirmed",
      paymentStatus: balanceDue <= 0 ? "Paid" : amountPaid > 0 ? "Partially Paid" : "Unpaid",
      bookingSource: "Direct Website",
      specialRequests,
      createdAt: new Date().toISOString().split("T")[0],
      folioId: newFolioId
    };

    const newFolio = {
      id: newFolioId,
      reservationId: newResId,
      roomNumber: assignedRoom ? assignedRoom.number : "TBA",
      guestName,
      status: "Open",
      charges: [
        {
          id: `chg_${Date.now()}_1`,
          description: `${roomType?.name || "Room"} (${nights} night${nights > 1 ? "s" : ""})`,
          amount: roomSubtotal,
          category: "Room",
          date: checkIn,
          postedBy: "Direct Booking Engine"
        },
        ...resolvedAddons.map((ad, idx) => ({
          id: `chg_${Date.now()}_ad_${idx}`,
          description: ad.name,
          amount: ad.price,
          category: "Addon",
          date: checkIn,
          postedBy: "Direct Booking Engine"
        })),
        ...(discountAmount > 0
          ? [
              {
                id: `chg_${Date.now()}_disc`,
                description: `Special Promotion (${promoCode.toUpperCase()})`,
                amount: -discountAmount,
                category: "Discount",
                date: checkIn,
                postedBy: "System Promo"
              }
            ]
          : []),
        {
          id: `chg_${Date.now()}_tax`,
          description: `Estimated Taxes & Tourism Levies (${property.taxRate}%)`,
          amount: taxAmount,
          category: "Tax",
          date: checkIn,
          postedBy: "System"
        }
      ],
      payments: amountPaid > 0
        ? [
            {
              id: `pay_${Date.now()}`,
              amount: amountPaid,
              method: paymentMethod,
              transactionRef: `TXN-DEMO-${Math.floor(100000 + Math.random() * 900000)}`,
              date: new Date().toISOString().split("T")[0],
              receivedBy: "Online Booking Gateway"
            }
          ]
        : [],
      totalCharges: totalAmount,
      totalPaid: amountPaid,
      balanceDue
    };

    if (assignedRoom) {
      setRooms((prev) =>
        prev.map((r) => (r.id === assignedRoom.id ? { ...r, operationalStatus: "Reserved", currentGuest: guestName } : r))
      );
    }

    setReservations((prev) => [newReservation, ...prev]);
    setFolios((prev) => [newFolio, ...prev]);

    const newNotif = {
      id: `notif_${Date.now()}`,
      title: "New Online Reservation",
      message: `Booking ${bookingRef} received for ${guestName} (${roomType?.name || "Room"}).`,
      type: "booking",
      time: "Just now",
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);

    const newLog = {
      id: `act_${Date.now()}`,
      user: "Online Guest Portal",
      action: "New Reservation Created",
      target: `${bookingRef} - ${guestName}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      details: `Total: ₹${totalAmount.toLocaleString()}, Advance Paid: ₹${amountPaid.toLocaleString()}`
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    addToast(`Reservation ${bookingRef} confirmed successfully!`, "success");
    return newReservation;
  }, [checkRoomAvailability, roomTypes, ratePlans, properties, addons, offers, guests, addToast]);

  // --- FRONT DESK WORKFLOWS ---
  const checkInGuest = useCallback((reservationId, targetRoomId = null) => {
    const res = reservations.find((r) => r.id === reservationId);
    if (!res) return false;

    if (res.status === "Cancelled" || res.status === "Checked Out") {
      addToast("Cannot check in cancelled or already checked-out reservation.", "error");
      return false;
    }

    const roomIdToUse = targetRoomId || res.assignedRoomId;
    if (!roomIdToUse) {
      addToast("Please select and assign an available room before checking in.", "error");
      return false;
    }

    const roomObj = rooms.find((r) => r.id === roomIdToUse);
    if (!roomObj) {
      addToast("Selected room not found.", "error");
      return false;
    }

    if (roomObj.operationalStatus === "Occupied") {
      addToast(`Room ${roomObj.number} is currently occupied!`, "error");
      return false;
    }

    if (roomObj.operationalStatus === "Out of Service") {
      addToast(`Room ${roomObj.number} is out of service for maintenance.`, "error");
      return false;
    }

    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomIdToUse
          ? { ...r, operationalStatus: "Occupied", currentGuest: res.guestName }
          : r
      )
    );

    setReservations((prev) =>
      prev.map((r) =>
        r.id === reservationId
          ? { ...r, status: "Checked In", assignedRoomId: roomIdToUse, roomNumber: roomObj.number }
          : r
      )
    );

    setFolios((prev) =>
      prev.map((f) =>
        f.reservationId === reservationId ? { ...f, roomNumber: roomObj.number } : f
      )
    );

    setActivityLogs((prev) => [
      {
        id: `act_${Date.now()}`,
        user: `${currentRole} (Front Desk)`,
        action: "Guest Check-in",
        target: `Room ${roomObj.number} - ${res.guestName}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        details: `Reservation: ${res.bookingReference}`
      },
      ...prev
    ]);

    addToast(`Guest ${res.guestName} successfully checked into Room ${roomObj.number}.`, "success");
    return true;
  }, [reservations, rooms, currentRole, addToast]);

  const checkOutGuest = useCallback((reservationId) => {
    const res = reservations.find((r) => r.id === reservationId);
    if (!res) return false;

    const folio = folios.find((f) => f.reservationId === reservationId);
    if (folio && folio.balanceDue > 0) {
      addToast(`Notice: Outstanding balance of ₹${folio.balanceDue.toLocaleString()} on folio. Settle or authorize balance.`, "warning");
    }

    setReservations((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, status: "Checked Out" } : r))
    );

    if (res.assignedRoomId) {
      const roomObj = rooms.find((r) => r.id === res.assignedRoomId);
      setRooms((prev) =>
        prev.map((r) =>
          r.id === res.assignedRoomId
            ? { ...r, operationalStatus: "Available", housekeepingStatus: "Dirty", currentGuest: null }
            : r
        )
      );

      const newHkTask = {
        id: `hk_${Date.now()}`,
        roomNumber: roomObj ? roomObj.number : res.roomNumber,
        propertyId: res.propertyId,
        taskType: "Checkout Cleaning",
        priority: "High",
        assignedTo: "Housekeeping Team",
        status: "Dirty",
        dueTime: "Within 2 Hours",
        checklist: [
          { item: "Strip used bed linen & pillow cases", completed: false },
          { item: "Fit fresh luxury linens & sanitize duvet", completed: false },
          { item: "Scrub & sanitize bathroom and polish brass fixtures", completed: false },
          { item: "Replenish toiletries, bath salts, and towels", completed: false },
          { item: "Wipe surfaces, vacuum rugs, mop stone floor", completed: false },
          { item: "Restock minibar & refreshment bar", completed: false }
        ],
        notes: `Guest ${res.guestName} checked out. Sanitize and prepare room for next arrival.`
      };
      setHousekeepingTasks((prev) => [newHkTask, ...prev]);
    }

    setFolios((prev) =>
      prev.map((f) => (f.reservationId === reservationId ? { ...f, status: "Closed - Departed" } : f))
    );

    setActivityLogs((prev) => [
      {
        id: `act_${Date.now()}`,
        user: `${currentRole} (Front Desk)`,
        action: "Guest Check-out",
        target: `Room ${res.roomNumber} - ${res.guestName}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        details: `Stay completed. Room marked Dirty for housekeeping.`
      },
      ...prev
    ]);

    addToast(`Guest ${res.guestName} checked out. Room ${res.roomNumber} marked dirty for cleaning.`, "success");
    return true;
  }, [reservations, folios, rooms, currentRole, addToast]);

  const cancelReservation = useCallback((reservationId, reason = "Guest Request") => {
    const res = reservations.find((r) => r.id === reservationId);
    if (!res) return false;

    if (res.assignedRoomId) {
      setRooms((prev) =>
        prev.map((r) =>
          r.id === res.assignedRoomId && r.operationalStatus === "Reserved"
            ? { ...r, operationalStatus: "Available", currentGuest: null }
            : r
        )
      );
    }

    setReservations((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, status: "Cancelled", cancellationReason: reason } : r))
    );

    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: "Reservation Cancelled",
        message: `Booking ${res.bookingReference} for ${res.guestName} was cancelled.`,
        type: "cancellation",
        time: "Just now",
        read: false
      },
      ...prev
    ]);

    setActivityLogs((prev) => [
      {
        id: `act_${Date.now()}`,
        user: currentRole,
        action: "Reservation Cancelled",
        target: `${res.bookingReference} - ${res.guestName}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        details: `Reason: ${reason}. Room inventory released.`
      },
      ...prev
    ]);

    addToast(`Reservation ${res.bookingReference} cancelled and inventory released.`, "info");
    return true;
  }, [reservations, currentRole, addToast]);

  const assignOrMoveRoom = useCallback((reservationId, newRoomId) => {
    const res = reservations.find((r) => r.id === reservationId);
    const newRoom = rooms.find((r) => r.id === newRoomId);
    if (!res || !newRoom) return false;

    if (newRoom.operationalStatus === "Occupied" && newRoom.id !== res.assignedRoomId) {
      addToast(`Cannot assign: Room ${newRoom.number} is occupied!`, "error");
      return false;
    }
    if (newRoom.operationalStatus === "Out of Service") {
      addToast(`Cannot assign: Room ${newRoom.number} is out of service!`, "error");
      return false;
    }

    const oldRoomId = res.assignedRoomId;

    if (oldRoomId && oldRoomId !== newRoomId) {
      setRooms((prev) =>
        prev.map((r) =>
          r.id === oldRoomId
            ? { ...r, operationalStatus: "Available", housekeepingStatus: "Dirty", currentGuest: null }
            : r
        )
      );
    }

    const targetOpStatus = res.status === "Checked In" ? "Occupied" : "Reserved";
    setRooms((prev) =>
      prev.map((r) =>
        r.id === newRoomId ? { ...r, operationalStatus: targetOpStatus, currentGuest: res.guestName } : r
      )
    );

    setReservations((prev) =>
      prev.map((r) =>
        r.id === reservationId ? { ...r, assignedRoomId: newRoomId, roomNumber: newRoom.number } : r
      )
    );

    setFolios((prev) =>
      prev.map((f) => (f.reservationId === reservationId ? { ...f, roomNumber: newRoom.number } : f))
    );

    addToast(`Reservation moved to Room ${newRoom.number}.`, "success");
    return true;
  }, [reservations, rooms, addToast]);

  // --- HOUSEKEEPING WORKFLOWS ---
  const updateHousekeepingTask = useCallback((taskId, newStatus, assignedTo = null) => {
    const task = housekeepingTasks.find((t) => t.id === taskId);
    if (!task) return;

    setHousekeepingTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            status: newStatus,
            assignedTo: assignedTo || t.assignedTo,
            completedAt: newStatus === "Ready" || newStatus === "Cleaned" ? new Date().toLocaleTimeString() : t.completedAt
          };
        }
        return t;
      })
    );

    const targetRoom = rooms.find((r) => r.number === task.roomNumber && r.propertyId === task.propertyId);
    if (targetRoom) {
      setRooms((prev) =>
        prev.map((r) => {
          if (r.id === targetRoom.id) {
            let roomHkStatus = r.housekeepingStatus;
            if (newStatus === "Dirty") roomHkStatus = "Dirty";
            if (newStatus === "In Progress") roomHkStatus = "In Progress";
            if (newStatus === "Cleaned") roomHkStatus = "Clean";
            if (newStatus === "Inspected") roomHkStatus = "Inspected";
            if (newStatus === "Ready") roomHkStatus = "Ready";
            return { ...r, housekeepingStatus: roomHkStatus };
          }
          return r;
        })
      );
    }

    addToast(`Task for Room ${task.roomNumber} updated to ${newStatus}.`, "success");
  }, [housekeepingTasks, rooms, addToast]);

  const toggleTaskChecklist = useCallback((taskId, index) => {
    setHousekeepingTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updated = [...t.checklist];
          updated[index] = { ...updated[index], completed: !updated[index].completed };
          return { ...t, checklist: updated };
        }
        return t;
      })
    );
  }, []);

  const inspectRoom = useCallback((roomNumber, propertyId, pass, notes = "") => {
    const room = rooms.find((r) => r.number === roomNumber && r.propertyId === propertyId);
    if (!room) return;

    const newHkStatus = pass ? "Ready" : "Dirty";
    setRooms((prev) =>
      prev.map((r) => (r.id === room.id ? { ...r, housekeepingStatus: newHkStatus } : r))
    );

    setHousekeepingTasks((prev) =>
      prev.map((t) => {
        if (t.roomNumber === roomNumber && t.propertyId === propertyId) {
          return {
            ...t,
            status: pass ? "Ready" : "Dirty",
            notes: notes ? `${t.notes || ""} [Inspection: ${notes}]` : t.notes
          };
        }
        return t;
      })
    );

    if (pass) {
      addToast(`Room ${roomNumber} passed inspection and is marked Ready.`, "success");
    } else {
      addToast(`Room ${roomNumber} failed inspection and has been returned to Dirty status.`, "warning");
      setNotifications((prev) => [
        {
          id: `notif_${Date.now()}`,
          title: "Inspection Failed",
          message: `Room ${roomNumber} failed inspection: ${notes || "Needs re-cleaning."}`,
          type: "housekeeping",
          time: "Just now",
          read: false
        },
        ...prev
      ]);
    }
  }, [rooms, addToast]);

  // --- MAINTENANCE WORKFLOWS ---
  const createMaintenanceRequest = useCallback((requestData) => {
    const newReq = {
      id: `maint_${Date.now()}`,
      reportedDate: new Date().toISOString().split("T")[0],
      status: "In Progress",
      actualCost: 0,
      ...requestData
    };

    setMaintenanceRequests((prev) => [newReq, ...prev]);

    if (newReq.outOfServiceBlocked && newReq.roomNumber) {
      setRooms((prev) =>
        prev.map((r) =>
          r.number === newReq.roomNumber && r.propertyId === newReq.propertyId
            ? { ...r, operationalStatus: "Out of Service", maintenanceStatus: "Under Repair", maintenanceReason: newReq.description }
            : r
        )
      );

      setNotifications((prev) => [
        {
          id: `notif_${Date.now()}`,
          title: "Room Out of Service",
          message: `Room ${newReq.roomNumber} blocked for maintenance: ${newReq.description}`,
          type: "maintenance",
          time: "Just now",
          read: false
        },
        ...prev
      ]);
    }

    addToast(`Maintenance request logged for ${newReq.roomNumber || "Facility"}.`, "success");
  }, [addToast]);

  const resolveMaintenance = useCallback((requestId, actualCost = 0) => {
    const req = maintenanceRequests.find((m) => m.id === requestId);
    if (!req) return;

    setMaintenanceRequests((prev) =>
      prev.map((m) => (m.id === requestId ? { ...m, status: "Resolved", actualCost: actualCost || m.estimatedCost } : m))
    );

    if (req.outOfServiceBlocked && req.roomNumber) {
      setRooms((prev) =>
        prev.map((r) =>
          r.number === req.roomNumber && r.propertyId === req.propertyId
            ? { ...r, operationalStatus: "Available", housekeepingStatus: "Dirty", maintenanceStatus: "Operational", maintenanceReason: null }
            : r
        )
      );

      setHousekeepingTasks((prev) => [
        {
          id: `hk_${Date.now()}`,
          roomNumber: req.roomNumber,
          propertyId: req.propertyId,
          taskType: "Maintenance Follow-up Cleaning",
          priority: "High",
          assignedTo: "Housekeeping",
          status: "Dirty",
          dueTime: "Next Available",
          checklist: [
            { item: "Clear engineering tools and debris", completed: false },
            { item: "Sanitize surfaces and wipe dust", completed: false },
            { item: "Mop floors and inspect room presentation", completed: false }
          ],
          notes: "Maintenance completed. Sanitize room before returning to sellable pool."
        },
        ...prev
      ]);
    }

    addToast(`Maintenance request resolved for ${req.roomNumber || "Facility"}.`, "success");
  }, [maintenanceRequests, addToast]);

  // --- RESTAURANT & POS WORKFLOWS ---
  const createPOSOrder = useCallback((orderData) => {
    const {
      tableId,
      tableName,
      source = "Dine-In",
      guestName = "Walk-in Guest",
      roomNumber = null,
      reservationId = null,
      items = [],
      chargeToFolio = false
    } = orderData;

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.12);
    const serviceCharge = Math.round(subtotal * 0.05);
    const total = subtotal + tax + serviceCharge;

    const orderNumber = `ORD-${Math.floor(100 + Math.random() * 900)}`;
    const newOrderId = `ord_${Date.now()}`;

    const newOrder = {
      id: newOrderId,
      orderNumber,
      tableId,
      tableName,
      source,
      guestName,
      roomNumber,
      reservationId,
      items,
      subtotal,
      tax,
      serviceCharge,
      total,
      status: "Preparing",
      paymentMethod: chargeToFolio ? `Charged to Room Folio (${roomNumber})` : "Pending Bill",
      paymentStatus: chargeToFolio ? "Paid" : "Unpaid",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setRestaurantOrders((prev) => [newOrder, ...prev]);

    if (chargeToFolio && (reservationId || roomNumber)) {
      const activeFolio = folios.find((f) =>
        reservationId ? f.reservationId === reservationId : f.roomNumber === roomNumber && f.status === "Open"
      );

      if (activeFolio) {
        const itemNames = items.map((i) => `${i.quantity}x ${i.name}`).join(", ");
        const newCharge = {
          id: `chg_pos_${Date.now()}`,
          description: `Sheesh Mahal Dining (${orderNumber}): ${itemNames.slice(0, 35)}...`,
          amount: total,
          category: "Restaurant",
          date: new Date().toISOString().split("T")[0],
          postedBy: `POS (${currentRole})`
        };

        setFolios((prev) =>
          prev.map((f) => {
            if (f.id === activeFolio.id) {
              const updatedCharges = [...f.charges, newCharge];
              const updatedTotalCharges = f.totalCharges + total;
              const updatedBalance = updatedTotalCharges - f.totalPaid;
              return {
                ...f,
                charges: updatedCharges,
                totalCharges: updatedTotalCharges,
                balanceDue: updatedBalance
              };
            }
            return f;
          })
        );
      }
    }

    addToast(`Order ${orderNumber} created (₹${total.toLocaleString()}). Sent to kitchen queue.`, "success");
    return newOrder;
  }, [folios, currentRole, addToast]);

  const updatePOSOrderStatus = useCallback((orderId, newStatus) => {
    setRestaurantOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    addToast(`Order status updated to ${newStatus}.`, "info");
  }, [addToast]);

  // --- FOLIO & BILLING WORKFLOWS ---
  const addChargeToFolio = useCallback((folioId, chargeData) => {
    const { description, amount, category = "Miscellaneous" } = chargeData;
    const numAmount = parseFloat(amount);
    if (!description || isNaN(numAmount)) {
      addToast("Please enter a valid description and amount.", "error");
      return;
    }

    const newCharge = {
      id: `chg_${Date.now()}`,
      description,
      amount: numAmount,
      category,
      date: new Date().toISOString().split("T")[0],
      postedBy: currentRole
    };

    setFolios((prev) =>
      prev.map((f) => {
        if (f.id === folioId) {
          const updatedCharges = [...f.charges, newCharge];
          const updatedTotalCharges = f.totalCharges + numAmount;
          const updatedBalance = updatedTotalCharges - f.totalPaid;
          return {
            ...f,
            charges: updatedCharges,
            totalCharges: updatedTotalCharges,
            balanceDue: updatedBalance
          };
        }
        return f;
      })
    );

    addToast(`Charge of ₹${numAmount.toLocaleString()} posted to folio.`, "success");
  }, [currentRole, addToast]);

  const recordFolioPayment = useCallback((folioId, paymentData) => {
    const { amount, method = "Credit Card (Demo)" } = paymentData;
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      addToast("Please enter a valid positive payment amount.", "error");
      return;
    }

    const newPayment = {
      id: `pay_${Date.now()}`,
      amount: numAmount,
      method,
      transactionRef: `TXN-DEMO-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split("T")[0],
      receivedBy: currentRole
    };

    setFolios((prev) =>
      prev.map((f) => {
        if (f.id === folioId) {
          const updatedPayments = [...f.payments, newPayment];
          const updatedTotalPaid = f.totalPaid + numAmount;
          const updatedBalance = f.totalCharges - updatedTotalPaid;
          return {
            ...f,
            payments: updatedPayments,
            totalPaid: updatedTotalPaid,
            balanceDue: updatedBalance,
            status: updatedBalance <= 0 ? "Settled" : f.status
          };
        }
        return f;
      })
    );

    addToast(`Demo payment of ₹${numAmount.toLocaleString()} recorded successfully.`, "success");
  }, [currentRole, addToast]);

  // --- INVENTORY & PURCHASING WORKFLOWS ---
  const receivePurchaseOrder = useCallback((poId, receivedQuantity) => {
    const po = purchaseOrders.find((p) => p.id === poId);
    if (!po) return;

    const qty = parseInt(receivedQuantity, 10);
    const newReceived = (po.receivedQty || 0) + qty;
    const totalOrderQty = po.items.reduce((acc, i) => acc + i.quantity, 0);

    const isFullyReceived = newReceived >= totalOrderQty;

    setPurchaseOrders((prev) =>
      prev.map((p) =>
        p.id === poId
          ? {
              ...p,
              receivedQty: newReceived,
              status: isFullyReceived ? "Received" : "Partially Received"
            }
          : p
      )
    );

    if (po.items.length > 0) {
      const firstItem = po.items[0];
      setInventoryItems((prev) =>
        prev.map((inv) =>
          inv.name.toLowerCase().includes(firstItem.itemName.toLowerCase().slice(0, 10))
            ? { ...inv, currentStock: inv.currentStock + qty, status: inv.currentStock + qty <= inv.minStock ? "Low Stock Alert" : "Healthy" }
            : inv
        )
      );
    }

    addToast(`Received ${qty} units against ${po.poNumber}. Stock updated.`, "success");
  }, [purchaseOrders, addToast]);

  const adjustInventoryStock = useCallback((itemId, deltaQty, reason = "Manual adjustment") => {
    const delta = parseInt(deltaQty, 10);
    setInventoryItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQty = Math.max(0, item.currentStock + delta);
          return {
            ...item,
            currentStock: newQty,
            status: newQty <= item.minStock ? "Low Stock Alert" : "Healthy"
          };
        }
        return item;
      })
    );

    addToast(`Inventory stock adjusted (${delta > 0 ? `+${delta}` : delta} units). Reason: ${reason}`, "info");
  }, [addToast]);

  // --- DEMO DATA MANAGEMENT ---
  const resetDemoData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProperties(INITIAL_PROPERTIES);
    setSelectedPropertyId("prop_jaipur");
    setRoomTypes(INITIAL_ROOM_TYPES);
    setRooms(INITIAL_ROOMS);
    setRatePlans(INITIAL_RATE_PLANS);
    setOffers(INITIAL_OFFERS);
    setAddons(INITIAL_ADDONS);
    setGuests(INITIAL_GUESTS);
    setReservations(INITIAL_RESERVATIONS);
    setFolios(INITIAL_FOLIOS);
    setHousekeepingTasks(INITIAL_HOUSEKEEPING_TASKS);
    setMaintenanceRequests(INITIAL_MAINTENANCE_REQUESTS);
    setGuestRequests(INITIAL_GUEST_REQUESTS);
    setMenuItems(INITIAL_MENU_ITEMS);
    setTables(INITIAL_TABLES);
    setRestaurantOrders(INITIAL_RESTAURANT_ORDERS);
    setInventoryItems(INITIAL_INVENTORY_ITEMS);
    setSuppliers(INITIAL_SUPPLIERS);
    setPurchaseOrders(INITIAL_PURCHASE_ORDERS);
    setStaff(INITIAL_STAFF);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    addToast("Demo state reset to initial pristine seed data.", "info");
  }, [addToast]);

  const exportDemoDataJSON = useCallback(() => {
    const payload = {
      properties,
      selectedPropertyId,
      roomTypes,
      rooms,
      ratePlans,
      offers,
      addons,
      guests,
      reservations,
      folios,
      housekeepingTasks,
      maintenanceRequests,
      guestRequests,
      menuItems,
      tables,
      restaurantOrders,
      inventoryItems,
      suppliers,
      purchaseOrders,
      staff,
      notifications,
      activityLogs
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `stayora_demo_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast("Demo data exported as JSON file.", "success");
  }, [
    properties,
    selectedPropertyId,
    roomTypes,
    rooms,
    ratePlans,
    offers,
    addons,
    guests,
    reservations,
    folios,
    housekeepingTasks,
    maintenanceRequests,
    guestRequests,
    menuItems,
    tables,
    restaurantOrders,
    inventoryItems,
    suppliers,
    purchaseOrders,
    staff,
    notifications,
    activityLogs,
    addToast
  ]);

  const importDemoDataJSON = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.reservations && parsed.rooms) {
        if (parsed.properties) setProperties(parsed.properties);
        if (parsed.selectedPropertyId) setSelectedPropertyId(parsed.selectedPropertyId);
        if (parsed.roomTypes) setRoomTypes(parsed.roomTypes);
        if (parsed.rooms) setRooms(parsed.rooms);
        if (parsed.reservations) setReservations(parsed.reservations);
        if (parsed.folios) setFolios(parsed.folios);
        addToast("Demo data imported successfully!", "success");
        return true;
      }
      throw new Error("Invalid schema");
    } catch (e) {
      addToast("Failed to parse imported JSON file.", "error");
      return false;
    }
  }, [addToast]);

  const value = {
    properties,
    setProperties,
    selectedPropertyId,
    setSelectedPropertyId,
    currentProperty,
    roomTypes,
    setRoomTypes,
    rooms,
    setRooms,
    ratePlans,
    setRatePlans,
    offers,
    setOffers,
    addons,
    setAddons,
    guests,
    setGuests,
    reservations,
    setReservations,
    folios,
    setFolios,
    housekeepingTasks,
    setHousekeepingTasks,
    maintenanceRequests,
    setMaintenanceRequests,
    guestRequests,
    setGuestRequests,
    menuItems,
    setMenuItems,
    tables,
    setTables,
    restaurantOrders,
    setRestaurantOrders,
    inventoryItems,
    setInventoryItems,
    suppliers,
    setSuppliers,
    purchaseOrders,
    setPurchaseOrders,
    staff,
    setStaff,
    notifications,
    setNotifications,
    activityLogs,
    setActivityLogs,

    currentRole,
    setCurrentRole,
    isAuthenticated,
    setIsAuthenticated,
    currentUser,
    login,
    logout,
    switchDemoUser,
    demoStaffList: STAYORA_DEMO_STAFF,
    toasts,
    addToast,
    removeToast,
    bookingQuery,
    setBookingQuery,
    activePrintDoc,
    setActivePrintDoc,
    globalSearchOpen,
    setGlobalSearchOpen,

    checkRoomAvailability,
    getRoomTypeAvailability,
    createBooking,
    checkInGuest,
    checkOutGuest,
    cancelReservation,
    assignOrMoveRoom,
    updateHousekeepingTask,
    toggleTaskChecklist,
    inspectRoom,
    createMaintenanceRequest,
    resolveMaintenance,
    createPOSOrder,
    updatePOSOrderStatus,
    addChargeToFolio,
    recordFolioPayment,
    receivePurchaseOrder,
    adjustInventoryStock,
    resetDemoData,
    exportDemoDataJSON,
    importDemoDataJSON
  };

  return (
    <StayoraContext.Provider value={value}>
      {children}
    </StayoraContext.Provider>
  );
}

export function useStayora() {
  const context = useContext(StayoraContext);
  if (!context) {
    throw new Error("useStayora must be used within a StayoraProvider");
  }
  return context;
}
