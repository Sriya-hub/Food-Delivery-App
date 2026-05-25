// ============================================
// ZOMATO-STYLE FOOD DELIVERY & DINE-OUT PLATFORM
// Type Definitions
// ============================================

import { Types } from 'mongoose'

// ============================================
// User Types
// ============================================
export type UserRole = 'customer' | 'restaurant' | 'delivery' | 'admin'
export type MembershipTier = 'bronze' | 'silver' | 'gold' | 'platinum'

export interface Address {
  label: string
  street: string
  city: string
  state: string
  pincode: string
  coordinates: {
    lat: number
    lng: number
  }
  isDefault: boolean
}

export interface DeliveryStats {
  totalDeliveries: number
  totalEarnings: number
  averageRating: number
  onTimePercentage: number
  currentWeekEarnings: number
  currentMonthEarnings: number
}

export interface User {
  _id: string
  name: string
  email: string
  phone: string
  role: UserRole
  addresses: Address[]
  avatar?: string
  loyaltyPoints: number
  totalPointsEarned: number
  membershipTier: MembershipTier
  reviewCount: number
  deliveryStats?: DeliveryStats
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// ============================================
// Restaurant Types
// ============================================
export interface OpeningHours {
  day: string
  open: string
  close: string
  isClosed: boolean
}

export interface Table {
  tableNumber: string
  seats: number
  isAvailable: boolean
}

export interface ReservationSlot {
  time: string
  maxBookings: number
}

export interface Restaurant {
  _id: string
  name: string
  slug: string
  owner: string | User
  description: string
  cuisines: string[]
  address: {
    street: string
    city: string
    state: string
    pincode: string
    coordinates: { lat: number; lng: number }
  }
  images: {
    cover: string
    logo: string
    gallery: string[]
  }
  rating: {
    average: number
    count: number
  }
  priceRange: 1 | 2 | 3 | 4
  deliveryTime: { min: number; max: number }
  deliveryFee: number
  minOrder: number
  isOpen: boolean
  isApproved: boolean
  openingHours: OpeningHours[]
  hasDineIn: boolean
  tableCapacity: number
  tables: Table[]
  acceptsReservations: boolean
  reservationSlots: ReservationSlot[]
  canHostEvents: boolean
  createdAt: Date
}

// ============================================
// Menu Item Types
// ============================================
export interface MenuItem {
  _id: string
  restaurant: string | Restaurant
  name: string
  description: string
  price: number
  category: string
  image: string
  isVeg: boolean
  isAvailable: boolean
  isBestseller: boolean
  preparationTime: number
  createdAt: Date
}

// ============================================
// Order Types
// ============================================
export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'picked' 
  | 'on_the_way'
  | 'delivered' 
  | 'cancelled'

export type PaymentMethod = 'razorpay' | 'cod'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'

export interface OrderItem {
  menuItem: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface StatusHistory {
  status: OrderStatus
  timestamp: Date
  note?: string
}

export interface DeliveryEarnings {
  basePay: number
  distanceBonus: number
  tipAmount: number
  peakHourBonus: number
  total: number
}

export interface Order {
  _id: string
  orderNumber: string
  customer: string | User
  restaurant: string | Restaurant
  deliveryPartner?: string | User
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  tax: number
  discount: number
  loyaltyPointsUsed: number
  total: number
  status: OrderStatus
  statusHistory: StatusHistory[]
  deliveryAddress: Address
  payment: {
    method: PaymentMethod
    status: PaymentStatus
    razorpayOrderId?: string
    razorpayPaymentId?: string
  }
  deliveryEarnings?: DeliveryEarnings
  distance: number
  estimatedDelivery: Date
  actualDelivery?: Date
  specialInstructions?: string
  createdAt: Date
}

// ============================================
// Reservation Types
// ============================================
export type ReservationStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'cancelled' 
  | 'completed' 
  | 'no_show'

export interface Reservation {
  _id: string
  reservationNumber: string
  customer: string | User
  restaurant: string | Restaurant
  date: Date
  time: string
  partySize: number
  tableNumber?: string
  status: ReservationStatus
  specialRequests?: string
  occasion?: string
  confirmedAt?: Date
  confirmationCode: string
  pointsEarned: number
  createdAt: Date
}

// ============================================
// Event Types
// ============================================
export type EventCategory = 
  | 'food_festival' 
  | 'cooking_class' 
  | 'wine_tasting' 
  | 'live_music' 
  | 'special_menu' 
  | 'other'

export type EventRegistrationStatus = 'registered' | 'attended' | 'cancelled'

export interface EventRegistration {
  user: string | User
  status: EventRegistrationStatus
  registeredAt: Date
}

export interface Event {
  _id: string
  title: string
  slug: string
  restaurant: string | Restaurant
  description: string
  category: EventCategory
  image: string
  date: Date
  startTime: string
  endTime: string
  price: number
  maxAttendees: number
  currentAttendees: number
  registrations: EventRegistration[]
  isActive: boolean
  isFeatured: boolean
  createdAt: Date
}

// ============================================
// Review Types
// ============================================
export type ReviewStatus = 'pending' | 'approved' | 'flagged' | 'rejected'

export interface RestaurantResponse {
  content: string
  respondedAt: Date
}

export interface Review {
  _id: string
  user: string | User
  restaurant: string | Restaurant
  order?: string | Order
  rating: number
  title: string
  content: string
  images: string[]
  wordCount: number
  hasPhotos: boolean
  isVerifiedPurchase: boolean
  pointsEarned: number
  qualityScore: number
  helpfulVotes: number
  restaurantResponse?: RestaurantResponse
  status: ReviewStatus
  createdAt: Date
}

// ============================================
// Reward Types
// ============================================
export type RewardType = 
  | 'order' 
  | 'review' 
  | 'reservation' 
  | 'referral' 
  | 'event' 
  | 'redemption'
  | 'bonus'

export interface Reward {
  _id: string
  user: string | User
  type: RewardType
  points: number
  description: string
  reference?: {
    model: string
    id: string
  }
  createdAt: Date
}

// ============================================
// Cart Types
// ============================================
export interface CartItem {
  menuItem: MenuItem
  quantity: number
}

export interface Cart {
  restaurant: Restaurant | null
  items: CartItem[]
  subtotal: number
}

// ============================================
// Auth Types
// ============================================
export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone: string
  role: UserRole
}

// ============================================
// API Response Types
// ============================================
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// ============================================
// Filter & Search Types
// ============================================
export interface RestaurantFilters {
  cuisine?: string[]
  priceRange?: number[]
  rating?: number
  deliveryTime?: number
  isVegOnly?: boolean
  hasOffers?: boolean
  sortBy?: 'rating' | 'deliveryTime' | 'distance' | 'popularity'
}

export interface SearchParams {
  query: string
  location?: string
  filters?: RestaurantFilters
  page?: number
  limit?: number
}

// ============================================
// Dashboard Stats Types
// ============================================
export interface RestaurantStats {
  totalOrders: number
  todayOrders: number
  totalRevenue: number
  todayRevenue: number
  averageRating: number
  totalReviews: number
  pendingReservations: number
  upcomingEvents: number
}

export interface DeliveryPartnerStats {
  todayDeliveries: number
  todayEarnings: number
  weeklyDeliveries: number
  weeklyEarnings: number
  monthlyDeliveries: number
  monthlyEarnings: number
  averageRating: number
  onTimePercentage: number
  acceptanceRate: number
}

export interface AdminStats {
  totalUsers: number
  totalRestaurants: number
  totalOrders: number
  totalRevenue: number
  activeDeliveryPartners: number
  pendingApprovals: number
  todayOrders: number
  todayRevenue: number
}

// ============================================
// Razorpay Types
// ============================================
export interface RazorpayOrder {
  id: string
  entity: string
  amount: number
  currency: string
  status: string
  receipt: string
}

export interface RazorpayPaymentResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

// ============================================
// SSE Tracking Types
// ============================================
export interface TrackingUpdate {
  orderId: string
  status: OrderStatus
  deliveryPartner?: {
    name: string
    phone: string
    location?: { lat: number; lng: number }
  }
  estimatedTime?: number
  message: string
  timestamp: Date
}
