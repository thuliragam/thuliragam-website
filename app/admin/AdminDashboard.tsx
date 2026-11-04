
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

type Product = {
  id: number;
  name: string;
  image: string | null;
  description: string | null;
  harvest_days: string | null;
  price_50g: number | null;
  production_cost_50g?: number | null;
  profit_margin_percent?: number | null;
  status: string;
  taste: string | null;
  texture: string | null;
  uses: string | null;
  nutrition: string | null;
};

type GalleryImage = {
  id: number;
  title: string;
  image_url: string;
  display_order: number;
};

type ContactEnquiry = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: "New" | "Contacted" | "Converted" | "Closed";
  created_at: string;
};

type OrderLine = {
  product_name: string;
  quantity: number;
  unit: string;
  line_amount: number;
};

type SalesOrder = {
  id: number;
  customer_name: string;
  phone: string;
  address: string | null;
  product_name: string;
  quantity: number;
  unit: string;
  order_amount: number;
  order_date: string;
  delivery_date: string | null;
  order_status: "Pending" | "Confirmed" | "Packed" | "Dispatched" | "Delivered" | "Cancelled";
  payment_status: "Pending" | "Paid" | "Partially Paid";
  notes: string | null;
  items?: OrderLine[];
};

type Testimonial = {
  id: number;
  name: string;
  role: string;
  review: string;
  rating: number;
  display_order: number;
  is_active: boolean;
};

type InventoryItem = {
  id: number;
  category: "Seeds" | "Packaging" | "Finished Products" | "Other";
  item_name: string;
  unit: string;
  current_stock: number;
  reorder_level: number;
  cost_per_unit: number;
  created_at: string;
  updated_at: string;
};

type InventoryMovement = {
  id: number;
  item_id: number;
  movement_type: "Stock In" | "Stock Out" | "Set Balance";
  quantity: number;
  notes: string | null;
  created_at: string;
  inventory_items?: { item_name: string; unit: string } | null;
};

type SeedUsage = {
  id: number;
  inventory_item_id: number;
  crop_name: string;
  quantity_used: number;
  unit: string;
  production_batch_id: string;
  usage_date: string;
  notes: string | null;
  inventory_movement_id: number | null;
  created_at: string;
  inventory_items?: { item_name: string; unit: string } | null;
};

const emptyProduct = {
  name: "",
  image: "",
  description: "",
  harvest_days: "",
  price_50g: 0,
  status: "Out of Stock",
  taste: "",
  texture: "",
  uses: "",
  nutrition: "",
};

const statuses = [
  "Germinating",
  "Growing",
  "Ready to Harvest",
  "Out of Stock",
];

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  cover_image_alt: string | null;
  category: string;
  seo_title: string | null;
  seo_description: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

type AdminSection = "dashboard" | "microgreens" | "pricing" | "gallery" | "enquiries" | "customers" | "sales-report" | "orders" | "inventory" | "seed-usage" | "testimonials" | "blogs";

