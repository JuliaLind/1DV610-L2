export const attributes = [
    {
        'id': 'DECIMALS',
        'name': 'Decimals',
        'description': 'The number of digits to the right of a decimal point.',
        'relationship': {
            'dimensions': [
                'BASE_CUR',
                'QUOTE_CUR',
                'TENOR'
            ]
        },
        'role': null,
        'values': [
            {
                'id': '2',
                'name': '2'
            },
            {
                'id': '4',
                'name': '4'
            }
        ]
    },
    {
        'id': 'CALCULATED',
        'name': 'Calculated',
        'description': 'Indicates if the value is calculated or an actual observation.',
        'relationship': {
            'dimensions': [
                'BASE_CUR',
                'QUOTE_CUR',
                'TENOR'
            ]
        },
        'role': null,
        'values': [
            {
                'id': 'false',
                'name': 'false'
            }
        ]
    },
    {
        'id': 'UNIT_MULT',
        'name': 'Unit Multiplier',
        'description': 'Exponent in base 10 specified so that multiplying the observation numeric values by 10^UNIT_MULT gives a value expressed in the UNIT.',
        'relationship': {
            'dimensions': [
                'BASE_CUR',
                'QUOTE_CUR',
                'TENOR'
            ]
        },
        'role': null,
        'values': [
            {
                'id': '2',
                'name': 'Hundreds'
            },
            {
                'id': '0',
                'name': 'Units'
            }
        ]
    },
    {
        'id': 'COLLECTION',
        'name': 'Collection Indicator',
        'description': 'Dates or periods during which the observations have been collected.',
        'relationship': {
            'dimensions': [
                'BASE_CUR',
                'QUOTE_CUR',
                'TENOR'
            ]
        },
        'role': null,
        'values': [
            {
                'id': 'C',
                'name': 'ECB concertation time 14:15 CET'
            }
        ]
    }
]