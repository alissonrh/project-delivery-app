import api, { Delete, Get, GetId, Post, PostAuth, Put } from '../api/requests';

describe('Testing Api Requests functions', () => {
  it('Testing the Get function', async () => {
    jest.spyOn(api, 'get').mockResolvedValueOnce({ data: 'any_value' });

    const returnedData = await Get('any_endpoint');

    expect(returnedData).toBe('any_value');
  });

  it('Testing the GetId function', async () => {
    jest.spyOn(api, 'post').mockResolvedValueOnce({ data: 'any_value' });

    const returnedData = await GetId('any_endpoint', {});

    expect(returnedData).toBe('any_value');
  });

  it('Testing the Put function', async () => {
    jest.spyOn(api, 'put').mockResolvedValueOnce({ data: 'any_value' });

    const returnedData = await Put('any_endpoint', {});

    expect(returnedData).toBe('any_value');
  });

  it('Testing the Post function', async () => {
    jest.spyOn(api, 'post').mockResolvedValueOnce({ data: 'any_value' });

    const returnedData = await Post('any_endpoint', {});

    expect(returnedData).toBe('any_value');
  });
  it('Testing the Delete function', async () => {
    jest.spyOn(api, 'delete').mockResolvedValueOnce({ data: 'any_value' });

    const returnedData = await Delete('any_endpoint');

    expect(returnedData).toBe('any_value');
  });

  it('Testing the PostAuth function', async () => {
    jest.spyOn(api, 'post').mockResolvedValueOnce({ data: 'any_value' });

    const returnedData = await PostAuth('any_endpoint', {}, 'any_token');

    expect(returnedData).toBe('any_value');
  });
});
