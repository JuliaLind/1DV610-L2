export const attributes = [
  {
    id: 'UNIT_MULT',
    name: 'Unit Multiplier',
    description: 'Exponent in base 10 specified so that multiplying the observation numeric values by 10^UNIT_MULT gives a value expressed in the UNIT.',
    relationship: {
      dimensions: [
        'BASE_CUR',
        'QUOTE_CUR',
        'TENOR'
      ]
    },
    role: null,
    values: [
      {
        id: '2',
        name: 'Hundreds'
      },
      {
        id: '0',
        name: 'Units'
      }
    ]
  }
]
