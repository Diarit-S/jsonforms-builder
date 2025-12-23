import type { Rule, RuleConfig } from './types'

export const buildRule = (config: RuleConfig): Rule | undefined => {
  const { effect, conditionType, targetScope, value, values } = config

  if (!targetScope) {
    return undefined
  }

  const schema = buildSchema(conditionType, value, values)

  return {
    effect,
    condition: {
      scope: targetScope,
      schema
    }
  }
}

const buildSchema = (
  conditionType: RuleConfig['conditionType'],
  value?: string | number | boolean,
  values?: (string | number | boolean)[]
): Record<string, unknown> => {
  switch (conditionType) {
    case 'const':
      return { const: value }
    case 'enum':
      return { enum: values }
    case 'not_empty':
      return { minLength: 1 }
    default:
      return {}
  }
}
