import { insertInput } from './utils'

const mockContent = [
  {
    color: '#FF0000',
    text: 'var '
  },
  {
    color: '#FFFFFF',
    text: 'number = '
  },
  {
    color: '#0000FF',
    text: '1'
  }
]

test('input in place of whole content piece', () => {
  const inputConfig = {
    startIndex: 4,
    endIndex: 13
  }
  const expected = [
    {
      color: '#FF0000',
      text: 'var '
    },
    {
      input: true
    },
    {
      color: '#0000FF',
      text: '1'
    }
  ]

  expect(insertInput(mockContent, inputConfig)).toStrictEqual(expected);
});

test('input begins mid-text', () => {
  const inputConfig = {
    startIndex: 6,
    endIndex: 13
  }
  const expected = [
    {
      color: '#FF0000',
      text: 'var '
    },
    {
      color: '#FFFFFF',
      text: 'nu'
    },
    {
      input: true
    },
    {
      color: '#0000FF',
      text: '1'
    }
  ]

  expect(insertInput(mockContent, inputConfig)).toStrictEqual(expected);
});

test('input ends mid-text', () => {
  const inputConfig = {
    startIndex: 4,
    endIndex: 10
  }
  const expected = [
    {
      color: '#FF0000',
      text: 'var '
    },
    {
      input: true
    },    
    {
      color: '#FFFFFF',
      text: ' = '
    },
    {
      color: '#0000FF',
      text: '1'
    }
  ]

  expect(insertInput(mockContent, inputConfig)).toStrictEqual(expected);
});

test('input starts and ends mid-text', () => {
  const inputConfig = {
    startIndex: 6,
    endIndex: 10
  }
  const expected = [
    {
      color: '#FF0000',
      text: 'var '
    },
    {
      color: '#FFFFFF',
      text: 'nu'
    },
    {
      input: true
    },    
    {
      color: '#FFFFFF',
      text: ' = '
    },
    {
      color: '#0000FF',
      text: '1'
    }
  ]

  expect(insertInput(mockContent, inputConfig)).toStrictEqual(expected);
});

test('input covers multiple text', () => {
  const inputConfig = {
    startIndex: 0,
    endIndex: 13
  }
  const expected = [
    {
      input: true
    },
    {
      color: '#0000FF',
      text: '1'
    }
  ]

  expect(insertInput(mockContent, inputConfig)).toStrictEqual(expected);
});

test('input starts mid-text, ends in other text', () => {
  const inputConfig = {
    startIndex: 2,
    endIndex: 10
  }
  const expected = [
    {
      color: '#FF0000',
      text: 'va'
    },
    {
      input: true
    },
    {
      color: '#FFFFFF',
      text: ' = '
    },
    {
      color: '#0000FF',
      text: '1'
    }
  ]

  expect(insertInput(mockContent, inputConfig)).toStrictEqual(expected);
});