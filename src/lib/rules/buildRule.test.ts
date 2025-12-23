import { describe, it, expect } from 'vitest'
import { buildRule } from './buildRule'
import { RuleConfig, RuleEffect } from './types'

describe('buildRule', () => {
  describe('with const condition', () => {
    it('should build a rule with SHOW effect and const condition', () => {
      const config: RuleConfig = {
        effect: RuleEffect.SHOW,
        conditionType: 'const',
        targetScope: '#/properties/hasAddress',
        value: true
      }

      const result = buildRule(config)

      expect(result).toEqual({
        effect: RuleEffect.SHOW,
        condition: {
          scope: '#/properties/hasAddress',
          schema: { const: true }
        }
      })
    })

    it('should build a rule with HIDE effect and string const', () => {
      const config: RuleConfig = {
        effect: RuleEffect.HIDE,
        conditionType: 'const',
        targetScope: '#/properties/status',
        value: 'inactive'
      }

      const result = buildRule(config)

      expect(result).toEqual({
        effect: RuleEffect.HIDE,
        condition: {
          scope: '#/properties/status',
          schema: { const: 'inactive' }
        }
      })
    })
  })

  describe('with enum condition', () => {
    it('should build a rule with ENABLE effect and enum condition', () => {
      const config: RuleConfig = {
        effect: RuleEffect.ENABLE,
        conditionType: 'enum',
        targetScope: '#/properties/type',
        values: ['premium', 'enterprise']
      }

      const result = buildRule(config)

      expect(result).toEqual({
        effect: RuleEffect.ENABLE,
        condition: {
          scope: '#/properties/type',
          schema: { enum: ['premium', 'enterprise'] }
        }
      })
    })
  })

  describe('with not_empty condition', () => {
    it('should build a rule with DISABLE effect and not_empty condition', () => {
      const config: RuleConfig = {
        effect: RuleEffect.DISABLE,
        conditionType: 'not_empty',
        targetScope: '#/properties/name'
      }

      const result = buildRule(config)

      expect(result).toEqual({
        effect: RuleEffect.DISABLE,
        condition: {
          scope: '#/properties/name',
          schema: { minLength: 1 }
        }
      })
    })
  })

  it('should return undefined if config is incomplete', () => {
    const config: RuleConfig = {
      effect: RuleEffect.SHOW,
      conditionType: 'const',
      targetScope: '',
      value: true
    }

    const result = buildRule(config)

    expect(result).toBeUndefined()
  })
})
