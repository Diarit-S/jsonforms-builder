import { type Rule as JsonFormsRule, RuleEffect } from '@jsonforms/core'

export { RuleEffect }

export type Rule = JsonFormsRule

export type ConditionType = 'const' | 'enum' | 'not_empty'

export interface RuleConfig {
  effect: RuleEffect
  conditionType: ConditionType
  targetScope: string
  value?: string | number | boolean
  values?: (string | number | boolean)[]
}
