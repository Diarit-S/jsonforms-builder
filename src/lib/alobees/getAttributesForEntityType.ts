import { AlobeesAttribute, AlobeesEntityType } from './types'

const USER_ATTRIBUTES: AlobeesAttribute[] = [
  { key: 'id', label: 'ID', type: 'string' },
  { key: 'firstname', label: 'Prénom', type: 'string' },
  { key: 'lastname', label: 'Nom', type: 'string' },
  { key: 'phone', label: 'Téléphone', type: 'string' },
  { key: 'photo', label: 'Photo', type: 'string' },
  { key: 'role', label: 'Rôle', type: 'string' },
  { key: 'status', label: 'Statut', type: 'string' },
  { key: 'type', label: 'Type', type: 'string' },
  { key: 'company_id', label: 'ID Entreprise', type: 'string' },
  { key: 'company_name', label: 'Nom Entreprise', type: 'string' },
  { key: 'usertype_id', label: 'ID Type Utilisateur', type: 'string' },
  { key: 'color', label: 'Couleur', type: 'string' },
  { key: 'reference', label: 'Référence', type: 'string' },
  { key: 'sso_id', label: 'ID SSO', type: 'string' },
  { key: 'subcontractor_company_name', label: 'Nom Sous-traitant', type: 'string' },
  { key: 'guest', label: 'Invité', type: 'boolean' },
  { key: 'has_seen_welcome_front', label: 'A vu bienvenue (front)', type: 'boolean' },
  { key: 'has_seen_welcome_mobile', label: 'A vu bienvenue (mobile)', type: 'boolean' },
  { key: 'user_defined_color', label: 'Couleur personnalisée', type: 'boolean' },
  { key: 'temporary', label: 'Temporaire', type: 'boolean' },
  { key: 'hourly_rate', label: 'Taux horaire', type: 'number' },
  { key: 'user_tags_ids', label: 'Tags', type: 'array' },
  { key: 'createdAt', label: 'Date de création', type: 'date' },
]

const SITE_ATTRIBUTES: AlobeesAttribute[] = [
  // GenericSite fields
  { key: 'id', label: 'ID', type: 'string' },
  { key: 'name', label: 'Nom', type: 'string' },
  { key: 'display_name', label: 'Nom affiché', type: 'string' },
  { key: 'status', label: 'Statut', type: 'string' },
  { key: 'reference', label: 'Référence', type: 'string' },
  { key: 'color', label: 'Couleur', type: 'string' },
  { key: 'company_id', label: 'ID Entreprise', type: 'string' },
  { key: 'external_id', label: 'ID Externe', type: 'string' },
  { key: 'sitestatus_id', label: 'ID Statut Chantier', type: 'string' },
  { key: 'category', label: 'Catégorie', type: 'string' },
  // WorkSite specific fields
  { key: 'address', label: 'Adresse', type: 'string' },
  { key: 'zipCode', label: 'Code postal', type: 'string' },
  { key: 'city', label: 'Ville', type: 'string' },
  { key: 'description', label: 'Description', type: 'string' },
  { key: 'customer', label: 'Client', type: 'string' },
  { key: 'phone', label: 'Téléphone', type: 'string' },
  { key: 'email', label: 'Email', type: 'string' },
  { key: 'ext_contact', label: 'Contact externe', type: 'string' },
  { key: 'complement', label: 'Complément', type: 'string' },
  { key: 'note', label: 'Note', type: 'string' },
  { key: 'picture', label: 'Photo', type: 'string' },
  { key: 'day_start', label: 'Heure début journée', type: 'string' },
  { key: 'day_end', label: 'Heure fin journée', type: 'string' },
  { key: 'start', label: 'Date début', type: 'string' },
  { key: 'end', label: 'Date fin', type: 'string' },
  // Booleans
  { key: 'planned', label: 'Planifié', type: 'boolean' },
  { key: 'temporary', label: 'Temporaire', type: 'boolean' },
  { key: 'user_defined_color', label: 'Couleur personnalisée', type: 'boolean' },
  { key: 'service', label: 'Service', type: 'boolean' },
  // Numbers
  { key: 'forecasted_budget', label: 'Budget prévisionnel', type: 'number' },
  { key: 'forecastedtime', label: 'Temps prévisionnel', type: 'number' },
  { key: 'latitude', label: 'Latitude', type: 'number' },
  { key: 'longitude', label: 'Longitude', type: 'number' },
  // Arrays
  { key: 'site_tags_ids', label: 'Tags', type: 'array' },
  { key: 'supervisors', label: 'Superviseurs', type: 'array' },
  { key: 'foremen', label: 'Chefs de chantier', type: 'array' },
  // Dates
  { key: 'createdAt', label: 'Date de création', type: 'date' },
  { key: 'updatedAt', label: 'Date de mise à jour', type: 'date' },
]

const ATTRIBUTES_BY_ENTITY_TYPE: Record<AlobeesEntityType, AlobeesAttribute[]> = {
  user: USER_ATTRIBUTES,
  site: SITE_ATTRIBUTES,
}

export const getAttributesForEntityType = (entityType: AlobeesEntityType): AlobeesAttribute[] => {
  return ATTRIBUTES_BY_ENTITY_TYPE[entityType]
}

