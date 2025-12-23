export interface User {
  color?: string
  company_id: string
  company_name: string
  firstname: string
  guest: boolean
  has_seen_welcome_front: boolean
  has_seen_welcome_mobile: boolean
  id: string
  lastname: string
  phone: string
  photo: string
  reference?: string
  sso_id?: string
  role: string
  status: string
  subcontractor_company_name?: string
  type: string
  usertype_id: string
  user_defined_color: boolean
  temporary: boolean
  user_tags_ids: string[]
  hourly_rate: number | null
  createdAt: Date
}

export interface GenericSite {
  color?: string
  company_id: string
  createdAt: Date
  external_id?: string
  id: string
  name: string
  planned?: boolean
  reference?: string
  status: string
  sitestatus_id: string
  temporary: boolean
  updatedAt: Date
  user_defined_color: boolean
  category: 'site' | 'absence' | 'service'
  display_name: string
  site_tags_ids: string[]
  forecasted_budget: number | null
}

export interface WorkSite extends GenericSite {
  address?: string
  description?: string
  day_end?: string
  day_start?: string
  zipCode?: string
  city?: string
  picture?: string
  customer?: string
  phone?: string
  email?: string
  ext_contact?: string
  start?: string
  end?: string
  complement?: string
  forecastedtime: number | null
  note?: string
  service: boolean
  latitude?: number
  longitude?: number
  supervisors: string[]
  foremen: string[]
  category: 'site'
}

export type AlobeesEntityType = 'user' | 'site'

export interface AlobeesAttribute {
  key: string
  label: string
  type: 'string' | 'number' | 'boolean' | 'date' | 'array'
}

export interface AlobeesElementConfig {
  entityType: AlobeesEntityType
  attribute: string
}

