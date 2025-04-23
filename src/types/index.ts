
export interface Farmer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  size: number;
  size_unit: string;
  farmer_id: string;
  soil_type?: string;
  created_at: string;
  updated_at: string;
}

export interface Crop {
  id: string;
  name: string;
  variety: string;
  growth_duration: number;
  ideal_soil_type: string;
  ideal_temperature_min: number;
  ideal_temperature_max: number;
  ideal_rainfall_min: number;
  ideal_rainfall_max: number;
  created_at: string;
  updated_at: string;
}

export interface CropCycle {
  id: string;
  farm_id: string;
  crop_id: string;
  field_area: string;
  sowing_date: string;
  expected_harvest_date: string;
  actual_harvest_date?: string;
  yield_amount?: number;
  yield_unit?: string;
  status: 'planned' | 'sowing' | 'growing' | 'harvesting' | 'completed' | 'failed';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CropGrowthRecord {
  id: string;
  crop_cycle_id: string;
  record_date: string;
  growth_stage: string;
  height?: number;
  health_status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  pest_issues?: string;
  disease_issues?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Inventory {
  id: string;
  category: 'seed' | 'fertilizer' | 'pesticide' | 'equipment' | 'other';
  name: string;
  brand?: string;
  quantity: number;
  unit: string;
  unit_price: number;
  purchase_date?: string;
  expiry_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  category: 'seed' | 'fertilizer' | 'pesticide' | 'equipment' | 'other' | 'multiple';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  model?: string;
  purchase_date?: string;
  purchase_price?: number;
  condition: 'new' | 'excellent' | 'good' | 'fair' | 'poor' | 'maintenance' | 'retired';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface MarketPrice {
  id: string;
  crop_id: string;
  market_location: string;
  price_date: string;
  price_value: number;
  price_unit: string;
  created_at: string;
  updated_at: string;
}

export interface WeatherRecord {
  id: string;
  farm_id: string;
  record_date: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  wind_speed?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface SoilAnalysis {
  id: string;
  farm_id: string;
  field_area: string;
  test_date: string;
  pH: number;
  nitrogen_level?: number;
  phosphorus_level?: number;
  potassium_level?: number;
  organic_matter?: number;
  soil_moisture?: number;
  recommendations?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface TaskSchedule {
  id: string;
  farm_id: string;
  crop_cycle_id?: string;
  task_name: string;
  task_type: 'planting' | 'irrigation' | 'fertilization' | 'pest_control' | 'harvest' | 'maintenance' | 'other';
  scheduled_date: string;
  completion_date?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue' | 'cancelled';
  assignee?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}
