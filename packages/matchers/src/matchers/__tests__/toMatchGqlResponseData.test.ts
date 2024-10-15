import { IGqlResponse, toMatchGqlResponseData } from '../toMatchGqlResponseData'

expect.extend({ toMatchGqlResponseData })

describe('toMatchGqlResponseData', () => {
  it('passes when response data is equal to expected', () => {
    const response: IGqlResponse = {
      body: {
        singleResult: {
          data: {
            a: 1,
            b: 2,
          },
        },
      },
    }

    expect(response).toMatchGqlResponseData({
      a: 1,
      b: 2,
    })
  })

  it('passes with response data matches expected', () => {
    const response: IGqlResponse = {
      body: {
        singleResult: {
          data: {
            a: 1,
            b: 2,
          },
        },
      },
    }

    expect(response).toMatchGqlResponseData({ a: 1 })
    expect(response).toMatchGqlResponseData({ b: 2 })
  })

  it('fails when response data do not match expected', () => {
    const response: IGqlResponse = {
      body: {
        singleResult: {
          data: {
            a: 1,
            b: 2,
          },
        },
      },
    }

    const validate = () => {
      expect(response).toMatchGqlResponseData({
        a: 3,
        b: 4,
      })
    }

    expect(validate).toThrowErrorMatchingSnapshot()
  })
})