export default function AdminDashboard({ section = "dashboard" }: { section?: AdminSection }) {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [priceSuggestions, setPriceSuggestions] = useState<any[]>([]);
  const [pricingMessage, setPricingMessage] = useState("");
  const [pricingSavingId, setPricingSavingId] = useState<number | null>(null);
  const [suggestionSavingId, setSuggestionSavingId] = useState<number | null>(null);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [enquirySearch, setEnquirySearch] = useState("");
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [enquiriesLoading, setEnquiriesLoading] = useState(false);

  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderSaving, setOrderSaving] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [salesReportMonth, setSalesReportMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  });
  const [orderEditingId, setOrderEditingId] = useState<number | null>(null);
  const [orderItems, setOrderItems] = useState<OrderLine[]>([{ product_name: "", quantity: 1, unit: "g", line_amount: 0 }]);
  const [orderForm, setOrderForm] = useState({
    customer_name: "", phone: "", address: "",
    order_date: new Date().toISOString().slice(0, 10),
    delivery_date: "", order_status: "Pending" as SalesOrder["order_status"],
    payment_status: "Pending" as SalesOrder["payment_status"], notes: "",
  });

  const [testimonialEditingId, setTestimonialEditingId] = useState<number | null>(null);
  const [testimonialName, setTestimonialName] = useState("");
  const [testimonialRole, setTestimonialRole] = useState("Customer");
  const [testimonialReview, setTestimonialReview] = useState("");
  const [testimonialRating, setTestimonialRating] = useState(5);
  const [testimonialOrder, setTestimonialOrder] = useState(0);
  const [testimonialActive, setTestimonialActive] = useState(true);

  // INVENTORY MANAGEMENT
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [inventoryMovements, setInventoryMovements] = useState<InventoryMovement[]>([]);
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [inventorySaving, setInventorySaving] = useState(false);
  const [movementSaving, setMovementSaving] = useState(false);
  const [inventoryMessage, setInventoryMessage] = useState("");
  const [inventorySearch, setInventorySearch] = useState("");
  const [inventoryEditingId, setInventoryEditingId] = useState<number | null>(null);
  const [inventoryForm, setInventoryForm] = useState({
    category: "Seeds" as InventoryItem["category"],
    item_name: "",
    unit: "g",
    reorder_level: 0,
    cost_per_unit: 0,
  });
  const [movementForm, setMovementForm] = useState({
    item_id: "",
    movement_type: "Stock In" as InventoryMovement["movement_type"],
    quantity: 0,
    notes: "",
  });

  // SEED USAGE / PRODUCTION CONSUMPTION
  const [seedUsages, setSeedUsages] = useState<SeedUsage[]>([]);
  const [seedUsageLoading, setSeedUsageLoading] = useState(false);
  const [seedUsageSaving, setSeedUsageSaving] = useState(false);
  const [seedUsageMessage, setSeedUsageMessage] = useState("");
  const [seedUsageEditingId, setSeedUsageEditingId] = useState<number | null>(null);
  const [seedUsageForm, setSeedUsageForm] = useState({
    inventory_item_id: "",
    crop_name: "",
    quantity_used: "",
    unit: "g",
    production_batch_id: "",
    usage_date: new Date().toLocaleDateString("en-CA"),
    notes: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyProduct);

  const [galleryEditingId, setGalleryEditingId] = useState<number | null>(null);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryImage, setGalleryImage] = useState("");
  const [galleryOrder, setGalleryOrder] = useState(0);

  // BLOG MANAGEMENT
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogUploading, setBlogUploading] = useState(false);
  const [blogMessage, setBlogMessage] = useState("");
  const [blogEditingId, setBlogEditingId] = useState<number | null>(null);
  const [blogSearch, setBlogSearch] = useState("");
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    cover_image_alt: "",
    category: "Microgreens Knowledge",
    seo_title: "",
    seo_description: "",
    status: "draft" as "draft" | "published",
  });
  const blogEditorRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [gallerySaving, setGallerySaving] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [testimonialSaving, setTestimonialSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [galleryMessage, setGalleryMessage] = useState("");
  const [testimonialMessage, setTestimonialMessage] = useState("");

  // LOAD DASHBOARD DATA

  async function loadDashboard() {
    setLoading(true);
    setMessage("");

    // Read the existing local session first. This avoids an extra auth
    // network round-trip on every admin page navigation.
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    const currentUser = sessionData.session?.user;

    if (sessionError || !currentUser) {
      router.replace("/admin/login");
      return;
    }

    // Keep the database admin check; Supabase RLS remains the security layer.
    const { data: admin, error: adminError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", currentUser.id)
      .maybeSingle();

    if (adminError || !admin) {
      await supabase.auth.signOut();
      router.replace("/admin/login");
      return;
    }

    // Load only the data required by the page currently being viewed.
    // This avoids waiting for unrelated admin sections during navigation.
    try {
      switch (section) {
        case "dashboard":
        case "microgreens":
        case "pricing": {
          const { data, error } = await supabase
            .from("microgreens")
            .select("*")
            .order("id", { ascending: true });
          if (error) setMessage(error.message);
          else setProducts((data || []) as Product[]);
          if (section === "pricing") await loadPriceSuggestions();
          break;
        }
        case "gallery":
          await loadGallery();
          break;
        case "testimonials":
          await loadTestimonials();
          break;
        case "blogs":
          await loadBlogPosts();
          break;
        case "enquiries":
          await loadEnquiries();
          break;
        case "orders":
        case "customers":
        case "sales-report":
          await loadOrders();
          break;
        case "inventory":
          await loadInventory();
          break;
        case "seed-usage":
          await Promise.all([loadInventory(), loadSeedUsages()]);
          break;
      }
    } finally {
      setLoading(false);
    }
  }

  // MICROGREENS PRICING: cost and margin are editable per 50g pack.
  async function loadPriceSuggestions() {
    const { data, error } = await supabase
      .from("microgreen_price_suggestions")
      .select("*, microgreens(name)")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) setPricingMessage("Price history loading failed: " + error.message);
    else setPriceSuggestions(data || []);
  }

  function updatePricingField(id: number, field: "production_cost_50g" | "profit_margin_percent", value: number) {
    setProducts(current => current.map(item => item.id === id ? { ...item, [field]: value } : item));
  }
async function saveWebsitePrice(product: Product) {
  const price = Number(product.price_50g);

  if (!Number.isFinite(price) || price < 0) {
    setPricingMessage("Please enter a valid selling price.");
    return;
  }

  setPricingSavingId(product.id);
  setPricingMessage("");

  const { error } = await supabase
    .from("microgreens")
    .update({ price_50g: price })
    .eq("id", product.id);

  if (error) {
    setPricingMessage("Price update failed: " + error.message);
  } else {
    setProducts(current =>
      current.map(item =>
        item.id === product.id
          ? { ...item, price_50g: price }
          : item
      )
    );
    setPricingMessage(`${product.name}: website price saved successfully!`);
  }

  setPricingSavingId(null);
}
  async function savePricingSettings(product: Product) {
    setPricingSavingId(product.id);
    setPricingMessage("");
    const cost = Number(product.production_cost_50g || 0);
    const margin = Number(product.profit_margin_percent ?? 40);
    if (!Number.isFinite(cost) || cost < 0 || !Number.isFinite(margin) || margin < 0 || margin > 1000) {
      setPricingMessage("Enter a valid cost and margin (0–1000%).");
      setPricingSavingId(null);
      return;
    }
    const { error } = await supabase.from("microgreens").update({
      production_cost_50g: cost,
      profit_margin_percent: margin,
    }).eq("id", product.id);
    if (error) setPricingMessage("Settings save failed: " + error.message);
    else setPricingMessage(`${product.name}: cost and margin saved.`);
    setPricingSavingId(null);
  }

  async function createPriceSuggestion(product: Product) {
    const cost = Number(product.production_cost_50g || 0);
    const margin = Number(product.profit_margin_percent ?? 40);
    if (cost <= 0) {
      setPricingMessage(`Enter a production cost greater than ₹0 for ${product.name}.`);
      return;
    }
    setSuggestionSavingId(product.id);
    setPricingMessage("");
    const suggested = Math.ceil(cost * (1 + margin / 100));
    const { error } = await supabase.from("microgreen_price_suggestions").insert({
      microgreen_id: product.id,
      production_cost_50g: cost,
      profit_margin_percent: margin,
      suggested_price_50g: suggested,
      status: "Pending",
    });
    if (error) setPricingMessage("Suggestion failed: " + error.message);
    else {
      await loadPriceSuggestions();
      setPricingMessage(`Suggested price ₹${suggested} created for ${product.name}. Your website price is unchanged.`);
    }
    setSuggestionSavingId(null);
  }

  async function reviewPriceSuggestion(item: any, decision: "Approved" | "Rejected") {
    setPricingMessage("");
    const approvedPrice = Number(item.approved_price_50g ?? item.suggested_price_50g);
    if (decision === "Approved" && (!Number.isFinite(approvedPrice) || approvedPrice <= 0)) {
      setPricingMessage("Enter an approved selling price greater than ₹0.");
      return;
    }
    setSuggestionSavingId(Number(item.id));
    const { error } = await supabase.from("microgreen_price_suggestions").update({
      status: decision,
      approved_price_50g: decision === "Approved" ? approvedPrice : null,
      reviewed_at: new Date().toISOString(),
    }).eq("id", item.id);
    if (error) {
      setPricingMessage("Review failed: " + error.message);
    } else if (decision === "Approved") {
      const { error: productError } = await supabase.from("microgreens")
        .update({ price_50g: approvedPrice }).eq("id", item.microgreen_id);
      if (productError) setPricingMessage("Suggestion approved, but website price update failed: " + productError.message);
      else {
        setProducts(current => current.map(product => product.id === Number(item.microgreen_id) ? { ...product, price_50g: approvedPrice } : product));
        setPricingMessage("Approved! The live website price has been updated.");
      }
    } else setPricingMessage("Price suggestion rejected. Website price remains unchanged.");
    await loadPriceSuggestions();
    setSuggestionSavingId(null);
  }

  async function loadEnquiries() {
    setEnquiriesLoading(true);
    const { data, error } = await supabase
      .from("contact_enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setEnquiryMessage("Enquiries loading failed: " + error.message);
    } else {
      setEnquiries((data || []) as ContactEnquiry[]);
      setEnquiryMessage("");
    }
    setEnquiriesLoading(false);
  }

  async function updateEnquiryStatus(id: number, status: ContactEnquiry["status"]) {
    const { error } = await supabase
      .from("contact_enquiries")
      .update({ status })
      .eq("id", id);

    if (error) {
      setEnquiryMessage("Status update failed: " + error.message);
    } else {
      setEnquiries(current => current.map(item => item.id === id ? { ...item, status } : item));
      setEnquiryMessage("Enquiry status updated successfully!");
    }
  }

  async function deleteEnquiry(id: number) {
    const confirmed = window.confirm("Are you sure you want to delete this customer enquiry?");
    if (!confirmed) return;

    const { error } = await supabase
      .from("contact_enquiries")
      .delete()
      .eq("id", id);

    if (error) {
      setEnquiryMessage("Delete failed: " + error.message);
    } else {
      setEnquiries(current => current.filter(item => item.id !== id));
      setEnquiryMessage("Enquiry deleted successfully!");
    }
  }

  // SALES & ORDERS MANAGEMENT

  async function loadOrders() {
    setOrdersLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setOrderMessage("Orders loading failed: " + error.message);
    } else {
      const orderRows = (data || []) as SalesOrder[];
      const { data: itemRows, error: itemError } = await supabase
        .from("order_items")
        .select("order_id, product_name, quantity, unit, line_amount");
      if (itemError) {
        setOrderMessage("Order items loading failed: " + itemError.message);
        setOrders(orderRows);
      } else {
        const grouped = new Map<number, OrderLine[]>();
        (itemRows || []).forEach((item: any) => {
          const list = grouped.get(Number(item.order_id)) || [];
          list.push({ product_name: item.product_name, quantity: Number(item.quantity), unit: item.unit || "g", line_amount: Number(item.line_amount || 0) });
          grouped.set(Number(item.order_id), list);
        });
        setOrders(orderRows.map(order => ({ ...order, items: grouped.get(order.id) || [] })));
        setOrderMessage("");
      }
    }
    setOrdersLoading(false);
  }

  function clearOrderForm() {
    setOrderEditingId(null);
    setOrderItems([{ product_name: "", quantity: 1, unit: "g", line_amount: 0 }]);
    setOrderForm({
      customer_name: "", phone: "", address: "",
      order_date: new Date().toISOString().slice(0, 10),
      delivery_date: "", order_status: "Pending", payment_status: "Pending", notes: "",
    });
    setOrderMessage("");
  }

  function editOrder(order: SalesOrder) {
    setOrderEditingId(order.id);
    setOrderForm({
      customer_name: order.customer_name,
      phone: order.phone,
      address: order.address || "",
      order_date: order.order_date,
      delivery_date: order.delivery_date || "",
      order_status: order.order_status,
      payment_status: order.payment_status,
      notes: order.notes || "",
    });
    setOrderItems(order.items?.length ? order.items : [{ product_name: order.product_name, quantity: Number(order.quantity), unit: order.unit || "g", line_amount: Number(order.order_amount) }]);
    setOrderMessage("");
    document.getElementById("orders-form")?.scrollIntoView({ behavior: "smooth" });
  }

  async function saveOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validItems = orderItems.filter(item => item.product_name.trim() && Number(item.quantity) > 0 && Number(item.line_amount) >= 0);
    if (validItems.length === 0) {
      setOrderMessage("Please add at least one product with quantity and amount.");
      return;
    }
    setOrderSaving(true);
    setOrderMessage("");
    const totalAmount = validItems.reduce((sum, item) => sum + Number(item.line_amount || 0), 0);
    const orderData = {
      ...orderForm,
      customer_name: orderForm.customer_name.trim(),
      phone: orderForm.phone.trim(),
      address: orderForm.address.trim() || null,
      product_name: validItems.map(item => item.product_name.trim()).join(", "),
      quantity: validItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
      unit: validItems.every(item => item.unit === validItems[0].unit) ? validItems[0].unit : "mixed",
      order_amount: totalAmount,
      delivery_date: orderForm.delivery_date || null,
      notes: orderForm.notes.trim() || null,
    };

    let savedOrderId = orderEditingId;
    let saveError: any = null;
    if (orderEditingId) {
      const { error } = await supabase.from("orders").update(orderData).eq("id", orderEditingId);
      saveError = error;
    } else {
      const { data, error } = await supabase.from("orders").insert(orderData).select("id").single();
      saveError = error;
      if (data) savedOrderId = Number(data.id);
    }

    if (!saveError && savedOrderId) {
      if (orderEditingId) {
        const { error } = await supabase.from("order_items").delete().eq("order_id", savedOrderId);
        saveError = error;
      }
      if (!saveError) {
        const rows = validItems.map(item => ({ order_id: savedOrderId, product_name: item.product_name.trim(), quantity: Number(item.quantity), unit: item.unit, line_amount: Number(item.line_amount) }));
        const { error } = await supabase.from("order_items").insert(rows);
        saveError = error;
      }
    }

    if (saveError) {
      setOrderMessage("Order save failed: " + saveError.message);
    } else {
      const wasEditing = orderEditingId !== null;
      clearOrderForm();
      await loadOrders();
      setOrderMessage(wasEditing ? "Order updated successfully!" : "Order added successfully!");
    }
    setOrderSaving(false);
  }

  async function deleteOrder(id: number) {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) {
      setOrderMessage("Order delete failed: " + error.message);
    } else {
      setOrders(current => current.filter(order => order.id !== id));
      setOrderMessage("Order deleted successfully!");
    }
  }

  async function updateOrderField(
    id: number,
    field: "order_status" | "payment_status",
    value: SalesOrder["order_status"] | SalesOrder["payment_status"]
  ) {
    const { error } = await supabase.from("orders").update({ [field]: value }).eq("id", id);
    if (error) {
      setOrderMessage("Order update failed: " + error.message);
    } else {
      setOrders(current => current.map(order => order.id === id ? { ...order, [field]: value } : order));
      setOrderMessage("Order updated successfully!");
    }
  }

  // INVENTORY DATA & ACTIONS

  async function loadInventory() {
    setInventoryLoading(true);
    const [{ data: itemData, error: itemError }, { data: movementData, error: movementError }] = await Promise.all([
      supabase.from("inventory_items").select("*").order("category", { ascending: true }).order("item_name", { ascending: true }),
      supabase.from("inventory_movements").select("*, inventory_items(item_name, unit)").order("created_at", { ascending: false }).limit(100),
    ]);

    if (itemError) {
      setInventoryMessage("Inventory loading failed: " + itemError.message);
    } else if (movementError) {
      setInventoryItems((itemData || []) as InventoryItem[]);
      setInventoryMessage("Stock history loading failed: " + movementError.message);
    } else {
      setInventoryItems((itemData || []) as InventoryItem[]);
      setInventoryMovements((movementData || []) as InventoryMovement[]);
      setInventoryMessage("");
    }
    setInventoryLoading(false);
  }

  function clearInventoryForm() {
    setInventoryEditingId(null);
    setInventoryForm({ category: "Seeds", item_name: "", unit: "g", reorder_level: 0, cost_per_unit: 0 });
    setInventoryMessage("");
  }

  function editInventoryItem(item: InventoryItem) {
    setInventoryEditingId(item.id);
    setInventoryForm({
      category: item.category,
      item_name: item.item_name,
      unit: item.unit,
      reorder_level: Number(item.reorder_level || 0),
      cost_per_unit: Number(item.cost_per_unit || 0),
    });
    setInventoryMessage("");
    document.getElementById("inventory-form")?.scrollIntoView({ behavior: "smooth" });
  }

  async function saveInventoryItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setInventorySaving(true);
    setInventoryMessage("");
    const payload = {
      category: inventoryForm.category,
      item_name: inventoryForm.item_name.trim(),
      unit: inventoryForm.unit.trim(),
      reorder_level: Number(inventoryForm.reorder_level || 0),
      cost_per_unit: Number(inventoryForm.cost_per_unit || 0),
    };
    const result = inventoryEditingId
      ? await supabase.from("inventory_items").update(payload).eq("id", inventoryEditingId)
      : await supabase.from("inventory_items").insert({ ...payload, current_stock: 0 });
    if (result.error) {
      setInventoryMessage("Item save failed: " + result.error.message);
    } else {
      const wasEditing = inventoryEditingId !== null;
      clearInventoryForm();
      await loadInventory();
      setInventoryMessage(wasEditing ? "Inventory item updated successfully!" : "Inventory item added. Record opening stock using Stock In.");
    }
    setInventorySaving(false);
  }

  async function recordStockMovement(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const quantity = Number(movementForm.quantity);
    if (!movementForm.item_id || quantity <= 0) {
      setInventoryMessage("Select an item and enter a quantity greater than zero.");
      return;
    }
    setMovementSaving(true);
    setInventoryMessage("");
    const { error } = await supabase.from("inventory_movements").insert({
      item_id: Number(movementForm.item_id),
      movement_type: movementForm.movement_type,
      quantity,
      notes: movementForm.notes.trim() || null,
    });
    if (error) {
      setInventoryMessage("Stock update failed: " + error.message);
    } else {
      setMovementForm({ item_id: "", movement_type: "Stock In", quantity: 0, notes: "" });
      await loadInventory();
      setInventoryMessage("Stock movement saved and current stock updated!");
    }
    setMovementSaving(false);
  }

  // SEED USAGE MANAGEMENT
  async function loadSeedUsages() {
    setSeedUsageLoading(true);
    const { data, error } = await supabase
      .from("seed_usage")
      .select("*, inventory_items(item_name, unit)")
      .order("usage_date", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      setSeedUsageMessage("Seed usage loading failed: " + error.message);
    } else {
      setSeedUsages((data || []) as SeedUsage[]);
      setSeedUsageMessage("");
    }
    setSeedUsageLoading(false);
  }

  function clearSeedUsageForm() {
    setSeedUsageEditingId(null);
    setSeedUsageForm({
      inventory_item_id: "",
      crop_name: "",
      quantity_used: "",
      unit: "g",
      production_batch_id: "",
      usage_date: new Date().toLocaleDateString("en-CA"),
      notes: "",
    });
    setSeedUsageMessage("");
  }

  function editSeedUsage(item: SeedUsage) {
    setSeedUsageEditingId(item.id);
    setSeedUsageForm({
      inventory_item_id: String(item.inventory_item_id),
      crop_name: item.crop_name,
      quantity_used: String(item.quantity_used),
      unit: item.unit || "g",
      production_batch_id: item.production_batch_id,
      usage_date: item.usage_date,
      notes: item.notes || "",
    });
    setSeedUsageMessage("");
    document.getElementById("seed-usage-form")?.scrollIntoView({ behavior: "smooth" });
  }

  async function saveSeedUsage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const quantity = Number(seedUsageForm.quantity_used);
    if (!seedUsageForm.inventory_item_id || !seedUsageForm.crop_name.trim() ||
        !seedUsageForm.production_batch_id.trim() || !Number.isFinite(quantity) || quantity <= 0) {
      setSeedUsageMessage("Please select a seed and enter crop, batch ID and a quantity greater than zero.");
      return;
    }

    const selectedSeed = inventoryItems.find(item => item.id === Number(seedUsageForm.inventory_item_id));
    if (!selectedSeed || selectedSeed.category !== "Seeds") {
      setSeedUsageMessage("Please select an item from the Seeds category.");
      return;
    }

    setSeedUsageSaving(true);
    setSeedUsageMessage("");
    const payload = {
      inventory_item_id: Number(seedUsageForm.inventory_item_id),
      crop_name: seedUsageForm.crop_name.trim(),
      quantity_used: quantity,
      unit: selectedSeed.unit,
      production_batch_id: seedUsageForm.production_batch_id.trim(),
      usage_date: seedUsageForm.usage_date,
      notes: seedUsageForm.notes.trim() || null,
    };

    const result = seedUsageEditingId
      ? await supabase.from("seed_usage").update(payload).eq("id", seedUsageEditingId)
      : await supabase.from("seed_usage").insert(payload);

    if (result.error) {
      setSeedUsageMessage("Seed usage save failed: " + result.error.message);
    } else {
      const wasEditing = seedUsageEditingId !== null;
      clearSeedUsageForm();
      await Promise.all([loadSeedUsages(), loadInventory()]);
      setSeedUsageMessage(wasEditing
        ? "Seed usage updated and stock recalculated successfully!"
        : "Seed usage saved and seed stock deducted successfully!");
    }
    setSeedUsageSaving(false);
  }

  async function deleteSeedUsage(id: number) {
    if (!window.confirm("Delete this seed usage entry? Its linked stock deduction will also be reversed.")) return;
    const { error } = await supabase.from("seed_usage").delete().eq("id", id);
    if (error) {
      setSeedUsageMessage("Seed usage delete failed: " + error.message);
    } else {
      await Promise.all([loadSeedUsages(), loadInventory()]);
      setSeedUsageMessage("Seed usage deleted and stock recalculated successfully!");
    }
  }


  async function loadTestimonials() {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      setTestimonialMessage("Testimonials loading failed: " + error.message);
    } else {
      setTestimonials((data || []) as Testimonial[]);
      setTestimonialMessage("");
    }
  }

  async function loadGallery() {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      setGalleryMessage("Gallery loading failed: " + error.message);
    } else {
      setGallery((data || []) as GalleryImage[]);
      setGalleryMessage("");
    }
  }

  useEffect(() => {
    void loadDashboard();
    // Reload the relevant data when the selected admin route changes.
  }, [section]);

  // MICROGREENS MANAGEMENT

  function startEdit(product: Product) {
    setEditingId(product.id);

    setForm({
      name: product.name || "",
      image: product.image || "",
      description: product.description || "",
      harvest_days: product.harvest_days || "",
      price_50g: product.price_50g ?? 0,
      status: product.status || "Out of Stock",
      taste: product.taste || "",
      texture: product.texture || "",
      uses: product.uses || "",
      nutrition: product.nutrition || "",
    });

    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startNewProduct() {
    setEditingId(null);
    setForm(emptyProduct);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadProductImage(file: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size must be less than 5 MB.");
      return;
    }

    setUploading(true);
    setMessage("");

    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-");

    const filePath = `products/${Date.now()}-${safeName}`;

    const { data, error } = await supabase.storage
      .from("microgreens-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      setMessage("Image upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("microgreens-images")
      .getPublicUrl(data.path);

    setForm((previous) => ({
      ...previous,
      image: publicData.publicUrl,
    }));

    setMessage("Image uploaded! Now save your product.");
    setUploading(false);
  }

  async function saveProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const productData = {
      ...form,
      name: form.name.trim(),
      image: form.image.trim() || null,
      price_50g: Number(form.price_50g),
    };

    const result = editingId
      ? await supabase
          .from("microgreens")
          .update(productData)
          .eq("id", editingId)
      : await supabase.from("microgreens").insert(productData);

    if (result.error) {
      setMessage("Save failed: " + result.error.message);
    } else {
      setEditingId(null);
      setForm(emptyProduct);
      await loadDashboard();
      setMessage("Product saved successfully!");
    }

    setSaving(false);
  }

  // GALLERY MANAGEMENT

  function startNewGalleryImage() {
    setGalleryEditingId(null);
    setGalleryTitle("");
    setGalleryImage("");
    setGalleryOrder(gallery.length + 1);
    setGalleryMessage("");
  }

  function editGalleryImage(item: GalleryImage) {
    setGalleryEditingId(item.id);
    setGalleryTitle(item.title);
    setGalleryImage(item.image_url);
    setGalleryOrder(item.display_order);
    setGalleryMessage("");

    document.getElementById("gallery-form")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  async function uploadGalleryImage(file: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setGalleryMessage("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setGalleryMessage("Image size must be less than 5 MB.");
      return;
    }

    setGalleryUploading(true);
    setGalleryMessage("");

    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-");

    const filePath = `gallery/${Date.now()}-${safeName}`;

    const { data, error } = await supabase.storage
      .from("microgreens-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      setGalleryMessage("Gallery upload failed: " + error.message);
      setGalleryUploading(false);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("microgreens-images")
      .getPublicUrl(data.path);

    setGalleryImage(publicData.publicUrl);
    setGalleryMessage("Photo uploaded! Save the gallery entry next.");

    setGalleryUploading(false);
  }

  async function saveGalleryImage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!galleryImage) {
      setGalleryMessage("Please upload a gallery photo first.");
      return;
    }

    setGallerySaving(true);
    setGalleryMessage("");

    const galleryData = {
      title: galleryTitle.trim(),
      image_url: galleryImage,
      display_order: Number(galleryOrder),
    };

    const result = galleryEditingId
      ? await supabase
          .from("gallery_images")
          .update(galleryData)
          .eq("id", galleryEditingId)
      : await supabase
          .from("gallery_images")
          .insert(galleryData);

    if (result.error) {
      setGalleryMessage("Save failed: " + result.error.message);
    } else {
      setGalleryEditingId(null);
      setGalleryTitle("");
      setGalleryImage("");
      setGalleryOrder(gallery.length + 1);

      await loadGallery();

      setGalleryMessage("Gallery photo saved successfully!");
    }

    setGallerySaving(false);
  }

  async function deleteGalleryImage(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery photo?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", id);

    if (error) {
      setGalleryMessage("Delete failed: " + error.message);
    } else {
      await loadGallery();
      setGalleryMessage("Gallery entry deleted successfully!");
    }
  }

  // TESTIMONIALS MANAGEMENT

  function startNewTestimonial() {
    setTestimonialEditingId(null);
    setTestimonialName("");
    setTestimonialRole("Customer");
    setTestimonialReview("");
    setTestimonialRating(5);
    setTestimonialOrder(testimonials.length + 1);
    setTestimonialActive(true);
    setTestimonialMessage("");
  }

  function editTestimonial(item: Testimonial) {
    setTestimonialEditingId(item.id);
    setTestimonialName(item.name);
    setTestimonialRole(item.role || "Customer");
    setTestimonialReview(item.review);
    setTestimonialRating(item.rating);
    setTestimonialOrder(item.display_order);
    setTestimonialActive(item.is_active);
    setTestimonialMessage("");
    document.getElementById("testimonial-form")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  async function saveTestimonial(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTestimonialSaving(true);
    setTestimonialMessage("");

    const testimonialData = {
      name: testimonialName.trim(),
      role: testimonialRole.trim() || "Customer",
      review: testimonialReview.trim(),
      rating: Number(testimonialRating),
      display_order: Number(testimonialOrder),
      is_active: testimonialActive,
    };

    const result = testimonialEditingId
      ? await supabase
          .from("testimonials")
          .update(testimonialData)
          .eq("id", testimonialEditingId)
      : await supabase.from("testimonials").insert(testimonialData);

    if (result.error) {
      setTestimonialMessage("Save failed: " + result.error.message);
    } else {
      startNewTestimonial();
      await loadTestimonials();
      setTestimonialMessage("Customer review saved successfully!");
    }

    setTestimonialSaving(false);
  }

  async function deleteTestimonial(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer review?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      setTestimonialMessage("Delete failed: " + error.message);
    } else {
      await loadTestimonials();
      setTestimonialMessage("Customer review deleted successfully!");
    }
  }

  // BLOG MANAGEMENT
  async function loadBlogPosts() {
    setBlogLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setBlogMessage("Blog posts loading failed: " + error.message);
    } else {
      setBlogPosts((data || []) as BlogPost[]);
      setBlogMessage("");
    }
    setBlogLoading(false);
  }

  function makeBlogSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function clearBlogForm() {
    setBlogEditingId(null);
    setBlogForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      cover_image: "",
      cover_image_alt: "",
      category: "Microgreens Knowledge",
      seo_title: "",
      seo_description: "",
      status: "draft",
    });
    setBlogMessage("");
    if (blogEditorRef.current) blogEditorRef.current.innerHTML = "";
  }

  function editBlogPost(post: BlogPost) {
    setBlogEditingId(post.id);
    setBlogForm({
      title: post.title || "",
      slug: post.slug || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      cover_image: post.cover_image || "",
      cover_image_alt: post.cover_image_alt || "",
      category: post.category || "Microgreens Knowledge",
      seo_title: post.seo_title || "",
      seo_description: post.seo_description || "",
      status: post.status || "draft",
    });
    setBlogMessage("");
    if (blogEditorRef.current) blogEditorRef.current.innerHTML = post.content || "";
    document.getElementById("blog-form")?.scrollIntoView({ behavior: "smooth" });
  }

  async function uploadBlogImage(file: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setBlogMessage("Please select a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setBlogMessage("Image size must be less than 5 MB.");
      return;
    }

    setBlogUploading(true);
    setBlogMessage("");
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, "-");
    const filePath = `blog/${Date.now()}-${safeName}`;

    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      setBlogMessage("Blog image upload failed: " + error.message);
      setBlogUploading(false);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(data.path);

    setBlogForm(current => ({ ...current, cover_image: publicData.publicUrl }));
    setBlogMessage("Cover image uploaded. Save the blog post to keep your changes.");
    setBlogUploading(false);
  }

  function formatBlogText(command: string, value?: string) {
    const editor = blogEditorRef.current;
    if (!editor) {
      setBlogMessage("The article editor is not ready yet. Please try again.");
      return;
    }
    editor.focus();
    document.execCommand(command, false, value);
    const content = editor.innerHTML;
    setBlogForm(current => ({ ...current, content }));
  }

  function insertBlogHtml(html: string) {
    const editor = blogEditorRef.current;
    if (!editor) {
      setBlogMessage("The article editor is not ready yet. Please try again.");
      return;
    }
    editor.focus();
    document.execCommand("insertHTML", false, html);
    const content = editor.innerHTML;
    setBlogForm(current => ({ ...current, content }));
  }

  async function uploadBlogInlineImage(file: File) {
    if (!file || !file.type.startsWith("image/")) {
      setBlogMessage("Please select a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setBlogMessage("Inline images must be smaller than 5 MB.");
      return;
    }
    setBlogUploading(true);
    setBlogMessage("");
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, "-");
    const { data, error } = await supabase.storage.from("blog-images").upload(
      `inline-images/${Date.now()}-${safeName}`, file,
      { cacheControl: "3600", contentType: file.type, upsert: false }
    );
    if (error) {
      setBlogMessage("Image upload failed: " + error.message);
    } else {
      const { data: publicData } = supabase.storage.from("blog-images").getPublicUrl(data.path);
      insertBlogHtml(`<p><img src="${publicData.publicUrl}" alt="${safeName.replace(/\.[^.]+$/, "").replace(/-/g, " ")}" style="max-width:100%;height:auto;border-radius:12px;margin:20px 0" /></p>`);
      setBlogMessage("Image inserted into the article.");
    }
    setBlogUploading(false);
  }

  async function uploadBlogVideo(file: File) {
    if (!file || !file.type.startsWith("video/")) {
      setBlogMessage("Please select a valid video file.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setBlogMessage("Video must be smaller than 50 MB. For larger videos, use a YouTube link.");
      return;
    }
    setBlogUploading(true);
    setBlogMessage("Uploading video...");
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, "-");
    const { data, error } = await supabase.storage.from("blog-images").upload(
      `videos/${Date.now()}-${safeName}`, file,
      { cacheControl: "3600", contentType: file.type, upsert: false }
    );
    if (error) {
      setBlogMessage("Video upload failed: " + error.message);
    } else {
      const { data: publicData } = supabase.storage.from("blog-images").getPublicUrl(data.path);
      insertBlogHtml(`<p><video controls playsinline preload="metadata" style="width:100%;max-width:800px;border-radius:12px;margin:20px 0"><source src="${publicData.publicUrl}" type="${file.type}"></video></p>`);
      setBlogMessage("Video inserted into the article.");
    }
    setBlogUploading(false);
  }

  function insertYouTubeVideo() {
    const entered = window.prompt("Paste the YouTube video URL:");
    if (!entered) return;
    let videoId = "";
    try {
      const url = new URL(entered);
      if (url.hostname.includes("youtu.be")) videoId = url.pathname.slice(1);
      else if (url.hostname.includes("youtube.com")) videoId = url.searchParams.get("v") || url.pathname.split("/").pop() || "";
    } catch {
      setBlogMessage("Please enter a valid YouTube URL.");
      return;
    }
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      setBlogMessage("That YouTube link does not look valid. Please copy the normal video URL.");
      return;
    }
    insertBlogHtml(`<div data-youtube-video="${videoId}" style="position:relative;aspect-ratio:16/9;margin:24px 0"><iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="YouTube video" style="position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:12px" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`);
    setBlogMessage("YouTube video inserted into the article.");
  }

  async function saveBlogPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const title = blogForm.title.trim();
    const slug = makeBlogSlug(blogForm.slug || title);

    const editorContent = (blogEditorRef.current?.innerHTML ?? blogForm.content).trim();

    if (!title || !slug || !editorContent) {
      setBlogMessage("Please enter a title, URL slug and blog content.");
      return;
    }

    setBlogSaving(true);
    setBlogMessage("");
    const payload = {
      title,
      slug,
      excerpt: blogForm.excerpt.trim() || null,
      content: editorContent,
      cover_image: blogForm.cover_image.trim() || null,
      cover_image_alt: blogForm.cover_image_alt.trim() || null,
      category: blogForm.category,
      seo_title: blogForm.seo_title.trim() || null,
      seo_description: blogForm.seo_description.trim() || null,
      status: blogForm.status,
      published_at: blogForm.status === "published"
        ? (blogPosts.find(post => post.id === blogEditingId)?.published_at || new Date().toISOString())
        : null,
      updated_at: new Date().toISOString(),
    };

    const result = blogEditingId
      ? await supabase.from("blog_posts").update(payload).eq("id", blogEditingId)
      : await supabase.from("blog_posts").insert(payload);

    if (result.error) {
      setBlogMessage("Blog save failed: " + result.error.message);
    } else {
      clearBlogForm();
      await loadBlogPosts();
      setBlogMessage(blogEditingId ? "Blog post updated successfully!" : "Blog post saved successfully!");
    }
    setBlogSaving(false);
  }

  async function deleteBlogPost(id: number) {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      setBlogMessage("Blog delete failed: " + error.message);
    } else {
      setBlogPosts(current => current.filter(post => post.id !== id));
      if (blogEditingId === id) clearBlogForm();
      setBlogMessage("Blog post deleted successfully.");
    }
  }

  async function toggleBlogPublish(post: BlogPost) {
    const nextStatus = post.status === "published" ? "draft" : "published";
    const { error } = await supabase.from("blog_posts").update({
      status: nextStatus,
      published_at: nextStatus === "published"
        ? (post.published_at || new Date().toISOString())
        : null,
      updated_at: new Date().toISOString(),
    }).eq("id", post.id);

    if (error) {
      setBlogMessage("Blog status update failed: " + error.message);
    } else {
      await loadBlogPosts();
      setBlogMessage(nextStatus === "published" ? "Blog post published!" : "Blog post moved to drafts.");
    }
  }

  // LOGOUT

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-emerald-50">
        <p className="font-semibold text-emerald-800">
          Loading Thuliragam Dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-emerald-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
              Thuliragam
            </p>

            <h1 className="mt-2 text-3xl font-bold text-emerald-950">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Grow Healthier Tomorrow 🌱
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-xl border border-red-200 bg-white px-5 py-3 font-semibold text-red-600 hover:bg-red-50"
          >
            Sign Out
          </button>
        </header>

        {/* DASHBOARD STATISTICS */}
        {section === "dashboard" && (
          <> 

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="mt-2 text-3xl font-bold text-emerald-800">
              {products.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Ready to Harvest</p>
            <p className="mt-2 text-3xl font-bold text-emerald-800">
              {products.filter(p => p.status === "Ready to Harvest").length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Growing</p>
            <p className="mt-2 text-3xl font-bold text-emerald-800">
              {products.filter(p => p.status === "Growing").length}
            </p>
          </div>
        </div>


          </>
        )}
        {/* MICROGREENS FORM */}
        {section === "microgreens" && (
          <> 

        <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-emerald-950">
            {editingId ? "Edit Microgreen" : "Add New Microgreen"}
          </h2>

          <form onSubmit={saveProduct} className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Product Name
              </label>

              <input
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border p-3"
                placeholder="Sunflower"
              />
            </div>

            {/* PRODUCT IMAGE UPLOAD */}

            <div className="sm:col-span-2 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 p-5">
              <label className="mb-3 block text-sm font-bold text-emerald-950">
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) uploadProductImage(file);
                  e.target.value = "";
                }}
                className="w-full rounded-xl border border-emerald-200 bg-white p-3 text-sm"
              />

              <p className="mt-2 text-xs text-gray-500">
                JPG, PNG or WebP · Maximum 5 MB
              </p>

              {uploading && (
                <p className="mt-3 font-semibold text-emerald-700">
                  Uploading image...
                </p>
              )}

              {form.image && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-semibold text-emerald-800">
                    Image Preview
                  </p>

                  <img
                    src={form.image}
                    alt="Product preview"
                    className="h-40 w-40 rounded-xl border border-emerald-200 object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, image: "" })}
                    className="mt-3 block text-sm font-semibold text-red-600 hover:underline"
                  >
                    Remove image from form
                  </button>
                </div>
              )}

              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold">
                  Or enter an existing image URL
                </label>

                <input
                  value={form.image}
                  onChange={e => setForm({ ...form, image: e.target.value })}
                  className="w-full rounded-xl border p-3"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Price per 50g (₹)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price_50g}
                onChange={e => setForm({ ...form, price_50g: Number(e.target.value) })}
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Harvest Days
              </label>

              <input
                value={form.harvest_days}
                onChange={e => setForm({ ...form, harvest_days: e.target.value })}
                className="w-full rounded-xl border p-3"
                placeholder="8–12 days"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Growth Status
              </label>

              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-xl border p-3"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Taste
              </label>

              <input
                value={form.taste}
                onChange={e => setForm({ ...form, taste: e.target.value })}
                className="w-full rounded-xl border p-3"
                placeholder="Mild, nutty..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Texture
              </label>

              <input
                value={form.texture}
                onChange={e => setForm({ ...form, texture: e.target.value })}
                className="w-full rounded-xl border p-3"
                placeholder="Crispy, tender..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Uses
              </label>

              <input
                value={form.uses}
                onChange={e => setForm({ ...form, uses: e.target.value })}
                className="w-full rounded-xl border p-3"
                placeholder="Salads, sandwiches..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Description
              </label>

              <textarea
                rows={3}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Nutrition
              </label>

              <textarea
                rows={2}
                value={form.nutrition}
                onChange={e => setForm({ ...form, nutrition: e.target.value })}
                className="w-full rounded-xl border p-3"
              />
            </div>

            <div className="flex flex-wrap gap-3 sm:col-span-2">
              <button
                type="submit"
                disabled={saving || uploading}
                className="rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white hover:bg-emerald-800 disabled:opacity-50"
              >
                {saving ? "Saving..." : editingId ? "Update Product" : "Add Product"}
              </button>

              <button
                type="button"
                onClick={startNewProduct}
                className="rounded-xl border px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Clear Form
              </button>
            </div>
          </form>

          {message && (
            <p
              role="status"
              className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"
            >
              {message}
            </p>
          )}
        </section>

        {/* MICROGREENS LIST */}

        <section className="mb-10 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-emerald-950">
            Your Microgreens ({products.length})
          </h2>

          <div className="space-y-3">
            {products.map(product => (
              <div
                key={product.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-100 p-4"
              >
                <div className="flex items-center gap-4">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 rounded-xl border object-cover"
                    />
                  )}

                  <div>
                    <h3 className="font-bold text-emerald-950">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      ₹{product.price_50g ?? 0} / 50g · {product.harvest_days || "Harvest days not set"}
                    </p>

                    <p className="mt-1 text-xs font-semibold text-emerald-700">
                      {product.status}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => startEdit(product)}
                  className="rounded-xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
                >
                  Edit
                </button>
              </div>
            ))}

            {products.length === 0 && (
              <p className="py-8 text-center text-gray-500">
                No microgreens found.
              </p>
            )}
          </div>
        </section>

          </>
        )}

        {/* AUTOMATIC MICROGREENS PRICING */}
        {section === "pricing" && (
          <>
            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Pricing control</p>
              <h2 className="mt-1 text-2xl font-bold text-emerald-950">Automatic Microgreens Pricing</h2>
              <p className="mt-2 text-sm text-gray-600">Enter the complete production cost for one 50g pack. Set a separate profit margin for every crop. Save settings, then generate a suggestion for review.</p>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-emerald-50 text-emerald-950"><tr><th className="p-3">Microgreen</th><th className="p-3">Current website price</th><th className="p-3">Cost / 50g (₹)</th><th className="p-3">Profit margin (%)</th><th className="p-3">Suggested price</th><th className="p-3">Actions</th></tr></thead>
                  <tbody>{products.map(product => {
                    const cost = Number(product.production_cost_50g || 0);
                    const margin = Number(product.profit_margin_percent ?? 40);
                    const suggested = cost > 0 ? Math.ceil(cost * (1 + margin / 100)) : 0;
                    return <tr key={product.id} className="border-b border-gray-100">
                      <td className="p-3 font-semibold text-emerald-950">{product.name}</td>
                      <td className="p-3">₹{Number(product.price_50g || 0).toFixed(2)}</td>
                      <td className="p-3"><input type="number" min="0" step="0.01" value={product.production_cost_50g ?? 0} onChange={e => updatePricingField(product.id, "production_cost_50g", Number(e.target.value))} className="w-28 rounded-lg border border-gray-300 px-3 py-2" /></td>
                      <td className="p-3"><input type="number" min="0" max="1000" step="0.5" value={product.profit_margin_percent ?? 40} onChange={e => updatePricingField(product.id, "profit_margin_percent", Number(e.target.value))} className="w-24 rounded-lg border border-gray-300 px-3 py-2" /></td>
                      <td className="p-3 font-bold text-emerald-800">{suggested > 0 ? `₹${suggested}` : "—"}</td>
                      <td className="p-3"><div className="flex flex-wrap gap-2"><button type="button" disabled={pricingSavingId === product.id || suggestionSavingId === product.id} onClick={() => savePricingSettings(product)} className="rounded-lg border border-emerald-200 px-3 py-2 font-semibold text-emerald-800 disabled:opacity-50">{pricingSavingId === product.id ? "Saving…" : "Save"}</button><button type="button" disabled={suggestionSavingId === product.id || pricingSavingId === product.id} onClick={() => createPriceSuggestion(product)} className="rounded-lg bg-emerald-700 px-3 py-2 font-semibold text-white disabled:opacity-50">{suggestionSavingId === product.id ? "Creating…" : "Suggest price"}</button></div></td>
                    </tr>;
                  })}</tbody>
                </table>
              </div>
            </section>

            <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-emerald-950">Price approval & history</h3>
              <p className="mt-1 text-sm text-gray-500">Only approving a pending suggestion changes the public website price.</p>
              {priceSuggestions.length === 0 ? <p className="mt-5 rounded-xl bg-emerald-50 p-5 text-center text-sm text-gray-600">No price suggestions yet.</p> : <div className="mt-5 space-y-3">{priceSuggestions.map(item => <div key={item.id} className="rounded-2xl border border-emerald-100 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-bold text-emerald-950">{item.microgreens?.name || `Microgreen #${item.microgreen_id}`}</p><p className="mt-1 text-sm text-gray-600">Cost ₹{Number(item.production_cost_50g).toFixed(2)} · Margin {Number(item.profit_margin_percent)}% · Suggested ₹{Number(item.suggested_price_50g).toFixed(2)}</p><p className="mt-1 text-xs text-gray-400">{new Date(item.created_at).toLocaleString()}</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === "Approved" ? "bg-emerald-100 text-emerald-800" : item.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"}`}>{item.status}</span></div>{item.status === "Pending" && <div className="mt-4 flex flex-wrap items-center gap-3"><label className="text-sm font-semibold text-gray-700">Approved price ₹<input type="number" min="0.01" step="0.01" value={item.approved_price_50g ?? item.suggested_price_50g} onChange={e => setPriceSuggestions(current => current.map(row => row.id === item.id ? { ...row, approved_price_50g: Number(e.target.value) } : row))} className="ml-2 w-28 rounded-lg border border-gray-300 px-3 py-2" /></label><button type="button" disabled={suggestionSavingId === Number(item.id)} onClick={() => reviewPriceSuggestion(item, "Approved")} className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white disabled:opacity-50">Approve & publish</button><button type="button" disabled={suggestionSavingId === Number(item.id)} onClick={() => reviewPriceSuggestion(item, "Rejected")} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-50">Reject</button></div>}{item.status === "Approved" && <p className="mt-2 text-sm font-semibold text-emerald-700">Published price: ₹{Number(item.approved_price_50g).toFixed(2)}</p>}</div>)}</div>}
            </section>
            {pricingMessage && <p role="status" className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800">{pricingMessage}</p>}
          </>
        )}

        {/* GALLERY MANAGEMENT */}
        {section === "gallery" && (
          <> 

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                Website Photos
              </p>

              <h2 className="mt-1 text-2xl font-bold text-emerald-950">
                Gallery Management
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Upload and manage photos displayed on your website.
              </p>
            </div>

            <button
              type="button"
              onClick={startNewGalleryImage}
              className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800"
            >
              + Add Gallery Photo
            </button>
          </div>

          {/* GALLERY FORM */}

          <div
            id="gallery-form"
            className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
          >
            <h3 className="mb-5 text-lg font-bold text-emerald-950">
              {galleryEditingId ? "Edit Gallery Photo" : "Add New Gallery Photo"}
            </h3>

            <form onSubmit={saveGalleryImage} className="grid gap-4 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Photo Title
                </label>

                <input
                  required
                  value={galleryTitle}
                  onChange={e => setGalleryTitle(e.target.value)}
                  className="w-full rounded-xl border bg-white p-3"
                  placeholder="Fresh Microgreens"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Display Order
                </label>

                <input
                  type="number"
                  min="1"
                  value={galleryOrder}
                  onChange={e => setGalleryOrder(Number(e.target.value))}
                  className="w-full rounded-xl border bg-white p-3"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold">
                  Upload Gallery Photo
                </label>

                <input
                  type="file"
                  accept="image/*"
                  disabled={galleryUploading}
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) uploadGalleryImage(file);
                    e.target.value = "";
                  }}
                  className="w-full rounded-xl border bg-white p-3 text-sm"
                />

                <p className="mt-2 text-xs text-gray-500">
                  JPG, PNG or WebP · Maximum 5 MB
                </p>
              </div>

              {galleryUploading && (
                <p className="sm:col-span-2 font-semibold text-emerald-700">
                  Uploading gallery photo...
                </p>
              )}

              {galleryImage && (
                <div className="sm:col-span-2">
                  <p className="mb-2 text-sm font-semibold text-emerald-800">
                    Photo Preview
                  </p>

                  <img
                    src={galleryImage}
                    alt="Gallery preview"
                    className="h-48 w-full max-w-sm rounded-xl border border-emerald-200 bg-white object-cover"
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-3 sm:col-span-2">
                <button
                  type="submit"
                  disabled={gallerySaving || galleryUploading || !galleryImage}
                  className="rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white hover:bg-emerald-800 disabled:opacity-50"
                >
                  {gallerySaving
                    ? "Saving..."
                    : galleryEditingId
                    ? "Update Gallery Photo"
                    : "Save Gallery Photo"}
                </button>

                <button
                  type="button"
                  onClick={startNewGalleryImage}
                  className="rounded-xl border border-emerald-200 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Clear Form
                </button>
              </div>
            </form>

            {galleryMessage && (
              <p
                role="status"
                className="mt-5 rounded-xl bg-white p-3 text-sm text-emerald-800"
              >
                {galleryMessage}
              </p>
            )}
          </div>

          {/* GALLERY PHOTO LIST */}

          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-emerald-950">
              Website Gallery ({gallery.length})
            </h3>
          </div>

          {gallery.length === 0 ? (
            <p className="rounded-xl bg-emerald-50 py-8 text-center text-gray-500">
              No gallery photos found.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map(item => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-emerald-100 bg-white"
                >
                  <div className="relative h-48 bg-emerald-50">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h4 className="font-bold text-emerald-950">
                      {item.title}
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                      Display order: {item.display_order}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => editGalleryImage(item)}
                        className="flex-1 rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteGalleryImage(item.id)}
                        className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>


          </>
        )}
        {/* CUSTOMER ENQUIRIES MANAGEMENT */}
        {section === "enquiries" && (
          <> 

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Customer Messages</p>
              <h2 className="mt-1 text-2xl font-bold text-emerald-950">Enquiries Management</h2>
              <p className="mt-2 text-sm text-gray-500">View customer enquiries and track each follow-up.</p>
            </div>
            <button
              type="button"
              onClick={loadEnquiries}
              disabled={enquiriesLoading}
              className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800 disabled:opacity-50"
            >
              {enquiriesLoading ? "Refreshing..." : "Refresh Enquiries"}
            </button>
          </div>

          <div className="mb-5 grid gap-3 sm:grid-cols-4">
            {(["New", "Contacted", "Converted", "Closed"] as const).map(status => (
              <div key={status} className="rounded-2xl bg-emerald-50 p-4">
                <p className="text-sm text-gray-600">{status}</p>
                <p className="mt-1 text-2xl font-bold text-emerald-900">{enquiries.filter(item => item.status === status).length}</p>
              </div>
            ))}
          </div>

          <input
            type="search"
            value={enquirySearch}
            onChange={e => setEnquirySearch(e.target.value)}
            placeholder="Search by customer name, email or phone..."
            className="mb-5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-600"
          />

          {enquiryMessage && (
            <p role="status" className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{enquiryMessage}</p>
          )}

          {enquiriesLoading ? (
            <p className="py-8 text-center text-gray-500">Loading customer enquiries...</p>
          ) : enquiries.filter(item => `${item.name} ${item.email} ${item.phone || ""} ${item.message}`.toLowerCase().includes(enquirySearch.toLowerCase())).length === 0 ? (
            <p className="rounded-xl bg-emerald-50 py-8 text-center text-gray-500">No customer enquiries found.</p>
          ) : (
            <div className="space-y-4">
              {enquiries
                .filter(item => `${item.name} ${item.email} ${item.phone || ""} ${item.message}`.toLowerCase().includes(enquirySearch.toLowerCase()))
                .map(item => (
                  <article key={item.id} className="rounded-2xl border border-emerald-100 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-bold text-emerald-950">{item.name}</h3>
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">{item.status}</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">Email: <a className="text-emerald-700 hover:underline" href={`mailto:${item.email}`}>{item.email}</a></p>
                        <p className="mt-1 text-sm text-gray-600">Phone: {item.phone ? <a className="text-emerald-700 hover:underline" href={`tel:${item.phone}`}>{item.phone}</a> : "Not provided"}</p>
                        <p className="mt-3 whitespace-pre-wrap leading-7 text-gray-700">{item.message}</p>
                        <p className="mt-3 text-xs text-gray-400">Received: {new Date(item.created_at).toLocaleString("en-IN")}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          aria-label={`Update status for ${item.name}`}
                          value={item.status}
                          onChange={e => updateEnquiryStatus(item.id, e.target.value as ContactEnquiry["status"])}
                          className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => deleteEnquiry(item.id)}
                          className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          )}
        </section>


          </>
        )}
        {/* CUSTOMER MANAGEMENT */}
        {section === "customers" && (
          <> 
        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Customer Relations</p>
              <h2 className="mt-1 text-2xl font-bold text-emerald-950">Customer Management</h2>
              <p className="mt-2 text-sm text-gray-500">Customer details and purchase history are automatically grouped from your saved orders.</p>
            </div>
            <div className="w-full sm:w-80">
              <label htmlFor="customer-search" className="mb-2 block text-sm font-semibold text-emerald-950">Search customers</label>
              <input
                id="customer-search"
                type="search"
                value={customerSearch}
                onChange={e => setCustomerSearch(e.target.value)}
                placeholder="Search name or phone number"
                className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>
          </div>
          {(() => {
            const customerMap = new Map<string, { name: string; phone: string; address: string; orders: SalesOrder[] }>();
            orders.forEach(order => {
              const phoneKey = (order.phone || "").replace(/\D/g, "");
              const key = phoneKey || order.customer_name.trim().toLowerCase();
              const existing = customerMap.get(key);
              if (existing) {
                existing.orders.push(order);
                if (!existing.address && order.address) existing.address = order.address;
                if (!existing.phone && order.phone) existing.phone = order.phone;
              } else {
                customerMap.set(key, { name: order.customer_name, phone: order.phone || "", address: order.address || "", orders: [order] });
              }
            });
            const customers = Array.from(customerMap.values()).map(customer => ({
              ...customer,
              totalSpent: customer.orders.filter(order => order.order_status !== "Cancelled").reduce((sum, order) => sum + Number(order.order_amount || 0), 0),
              completedOrders: customer.orders.filter(order => order.order_status === "Delivered").length,
            })).filter(customer => {
              const query = customerSearch.trim().toLowerCase();
              return !query || customer.name.toLowerCase().includes(query) || customer.phone.toLowerCase().includes(query);
            }).sort((a, b) => b.totalSpent - a.totalSpent);
            const totalCustomerValue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
            return (
              <>
                <div className="mb-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-emerald-50 p-4"><p className="text-sm text-gray-600">Unique Customers</p><p className="mt-1 text-2xl font-bold text-emerald-900">{customers.length}</p></div>
                  <div className="rounded-2xl bg-emerald-50 p-4"><p className="text-sm text-gray-600">Repeat Customers</p><p className="mt-1 text-2xl font-bold text-emerald-900">{customers.filter(customer => customer.orders.length > 1).length}</p></div>
                  <div className="rounded-2xl bg-emerald-50 p-4"><p className="text-sm text-gray-600">Customer Order Value</p><p className="mt-1 text-2xl font-bold text-emerald-900">₹{totalCustomerValue.toLocaleString("en-IN")}</p></div>
                </div>
                {orders.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-emerald-200 px-4 py-10 text-center text-sm text-gray-500">No customer records yet. Add your first order in Orders Management and the customer will appear here automatically.</p>
                ) : customers.length === 0 ? (
                  <p className="py-8 text-center text-sm text-gray-500">No customers match your search.</p>
                ) : (
                  <div className="space-y-3">
                    {customers.map(customer => (
                      <details key={(customer.phone || customer.name).toLowerCase()} className="rounded-2xl border border-emerald-100 p-4">
                        <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="font-bold text-emerald-950">{customer.name}</p>
                            <p className="mt-1 text-sm text-gray-500">{customer.phone || "No phone number"} {customer.address ? `• ${customer.address}` : ""}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-800">{customer.orders.length} {customer.orders.length === 1 ? "order" : "orders"}</span>
                            {customer.orders.length > 1 && <span className="rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-800">Repeat customer</span>}
                            <span className="font-bold text-emerald-950">₹{customer.totalSpent.toLocaleString("en-IN")}</span>
                          </div>
                        </summary>
                        <div className="mt-4 overflow-x-auto border-t border-emerald-100 pt-3">
                          <table className="w-full min-w-[520px] text-left text-sm">
                            <thead><tr className="text-gray-500"><th className="py-2 pr-3">Order Date</th><th className="py-2 pr-3">Product</th><th className="py-2 pr-3">Amount</th><th className="py-2 pr-3">Order Status</th><th className="py-2">Payment</th></tr></thead>
                            <tbody>{[...customer.orders].sort((a, b) => (b.order_date || "").localeCompare(a.order_date || "")).map(order => (
                              <tr key={order.id} className="border-t border-emerald-50">
                                <td className="py-2 pr-3">{order.order_date || "—"}</td><td className="py-2 pr-3">{order.items?.length ? order.items.map(item => item.product_name).join(", ") : order.product_name}</td><td className="py-2 pr-3">₹{Number(order.order_amount || 0).toLocaleString("en-IN")}</td><td className="py-2 pr-3">{order.order_status}</td><td className="py-2">{order.payment_status}</td>
                              </tr>
                            ))}</tbody>
                          </table>
                        </div>
                      </details>
                    ))}
                  </div>
                )}
                <p className="mt-4 text-xs text-gray-500">Customers are grouped by phone number. If a phone number is missing, the customer name is used. Cancelled orders are excluded from customer order value; all orders remain visible in the order history.</p>
              </>
            );
          })()}
        </section>


          </>
        )}
        {/* MONTHLY SALES REPORT */}
        {section === "sales-report" && (
          <> 
        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Business Reports</p>
              <h2 className="mt-1 text-2xl font-bold text-emerald-950">Monthly Sales Report</h2>
              <p className="mt-2 text-sm text-gray-500">View order value based on the selected order month.</p>
            </div>
            <div>
              <label htmlFor="sales-report-month" className="mb-2 block text-sm font-semibold text-emerald-950">Select Month</label>
              <input
                id="sales-report-month"
                type="month"
                value={salesReportMonth}
                onChange={e => setSalesReportMonth(e.target.value)}
                className="rounded-xl border border-emerald-200 bg-white px-4 py-3"
              />
            </div>
          </div>

          {(() => {
            const monthlyOrders = orders.filter(order => (order.order_date || "").slice(0, 7) === salesReportMonth);
            const validMonthlyOrders = monthlyOrders.filter(order => order.order_status !== "Cancelled");
            const monthlyOrderValue = validMonthlyOrders.reduce((sum, order) => sum + Number(order.order_amount || 0), 0);
            const paidOrderCount = validMonthlyOrders.filter(order => order.payment_status === "Paid").length;
            const deliveredOrderCount = validMonthlyOrders.filter(order => order.order_status === "Delivered").length;
            const productSummary = Array.from(new Set(validMonthlyOrders.map(order => order.product_name))).map(productName => {
              const matchingOrders = validMonthlyOrders.filter(order => order.product_name === productName);
              return {
                name: productName,
                count: matchingOrders.length,
                value: matchingOrders.reduce((sum, order) => sum + Number(order.order_amount || 0), 0),
              };
            }).sort((a, b) => b.value - a.value);

            return (
              <>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="mt-1 text-2xl font-bold text-emerald-900">{monthlyOrders.length}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <p className="text-sm text-gray-600">Monthly Order Value</p>
                    <p className="mt-1 text-2xl font-bold text-emerald-900">₹{monthlyOrderValue.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <p className="text-sm text-gray-600">Delivered Orders</p>
                    <p className="mt-1 text-2xl font-bold text-emerald-900">{deliveredOrderCount}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <p className="text-sm text-gray-600">Fully Paid Orders</p>
                    <p className="mt-1 text-2xl font-bold text-emerald-900">{paidOrderCount}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-100 p-4">
                  <h3 className="mb-3 font-bold text-emerald-950">Product-wise Sales</h3>
                  {productSummary.length === 0 ? (
                    <p className="py-4 text-sm text-gray-500">No orders found for this month.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[420px] text-left text-sm">
                        <thead><tr className="border-b text-gray-500"><th className="py-3 pr-4">Product</th><th className="py-3 pr-4">Orders</th><th className="py-3 text-right">Order Value</th></tr></thead>
                        <tbody>
                          {productSummary.map(product => (
                            <tr key={product.name} className="border-b last:border-0">
                              <td className="py-3 pr-4 font-medium text-emerald-950">{product.name}</td>
                              <td className="py-3 pr-4">{product.count}</td>
                              <td className="py-3 text-right font-semibold">₹{product.value.toLocaleString("en-IN")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <p className="mt-3 text-xs text-gray-500">Cancelled orders are excluded from order value. Monthly figures are grouped by Order Date, not Delivery Date. Partially paid orders are counted as not fully paid; the exact balance cannot be calculated because partial payment amounts are not recorded.</p>
              </>
            );
          })()}
        </section>


          </>
        )}
        {/* SALES & ORDERS MANAGEMENT */}
        {section === "orders" && (
          <> 
        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Sales Management</p>
              <h2 className="mt-1 text-2xl font-bold text-emerald-950">Orders Management</h2>
              <p className="mt-2 text-sm text-gray-500">Record customer orders and track delivery and payments.</p>
            </div>
            <button type="button" onClick={loadOrders} disabled={ordersLoading} className="rounded-xl border border-emerald-200 px-5 py-3 font-semibold text-emerald-800 hover:bg-emerald-50 disabled:opacity-50">
              {ordersLoading ? "Refreshing..." : "Refresh Orders"}
            </button>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-emerald-50 p-4"><p className="text-sm text-gray-600">Total Orders</p><p className="mt-1 text-2xl font-bold text-emerald-900">{orders.length}</p></div>
            <div className="rounded-2xl bg-emerald-50 p-4"><p className="text-sm text-gray-600">Delivered Orders</p><p className="mt-1 text-2xl font-bold text-emerald-900">{orders.filter(o => o.order_status === "Delivered").length}</p></div>
            <div className="rounded-2xl bg-emerald-50 p-4"><p className="text-sm text-gray-600">Total Order Value</p><p className="mt-1 text-2xl font-bold text-emerald-900">₹{orders.filter(o => o.order_status !== "Cancelled").reduce((sum, o) => sum + Number(o.order_amount || 0), 0).toLocaleString("en-IN")}</p></div>
          </div>

          <div id="orders-form" className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="mb-5 text-lg font-bold text-emerald-950">{orderEditingId ? "Edit Order" : "Add New Order"}</h3>
            <form onSubmit={saveOrder} className="grid gap-4 sm:grid-cols-2">
              <div><label className="mb-2 block text-sm font-semibold">Customer Name</label><input required value={orderForm.customer_name} onChange={e => setOrderForm({ ...orderForm, customer_name: e.target.value })} className="w-full rounded-xl border bg-white p-3" /></div>
              <div><label className="mb-2 block text-sm font-semibold">Phone Number</label><input required type="tel" value={orderForm.phone} onChange={e => setOrderForm({ ...orderForm, phone: e.target.value })} className="w-full rounded-xl border bg-white p-3" /></div>
              <div className="sm:col-span-2"><label className="mb-2 block text-sm font-semibold">Delivery Address</label><textarea rows={2} value={orderForm.address} onChange={e => setOrderForm({ ...orderForm, address: e.target.value })} className="w-full rounded-xl border bg-white p-3" /></div>
              <div className="sm:col-span-2 rounded-2xl border border-emerald-200 bg-white p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h4 className="font-bold text-emerald-950">Products in this order</h4><p className="text-xs text-gray-500">Add every product separately. The order total is calculated automatically.</p></div><button type="button" onClick={() => setOrderItems(current => [...current, { product_name: "", quantity: 1, unit: "g", line_amount: 0 }])} className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-bold text-white">+ Add Product</button></div>
                <div className="space-y-3">{orderItems.map((item, index) => <div key={index} className="grid gap-3 rounded-xl bg-emerald-50 p-3 sm:grid-cols-12"><div className="sm:col-span-4"><label className="mb-1 block text-xs font-semibold">Product {index + 1}</label><input required value={item.product_name} onChange={e => setOrderItems(current => current.map((row, i) => i === index ? { ...row, product_name: e.target.value } : row))} className="w-full rounded-lg border bg-white p-2.5" placeholder="Sunflower Microgreens" /></div><div className="sm:col-span-2"><label className="mb-1 block text-xs font-semibold">Quantity</label><input required type="number" min="0.01" step="0.01" value={item.quantity} onChange={e => setOrderItems(current => current.map((row, i) => i === index ? { ...row, quantity: Number(e.target.value) } : row))} className="w-full rounded-lg border bg-white p-2.5" /></div><div className="sm:col-span-2"><label className="mb-1 block text-xs font-semibold">Unit</label><select value={item.unit} onChange={e => setOrderItems(current => current.map((row, i) => i === index ? { ...row, unit: e.target.value } : row))} className="w-full rounded-lg border bg-white p-2.5"><option value="g">g</option><option value="kg">kg</option><option value="pack">pack</option><option value="box">box</option><option value="piece">piece</option></select></div><div className="sm:col-span-3"><label className="mb-1 block text-xs font-semibold">Amount (₹)</label><input required type="number" min="0" step="0.01" value={item.line_amount} onChange={e => setOrderItems(current => current.map((row, i) => i === index ? { ...row, line_amount: Number(e.target.value) } : row))} className="w-full rounded-lg border bg-white p-2.5" /></div><div className="flex items-end sm:col-span-1"><button type="button" disabled={orderItems.length === 1} onClick={() => setOrderItems(current => current.filter((_, i) => i !== index))} className="w-full rounded-lg border border-red-200 bg-white px-2 py-2.5 text-sm text-red-600 disabled:opacity-30">Remove</button></div></div>)}</div>
                <div className="mt-4 flex justify-end"><p className="text-lg font-bold text-emerald-900">Order Total: ₹{orderItems.reduce((sum, item) => sum + Number(item.line_amount || 0), 0).toLocaleString("en-IN")}</p></div>
              </div>
              <div><label className="mb-2 block text-sm font-semibold">Order Date</label><input required type="date" value={orderForm.order_date} onChange={e => setOrderForm({ ...orderForm, order_date: e.target.value })} className="w-full rounded-xl border bg-white p-3" /></div>
              <div><label className="mb-2 block text-sm font-semibold">Delivery Date</label><input type="date" value={orderForm.delivery_date} onChange={e => setOrderForm({ ...orderForm, delivery_date: e.target.value })} className="w-full rounded-xl border bg-white p-3" /></div>
              <div><label className="mb-2 block text-sm font-semibold">Order Status</label><select value={orderForm.order_status} onChange={e => setOrderForm({ ...orderForm, order_status: e.target.value as SalesOrder["order_status"] })} className="w-full rounded-xl border bg-white p-3">{["Pending", "Confirmed", "Packed", "Dispatched", "Delivered", "Cancelled"].map(s => <option key={s}>{s}</option>)}</select></div>
              <div><label className="mb-2 block text-sm font-semibold">Payment Status</label><select value={orderForm.payment_status} onChange={e => setOrderForm({ ...orderForm, payment_status: e.target.value as SalesOrder["payment_status"] })} className="w-full rounded-xl border bg-white p-3">{["Pending", "Paid", "Partially Paid"].map(s => <option key={s}>{s}</option>)}</select></div>
              <div className="sm:col-span-2"><label className="mb-2 block text-sm font-semibold">Notes</label><textarea rows={2} value={orderForm.notes} onChange={e => setOrderForm({ ...orderForm, notes: e.target.value })} className="w-full rounded-xl border bg-white p-3" placeholder="Special instructions or payment notes" /></div>
              <div className="flex flex-wrap gap-3 sm:col-span-2"><button type="submit" disabled={orderSaving} className="rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white hover:bg-emerald-800 disabled:opacity-50">{orderSaving ? "Saving..." : orderEditingId ? "Update Order" : "Save Order"}</button><button type="button" onClick={clearOrderForm} className="rounded-xl border border-emerald-200 bg-white px-6 py-3 font-semibold text-gray-700">Clear Form</button></div>
            </form>
            {orderMessage && <p role="status" className="mt-5 rounded-xl bg-white p-3 text-sm text-emerald-800">{orderMessage}</p>}
          </div>

          <input type="search" value={orderSearch} onChange={e => setOrderSearch(e.target.value)} placeholder="Search by customer, phone or product..." className="mb-5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-600" />
          {ordersLoading ? <p className="py-8 text-center text-gray-500">Loading orders...</p> : orders.filter(o => `${o.customer_name} ${o.phone} ${o.product_name}`.toLowerCase().includes(orderSearch.toLowerCase())).length === 0 ? <p className="rounded-xl bg-emerald-50 py-8 text-center text-gray-500">No orders found.</p> : <div className="space-y-4">{orders.filter(o => `${o.customer_name} ${o.phone} ${o.product_name}`.toLowerCase().includes(orderSearch.toLowerCase())).map(order => <article key={order.id} className="rounded-2xl border border-emerald-100 p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div className="min-w-0 flex-1"><h3 className="font-bold text-emerald-950">{order.customer_name}</h3><p className="mt-1 text-sm text-gray-600">{order.phone} · {order.items?.length ? order.items.map(item => `${item.product_name} (${item.quantity} ${item.unit})`).join(" · ") : `${order.product_name} · ${order.quantity} ${order.unit}`}</p><p className="mt-1 text-sm font-semibold text-emerald-800">₹{Number(order.order_amount).toLocaleString("en-IN")}</p><p className="mt-1 text-xs text-gray-500">Order date: {order.order_date}{order.delivery_date ? ` · Delivery: ${order.delivery_date}` : ""}</p>{order.address && <p className="mt-2 whitespace-pre-wrap text-sm text-gray-600">{order.address}</p>}{order.notes && <p className="mt-2 text-sm text-gray-500">Notes: {order.notes}</p>}</div><div className="flex flex-wrap gap-2"><select aria-label={`Order status for ${order.customer_name}`} value={order.order_status} onChange={e => updateOrderField(order.id, "order_status", e.target.value as SalesOrder["order_status"])} className="rounded-lg border px-3 py-2 text-sm">{["Pending", "Confirmed", "Packed", "Dispatched", "Delivered", "Cancelled"].map(s => <option key={s}>{s}</option>)}</select><select aria-label={`Payment status for ${order.customer_name}`} value={order.payment_status} onChange={e => updateOrderField(order.id, "payment_status", e.target.value as SalesOrder["payment_status"])} className="rounded-lg border px-3 py-2 text-sm">{["Pending", "Paid", "Partially Paid"].map(s => <option key={s}>{s}</option>)}</select><button type="button" onClick={() => editOrder(order)} className="rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-800">Edit</button><button type="button" onClick={() => deleteOrder(order.id)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600">Delete</button></div></div></article>)}</div>}
        </section>


          </>
        )}
        {/* INVENTORY MANAGEMENT */}
        {section === "inventory" && (
          <> 

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Stock Control</p>
              <h2 className="mt-1 text-2xl font-bold text-emerald-950">Inventory Management</h2>
              <p className="mt-2 text-sm text-gray-500">Track seeds, packaging materials, finished products and stock movements.</p>
            </div>
            <button type="button" onClick={loadInventory} disabled={inventoryLoading} className="rounded-xl border border-emerald-200 px-5 py-3 font-semibold text-emerald-800 hover:bg-emerald-50 disabled:opacity-50">
              {inventoryLoading ? "Refreshing..." : "Refresh Inventory"}
            </button>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-sm text-gray-600">Inventory Items</p>
              <p className="mt-1 text-2xl font-bold text-emerald-900">{inventoryItems.length}</p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4">
              <p className="text-sm text-gray-600">Low / Reorder Stock</p>
              <p className="mt-1 text-2xl font-bold text-amber-800">{inventoryItems.filter(item => Number(item.current_stock) <= Number(item.reorder_level)).length}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-sm text-gray-600">Stock Movements</p>
              <p className="mt-1 text-2xl font-bold text-emerald-900">{inventoryMovements.length}</p>
            </div>
          </div>

          <div id="inventory-form" className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="mb-4 text-lg font-bold text-emerald-950">{inventoryEditingId ? "Edit Inventory Item" : "Add Inventory Item"}</h3>
            <form onSubmit={saveInventoryItem} className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">Category</label>
                <select value={inventoryForm.category} onChange={e => setInventoryForm({ ...inventoryForm, category: e.target.value as InventoryItem["category"] })} className="w-full rounded-xl border bg-white p-3">
                  <option>Seeds</option><option>Packaging</option><option>Finished Products</option><option>Other</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Item Name</label>
                <input required value={inventoryForm.item_name} onChange={e => setInventoryForm({ ...inventoryForm, item_name: e.target.value })} className="w-full rounded-xl border bg-white p-3" placeholder="Sunflower Seeds" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Unit</label>
                <select value={inventoryForm.unit} onChange={e => setInventoryForm({ ...inventoryForm, unit: e.target.value })} className="w-full rounded-xl border bg-white p-3">
                  {["g", "kg", "ml", "L", "piece", "pack", "box", "tray"].map(unit => <option key={unit} value={unit}>{unit}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Low Stock Alert Level</label>
                <input type="number" min="0" step="0.01" value={inventoryForm.reorder_level} onChange={e => setInventoryForm({ ...inventoryForm, reorder_level: Number(e.target.value) })} className="w-full rounded-xl border bg-white p-3" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Cost per Unit (₹)</label>
                <input type="number" min="0" step="0.01" value={inventoryForm.cost_per_unit} onChange={e => setInventoryForm({ ...inventoryForm, cost_per_unit: Number(e.target.value) })} className="w-full rounded-xl border bg-white p-3" />
              </div>
              <div className="flex flex-wrap items-end gap-3">
                <button type="submit" disabled={inventorySaving} className="rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white hover:bg-emerald-800 disabled:opacity-50">{inventorySaving ? "Saving..." : inventoryEditingId ? "Update Item" : "Add Item"}</button>
                <button type="button" onClick={clearInventoryForm} className="rounded-xl border border-emerald-200 bg-white px-5 py-3 font-semibold text-gray-700">Clear</button>
              </div>
            </form>
          </div>

          <div className="mb-8 rounded-2xl border border-emerald-200 p-5">
            <h3 className="mb-4 text-lg font-bold text-emerald-950">Record Stock In / Stock Out</h3>
            <form onSubmit={recordStockMovement} className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">Inventory Item</label>
                <select required value={movementForm.item_id} onChange={e => setMovementForm({ ...movementForm, item_id: e.target.value })} className="w-full rounded-xl border bg-white p-3">
                  <option value="">Select an item</option>
                  {inventoryItems.map(item => <option key={item.id} value={item.id}>{item.item_name} ({item.current_stock} {item.unit})</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Movement Type</label>
                <select value={movementForm.movement_type} onChange={e => setMovementForm({ ...movementForm, movement_type: e.target.value as InventoryMovement["movement_type"] })} className="w-full rounded-xl border bg-white p-3">
                  <option>Stock In</option><option>Stock Out</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Quantity</label>
                <input required type="number" min="0.01" step="0.01" value={movementForm.quantity || ""} onChange={e => setMovementForm({ ...movementForm, quantity: Number(e.target.value) })} className="w-full rounded-xl border bg-white p-3" placeholder="Enter quantity" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Reason / Notes</label>
                <input value={movementForm.notes} onChange={e => setMovementForm({ ...movementForm, notes: e.target.value })} className="w-full rounded-xl border bg-white p-3" placeholder="Purchase, production usage, damage..." />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" disabled={movementSaving || inventoryItems.length === 0} className="rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white hover:bg-emerald-800 disabled:opacity-50">{movementSaving ? "Saving..." : "Save Stock Movement"}</button>
              </div>
            </form>
          </div>

          <div className="mb-5">
            <input type="search" value={inventorySearch} onChange={e => setInventorySearch(e.target.value)} placeholder="Search inventory by item or category..." className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-600" />
          </div>

          {inventoryMessage && <p role="status" className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{inventoryMessage}</p>}

          {inventoryLoading ? <p className="py-8 text-center text-gray-500">Loading inventory...</p> : inventoryItems.filter(item => `${item.item_name} ${item.category}`.toLowerCase().includes(inventorySearch.toLowerCase())).length === 0 ? (
            <p className="rounded-xl bg-emerald-50 py-8 text-center text-gray-500">No inventory items yet. Add your first item above.</p>
          ) : (
            <div className="space-y-3">
              {inventoryItems.filter(item => `${item.item_name} ${item.category}`.toLowerCase().includes(inventorySearch.toLowerCase())).map(item => {
                const lowStock = Number(item.current_stock) <= Number(item.reorder_level);
                return (
                  <article key={item.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-100 p-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-emerald-950">{item.item_name}</h4>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">{item.category}</span>
                        {lowStock && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Low stock – reorder</span>}
                      </div>
                      <p className="mt-1 text-sm text-gray-600">Available: <strong>{Number(item.current_stock).toFixed(3)} {item.unit}</strong> · Alert at: {Number(item.reorder_level).toFixed(3)} {item.unit}</p>
                      <p className="mt-1 text-xs text-gray-500">Cost per {item.unit}: ₹{Number(item.cost_per_unit || 0).toLocaleString("en-IN")}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => editInventoryItem(item)} className="rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">Edit</button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-8 border-t border-emerald-100 pt-6">
            <h3 className="mb-4 text-lg font-bold text-emerald-950">Recent Stock Movement History</h3>
            {inventoryMovements.length === 0 ? <p className="rounded-xl bg-emerald-50 py-6 text-center text-sm text-gray-500">No stock movements recorded yet.</p> : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead><tr className="border-b text-gray-500"><th className="py-3 pr-3">Date</th><th className="py-3 pr-3">Item</th><th className="py-3 pr-3">Type</th><th className="py-3 pr-3">Quantity</th><th className="py-3">Notes</th></tr></thead>
                  <tbody>{inventoryMovements.map(movement => (
                    <tr key={movement.id} className="border-b border-emerald-50">
                      <td className="py-3 pr-3">{new Date(movement.created_at).toLocaleString("en-IN")}</td>
                      <td className="py-3 pr-3 font-semibold">{movement.inventory_items?.item_name || inventoryItems.find(item => item.id === movement.item_id)?.item_name || "Inventory item"}</td>
                      <td className="py-3 pr-3">{movement.movement_type}</td>
                      <td className="py-3 pr-3">{Number(movement.quantity).toFixed(3)} {movement.inventory_items?.unit || inventoryItems.find(item => item.id === movement.item_id)?.unit || ""}</td>
                      <td className="py-3">{movement.notes || "—"}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )}
          </div>
        </section>


          </>
        )}
        {/* SEED USAGE MANAGEMENT */}
        {section === "seed-usage" && (
          <> 
        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Production Records</p>
              <h2 className="mt-1 text-2xl font-bold text-emerald-950">Seed Usage Management</h2>
              <p className="mt-2 text-sm text-gray-500">Record seeds consumed for each crop and production batch. Saving usage automatically deducts stock.</p>
            </div>
            <button type="button" onClick={loadSeedUsages} disabled={seedUsageLoading} className="rounded-xl border border-emerald-200 px-5 py-3 font-semibold text-emerald-800 hover:bg-emerald-50 disabled:opacity-50">
              {seedUsageLoading ? "Refreshing..." : "Refresh Usage"}
            </button>
          </div>

          <div id="seed-usage-form" className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h3 className="mb-4 text-lg font-bold text-emerald-950">{seedUsageEditingId ? "Edit Seed Usage" : "Record Seed Usage"}</h3>
            <form onSubmit={saveSeedUsage} className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">Seed Inventory Item</label>
                <select required value={seedUsageForm.inventory_item_id} onChange={e => {
                  const chosen = inventoryItems.find(item => item.id === Number(e.target.value));
                  setSeedUsageForm({ ...seedUsageForm, inventory_item_id: e.target.value, unit: chosen?.unit || "g" });
                }} className="w-full rounded-xl border bg-white p-3">
                  <option value="">Select seed</option>
                  {inventoryItems.filter(item => item.category === "Seeds").map(item => (
                    <option key={item.id} value={item.id}>{item.item_name} — {Number(item.current_stock).toFixed(3)} {item.unit} available</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Crop Name</label>
                <input required value={seedUsageForm.crop_name} onChange={e => setSeedUsageForm({ ...seedUsageForm, crop_name: e.target.value })} className="w-full rounded-xl border bg-white p-3" placeholder="Pea Shoots" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Quantity Used</label>
                <input required type="number" min="0.001" step="0.001" value={seedUsageForm.quantity_used} onChange={e => setSeedUsageForm({ ...seedUsageForm, quantity_used: e.target.value })} className="w-full rounded-xl border bg-white p-3" placeholder="200.000" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Unit</label>
                <input readOnly value={seedUsageForm.unit} className="w-full rounded-xl border bg-gray-100 p-3 text-gray-600" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Production Batch ID</label>
                <input required value={seedUsageForm.production_batch_id} onChange={e => setSeedUsageForm({ ...seedUsageForm, production_batch_id: e.target.value })} className="w-full rounded-xl border bg-white p-3" placeholder="P-001" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">Usage Date</label>
                <input required type="date" value={seedUsageForm.usage_date} onChange={e => setSeedUsageForm({ ...seedUsageForm, usage_date: e.target.value })} className="w-full rounded-xl border bg-white p-3" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold">Notes</label>
                <textarea rows={2} value={seedUsageForm.notes} onChange={e => setSeedUsageForm({ ...seedUsageForm, notes: e.target.value })} className="w-full rounded-xl border bg-white p-3" placeholder="Tray count, sowing details or remarks..." />
              </div>
              <div className="flex flex-wrap gap-3 sm:col-span-2">
                <button type="submit" disabled={seedUsageSaving || inventoryItems.filter(item => item.category === "Seeds").length === 0} className="rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white hover:bg-emerald-800 disabled:opacity-50">
                  {seedUsageSaving ? "Saving..." : seedUsageEditingId ? "Update Usage" : "Save Usage & Deduct Stock"}
                </button>
                <button type="button" onClick={clearSeedUsageForm} className="rounded-xl border border-emerald-200 bg-white px-5 py-3 font-semibold text-gray-700">Clear Form</button>
              </div>
            </form>
          </div>

          {seedUsageMessage && <p role="status" className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{seedUsageMessage}</p>}

          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-sm text-gray-600">Usage Entries</p>
              <p className="mt-1 text-2xl font-bold text-emerald-900">{seedUsages.length}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-sm text-gray-600">Seed Stock Items</p>
              <p className="mt-1 text-2xl font-bold text-emerald-900">{inventoryItems.filter(item => item.category === "Seeds").length}</p>
            </div>
          </div>

          {seedUsageLoading ? <p className="py-8 text-center text-gray-500">Loading seed usage...</p> : seedUsages.length === 0 ? (
            <p className="rounded-xl bg-emerald-50 py-8 text-center text-gray-500">No seed usage recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {seedUsages.map(item => (
                <article key={item.id} className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-emerald-100 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-emerald-950">{item.crop_name}</h4>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">{item.inventory_items?.item_name || inventoryItems.find(seed => seed.id === item.inventory_item_id)?.item_name || "Seed item"}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-700">Used: <strong>{Number(item.quantity_used).toFixed(3)} {item.unit}</strong> · Batch: {item.production_batch_id}</p>
                    <p className="mt-1 text-xs text-gray-500">Date: {item.usage_date}{item.notes ? ` · ${item.notes}` : ""}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => editSeedUsage(item)} className="rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">Edit</button>
                    <button type="button" onClick={() => deleteSeedUsage(item.id)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>


          </>
        )}
        {/* BLOG MANAGEMENT */}
        {section === "blogs" && (
          <>
            <section id="blog-form" className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Content management</p>
              <h2 className="mt-1 text-2xl font-bold text-emerald-950">
                {blogEditingId ? "Edit Blog Post" : "Create a Blog Post"}
              </h2>
              <p className="mt-2 text-sm text-gray-600">Write your article, add a cover image, then save it as a draft or publish it on your website.</p>

              <form onSubmit={saveBlogPost} className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">Blog Title</label>
                  <input required value={blogForm.title} onChange={e => setBlogForm(current => ({
                    ...current, title: e.target.value,
                    slug: blogEditingId ? current.slug : makeBlogSlug(e.target.value),
                  }))} className="w-full rounded-xl border p-3" placeholder="What Are Microgreens? A Beginner's Guide" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">URL Slug</label>
                  <input required value={blogForm.slug} onChange={e => setBlogForm(current => ({ ...current, slug: makeBlogSlug(e.target.value) }))} className="w-full rounded-xl border p-3" placeholder="what-are-microgreens" />
                  <p className="mt-1 text-xs text-gray-500">Website address: /blog/{blogForm.slug || "your-blog-slug"}</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Category</label>
                  <select value={blogForm.category} onChange={e => setBlogForm(current => ({ ...current, category: e.target.value }))} className="w-full rounded-xl border p-3">
                    {["Microgreens Knowledge", "Nutrition", "Recipes", "Growing Tips", "Lifestyle"].map(category => <option key={category} value={category}>{category}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 p-5">
                  <label className="mb-2 block text-sm font-bold text-emerald-950">Cover Image</label>
                  <input type="file" accept="image/*" disabled={blogUploading} onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) void uploadBlogImage(file);
                    e.target.value = "";
                  }} className="w-full rounded-xl border border-emerald-200 bg-white p-3 text-sm" />
                  <p className="mt-2 text-xs text-gray-500">JPG, PNG or WebP · Maximum 5 MB</p>
                  {blogUploading && <p className="mt-2 text-sm font-semibold text-emerald-700">Uploading image...</p>}
                  {blogForm.cover_image && <div className="mt-4">
                    <img src={blogForm.cover_image} alt={blogForm.cover_image_alt || "Blog cover preview"} className="h-48 w-full max-w-md rounded-xl border object-cover" />
                    <button type="button" onClick={() => setBlogForm(current => ({ ...current, cover_image: "" }))} className="mt-2 text-sm font-semibold text-red-600 hover:underline">Remove cover image</button>
                  </div>}
                  <label className="mb-2 mt-4 block text-sm font-semibold">Image Alt Text</label>
                  <input value={blogForm.cover_image_alt} onChange={e => setBlogForm(current => ({ ...current, cover_image_alt: e.target.value }))} className="w-full rounded-xl border p-3" placeholder="Describe the cover image" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">Short Excerpt</label>
                  <textarea rows={3} value={blogForm.excerpt} onChange={e => setBlogForm(current => ({ ...current, excerpt: e.target.value }))} className="w-full rounded-xl border p-3" placeholder="A short introduction shown on the blog listing page..." />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">Blog Content</label>
                  <div className="mb-2 flex flex-wrap gap-2 rounded-t-xl border border-b-0 bg-gray-50 p-3">
                    <button type="button" onClick={() => formatBlogText("bold")} className="rounded-lg border bg-white px-3 py-2 text-sm font-bold">B</button>
                    <button type="button" onClick={() => formatBlogText("italic")} className="rounded-lg border bg-white px-3 py-2 text-sm italic">I</button>
                    <button type="button" onClick={() => formatBlogText("formatBlock", "h2")} className="rounded-lg border bg-white px-3 py-2 text-sm">Heading</button>
                    <button type="button" onClick={() => formatBlogText("insertUnorderedList")} className="rounded-lg border bg-white px-3 py-2 text-sm">• List</button>
                    <label className="cursor-pointer rounded-lg border bg-white px-3 py-2 text-sm font-semibold">
                      Add image
                      <input type="file" accept="image/*" className="hidden" disabled={blogUploading} onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) void uploadBlogInlineImage(file);
                        e.target.value = "";
                      }} />
                    </label>
                    <label className="cursor-pointer rounded-lg border bg-white px-3 py-2 text-sm font-semibold">
                      Upload video
                      <input type="file" accept="video/*" className="hidden" disabled={blogUploading} onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) void uploadBlogVideo(file);
                        e.target.value = "";
                      }} />
                    </label>
                    <button type="button" onClick={insertYouTubeVideo} className="rounded-lg border bg-white px-3 py-2 text-sm font-semibold">YouTube link</button>
                  </div>
                  <div
                    ref={blogEditorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={e => { const content = e.currentTarget.innerHTML; setBlogForm(current => ({ ...current, content })); }}
                    className="min-h-[320px] w-full rounded-b-xl border p-4 leading-7 outline-none focus:border-emerald-500 [&_h2]:my-3 [&_h2]:text-2xl [&_h2]:font-bold [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-6"
                  />
                  {blogUploading && <p className="mt-2 text-sm font-semibold text-emerald-700">Uploading media...</p>}
                  <p className="mt-1 text-xs text-gray-500">Use the toolbar to format your article and insert images or videos between paragraphs. Video upload limit: 50 MB. YouTube links are recommended for larger videos.</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">SEO Title</label>
                  <input value={blogForm.seo_title} onChange={e => setBlogForm(current => ({ ...current, seo_title: e.target.value }))} className="w-full rounded-xl border p-3" placeholder="Optional search result title" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">SEO Description</label>
                  <textarea rows={2} value={blogForm.seo_description} onChange={e => setBlogForm(current => ({ ...current, seo_description: e.target.value }))} className="w-full rounded-xl border p-3" placeholder="Short description for search engines" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Post Status</label>
                  <select value={blogForm.status} onChange={e => setBlogForm(current => ({ ...current, status: e.target.value as "draft" | "published" }))} className="w-full rounded-xl border p-3">
                    <option value="draft">Save as Draft</option><option value="published">Publish</option>
                  </select>
                </div>
                <div className="flex flex-wrap items-end gap-3">
                  <button type="submit" disabled={blogSaving || blogUploading} className="rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white hover:bg-emerald-800 disabled:opacity-50">
                    {blogSaving ? "Saving..." : blogEditingId ? "Update Blog" : blogForm.status === "published" ? "Publish Blog" : "Save Draft"}
                  </button>
                  <button type="button" onClick={clearBlogForm} className="rounded-xl border px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50">Clear Form</button>
                </div>
              </form>
              {blogMessage && <p role="status" className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{blogMessage}</p>}
            </section>

            <section className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-emerald-950">Your Blog Posts ({blogPosts.length})</h3>
                <input value={blogSearch} onChange={e => setBlogSearch(e.target.value)} className="w-full rounded-xl border p-3 sm:w-72" placeholder="Search blog posts..." />
              </div>
              {blogLoading ? <p className="py-8 text-center text-gray-500">Loading blog posts...</p> :
                blogPosts.filter(post => `${post.title} ${post.category} ${post.status}`.toLowerCase().includes(blogSearch.toLowerCase())).length === 0 ?
                <p className="py-8 text-center text-gray-500">No blog posts found. Create your first post above.</p> :
                <div className="mt-5 space-y-4">
                  {blogPosts.filter(post => `${post.title} ${post.category} ${post.status}`.toLowerCase().includes(blogSearch.toLowerCase())).map(post => (
                    <article key={post.id} className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-emerald-100 p-4">
                      <div className="flex min-w-0 flex-1 gap-4">
                        {post.cover_image && <img src={post.cover_image} alt={post.cover_image_alt || post.title} className="h-20 w-24 rounded-xl object-cover" />}
                        <div className="min-w-0">
                          <h4 className="font-bold text-emerald-950">{post.title}</h4>
                          <p className="mt-1 text-sm text-gray-500">{post.category} · /blog/{post.slug}</p>
                          <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${post.status === "published" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{post.status === "published" ? "Published" : "Draft"}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => editBlogPost(post)} className="rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">Edit</button>
                        <button type="button" onClick={() => void toggleBlogPublish(post)} className="rounded-lg border border-amber-200 px-3 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-50">{post.status === "published" ? "Unpublish" : "Publish"}</button>
                        <button type="button" onClick={() => void deleteBlogPost(post.id)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button>
                      </div>
                    </article>
                  ))}
                </div>}
            </section>
          </>
        )}

        {/* TESTIMONIALS MANAGEMENT */}
        {section === "testimonials" && (
          <> 

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                Customer Feedback
              </p>
              <h2 className="mt-1 text-2xl font-bold text-emerald-950">
                Testimonials Management
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Add, edit, publish or remove customer reviews shown on your website.
              </p>
            </div>

            <button
              type="button"
              onClick={startNewTestimonial}
              className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800"
            >
              + Add Testimonial
            </button>
          </div>

          <div
            id="testimonial-form"
            className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
          >
            <h3 className="mb-5 text-lg font-bold text-emerald-950">
              {testimonialEditingId ? "Edit Customer Review" : "Add New Customer Review"}
            </h3>

            <form onSubmit={saveTestimonial} className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">Customer Name</label>
                <input
                  required
                  value={testimonialName}
                  onChange={e => setTestimonialName(e.target.value)}
                  className="w-full rounded-xl border bg-white p-3"
                  placeholder="Customer name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Role / Description</label>
                <input
                  value={testimonialRole}
                  onChange={e => setTestimonialRole(e.target.value)}
                  className="w-full rounded-xl border bg-white p-3"
                  placeholder="Home Chef"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold">Customer Review</label>
                <textarea
                  required
                  rows={4}
                  value={testimonialReview}
                  onChange={e => setTestimonialReview(e.target.value)}
                  className="w-full rounded-xl border bg-white p-3"
                  placeholder="Write the customer's feedback..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Star Rating</label>
                <select
                  value={testimonialRating}
                  onChange={e => setTestimonialRating(Number(e.target.value))}
                  className="w-full rounded-xl border bg-white p-3"
                >
                  {[5, 4, 3, 2, 1].map(rating => (
                    <option key={rating} value={rating}>{rating} Star{rating > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Display Order</label>
                <input
                  type="number"
                  min="1"
                  value={testimonialOrder}
                  onChange={e => setTestimonialOrder(Number(e.target.value))}
                  className="w-full rounded-xl border bg-white p-3"
                />
              </div>

              <label className="flex items-center gap-3 text-sm font-semibold text-emerald-900 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={testimonialActive}
                  onChange={e => setTestimonialActive(e.target.checked)}
                  className="h-4 w-4 accent-emerald-700"
                />
                Publish this review on the website
              </label>

              <div className="flex flex-wrap gap-3 sm:col-span-2">
                <button
                  type="submit"
                  disabled={testimonialSaving}
                  className="rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white hover:bg-emerald-800 disabled:opacity-50"
                >
                  {testimonialSaving
                    ? "Saving..."
                    : testimonialEditingId
                    ? "Update Testimonial"
                    : "Save Testimonial"}
                </button>
                <button
                  type="button"
                  onClick={startNewTestimonial}
                  className="rounded-xl border border-emerald-200 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Clear Form
                </button>
              </div>
            </form>

            {testimonialMessage && (
              <p role="status" className="mt-5 rounded-xl bg-white p-3 text-sm text-emerald-800">
                {testimonialMessage}
              </p>
            )}
          </div>

          <h3 className="mb-4 text-lg font-bold text-emerald-950">
            Customer Reviews ({testimonials.length})
          </h3>

          {testimonials.length === 0 ? (
            <p className="rounded-xl bg-emerald-50 py-8 text-center text-gray-500">
              No testimonials found.
            </p>
          ) : (
            <div className="space-y-4">
              {testimonials.map(item => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-emerald-100 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="font-bold text-emerald-950">{item.name}</h4>
                        <span className="text-sm text-gray-500">{item.role}</span>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.is_active ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"}`}>
                          {item.is_active ? "Published" : "Hidden"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-yellow-500">
                        {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                      </p>
                      <p className="mt-2 leading-7 text-gray-600">{item.review}</p>
                      <p className="mt-2 text-xs text-gray-400">Display order: {item.display_order}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => editTestimonial(item)}
                        className="rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTestimonial(item.id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

          </>
        )}

      </div>
    </main>
  );
}
