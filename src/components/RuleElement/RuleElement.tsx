import { type FC, useState, useEffect } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { buildRule } from '@/lib/rules/buildRule'
import type { ConditionType, Rule } from '@/lib/rules/types'
import { RuleEffect } from '@/lib/rules/types'

const EFFECT_OPTIONS: { value: RuleEffect; label: string }[] = [
  { value: RuleEffect.SHOW, label: 'Afficher' },
  { value: RuleEffect.HIDE, label: 'Masquer' },
  { value: RuleEffect.ENABLE, label: 'Activer' },
  { value: RuleEffect.DISABLE, label: 'Désactiver' },
]

const CONDITION_TYPE_OPTIONS: { value: ConditionType; label: string }[] = [
  { value: 'const', label: 'Égal à' },
  { value: 'enum', label: 'Parmi' },
  { value: 'not_empty', label: 'Non vide' },
]

interface RuleElementProps {
  value?: Rule
  onChange: (rule: Rule | undefined) => void
  availableScopes: string[]
}

export const RuleElement: FC<RuleElementProps> = ({ value, onChange, availableScopes }) => {
  const [effect, setEffect] = useState<RuleEffect | undefined>(value?.effect)
  const [conditionType, setConditionType] = useState<ConditionType>('const')
  const [targetScope, setTargetScope] = useState<string>(value?.condition?.scope ?? '')
  const [conditionValue, setConditionValue] = useState<string>('')

  // Initialize from existing rule
  useEffect(() => {
    if (value?.condition?.schema) {
      const schema = value.condition.schema as Record<string, unknown>
      if ('const' in schema) {
        setConditionType('const')
        setConditionValue(String(schema.const ?? ''))
      } else if ('enum' in schema) {
        setConditionType('enum')
        setConditionValue((schema.enum as unknown[])?.join(', ') ?? '')
      } else if ('minLength' in schema) {
        setConditionType('not_empty')
      }
    }
  }, [])

  const updateRule = (
    newEffect: RuleEffect | undefined,
    newConditionType: ConditionType,
    newTargetScope: string,
    newConditionValue: string
  ) => {
    if (!newEffect || !newTargetScope) {
      onChange(undefined)
      return
    }

    // Don't apply rule until value is entered (except for not_empty)
    if (newConditionType !== 'not_empty' && !newConditionValue) {
      onChange(undefined)
      return
    }

    const rule = buildRule({
      effect: newEffect,
      conditionType: newConditionType,
      targetScope: newTargetScope,
      value: newConditionType === 'const' ? parseValue(newConditionValue) : undefined,
      values: newConditionType === 'enum' ? newConditionValue.split(',').map(v => v.trim()) : undefined,
    })

    onChange(rule)
  }

  const parseValue = (val: string): string | number | boolean => {
    if (val === 'true') return true
    if (val === 'false') return false
    const num = Number(val)
    if (!isNaN(num) && val !== '') return num
    return val
  }

  const handleEffectChange = (newEffect: string) => {
    const effectValue = newEffect as RuleEffect
    setEffect(effectValue)
    updateRule(effectValue, conditionType, targetScope, conditionValue)
  }

  const handleConditionTypeChange = (newType: ConditionType) => {
    setConditionType(newType)
    updateRule(effect, newType, targetScope, conditionValue)
  }

  const handleTargetScopeChange = (newScope: string) => {
    setTargetScope(newScope)
    updateRule(effect, conditionType, newScope, conditionValue)
  }

  const handleConditionValueChange = (newValue: string) => {
    setConditionValue(newValue)
    updateRule(effect, conditionType, targetScope, newValue)
  }

  const handleClear = () => {
    setEffect(undefined)
    setTargetScope('')
    setConditionValue('')
    onChange(undefined)
  }

  return (
    <div className="mt-3 p-3 border border-dashed border-blue-300 rounded-md bg-blue-50">
      <div className="flex justify-between items-center mb-2">
        <Label className="text-xs text-blue-600 font-medium">
          Règle conditionnelle
        </Label>
        {effect && (
          <button
            onClick={handleClear}
            className="text-xs text-blue-400 hover:text-blue-600"
          >
            Effacer
          </button>
        )}
      </div>

      <div className="space-y-2">
        <Select value={effect} onValueChange={handleEffectChange}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Effet" />
          </SelectTrigger>
          <SelectContent>
            {EFFECT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {effect && (
          <>
            <Label className="text-xs text-slate-500">Si le champ</Label>
            <Select value={targetScope} onValueChange={handleTargetScopeChange}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Sélectionner un champ" />
              </SelectTrigger>
              <SelectContent>
                {availableScopes.map((scope) => (
                  <SelectItem key={scope} value={scope}>
                    {scope.replace('#/properties/', '')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={conditionType} onValueChange={handleConditionTypeChange}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                {CONDITION_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {conditionType !== 'not_empty' && (
              <Input
                className="bg-white"
                placeholder={conditionType === 'enum' ? 'val1, val2, val3' : 'Valeur'}
                value={conditionValue}
                onChange={(e) => handleConditionValueChange(e.target.value)}
              />
            )}

            {effect && targetScope && (conditionType === 'not_empty' || conditionValue) && (
              <p className="text-xs text-blue-500">
                {EFFECT_OPTIONS.find(o => o.value === effect)?.label} si "{targetScope.replace('#/properties/', '')}" {' '}
                {conditionType === 'const' && `= ${conditionValue}`}
                {conditionType === 'enum' && `∈ [${conditionValue}]`}
                {conditionType === 'not_empty' && 'est rempli'}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
