import { type FC, useState } from 'react'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getAttributesForEntityType } from '@/lib/alobees/getAttributesForEntityType'
import { AlobeesAttribute, AlobeesElementConfig, AlobeesEntityType } from '@/lib/alobees/types'

const ENTITY_TYPE_OPTIONS: { value: AlobeesEntityType; label: string }[] = [
  { value: 'user', label: 'Utilisateur' },
  { value: 'site', label: 'Chantier' },
]

interface AlobeesElementProps {
  value?: AlobeesElementConfig
  onChange: (config: AlobeesElementConfig | undefined) => void
}

export const AlobeesElement: FC<AlobeesElementProps> = ({ value, onChange }) => {
  const [entityType, setEntityType] = useState<AlobeesEntityType | undefined>(value?.entityType)
  const [selectedAttribute, setSelectedAttribute] = useState<string | undefined>(value?.attribute)

  const attributes: AlobeesAttribute[] = entityType ? getAttributesForEntityType(entityType) : []

  const handleEntityTypeChange = (newEntityType: AlobeesEntityType) => {
    setEntityType(newEntityType)
    setSelectedAttribute(undefined)
    onChange(undefined)
  }

  const handleAttributeChange = (attributeKey: string) => {
    setSelectedAttribute(attributeKey)
    if (entityType) {
      onChange({ entityType, attribute: attributeKey })
    }
  }

  return (
    <div className="mt-3 p-3 border border-dashed border-slate-300 rounded-md bg-slate-50">
      <Label className="text-xs text-slate-500 font-medium mb-2 block">
        Element Alobees
      </Label>

      <div className="space-y-2">
        <Select value={entityType} onValueChange={handleEntityTypeChange}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Sélectionner un type" />
          </SelectTrigger>
          <SelectContent>
            {ENTITY_TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {entityType && (
          <Select value={selectedAttribute} onValueChange={handleAttributeChange}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Sélectionner un attribut" />
            </SelectTrigger>
            <SelectContent>
              {attributes.map((attr) => (
                <SelectItem key={attr.key} value={attr.key}>
                  {attr.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {entityType && selectedAttribute && (
          <p className="text-xs text-slate-400">
            {entityType === 'user' ? 'Utilisateur' : 'Chantier'} → {attributes.find(a => a.key === selectedAttribute)?.label}
          </p>
        )}
      </div>
    </div>
  )
}

